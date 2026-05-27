import { NextResponse } from "next/server";
import { denyIfNotAdmin } from "@/lib/adminAuth";
import { postSigned } from "@/lib/appsScript";

type ExpensePayload = {
  category: string;
  amount: number;
  note?: string;
  date?: string; // ISO date or yyyy-MM-dd; defaults to today
};

// POST /api/admin/expense — log a new expense to the Expenses sheet
export async function POST(request: Request) {
  const denied = denyIfNotAdmin(request);
  if (denied) return denied;
  try {
    const body = (await request.json()) as ExpensePayload;
    const category = String(body.category || "").trim().slice(0, 60);
    const amount = Number(body.amount);
    if (!category || !Number.isFinite(amount) || amount <= 0 || amount > 1_000_000) {
      return NextResponse.json(
        { success: false, message: "Category and a positive amount under ₹10 lakh are required" },
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
      _action: "addExpense",
      category,
      amount,
      note: String(body.note || "").slice(0, 250),
      date: String(body.date || ""),
    });
    if (!data) {
      return NextResponse.json(
        { success: false, message: "Empty response from sheet" },
        { status: 502 }
      );
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("Expense post error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/expense?row=N — soft-delete by row index
export async function DELETE(request: Request) {
  const denied = denyIfNotAdmin(request);
  if (denied) return denied;
  try {
    const url = new URL(request.url);
    const row = Number(url.searchParams.get("row"));
    if (!row || row < 2) {
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

    const data = await postSigned(sheetUrl, {
      _action: "deleteExpense",
      rowIndex: row,
    });
    return NextResponse.json(data || { success: false });
  } catch (err) {
    console.error("Expense delete error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
