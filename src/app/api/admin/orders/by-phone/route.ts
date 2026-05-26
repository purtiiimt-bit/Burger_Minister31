import { NextResponse } from "next/server";
import { denyIfNotAdmin } from "@/lib/adminAuth";

// GET /api/admin/orders/by-phone?phone=9876543210&limit=10
export async function GET(req: Request) {
  const denied = denyIfNotAdmin(req);
  if (denied) return denied;
  const url = new URL(req.url);
  const phone = url.searchParams.get("phone") || "";
  const limit = url.searchParams.get("limit") || "10";

  if (!phone.replace(/\D/g, "")) {
    return NextResponse.json(
      { success: false, message: "Phone number required" },
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
    const res = await fetch(
      `${sheetUrl}?phone=${encodeURIComponent(phone)}&limit=${encodeURIComponent(limit)}`,
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
    console.error("Phone history error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to reach sheet" },
      { status: 502 }
    );
  }
}
