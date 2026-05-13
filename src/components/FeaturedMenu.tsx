"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { images } from "@/lib/images";

const featuredItems = [
  {
    name: "Cheese Loaded Burger",
    price: 139,
    description: "Extra cheese overload for the real cheese lovers.",
    tag: "Bestseller",
    image: images.cheeseBurger,
  },
  {
    name: "Double Cheesy Patty Burger",
    price: 199,
    description: "Two patties, double cheese, double the crunch.",
    tag: "Premium",
    image: images.ministerSpecial,
  },
  {
    name: "Peri Peri Paneer Burger",
    price: 149,
    description: "Fiery peri peri paneer with melted cheese.",
    tag: "Spicy",
    image: images.paneerTikka,
  },
];

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=60";

export default function FeaturedMenu({ hideHeader = false }: { hideHeader?: boolean }) {
  const { addItem, updateQuantity, items } = useCart();

  const handleAdd = (item: (typeof featuredItems)[0]) => {
    addItem({ name: item.name, price: item.price, image: PLACEHOLDER_IMG });
  };

  const getQty = (name: string) =>
    items.find((i) => i.name === name)?.quantity || 0;

  const Wrapper = hideHeader ? "div" : "section";
  return (
    <Wrapper className={hideHeader ? "" : "bg-surface-container-low py-20"}>
      <div className={hideHeader ? "" : "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}>
        {!hideHeader && (
          <div className="text-center">
            <h2 className="font-[var(--font-heading)] text-3xl font-bold sm:text-4xl">
              Our <span className="text-primary">Signature</span> Burgers
            </h2>
            <p className="mt-3 text-on-surface/60">
              Handcrafted with premium ingredients, every single day.
            </p>
          </div>
        )}

        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${hideHeader ? "" : "mt-12"}`}>
          {featuredItems.map((item, i) => {
            const qty = getQty(item.name);
            return (
              <div
                key={item.name}
                className={`ambient-shadow group relative overflow-hidden rounded-2xl bg-surface-container p-6 transition-all hover:bg-surface-container-high ${
                  i === 1 ? "sm:-translate-y-4" : ""
                }`}
              >
                <div className="relative mb-4 h-48 overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-tertiary-container px-3 py-1 text-xs font-semibold text-tertiary">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-[var(--font-heading)] text-xl font-bold">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-on-surface/50">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-[var(--font-heading)] text-2xl font-bold text-primary">
                    ₹{item.price}
                  </span>
                  {qty === 0 ? (
                    <button
                      onClick={() => handleAdd(item)}
                      className="rounded-xl bg-surface-variant px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-on-primary"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center overflow-hidden rounded-xl bg-primary/10 ring-1 ring-primary/40">
                      <button
                        aria-label="Remove one"
                        onClick={() => updateQuantity(item.name, qty - 1)}
                        className="flex h-9 w-9 items-center justify-center text-base text-primary transition-colors hover:bg-primary/20"
                      >
                        −
                      </button>
                      <span
                        key={qty}
                        className="qty-pop w-7 text-center text-sm font-bold text-primary"
                      >
                        {qty}
                      </span>
                      <button
                        aria-label="Add one"
                        onClick={() => handleAdd(item)}
                        className="flex h-9 w-9 items-center justify-center text-base text-primary transition-colors hover:bg-primary/20"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className={`text-center ${hideHeader ? "mt-8" : "mt-10"}`}>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            View Full Menu
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}
