"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

type Variant = { label: string; price: number };
type MenuItem = {
  name: string;
  description: string;
  veg: boolean;
  tag?: string;
  price?: number;
  variants?: Variant[];
};

type MenuData = Record<string, MenuItem[]>;

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=60";

export default function MenuClient({
  menuData,
  categoryBanners,
}: {
  menuData: MenuData;
  categoryBanners: Record<string, string>;
}) {
  const categories = ["All", ...Object.keys(menuData)];
  const [active, setActive] = useState("All");
  const { addItem, updateQuantity, items } = useCart();

  const filteredCategories =
    active === "All"
      ? Object.entries(menuData)
      : Object.entries(menuData).filter(([cat]) => cat === active);

  const handleAdd = (displayName: string, price: number) => {
    addItem({ name: displayName, price, image: PLACEHOLDER_IMG });
  };

  const getItemQty = (name: string) => {
    const found = items.find((i) => i.name === name);
    return found ? found.quantity : 0;
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-surface-container-low py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-[var(--font-heading)] text-4xl font-bold sm:text-5xl">
            Our <span className="text-primary">Menu</span>
          </h1>
          <p className="mt-3 text-on-surface/60">
            Crafted with love, served with pride — 100% Vegetarian
          </p>

          {/* Filter Chips */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  active === cat
                    ? "bg-secondary-container text-white"
                    : "bg-surface-variant text-on-surface/60 hover:text-on-surface"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Sections */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredCategories.map(([category, catItems]) => (
            <div key={category} className="mb-16 last:mb-0">
              {/* Category Banner */}
              <div className="relative mb-8 overflow-hidden rounded-2xl">
                <div className="relative h-40 sm:h-48">
                  <Image
                    src={categoryBanners[category] || PLACEHOLDER_IMG}
                    alt={category}
                    fill
                    sizes="(min-width:1024px) 1024px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-surface/90 via-surface/70 to-transparent" />
                  <div className="absolute inset-0 flex items-center px-8">
                    <div>
                      <h2 className="font-[var(--font-heading)] text-3xl font-bold sm:text-4xl">
                        {category}
                      </h2>
                      <p className="mt-1 text-sm text-on-surface/60">
                        {catItems.length} items
                        {category === "Burgers" &&
                          " · Extra cheese add-on available at ₹20"}
                        {category === "Sandwiches" &&
                          " · Extra cheese add-on available at ₹20"}
                        {category === "Fries" &&
                          " · Cheese dip available at ₹30"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item Cards Grid */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {catItems.map((item) => {
                  return (
                    <div
                      key={item.name}
                      className="rounded-xl bg-surface-container p-4 transition-all hover:bg-surface-container-high"
                    >
                      {/* Header: name + tag */}
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-secondary">
                          <span className="h-2 w-2 rounded-full bg-secondary" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="truncate font-[var(--font-heading)] text-sm font-bold sm:text-base">
                              {item.name}
                            </h3>
                            {item.tag && (
                              <span className="shrink-0 rounded-full bg-tertiary-container px-2 py-0.5 text-[10px] font-semibold text-tertiary">
                                {item.tag}
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 line-clamp-1 text-xs text-on-surface/40">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Action row: variants OR single price */}
                      <div className="mt-3 flex items-center justify-end gap-2">
                        {item.variants ? (
                          item.variants.map((v) => {
                            const displayName = `${item.name} — ${v.label}`;
                            const qty = getItemQty(displayName);
                            return (
                              <button
                                key={v.label}
                                onClick={() => handleAdd(displayName, v.price)}
                                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                                  qty > 0
                                    ? "bg-primary text-on-primary"
                                    : "bg-surface-variant text-on-surface/80 hover:bg-primary hover:text-on-primary"
                                }`}
                              >
                                <span className="opacity-70">{v.label}</span>
                                <span>₹{v.price}</span>
                                {qty > 0 && (
                                  <span
                                    key={qty}
                                    className="qty-pop ml-0.5 rounded-full bg-on-primary/20 px-1.5 text-[10px]"
                                  >
                                    {qty}
                                  </span>
                                )}
                              </button>
                            );
                          })
                        ) : (
                          (() => {
                            const qty = getItemQty(item.name);
                            return (
                              <>
                                <span className="font-[var(--font-heading)] text-base font-bold text-primary">
                                  ₹{item.price}
                                </span>
                                {qty === 0 ? (
                                  <button
                                    onClick={() =>
                                      handleAdd(item.name, item.price!)
                                    }
                                    className="rounded-lg bg-surface-variant px-4 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-on-primary"
                                  >
                                    Add
                                  </button>
                                ) : (
                                  <div className="flex items-center gap-0 overflow-hidden rounded-lg bg-primary/10 ring-1 ring-primary/40">
                                    <button
                                      aria-label="Remove one"
                                      onClick={() =>
                                        updateQuantity(item.name, qty - 1)
                                      }
                                      className="flex h-7 w-7 items-center justify-center text-primary transition-colors hover:bg-primary/20"
                                    >
                                      −
                                    </button>
                                    <span
                                      key={qty}
                                      className="qty-pop w-6 text-center text-xs font-bold text-primary"
                                    >
                                      {qty}
                                    </span>
                                    <button
                                      aria-label="Add one"
                                      onClick={() =>
                                        handleAdd(item.name, item.price!)
                                      }
                                      className="flex h-7 w-7 items-center justify-center text-primary transition-colors hover:bg-primary/20"
                                    >
                                      +
                                    </button>
                                  </div>
                                )}
                              </>
                            );
                          })()
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extra cheese note */}
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-primary/5 p-4 text-center text-sm text-on-surface/50">
          + Extra Cheese Add-on available at ₹20 on Burgers & Sandwiches · Cheese Dip at ₹30 with Fries
        </div>
      </div>
    </div>
  );
}
