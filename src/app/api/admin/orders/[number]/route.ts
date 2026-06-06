import { NextResponse } from "next/server";
import { denyIfNotAdmin } from "@/lib/adminAuth";
import { getSigned } from "@/lib/appsScript";

// GET /api/admin/orders/05 → fetches order from Apps Script
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ number: string }> }
) {
  const denied = denyIfNotAdmin(_req);
  if (denied) return denied;
  const { number } = await params;
  const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  if (!sheetUrl) {
    return NextResponse.json(
      { success: false, message: "Webhook not configured" },
      { status: 500 }
    );
  }

  // Strip leading # / 0s for the param, Apps Script will pad to 3 digits
  const clean = number.replace(/^#/, "").replace(/^0+/, "") || "0";

  try {
    const data = (await getSigned(sheetUrl, { number: clean })) as
      | { success?: boolean }
      | null;
    if (!data) {
      return NextResponse.json(
        { success: false, message: "Empty response from sheet" },
        { status: 502 }
      );
    }
    if (!data.success) {
      return NextResponse.json(data, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("Fetch order error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to reach sheet" },
      { status: 502 }
    );
  }
}
