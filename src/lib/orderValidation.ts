// Server-side order validation. NEVER trust prices from the client.
// All order routes must recompute totals via validateOrder() before
// forwarding to Apps Script.

import { menuData } from "./menuData";

// Mirrored constants from the cart context. Inlined here on purpose so that
// this server-only module never imports from a "use client" file (which
// caused undefined values to leak into the lookup table).
const COUPONS: Record<string, { percent: number }> = {
  MINISTER05:  { percent: 5  },
  MINISTER10:  { percent: 10 },
  MINISTER38:  { percent: 10 }, // verbal alias for MINISTER10
  COUPLE30:    { percent: 30 }, // hidden — shared directly with couples
  INSTAGRAM50: { percent: 50 }, // hidden — Instagram promo code
};
const FREE_FRIES_THRESHOLD = 299;
const FREE_FRIES_ITEM = "Classic Salted Fries (Half), FREE";

// Build a flat lookup of canonical {displayName -> price} from the live menu.
// Variant items expand to "Item Name (Half)" etc, matching the strings the
// client puts into the cart in MenuClient.tsx and ItemAddToCart.tsx.
const ITEM_PRICES: Record<string, number> = {};
for (const items of Object.values(menuData)) {
  for (const item of items) {
    if (typeof item.price === "number") {
      ITEM_PRICES[item.name] = item.price;
    }
    if (item.variants) {
      for (const v of item.variants) {
        ITEM_PRICES[`${item.name} (${v.label})`] = v.price;
      }
    }
  }
}
// Free fries is the only zero-price line the server is allowed to accept,
// and only when the rest of the cart hits the threshold (see below).
ITEM_PRICES[FREE_FRIES_ITEM] = 0;

const COUPONS_MUTEX_WITH_FREE_FRIES = new Set(["MINISTER05", "MINISTER10", "MINISTER38", "COUPLE30", "INSTAGRAM50"]);

export type ClientOrderItem = {
  name: string;
  quantity: number;
  price?: number;
};

export type ValidatedItem = {
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export type ValidatedOrder = {
  items: ValidatedItem[];
  subtotal: number;
  coupon: string | null;
  discountPercent: number;
  discountAmount: number;
  freeFriesEarned: boolean;
  total: number;
};

export type ValidationOutcome =
  | { ok: true; order: ValidatedOrder }
  | { ok: false; reason: string };

// Validate a customer-side order. Enforces:
//   - Every item exists in the canonical menu at its listed price.
//   - Quantities are positive integers.
//   - Free fries line can only appear when (subtotal ex-fries) >= threshold
//     AND no MINISTER10/MINISTER38 coupon is applied (mutex rule).
//   - Coupon is a known code; discount is recomputed from the % we store.
//   - Total is recomputed from subtotal - discount, never trusted from client.
export function validateCustomerOrder(input: {
  items: ClientOrderItem[];
  coupon?: string | null;
}): ValidationOutcome {
  if (!Array.isArray(input.items) || input.items.length === 0) {
    return { ok: false, reason: "No items" };
  }

  const items: ValidatedItem[] = [];
  let freeFriesIncluded = false;

  for (const it of input.items) {
    if (!it || typeof it.name !== "string") {
      return { ok: false, reason: "Malformed item" };
    }
    const expectedPrice = ITEM_PRICES[it.name];
    if (expectedPrice === undefined) {
      return { ok: false, reason: `Unknown item: ${it.name}` };
    }
    const qty = Math.floor(Number(it.quantity));
    if (!Number.isFinite(qty) || qty < 1 || qty > 99) {
      return { ok: false, reason: `Invalid quantity for ${it.name}` };
    }
    if (it.name === FREE_FRIES_ITEM) {
      freeFriesIncluded = true;
      items.push({ name: it.name, price: 0, quantity: 1, subtotal: 0 });
    } else {
      items.push({
        name: it.name,
        price: expectedPrice,
        quantity: qty,
        subtotal: expectedPrice * qty,
      });
    }
  }

  const subtotal = items.reduce((sum, i) => sum + i.subtotal, 0);

  // Coupon validation
  const couponKey = (input.coupon || "").trim().toUpperCase();
  let coupon: string | null = null;
  let discountPercent = 0;
  if (couponKey && couponKey in COUPONS) {
    coupon = couponKey;
    discountPercent = COUPONS[couponKey].percent;
  } else if (couponKey) {
    return { ok: false, reason: "Unknown coupon" };
  }

  const discountAmount = Math.round((subtotal * discountPercent) / 100);

  // Free fries server-side authority
  const isMutex =
    coupon !== null && COUPONS_MUTEX_WITH_FREE_FRIES.has(coupon);
  const freeFriesEarned = subtotal >= FREE_FRIES_THRESHOLD && !isMutex;

  if (freeFriesIncluded && !freeFriesEarned) {
    return {
      ok: false,
      reason:
        "Free Fries claim does not meet ₹" +
        FREE_FRIES_THRESHOLD +
        " threshold or conflicts with active coupon",
    };
  }

  const total = Math.max(0, subtotal - discountAmount);

  return {
    ok: true,
    order: {
      items,
      subtotal,
      coupon,
      discountPercent,
      discountAmount,
      freeFriesEarned,
      total,
    },
  };
}

// Counter (admin) orders are a different shape and authority:
//   - Admin is already authenticated, so they can apply discount AND free fries.
//   - But we still need to validate prices to defend against bugs / a
//     compromised admin cookie planting garbage.
export type CounterValidationInput = {
  items: ClientOrderItem[];
  discountPercent?: number; // 0 or 10 per the toggle
  freeFries?: boolean;
};

export type CounterValidated = {
  items: ValidatedItem[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
  freeFries: boolean;
};

export function validateCounterOrder(
  input: CounterValidationInput
): { ok: true; order: CounterValidated } | { ok: false; reason: string } {
  if (!Array.isArray(input.items) || input.items.length === 0) {
    return { ok: false, reason: "No items" };
  }

  const items: ValidatedItem[] = [];
  for (const it of input.items) {
    if (!it || typeof it.name !== "string") {
      return { ok: false, reason: "Malformed item" };
    }
    const expectedPrice = ITEM_PRICES[it.name];
    if (expectedPrice === undefined) {
      return { ok: false, reason: `Unknown item: ${it.name}` };
    }
    const qty = Math.floor(Number(it.quantity));
    if (!Number.isFinite(qty) || qty < 1 || qty > 99) {
      return { ok: false, reason: `Invalid quantity for ${it.name}` };
    }
    if (it.name === FREE_FRIES_ITEM) {
      items.push({ name: it.name, price: 0, quantity: 1, subtotal: 0 });
    } else {
      items.push({
        name: it.name,
        price: expectedPrice,
        quantity: qty,
        subtotal: expectedPrice * qty,
      });
    }
  }

  const subtotal = items.reduce((sum, i) => sum + i.subtotal, 0);

  // Admin can apply any valid coupon percent: 0, 5, 10, 30, 50
  const VALID_ADMIN_PERCENTS = new Set([0, 5, 10, 30, 50]);
  const discountPercent = VALID_ADMIN_PERCENTS.has(input.discountPercent ?? 0)
    ? (input.discountPercent ?? 0)
    : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);

  return {
    ok: true,
    order: {
      items,
      subtotal,
      discountPercent,
      discountAmount,
      total,
      freeFries: !!input.freeFries,
    },
  };
}
