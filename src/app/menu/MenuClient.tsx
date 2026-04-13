"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

type MenuItem = {
  name: string;
  price: string;
  description: string;
  veg: boolean;
  tag?: string;
  image: string;
};

type MenuData = Record<string, MenuItem[]>;

// Parse "₹120 / ₹160" → takes the first price
function parsePrice(priceStr: string): number {
  const match = priceStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export default function MenuClient({ menuData }: { menuData: MenuData }) {
  const categories = ["All", ...Object.keys(menuData)];
  const [active, setActive] = useState("All");
  const { addItem, items } = useCart();
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const filteredCategories =
    active === "All"
      ? Object.entries(menuData)
      : Object.entries(menuData).filter(([cat]) => cat === active);

  const handleAdd = (item: MenuItem) => {
    addItem({
      name: item.name,
      price: parsePrice(item.price),
      image: item.image,
    });
    setAddedItem(item.name);
    setTimeout(() => setAddedItem(null), 1000);
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
          {filteredCategories.map(([category, items]) => (
            <div key={category} className="mb-16 last:mb-0">
              <h2 className="mb-8 font-[var(--font-heading)] text-2xl font-bold">
                {category}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => {
                  const qty = getItemQty(item.name);
                  const justAdded = addedItem === item.name;
                  return (
                    <div
                      key={item.name}
                      className="group relative overflow-hidden rounded-2xl bg-surface-container p-5 transition-all hover:bg-surface-container-high"
                    >
                      {/* Veg indicator + tag */}
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex h-4 w-4 items-center justify-center rounded-sm border border-secondary">
                            <span className="h-2 w-2 rounded-full bg-secondary" />
                          </span>
                          <span className="text-xs text-secondary">Pure Veg</span>
                        </div>
                        {item.tag && (
                          <span className="rounded-full bg-tertiary-container px-2.5 py-0.5 text-xs font-medium text-tertiary">
                            {item.tag}
                          </span>
                        )}
                      </div>

                      {/* Food Image */}
                      <div className="relative mb-4 h-36 overflow-hidden rounded-xl">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      <h3 className="font-[var(--font-heading)] text-lg font-bold">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-on-surface/50">
                        {item.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-[var(--font-heading)] text-xl font-bold text-primary">
                          {item.price}
                        </span>
                        <button
                          onClick={() => handleAdd(item)}
                          className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                            justAdded
                              ? "bg-secondary text-on-primary scale-105"
                              : "bg-surface-variant text-primary hover:bg-primary hover:text-on-primary"
                          }`}
                        >
                          {justAdded ? "Added!" : qty > 0 ? `Add More (${qty})` : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
