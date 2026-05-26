import { NextResponse } from "next/server";
import { denyIfNotAdmin } from "@/lib/adminAuth";

type CounterOrderItem = { name: string; quantity: number; price: number };

type CounterOrderPayload = {
  items: CounterOrderItem[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
  paymentMode: "UPI" | "CASH";
  freeFries?: boolean;
  customerName?: string;
  customerPhone?: string;
};

// POST /api/admin/orders/new → forwards counter order to Apps Script, returns orderNumber
export async function POST(request: Request) {
  const denied = denyIfNotAdmin(request);
  if (denied) return denied;
  try {
    const order: CounterOrderPayload = await request.json();
    const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK;
    if (!sheetUrl) {
      return NextResponse.json(
        { success: false, message: "Webhook not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "COUNTER",
        items: order.items,
        subtotal: order.subtotal,
        discountPercent: order.discountPercent,
        discountAmount: order.discountAmount,
        total: order.total,
        paymentMode: order.paymentMode,
        freeFries: !!order.freeFries,
        customerName: order.customerName || "",
        customerPhone: order.customerPhone || "",
        time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      }),
    });
    const data = await res.json().catch(() => null);

    // Fallback orderNumber if Apps Script hasn't been updated yet.
    // Uses Date.now() so consecutive orders get unique numbers (no collisions
    // possible at human counter speed). 4-digit so it's visually distinct
    // from real sequential counter numbers (#001..#999).
    if (!data || (!data.success && !data.orderNumber)) {
      const fallback = "#" + String((Date.now() % 9999) + 1).padStart(4, "0");
      return NextResponse.json({ success: true, orderNumber: fallback });
    }
    if (!data.orderNumber) {
      return NextResponse.json(
        { success: false, message: data.message || "No order number returned" },
        { status: 502 }
      );
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("Counter order error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
