import { NextResponse } from "next/server";
import { denyIfNotAdmin } from "@/lib/adminAuth";
import { validateCounterOrder } from "@/lib/orderValidation";
import { postSigned } from "@/lib/appsScript";

type EditPayload = {
  rowIndex: number;
  customerName?: string;
  customerPhone?: string;
  paymentMode?: "UPI" | "CASH";
  orderType?: string;
  address?: string;
  note?: string;
  additionalItems?: { name: string; quantity: number }[];
};

// POST /api/admin/orders/edit — update editable fields on an existing order row.
// If additionalItems is provided, they are validated server-side and merged into
// the existing order by the Apps Script (items JSON + totals updated).
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

    // Normalize and cap field sizes before forwarding
    const payload: Record<string, unknown> = {
      _action: "editOrder",
      rowIndex,
    };
    if (body.customerName !== undefined) {
      payload.customerName = String(body.customerName).slice(0, 80);
    }
    if (body.customerPhone !== undefined) {
      payload.customerPhone = String(body.customerPhone)
        .replace(/[^0-9+]/g, "")
        .slice(0, 15);
    }
    if (body.paymentMode !== undefined) {
      payload.paymentMode = body.paymentMode === "CASH" ? "CASH" : "UPI";
    }
    if (body.orderType !== undefined) {
      payload.orderType = String(body.orderType).slice(0, 40);
    }
    if (body.address !== undefined) {
      payload.address = String(body.address).slice(0, 250);
    }
    if (body.note !== undefined) {
      payload.note = String(body.note).slice(0, 250);
    }

    // Validate additional items server-side (never trust client prices)
    if (body.additionalItems && body.additionalItems.length > 0) {
      if (body.additionalItems.length > 50) {
        return NextResponse.json(
          { success: false, message: "Too many items" },
          { status: 400 }
        );
      }
      const addValidation = validateCounterOrder({ items: body.additionalItems });
      if (!addValidation.ok) {
        return NextResponse.json(
          { success: false, message: addValidation.reason },
          { status: 400 }
        );
      }
      payload.additionalItems = addValidation.order.items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      }));
      payload.additionalSubtotal = addValidation.order.subtotal;
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
