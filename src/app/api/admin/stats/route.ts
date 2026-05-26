import { NextResponse } from "next/server";
import { denyIfNotAdmin } from "@/lib/adminAuth";

// GET /api/admin/stats — returns { todayCount, lifetimeTotal, lastReset }
export async function GET(req: Request) {
  const denied = denyIfNotAdmin(req);
  if (denied) return denied;
  const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  if (!sheetUrl) {
    return NextResponse.json(
      { success: false, message: "Webhook not configured" },
      { status: 500 }
    );
  }
  try {
    const res = await fetch(`${sheetUrl}?stats=1`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    if (!data) {
      return NextResponse.json(
        { success: false, message: "Empty response from sheet" },
        { status: 502 }
      );
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("Stats fetch error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to reach sheet" },
      { status: 502 }
    );
  }
}
