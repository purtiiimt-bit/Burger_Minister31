"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const orderData = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      orderType: formData.get("orderType") as string,
      note: formData.get("note") as string,
      items: items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
        subtotal: i.price * i.quantity,
      })),
      totalPrice,
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Order failed");

      clearCart();
      router.push("/thankyou");
    } catch {
      setError("Order submit nahi ho paya. Please try again ya call karein: +91 9643100501");
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
            <form onSubmit={handleSubmit} className="lg:col-span-3">
              <div className="rounded-2xl bg-surface-container p-6">
                <h2 className="font-[var(--font-heading)] text-lg font-bold">
                  Your Details
                </h2>

                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-on-surface/70">
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
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-on-surface/70">
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
                    <label htmlFor="orderType" className="mb-1.5 block text-sm font-medium text-on-surface/70">
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
                    <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-on-surface/70">
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
                    <label htmlFor="note" className="mb-1.5 block text-sm font-medium text-on-surface/70">
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

                {error && (
                  <p className="mt-4 rounded-lg bg-red-900/20 p-3 text-sm text-red-400">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-honeyed mt-6 w-full rounded-full py-3 text-base font-semibold text-on-primary transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? "Placing Order..." : `Place Order — ₹${totalPrice}`}
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
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-on-surface/50">x{item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-primary">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t border-outline-variant/10 pt-4">
                  <div className="flex items-center justify-between">
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
