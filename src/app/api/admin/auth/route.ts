import { NextResponse } from "next/server";

// POST /api/admin/auth — validates the password against ADMIN_PASSWORD env var.
// Returns { ok: true } on match. Avoids exposing the password in client bundle.
export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expected = process.env.ADMIN_PASSWORD || "Ak97172713";
    if (typeof password === "string" && password === expected) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false }, { status: 401 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
