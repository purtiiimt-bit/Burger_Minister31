import { NextResponse } from "next/server";

// GET /api/admin/books?period=today|week|month
// GET /api/admin/books?feed=today  (returns mixed timeline of sales + expenses for that date)
export async function GET(req: Request) {
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
    let target: string;
    if (feed) {
      target = `${sheetUrl}?books=feed&date=${encodeURIComponent(feed)}`;
    } else if (period && ["today", "week", "month"].includes(period)) {
      target = `${sheetUrl}?books=${period}`;
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid request, expected ?period or ?feed" },
        { status: 400 }
      );
    }

    const res = await fetch(target, { method: "GET", cache: "no-store" });
    const data = await res.json().catch(() => null);
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
