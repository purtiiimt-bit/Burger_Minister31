"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

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

          {/* Total */}
          <div className="mt-8 rounded-2xl bg-surface-container p-6">
            <div className="flex items-center justify-between">
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
