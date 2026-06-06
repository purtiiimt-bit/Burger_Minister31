import { NextResponse } from "next/server";
import { denyIfNotAdmin } from "@/lib/adminAuth";
import { validateCounterOrder } from "@/lib/orderValidation";
import { postSigned } from "@/lib/appsScript";

type EditPayload = {
  rowIndex: number;
  customerName?: string;
  customerPhone?: string;
  paymentMode?: "UPI" | "CASH";
  discountPercent?: number;
  freeFries?: boolean;
  orderType?: string;
  address?: string;
  note?: string;
  updatedItems?: { name: string; quantity: number }[];
};

// POST /api/admin/orders/edit — update editable fields on an existing order row.
// If updatedItems is provided it is the FULL new items list (replaces existing).
// Validated server-side; Apps Script recalculates totals.
export async function POST(request: Request) {
  const denied = denyIfNotAdmin(request);
  if (denied) return denied;
  try {
    const body = (await request.json()) as EditPayload;
    const rowIndex = Number(body.rowIndex);
    if (!rowIndex || rowIndex < 2) {
      return NextResponse.json(
        { success: false, message: "Invalid row index" },
        { status: 400 }
      );
    }

    const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK;
    if (!sheetUrl) {
      return NextResponse.json(
        { success: false, message: "Webhook not configured" },
        { status: 500 }
      );
    }

    const payload: Record<string, unknown> = {
      _action: "editOrder",
      rowIndex,
    };
    if (body.customerName !== undefined)
      payload.customerName = String(body.customerName).slice(0, 80);
    if (body.customerPhone !== undefined)
      payload.customerPhone = String(body.customerPhone).replace(/[^0-9+]/g, "").slice(0, 15);
    if (body.paymentMode !== undefined)
      payload.paymentMode = body.paymentMode === "CASH" ? "CASH" : "UPI";
    if (body.orderType !== undefined)
      payload.orderType = String(body.orderType).slice(0, 40);
    if (body.address !== undefined)
      payload.address = String(body.address).slice(0, 250);
    if (body.note !== undefined)
      payload.note = String(body.note).slice(0, 250);
    if (body.discountPercent !== undefined)
      payload.discountPercent = body.discountPercent;
    if (body.freeFries !== undefined)
      payload.freeFries = !!body.freeFries;

    // Validate full items list server-side (never trust client prices)
    if (body.updatedItems && body.updatedItems.length > 0) {
      if (body.updatedItems.length > 50) {
        return NextResponse.json(
          { success: false, message: "Too many items" },
          { status: 400 }
        );
      }
      const validation = validateCounterOrder({
        items: body.updatedItems,
        discountPercent: body.discountPercent,
        freeFries: body.freeFries,
      });
      if (!validation.ok) {
        return NextResponse.json(
          { success: false, message: validation.reason },
          { status: 400 }
        );
      }
      payload.updatedItems = validation.order.items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      }));
      payload.discountPercent = validation.order.discountPercent;
      payload.discountAmount = validation.order.discountAmount;
      payload.subtotal = validation.order.subtotal;
      payload.total = validation.order.total;
      payload.freeFries = validation.order.freeFries;
    }

    const data = await postSigned(sheetUrl, payload);
    return NextResponse.json(data || { success: false });
  } catch (err) {
    console.error("Edit order error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
