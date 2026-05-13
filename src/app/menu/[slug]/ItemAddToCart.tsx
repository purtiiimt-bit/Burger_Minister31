"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type Variant = { label: string; price: number };

// Client-side Add to Cart for the item detail page.
// Uses the existing CartContext so the entire order flow stays identical.
// If variants are provided, renders one stepper per variant (e.g. Half / Full).
export default function ItemAddToCart({
  name,
  price,
  image,
  variants,
}: {
  name: string;
  price: number;
  image: string;
  variants?: Variant[];
}) {
  if (variants && variants.length > 0) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {variants.map((v) => (
          <VariantPicker
            key={v.label}
            displayName={`${name} (${v.label})`}
            price={v.price}
            image={image}
            label={v.label}
          />
        ))}
      </div>
    );
  }

  return <SingleAdd name={name} price={price} image={image} />;
}

function SingleAdd({
  name,
  price,
  image,
}: {
  name: string;
  price: number;
  image: string;
}) {
  const { addItem, updateQuantity, items } = useCart();
  const [pulse, setPulse] = useState(false);
  const qty = items.find((i) => i.name === name)?.quantity ?? 0;

  function bump() {
    addItem({ name, price, image });
    setPulse(true);
    setTimeout(() => setPulse(false), 350);
  }

  if (qty === 0) {
    return (
      <button
        onClick={bump}
        className="btn-honeyed inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-on-primary transition-all hover:scale-105"
      >
        Add to Cart
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    );
  }

  return (
    <div className="inline-flex items-center overflow-hidden rounded-full bg-primary/15 ring-2 ring-primary/40">
      <button
        aria-label="Remove one"
        onClick={() => updateQuantity(name, qty - 1)}
        className="flex h-11 w-11 items-center justify-center text-lg font-bold text-primary transition-colors hover:bg-primary/20"
      >
        −
      </button>
      <span
        key={qty}
        className={`w-10 text-center text-base font-bold text-primary ${
          pulse ? "qty-pop" : ""
        }`}
      >
        {qty}
      </span>
      <button
        aria-label="Add one"
        onClick={bump}
        className="flex h-11 w-11 items-center justify-center text-lg font-bold text-primary transition-colors hover:bg-primary/20"
      >
        +
      </button>
    </div>
  );
}

function VariantPicker({
  displayName,
  price,
  image,
  label,
}: {
  displayName: string;
  price: number;
  image: string;
  label: string;
}) {
  const { addItem, updateQuantity, items } = useCart();
  const [pulse, setPulse] = useState(false);
  const qty = items.find((i) => i.name === displayName)?.quantity ?? 0;

  function bump() {
    addItem({ name: displayName, price, image });
    setPulse(true);
    setTimeout(() => setPulse(false), 350);
  }

  if (qty === 0) {
    return (
      <button
        onClick={bump}
        className="btn-honeyed inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-on-primary transition-all hover:scale-105"
      >
        <span className="opacity-80">{label}</span>
        <span>₹{price}</span>
      </button>
    );
  }

  return (
    <div className="inline-flex items-center overflow-hidden rounded-full bg-primary/15 ring-2 ring-primary/40">
      <span className="px-3 text-xs font-bold text-primary/70">
        {label} ₹{price}
      </span>
      <button
        aria-label={`Remove one ${label}`}
        onClick={() => updateQuantity(displayName, qty - 1)}
        className="flex h-11 w-9 items-center justify-center text-base font-bold text-primary transition-colors hover:bg-primary/20"
      >
        −
      </button>
      <span
        key={qty}
        className={`w-7 text-center text-sm font-bold text-primary ${
          pulse ? "qty-pop" : ""
        }`}
      >
        {qty}
      </span>
      <button
        aria-label={`Add one ${label}`}
        onClick={bump}
        className="flex h-11 w-9 items-center justify-center text-base font-bold text-primary transition-colors hover:bg-primary/20"
      >
        +
      </button>
    </div>
  );
}
