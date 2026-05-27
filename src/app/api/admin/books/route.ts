import { NextResponse } from "next/server";
import { denyIfNotAdmin } from "@/lib/adminAuth";
import { getSigned } from "@/lib/appsScript";

// GET /api/admin/books?period=today|week|month
// GET /api/admin/books?feed=today  (returns mixed timeline of sales + expenses for that date)
export async function GET(req: Request) {
  const denied = denyIfNotAdmin(req);
  if (denied) return denied;
  const url = new URL(req.url);
  const period = url.searchParams.get("period");
  const feed = url.searchParams.get("feed");

  const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  if (!sheetUrl) {
    return NextResponse.json(
      { success: false, message: "Webhook not configured" },
      { status: 500 }
    );
  }

  try {
    let params: Record<string, string> = {};
    if (feed) {
      params = { books: "feed", date: feed };
    } else if (period && ["today", "week", "month"].includes(period)) {
      params = { books: period };
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid request, expected ?period or ?feed" },
        { status: 400 }
      );
    }

    const data = await getSigned(sheetUrl, params);
    if (!data) {
      return NextResponse.json(
        { success: false, message: "Empty response from sheet" },
        { status: 502 }
      );
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("Books fetch error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to reach sheet" },
      { status: 502 }
    );
  }
}
