import { NextResponse } from "next/server";
import { denyIfNotAdmin } from "@/lib/adminAuth";

// GET /api/admin/orders/list?date=today (default) | yyyy-MM-dd
export async function GET(req: Request) {
  const denied = denyIfNotAdmin(req);
  if (denied) return denied;
  const url = new URL(req.url);
  const date = url.searchParams.get("date") || "today";

  const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  if (!sheetUrl) {
    return NextResponse.json(
      { success: false, message: "Webhook not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `${sheetUrl}?orders=${encodeURIComponent(date)}`,
      { method: "GET", cache: "no-store" }
    );
    const data = await res.json().catch(() => null);
    if (!data) {
      return NextResponse.json(
        { success: false, message: "Empty response from sheet" },
        { status: 502 }
      );
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("Orders list error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to reach sheet" },
      { status: 502 }
    );
  }
}
