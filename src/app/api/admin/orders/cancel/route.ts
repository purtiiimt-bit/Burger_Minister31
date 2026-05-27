import { NextResponse } from "next/server";
import { denyIfNotAdmin } from "@/lib/adminAuth";
import { postSigned } from "@/lib/appsScript";

// POST /api/admin/orders/cancel — soft-cancel an order in the sheet.
// Prepends "❌ " to the order number, zeros the total, sends notification email.
// Row is kept for audit trail — not deleted.
export async function POST(request: Request) {
  const denied = denyIfNotAdmin(request);
  if (denied) return denied;

  let rowIndex: number;
  try {
    const body = await request.json() as { rowIndex?: unknown };
    rowIndex = Number(body.rowIndex);
    if (!rowIndex || rowIndex < 2) throw new Error("bad rowIndex");
  } catch {
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

  try {
    const data = await postSigned(sheetUrl, {
      _action: "cancelOrder",
      rowIndex,
    });
    return NextResponse.json(data || { success: false });
  } catch (err) {
    console.error("Cancel order error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
