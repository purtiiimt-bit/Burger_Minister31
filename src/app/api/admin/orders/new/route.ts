import { NextResponse } from "next/server";

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

    // Fallback orderNumber if Apps Script hasn't been updated yet
    if (!data || (!data.success && !data.orderNumber)) {
      const fallback = (() => {
        const now = new Date();
        const ist = new Date(
          now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
        );
        const minutesIntoDay = ist.getHours() * 60 + ist.getMinutes();
        const base = (minutesIntoDay % 999) + 1;
        const tail = Math.floor(Math.random() * 10);
        const num = ((base * 10 + tail) % 999) + 1;
        return "#" + String(num).padStart(3, "0");
      })();
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
