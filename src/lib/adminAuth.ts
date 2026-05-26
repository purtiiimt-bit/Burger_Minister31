import { createHash } from "node:crypto";

// Single source of truth for the admin session cookie.
// The token value is a deterministic hash of the server-side ADMIN_PASSWORD,
// so an attacker who doesn't know the env value cannot forge it.

export const ADMIN_COOKIE = "bm-admin-session";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function sessionToken(): string | null {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret || typeof secret !== "string" || secret.length < 8) return null;
  return createHash("sha256")
    .update("bm-admin-session:" + secret)
    .digest("hex");
}

// Constant-time comparison so we don't leak length/equality via timing.
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

// Pulls the session cookie value out of the raw Cookie header.
function readCookie(req: Request): string | null {
  const cookieHeader = req.headers.get("cookie") || "";
  // Match the named cookie, allowing leading whitespace and ; separators
  const re = new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE}=([^;]+)`);
  const match = cookieHeader.match(re);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

// Returns true only when the request carries a valid admin session cookie.
// Use at the top of every /api/admin/* route to fail-closed for everyone else.
export function isAuthorised(req: Request): boolean {
  const value = readCookie(req);
  if (!value) return false;
  const expected = sessionToken();
  if (!expected) return false;
  return constantTimeEqual(value, expected);
}

// Helper used by API route handlers to enforce admin auth.
// Returns a Response to be returned by the route, or null to proceed.
import { NextResponse } from "next/server";
export function denyIfNotAdmin(req: Request): Response | null {
  if (isAuthorised(req)) return null;
  return NextResponse.json(
    { success: false, ok: false, message: "Unauthorised" },
    { status: 401 }
  );
}
