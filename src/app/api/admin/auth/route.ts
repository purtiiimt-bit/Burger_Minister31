import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE,
  isAuthorised,
  sessionToken,
} from "@/lib/adminAuth";

export const runtime = "nodejs";

// POST /api/admin/auth — validates the password and sets the session cookie.
// SECURITY:
//   1. No hardcoded fallback. Fails closed if env is missing.
//   2. Minimum 8-char password enforced server-side.
//   3. Constant-time comparison defeats timing oracle attacks.
//   4. 400ms artificial delay slows brute force.
//   5. Session cookie is HttpOnly + Secure + SameSite=Lax, value is a SHA-256
//      derived from the server password so it cannot be forged client-side.
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: unknown };
    const expected = process.env.ADMIN_PASSWORD;

    if (!expected || typeof expected !== "string" || expected.length < 8) {
      return NextResponse.json(
        { ok: false, message: "Admin is not configured." },
        { status: 503 }
      );
    }
    if (typeof body?.password !== "string" || !body.password) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    await new Promise((r) => setTimeout(r, 400));

    const a = Buffer.from(body.password);
    const b = Buffer.from(expected);
    const len = Math.max(a.length, b.length);
    const ap = Buffer.alloc(len);
    const bp = Buffer.alloc(len);
    a.copy(ap);
    b.copy(bp);
    const ok = a.length === b.length && timingSafeEqual(ap, bp);
    if (!ok) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const token = sessionToken();
    if (!token) {
      return NextResponse.json(
        { ok: false, message: "Admin is not configured." },
        { status: 503 }
      );
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: ADMIN_COOKIE_MAX_AGE,
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

// GET /api/admin/auth — used by the admin client on page load to silently
// confirm an existing session before showing the login screen.
export async function GET(request: Request) {
  if (isAuthorised(request)) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}

// DELETE /api/admin/auth — logout. Clears the session cookie.
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
