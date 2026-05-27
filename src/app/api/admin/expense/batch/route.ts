import { NextResponse } from "next/server";
import { denyIfNotAdmin } from "@/lib/adminAuth";
import { postSigned } from "@/lib/appsScript";

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
    // Hard cap to defend against accidental floods
    if (body.items.length > 200) {
      return NextResponse.json(
        { success: false, message: "Too many entries in one batch (max 200)" },
        { status: 400 }
      );
    }

    // Sanity-check each row server-side. Normalize + cap field sizes.
    const valid = body.items
      .map((it) => {
        if (!it || typeof it.category !== "string") return null;
        const category = it.category.trim().slice(0, 60);
        const amount = Number(it.amount);
        if (
          !category ||
          !Number.isFinite(amount) ||
          amount <= 0 ||
          amount > 1_000_000
        ) {
          return null;
        }
        return {
          category,
          amount,
          note: String(it.note || "").slice(0, 250),
          date: String(it.date || ""),
        };
      })
      .filter(Boolean) as BatchItem[];

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

    const data = await postSigned(sheetUrl, {
      _action: "addExpensesBatch",
      items: valid,
    });
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
