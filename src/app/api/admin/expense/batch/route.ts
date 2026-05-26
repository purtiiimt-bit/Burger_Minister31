import { NextResponse } from "next/server";
import { denyIfNotAdmin } from "@/lib/adminAuth";

type BatchItem = {
  category: string;
  amount: number;
  note?: string;
  date?: string;
};

type BatchPayload = { items: BatchItem[] };

// POST /api/admin/expense/batch — save many expenses in a single call
export async function POST(request: Request) {
  const denied = denyIfNotAdmin(request);
  if (denied) return denied;
  try {
    const body = (await request.json()) as BatchPayload;
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Items array required" },
        { status: 400 }
      );
    }

    // Sanity-check each row server-side
    const valid = body.items.filter(
      (it) =>
        it &&
        typeof it.category === "string" &&
        it.category.trim() !== "" &&
        Number(it.amount) > 0
    );
    if (valid.length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid entries to save" },
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
        _action: "addExpensesBatch",
        items: valid,
      }),
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(
      data || { success: false, message: "Empty response from sheet" }
    );
  } catch (err) {
    console.error("Batch expense error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
