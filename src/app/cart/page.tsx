"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import SocialProof from "@/components/SocialProof";
import TrustBadges from "@/components/TrustBadges";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    discount,
    totalPrice,
    totalItems,
    coupon,
    applyCoupon,
    removeCoupon,
    freeFriesEarned,
    freeFriesActive,
    freeFriesShortfall,
  } = useCart();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function handleApply() {
    const res = applyCoupon(code);
    setMsg({ ok: res.ok, text: res.message });
    if (res.ok) setCode("");
  }

  function quickApply(c: string) {
    const res = applyCoupon(c);
    setMsg({ ok: res.ok, text: res.message });
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center pt-16">
        <div className="text-center">
          <svg className="mx-auto h-20 w-20 text-on-surface/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121 0 2.09-.773 2.34-1.867l1.613-7.05a.75.75 0 00-.72-.975H5.625l-.383-1.437A1.125 1.125 0 004.136 2.25H2.25M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <h2 className="mt-4 font-[var(--font-heading)] text-2xl font-bold">
            Your cart is empty
          </h2>
          <p className="mt-2 text-on-surface/50">
            Add some delicious burgers from our menu!
          </p>
          <Link
            href="/menu"
            className="btn-honeyed mt-6 inline-block rounded-full px-8 py-3 font-semibold text-on-primary"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SocialProof />

          <h1 className="font-[var(--font-heading)] text-3xl font-bold sm:text-4xl">
            Your <span className="text-primary">Cart</span>
          </h1>
          <p className="mt-1 text-sm text-on-surface/50">
            {totalItems} item{totalItems > 1 ? "s" : ""} in your cart
          </p>

          {/* Cart Items */}
          <div className="mt-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-4 rounded-2xl bg-surface-container p-4"
              >
                {/* Image */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-[var(--font-heading)] text-base font-bold truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-primary">
                    ₹{item.price} each
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.name, item.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-variant text-on-surface/70 hover:bg-surface-bright"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.name, item.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-variant text-on-surface/70 hover:bg-surface-bright"
                  >
                    +
                  </button>
                </div>

                {/* Price + Remove */}
                <div className="text-right">
                  <p className="font-[var(--font-heading)] font-bold text-primary">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeItem(item.name)}
                    className="mt-1 text-xs text-on-surface/40 hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Review Quote */}
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-outline-variant/10 bg-surface-container-low/50 p-4">
            <svg
              className="h-5 w-5 shrink-0 text-primary/60"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
            <div className="min-w-0 flex-1">
              <p className="text-sm italic text-on-surface/70">
                &ldquo;Walked in for a quick bite, walked out a regular. The
                Cheese Loaded Burger is a treat.&rdquo;
              </p>
              <p className="mt-1 text-xs text-on-surface/40">
                Kavita, Sector 62. 2 hrs ago.
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-6">
            <TrustBadges />
          </div>

          {/* Offers */}
          <div className="mt-6 rounded-2xl bg-surface-container p-5">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
              </svg>
              <h3 className="font-[var(--font-heading)] text-base font-bold">
                Offers for you
              </h3>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {/* Free Fries */}
              <div
                className={`rounded-xl border p-3 transition-all ${
                  freeFriesActive
                    ? "border-secondary/40 bg-secondary/10"
                    : freeFriesEarned
                      ? "border-outline-variant/15 bg-surface-container-low/50 opacity-60"
                      : "border-outline-variant/15 bg-surface-container-low/50 opacity-50"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🍟</span>
                  <span
                    className={`font-[var(--font-heading)] text-xs font-bold ${
                      freeFriesActive ? "text-secondary" : "text-on-surface/60"
                    }`}
                  >
                    FREE FRIES
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-on-surface/60">
                  On orders ₹200+
                </p>
                {freeFriesActive ? (
                  <p className="mt-1.5 text-[11px] font-semibold text-secondary">
                    ✓ Unlocked!
                  </p>
                ) : freeFriesEarned ? (
                  <p className="mt-1.5 text-[11px] text-on-surface/40">
                    Replaced by {coupon}
                  </p>
                ) : (
                  <p className="mt-1.5 text-[11px] text-on-surface/40">
                    Add ₹{freeFriesShortfall} more
                  </p>
                )}
              </div>

              {/* MINISTER05 */}
              <button
                disabled={coupon === "MINISTER05"}
                onClick={() => quickApply("MINISTER05")}
                className={`rounded-xl border p-3 text-left transition-all ${
                  coupon === "MINISTER05"
                    ? "border-primary/50 bg-primary/15"
                    : "border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10"
                }`}
              >
                <div className="font-[var(--font-heading)] text-xs font-bold text-primary">
                  MINISTER05
                </div>
                <p className="mt-1 text-[11px] text-on-surface/60">5% off</p>
                <p
                  className={`mt-1.5 text-[11px] font-semibold ${
                    coupon === "MINISTER05"
                      ? "text-primary"
                      : "text-on-surface/40"
                  }`}
                >
                  {coupon === "MINISTER05" ? "✓ Applied" : "Tap to apply"}
                </p>
              </button>
            </div>

            {coupon && (
              <div className="mt-3 flex items-center justify-between rounded-lg bg-primary/5 px-3 py-2 text-xs">
                <span className="text-primary">
                  <span className="font-bold">{coupon}</span> applied · You saved ₹{discount}
                </span>
                <button
                  onClick={() => {
                    removeCoupon();
                    setMsg(null);
                  }}
                  className="text-on-surface/50 hover:text-red-400"
                >
                  Remove
                </button>
              </div>
            )}

            {!coupon && (
              <details className="mt-3 group">
                <summary className="cursor-pointer text-[11px] font-medium text-on-surface/40 hover:text-on-surface/60">
                  Have another code?
                </summary>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && handleApply()}
                    placeholder="Enter code"
                    className="flex-1 rounded-lg border border-outline-variant/20 bg-surface-container-low px-3 py-2 text-xs uppercase tracking-wide text-on-surface placeholder:text-on-surface/30 focus:border-primary focus:outline-none"
                  />
                  <button
                    onClick={handleApply}
                    className="rounded-lg bg-surface-variant px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-on-primary"
                  >
                    Apply
                  </button>
                </div>
                {msg && !msg.ok && (
                  <p className="mt-2 text-[11px] text-red-400">{msg.text}</p>
                )}
              </details>
            )}
          </div>

          {/* Total */}
          <div className="mt-6 rounded-2xl bg-surface-container p-6">
            <div className="flex items-center justify-between text-sm text-on-surface/60">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="mt-1 flex items-center justify-between text-sm text-secondary">
                <span>Discount ({coupon})</span>
                <span>− ₹{discount}</span>
              </div>
            )}
            {freeFriesActive && (
              <div className="mt-1 flex items-center justify-between text-sm text-secondary">
                <span>🍟 Free Fries (Half)</span>
                <span>FREE</span>
              </div>
            )}
            <div className="mt-3 flex items-center justify-between border-t border-outline-variant/10 pt-3">
              <span className="text-lg text-on-surface/70">Total</span>
              <span className="font-[var(--font-heading)] text-2xl font-bold text-primary">
                ₹{totalPrice}
              </span>
            </div>
            <Link
              href="/checkout"
              className="btn-honeyed mt-4 block rounded-full py-3 text-center text-base font-semibold text-on-primary transition-all hover:scale-[1.02]"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/menu"
              className="mt-3 block text-center text-sm text-on-surface/50 hover:text-primary"
            >
              + Add more items
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
