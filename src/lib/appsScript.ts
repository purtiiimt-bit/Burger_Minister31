// Signed request helper for talking to the Apps Script webhook.
//
// The webhook URL is in env (server-only), but if it ever leaks (Vercel log,
// screenshot, malicious admin) the entire restaurant's data + email is up
// for grabs. To make a leaked URL useless without the shared secret, every
// request from Next.js to Apps Script carries an HMAC-SHA256 of a fresh
// timestamp. Apps Script verifies the signature AND the timestamp window
// (60 seconds) before doing anything.

import { createHmac } from "node:crypto";

const REPLAY_WINDOW_MS = 60_000;

function getSecret(): string | null {
  const s = process.env.APPS_SCRIPT_SECRET;
  if (!s || typeof s !== "string" || s.length < 16) return null;
  return s;
}

// Computes HMAC-SHA256(secret, timestamp) → hex.
// Apps Script computes the same value with Utilities.computeHmacSha256Signature.
function sign(ts: number, secret: string): string {
  return createHmac("sha256", secret).update(String(ts)).digest("hex");
}

// Build the auth pair Next.js attaches to every Apps Script call.
export function authPair(): { _ts: number; _sig: string } | null {
  const secret = getSecret();
  if (!secret) return null;
  const ts = Date.now();
  return { _ts: ts, _sig: sign(ts, secret) };
}

// POST to the configured webhook with the auth pair merged into the body.
// Returns parsed JSON or null on a non-JSON response.
export async function postSigned(
  url: string,
  payload: Record<string, unknown>
): Promise<unknown> {
  const auth = authPair();
  const body = auth ? { ...auth, ...payload } : payload;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json().catch(() => null);
}

// GET helper: appends _ts and _sig as query params.
export async function getSigned(
  url: string,
  params: Record<string, string | number> = {}
): Promise<unknown> {
  const u = new URL(url);
  for (const [k, v] of Object.entries(params)) {
    u.searchParams.set(k, String(v));
  }
  const auth = authPair();
  if (auth) {
    u.searchParams.set("_ts", String(auth._ts));
    u.searchParams.set("_sig", auth._sig);
  }
  const res = await fetch(u.toString(), {
    method: "GET",
    cache: "no-store",
  });
  return res.json().catch(() => null);
}

export const REPLAY_WINDOW_FOR_DOCS = REPLAY_WINDOW_MS;
