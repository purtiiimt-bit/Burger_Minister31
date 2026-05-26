import { NextResponse } from "next/server";
import { denyIfNotAdmin } from "@/lib/adminAuth";

type EditPayload = {
  rowIndex: number;
  customerName?: string;
  customerPhone?: string;
  paymentMode?: "UPI" | "CASH";
  orderType?: string;
  address?: string;
  note?: string;
};

// POST /api/admin/orders/edit — update editable fields on an existing order row
export async function POST(request: Request) {
  const denied = denyIfNotAdmin(request);
  if (denied) return denied;
  try {
    const body = (await request.json()) as EditPayload;
    if (!body.rowIndex || body.rowIndex < 2) {
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

    const res = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _action: "editOrder",
        ...body,
      }),
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data || { success: false });
  } catch (err) {
    console.error("Edit order error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
