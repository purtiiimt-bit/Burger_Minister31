"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type CartItem = {
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export const COUPONS: Record<string, { percent: number }> = {
  MINISTER05:  { percent: 5  },
  MINISTER10:  { percent: 10 },
  MINISTER38:  { percent: 10 }, // verbal alias for MINISTER10
  COUPLE30:    { percent: 30 }, // hidden — shared directly with couples
  INSTAGRAM50: { percent: 50 }, // hidden — Instagram promo code
};

// Free-fries threshold offer
export const FREE_FRIES_THRESHOLD = 299;
export const FREE_FRIES_ITEM = "Classic Salted Fries (Half), FREE";

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (name: string) => void;
  updateQuantity: (name: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  totalPrice: number;
  coupon: string | null;
  discount: number;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
  freeFriesEarned: boolean;       // earned by threshold
  freeFriesActive: boolean;       // actually applied (mutex with 10%)
  freeFriesShortfall: number;
};

// Coupons that are mutually exclusive with the Free Fries offer.
// Any active coupon blocks free fries — customer picks one benefit, not both.
const MUTEX_WITH_FREE_FRIES = new Set(["MINISTER05", "MINISTER10", "MINISTER38", "COUPLE30", "INSTAGRAM50"]);

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load cart + coupon from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("burger-minister-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
    const savedCoupon = localStorage.getItem("burger-minister-coupon");
    if (savedCoupon && COUPONS[savedCoupon]) setCoupon(savedCoupon);
    setLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("burger-minister-cart", JSON.stringify(items));
    }
  }, [items, loaded]);

  useEffect(() => {
    if (!loaded) return;
    if (coupon) localStorage.setItem("burger-minister-coupon", coupon);
    else localStorage.removeItem("burger-minister-coupon");
  }, [coupon, loaded]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (name: string) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  };

  const updateQuantity = (name: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(name);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.name === name ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const key = code.trim().toUpperCase();
    if (!key) return { ok: false, message: "Enter a coupon code" };
    if (!COUPONS[key]) return { ok: false, message: "Invalid coupon code" };
    setCoupon(key);
    return {
      ok: true,
      message: `${COUPONS[key].percent}% off applied!`,
    };
  };

  const removeCoupon = () => setCoupon(null);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = coupon
    ? Math.round((subtotal * COUPONS[coupon].percent) / 100)
    : 0;
  const totalPrice = Math.max(0, subtotal - discount);
  const freeFriesEarned = subtotal >= FREE_FRIES_THRESHOLD;
  const freeFriesActive =
    freeFriesEarned && !(coupon && MUTEX_WITH_FREE_FRIES.has(coupon));
  const freeFriesShortfall = Math.max(0, FREE_FRIES_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        totalPrice,
        coupon,
        discount,
        applyCoupon,
        removeCoupon,
        freeFriesEarned,
        freeFriesActive,
        freeFriesShortfall,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
