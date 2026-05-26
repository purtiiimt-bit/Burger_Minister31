import { NextResponse } from "next/server";
import { denyIfNotAdmin } from "@/lib/adminAuth";

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
    if (!body.category || !body.amount || body.amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Category and a positive amount are required" },
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
        _action: "addExpense",
        category: body.category,
        amount: body.amount,
        note: body.note || "",
        date: body.date || "",
      }),
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
    const row = url.searchParams.get("row");
    if (!row) {
      return NextResponse.json(
        { success: false, message: "Missing row parameter" },
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
        _action: "deleteExpense",
        rowIndex: Number(row),
      }),
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data || { success: false });
  } catch (err) {
    console.error("Expense delete error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
