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
  const [showPayment, setShowPayment] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<Record<string, string> | null>(null);

  const UPI_ID = "paytmqr6j4v4s@ptys";

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

  function handleProceedToPayment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setFormData({
      name: data.get("name") as string,
      phone: data.get("phone") as string,
      address: data.get("address") as string,
      orderType: data.get("orderType") as string,
      note: data.get("note") as string,
    });
    setShowPayment(true);
    // Scroll to top on mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleConfirmOrder() {
    if (!formData) return;
    setLoading(true);
    setError("");

    // If free fries earned, append a ₹0 line item so kitchen sees it on the receipt
    const cartItems = items.map((i) => ({
      name: i.name,
      quantity: i.quantity,
      price: i.price,
      subtotal: i.price * i.quantity,
    }));
    if (freeFriesActive) {
      cartItems.push({
        name: "Classic Salted Fries (Half) — FREE",
        quantity: 1,
        price: 0,
        subtotal: 0,
      });
    }

    const orderData = {
      ...formData,
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
        "Order submit nahi ho paya. Please try again ya call karein: +91 9643100501"
      );
      setLoading(false);
    }
  }

  function copyUPI() {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ─── Payment Modal ───
  if (showPayment) {
    return (
      <div className="pt-16">
        <section className="py-12">
          <div className="mx-auto max-w-lg px-4 sm:px-6">
            {/* Back button */}
            <button
              onClick={() => setShowPayment(false)}
              className="mb-6 flex items-center gap-2 text-sm text-on-surface/50 transition-colors hover:text-primary"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Details
            </button>

            {/* Payment Card */}
            <div className="overflow-hidden rounded-2xl border border-primary/20 bg-surface-container">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary/20 to-tertiary/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-[var(--font-heading)] text-lg font-bold">
                      Pay via UPI
                    </h2>
                    <p className="text-xs text-on-surface/50">
                      Scan QR or use UPI ID
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-6">
                {/* Amount */}
                <div className="mb-6 text-center">
                  <p className="text-sm text-on-surface/50">Amount to Pay</p>
                  <p className="font-[var(--font-heading)] text-3xl font-bold text-primary">
                    ₹{totalPrice}
                  </p>
                </div>

                {/* QR Code */}
                <div className="mx-auto mb-4 w-52 overflow-hidden rounded-2xl bg-white p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/qr-code.png"
                    alt="Scan to Pay via UPI"
                    className="h-auto w-full rounded-xl"
                  />
                </div>
                <p className="mb-6 text-center text-xs text-on-surface/40">
                  Paytm — Anand Kumar
                </p>

                {/* Divider */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-outline-variant/20" />
                  <span className="text-xs text-on-surface/30">OR</span>
                  <div className="h-px flex-1 bg-outline-variant/20" />
                </div>

                {/* UPI ID */}
                <div className="mb-6 rounded-xl bg-surface-container-low p-4">
                  <p className="mb-1.5 text-xs text-on-surface/50">UPI ID</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm font-semibold text-primary">
                      {UPI_ID}
                    </code>
                    <button
                      onClick={copyUPI}
                      className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary/20"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Order summary mini */}
                <div className="mb-6 rounded-xl bg-surface-container-low p-4">
                  <p className="mb-2 text-xs font-medium text-on-surface/50">
                    Order for {formData?.name}
                  </p>
                  <div className="space-y-1.5">
                    {items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between text-xs text-on-surface/70"
                      >
                        <span>
                          {item.name} x{item.quantity}
                        </span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info Note — highlighted, token mandatory */}
                <div className="mb-6 rounded-2xl border-2 border-primary/40 bg-primary/10 p-4 shadow-[0_0_24px_rgba(230,196,67,0.15)]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-[var(--font-heading)] text-sm font-bold text-primary">
                        Order confirm hone ke baad — counter se Pickup Token zaroor lijiye 🎟️
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-on-surface/70">
                        Payment yahin QR se kijiye <span className="text-on-surface/50">ya</span> counter pe aakar — jaise aap chaahein. Lekin <span className="font-semibold text-secondary">token lena zaroori hai</span> — wahi aapka order ka pyaara golden pass hai.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <p className="mb-4 rounded-lg bg-red-900/20 p-3 text-sm text-red-400">
                    {error}
                  </p>
                )}

                {/* Confirm Button */}
                <button
                  onClick={handleConfirmOrder}
                  disabled={loading}
                  className="btn-honeyed w-full rounded-full py-3.5 text-base font-semibold text-on-primary transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading
                    ? "Confirming..."
                    : `Confirm Order — ₹${totalPrice}`}
                </button>

                {/* Cash option */}
                <p className="mt-3 text-center text-xs text-on-surface/30">
                  Pay yahin ya counter pe — bas token lena mat bhuliye 🎟️
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ─── Checkout Form ───
  return (
    <div className="pt-16">
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="font-[var(--font-heading)] text-3xl font-bold sm:text-4xl">
            Checkout
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-5">
            {/* Form — Left */}
            <form onSubmit={handleProceedToPayment} className="lg:col-span-3">
              <div className="rounded-2xl bg-surface-container p-6">
                <h2 className="font-[var(--font-heading)] text-lg font-bold">
                  Your Details
                </h2>

                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-on-surface/70"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/30 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
                      placeholder="Aapka naam"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-on-surface/70"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/30 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="orderType"
                      className="mb-1.5 block text-sm font-medium text-on-surface/70"
                    >
                      Order Type *
                    </label>
                    <select
                      id="orderType"
                      name="orderType"
                      required
                      className="ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
                    >
                      <option value="pickup">Pickup from Store</option>
                      <option value="delivery">Delivery (Noida only)</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="mb-1.5 block text-sm font-medium text-on-surface/70"
                    >
                      Delivery Address (if delivery)
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows={2}
                      className="ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/30 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
                      placeholder="Full address with landmark"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="note"
                      className="mb-1.5 block text-sm font-medium text-on-surface/70"
                    >
                      Special Instructions
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      rows={2}
                      className="ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/30 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
                      placeholder="Extra cheese, no onion, etc."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-honeyed mt-6 w-full rounded-full py-3 text-base font-semibold text-on-primary transition-all hover:scale-[1.02]"
                >
                  Proceed to Payment — ₹{totalPrice}
                </button>
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
                    <span className="font-medium text-on-surface/70">
                      Total
                    </span>
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
