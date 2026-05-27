import { NextResponse } from "next/server";
import { denyIfNotAdmin } from "@/lib/adminAuth";
import { validateCounterOrder } from "@/lib/orderValidation";
import { postSigned } from "@/lib/appsScript";

type ClientItem = { name: string; quantity: number; price?: number };

type CounterPayload = {
  items: ClientItem[];
  discountPercent?: number;
  freeFries?: boolean;
  paymentMode?: "UPI" | "CASH";
  customerName?: string;
  customerPhone?: string;
};

// POST /api/admin/orders/new → forwards counter order to Apps Script, returns orderNumber
export async function POST(request: Request) {
  const denied = denyIfNotAdmin(request);
  if (denied) return denied;

  let body: CounterPayload;
  try {
    body = (await request.json()) as CounterPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON" },
      { status: 400 }
    );
  }

  // Server-side price + math validation. Even an authenticated admin client
  // can have a bug or a tampered session; we recompute from the canonical menu.
  const validation = validateCounterOrder({
    items: body.items,
    discountPercent: body.discountPercent,
    freeFries: body.freeFries,
  });
  if (!validation.ok) {
    return NextResponse.json(
      { success: false, message: validation.reason },
      { status: 400 }
    );
  }
  const safe = validation.order;
  const paymentMode = body.paymentMode === "CASH" ? "CASH" : "UPI";
  const customerName = String(body.customerName || "").slice(0, 80).trim();
  const customerPhone = String(body.customerPhone || "")
    .replace(/[^0-9+]/g, "")
    .slice(0, 15);

  const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  if (!sheetUrl) {
    return NextResponse.json(
      { success: false, message: "Webhook not configured" },
      { status: 500 }
    );
  }

  type SheetResp = {
    success?: boolean;
    orderNumber?: string;
    message?: string;
  };
  let data: SheetResp | null = null;
  try {
    data = (await postSigned(sheetUrl, {
      source: "COUNTER",
      items: safe.items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
      itemsArray: safe.items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
      subtotal: safe.subtotal,
      discountPercent: safe.discountPercent,
      discountAmount: safe.discountAmount,
      total: safe.total,
      paymentMode,
      freeFries: safe.freeFries,
      customerName,
      customerPhone,
      time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    })) as SheetResp | null;
  } catch (err) {
    console.error("Counter order proxy error:", err);
  }

  // Fallback order number when Apps Script is unreachable or not yet updated.
  if (!data || (!data.success && !data.orderNumber)) {
    const fallback = "#" + String((Date.now() % 9999) + 1).padStart(4, "0");
    return NextResponse.json({
      success: true,
      orderNumber: fallback,
      total: safe.total,
      subtotal: safe.subtotal,
      discountAmount: safe.discountAmount,
    });
  }
  if (!data.orderNumber) {
    return NextResponse.json(
      { success: false, message: data.message || "No order number returned" },
      { status: 502 }
    );
  }
  return NextResponse.json({
    ...data,
    total: safe.total,
    subtotal: safe.subtotal,
    discountAmount: safe.discountAmount,
  });
}
