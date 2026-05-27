"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const {
    items,
    subtotal,
    discount,
    totalPrice,
    coupon,
    freeFriesActive,
    clearCart,
  } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Controlled fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  // Field-level touched state (show errors only after user has interacted)
  const [nameTouched, setNameTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  // Validation helpers
  const NAME_MAX = 50;
  const nameClean = name.trim();
  const nameError =
    nameTouched && nameClean.length < 2
      ? "Name must be at least 2 characters"
      : nameTouched && !/^[a-zA-Zऀ-ॿ\s]+$/.test(nameClean)
      ? "Name should only contain letters"
      : null;

  const phoneError =
    phoneTouched && phone.length > 0 && phone.length < 10
      ? "Enter a valid 10-digit mobile number"
      : null;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold">
            Nothing to checkout
          </h2>
          <p className="mt-2 text-on-surface/50">Your cart is empty.</p>
          <Link
            href="/menu"
            className="btn-honeyed mt-4 inline-block rounded-full px-8 py-3 font-semibold text-on-primary"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  async function handlePlaceOrder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Mark all fields touched so errors show
    setNameTouched(true);
    setPhoneTouched(true);

    // Guard: validate before submitting
    if (nameClean.length < 2) { setError("Please enter your full name."); return; }
    if (!/^[a-zA-Zऀ-ॿ\s]+$/.test(nameClean)) { setError("Name should only contain letters."); return; }
    if (phone.length !== 10) { setError("Please enter a valid 10-digit mobile number."); return; }
    if (orderType === "delivery" && !address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }
    setLoading(true);
    setError("");

    const cartItems = items.map((i) => ({
      name: i.name,
      quantity: i.quantity,
      price: i.price,
      subtotal: i.price * i.quantity,
    }));
    if (freeFriesActive) {
      cartItems.push({
        name: "Classic Salted Fries (Half), FREE",
        quantity: 1,
        price: 0,
        subtotal: 0,
      });
    }

    const orderData = {
      name,
      phone,
      address: orderType === "delivery" ? address : "",
      orderType,
      note,
      items: cartItems,
      subtotal,
      coupon,
      discount,
      freeFries: freeFriesActive,
      totalPrice,
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Order failed");

      const data = await res.json().catch(() => ({}));
      const num = data?.orderNumber || "";

      clearCart();
      router.push(num ? `/thankyou?orderNumber=${encodeURIComponent(num)}` : "/thankyou");
    } catch {
      setError(
        "Sorry, we couldn't submit your order. Please try again or call us at +91 9643100501."
      );
      setLoading(false);
    }
  }

  return (
    <div className="pt-16">
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="font-[var(--font-heading)] text-3xl font-bold sm:text-4xl">
            Checkout
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-5">
            {/* Form — Left */}
            <form onSubmit={handlePlaceOrder} className="lg:col-span-3">
              <div className="rounded-2xl bg-surface-container p-6">
                <h2 className="font-[var(--font-heading)] text-lg font-bold">
                  Your Details
                </h2>

                <div className="mt-4 space-y-4">
                  {/* Name */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-on-surface/70"
                      >
                        Full Name *
                      </label>
                      <span className={`text-xs ${name.length >= NAME_MAX - 10 ? "text-red-400" : "text-on-surface/30"}`}>
                        {name.length}/{NAME_MAX}
                      </span>
                    </div>
                    <input
                      type="text"
                      id="name"
                      required
                      maxLength={NAME_MAX}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => setNameTouched(true)}
                      className={`ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-1 ${
                        nameError
                          ? "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/30"
                          : "focus:border-primary/40 focus:ring-primary/40"
                      }`}
                      placeholder="Aapka naam"
                    />
                    {nameError && (
                      <p className="mt-1 text-xs text-red-400">{nameError}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium text-on-surface/70"
                      >
                        Phone Number *
                      </label>
                      <span className={`text-xs ${phone.length === 10 ? "text-secondary" : "text-on-surface/30"}`}>
                        {phone.length}/10
                      </span>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      required
                      inputMode="numeric"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => {
                        // Strip everything except digits, cap at 10
                        const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setPhone(digits);
                      }}
                      onBlur={() => setPhoneTouched(true)}
                      className={`ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-1 ${
                        phoneError
                          ? "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/30"
                          : phone.length === 10
                          ? "border-secondary/40 focus:border-secondary/40 focus:ring-secondary/30"
                          : "focus:border-primary/40 focus:ring-primary/40"
                      }`}
                      placeholder="10-digit mobile number"
                    />
                    {phoneError && (
                      <p className="mt-1 text-xs text-red-400">{phoneError}</p>
                    )}
                  </div>

                  {/* Order Type Toggle */}
                  <div>
                    <p className="mb-2 text-sm font-medium text-on-surface/70">
                      Order Type *
                    </p>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setOrderType("pickup")}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-all ${
                          orderType === "pickup"
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-outline-variant/30 text-on-surface/50 hover:border-primary/40 hover:text-on-surface"
                        }`}
                      >
                        {/* Store icon */}
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                        </svg>
                        Pickup
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType("delivery")}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-all ${
                          orderType === "delivery"
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-outline-variant/30 text-on-surface/50 hover:border-primary/40 hover:text-on-surface"
                        }`}
                      >
                        {/* Delivery icon */}
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>
                        Delivery
                      </button>
                    </div>
                    {orderType === "delivery" && (
                      <p className="mt-1.5 text-xs text-on-surface/40">
                        Delivery available within Noida only
                      </p>
                    )}
                  </div>

                  {/* Address — only for delivery */}
                  {orderType === "delivery" && (
                    <div>
                      <label
                        htmlFor="address"
                        className="mb-1.5 block text-sm font-medium text-on-surface/70"
                      >
                        Delivery Address *
                      </label>
                      <textarea
                        id="address"
                        rows={2}
                        required={orderType === "delivery"}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/30 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
                        placeholder="Full address with landmark"
                      />
                    </div>
                  )}

                  {/* Special Instructions */}
                  <div>
                    <label
                      htmlFor="note"
                      className="mb-1.5 block text-sm font-medium text-on-surface/70"
                    >
                      Special Instructions
                    </label>
                    <textarea
                      id="note"
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/30 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
                      placeholder="Extra cheese, no onion, etc."
                    />
                  </div>
                </div>

                {error && (
                  <p className="mt-4 rounded-lg bg-red-900/20 p-3 text-sm text-red-400">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-honeyed mt-6 w-full rounded-full py-3.5 text-base font-semibold text-on-primary transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? "Placing Order…" : `Place Order · ₹${totalPrice}`}
                </button>

                <p className="mt-3 text-center text-xs text-on-surface/30">
                  You can pay at the counter when you arrive
                </p>
              </div>
            </form>

            {/* Order Summary — Right */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-surface-container p-6">
                <h2 className="font-[var(--font-heading)] text-lg font-bold">
                  Order Summary
                </h2>
                <div className="mt-4 space-y-3">
                  {items.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {item.name}
                        </p>
                        <p className="text-xs text-on-surface/50">
                          x{item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-primary">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t border-outline-variant/10 pt-4">
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
                    <span className="font-medium text-on-surface/70">Total</span>
                    <span className="font-[var(--font-heading)] text-xl font-bold text-primary">
                      ₹{totalPrice}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href="/cart"
                className="mt-3 block text-center text-sm text-on-surface/50 hover:text-primary"
              >
                ← Edit Cart
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
