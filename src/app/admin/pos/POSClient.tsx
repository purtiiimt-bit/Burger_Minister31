"use client";

import { useEffect, useMemo, useState } from "react";
import { connectPrinter, isPrinterSupported, printOrder } from "@/lib/printer";
import { flattenMenu, type FlatItem } from "@/lib/menuData";
import type { Order } from "@/lib/orderTypes";

const AUTH_KEY = "bm-admin-auth";

type CartLine = { name: string; price: number; quantity: number };
type PaymentMode = "UPI" | "CASH";
type OrderMode = "DINE_IN" | "TAKE_AWAY" | "DELIVERY";
type Toast = { kind: "ok" | "err" | "info"; msg: string } | null;

const FAVORITES = [
  "Classic Burger",
  "Cheesy Burger",
  "Cheese Loaded Burger",
  "Peri Peri Fries",
  "BM Special Fries",
  "Classic Cold Coffee",
  "Steam Veg Momos (Half)",
  "Kurkure Veg Momos (Full)",
  "The Cheese Lover Combo",
];

const MOMOS = [
  { style: "Steam", veg: [40, 80], paneer: [50, 100] },
  { style: "Fried", veg: [45, 90], paneer: [55, 110] },
  { style: "Gravy", veg: [65, 130], paneer: [75, 150] },
  { style: "Malai", veg: [70, 140], paneer: [80, 160] },
  { style: "Kurkure", veg: [70, 140], paneer: [80, 160] },
  { style: "Peri Peri Kurkure", veg: [85, 160], paneer: [95, 180] },
  { style: "Pizza", veg: [null, 99], paneer: [null, 119] },
] as const;

function money(value: number) {
  return `Rs ${Math.max(0, Math.round(value))}`;
}

function momoName(style: string, filling: "Veg" | "Paneer", size: "Half" | "Full") {
  if (style === "Pizza") return `Pizza Momos (${filling})`;
  return `${style} ${filling} Momos (${size})`;
}

export default function POSClient() {
  const [authed, setAuthed] = useState<boolean | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(AUTH_KEY) === "1" ? true : null;
  });

  useEffect(() => {
    const optimistic = localStorage.getItem(AUTH_KEY) === "1";
    let alive = true;
    fetch("/api/admin/auth", { method: "GET", cache: "no-store" })
      .then((res) => {
        if (!alive) return;
        if (res.ok) {
          localStorage.setItem(AUTH_KEY, "1");
          setAuthed(true);
        } else {
          localStorage.removeItem(AUTH_KEY);
          setAuthed(false);
        }
      })
      .catch(() => {
        if (!alive) return;
        if (!optimistic) setAuthed(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  if (authed === null) return null;
  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;
  return <POSPanel onLogout={() => setAuthed(false)} />;
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Wrong password");
        return;
      }
      localStorage.setItem(AUTH_KEY, "1");
      onSuccess();
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f1ea] px-4 text-[#211f18]">
      <form onSubmit={submit} className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary font-[var(--font-heading)] text-xl font-black text-on-primary">
            B
          </div>
          <div>
            <div className="font-[var(--font-heading)] text-lg font-black">
              BURGER <span className="text-primary">MINISTER</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-black/45">POS Login</div>
          </div>
        </div>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="mt-6 w-full rounded-lg border border-black/15 bg-[#faf7f0] px-4 py-3 text-sm font-bold outline-none focus:border-primary"
        />
        {error && <p className="mt-2 text-xs font-semibold text-red-600">{error}</p>}
        <button
          disabled={busy}
          className="mt-5 w-full rounded-lg bg-[#1f5fbf] px-4 py-3 text-sm font-black text-white disabled:opacity-60"
        >
          {busy ? "Checking..." : "Open POS"}
        </button>
      </form>
    </main>
  );
}

function POSPanel({ onLogout }: { onLogout: () => void }) {
  const flat = useMemo(() => flattenMenu(), []);
  const categories = useMemo(() => Object.keys(flat), [flat]);
  const allItems = useMemo(
    () =>
      Object.entries(flat).flatMap(([category, items]) =>
        items.map((item) => ({ ...item, category }))
      ),
    [flat]
  );
  const favoriteItems = useMemo(
    () => FAVORITES.map((name) => allItems.find((item) => item.name === name)).filter(Boolean) as Array<FlatItem & { category: string }>,
    [allItems]
  );

  const [activeCategory, setActiveCategory] = useState("Burgers");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("UPI");
  const [orderMode, setOrderMode] = useState<OrderMode>("DINE_IN");
  const [freeFries, setFreeFries] = useState(false);
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [billOpen, setBillOpen] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [printerReady, setPrinterReady] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0) + (freeFries ? 1 : 0);
  const lastLine = cart[cart.length - 1];

  const visibleItems = query.trim()
    ? allItems.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase()))
    : (flat[activeCategory] || []).map((item) => ({ ...item, category: activeCategory }));

  function show(kind: "ok" | "err" | "info", msg: string) {
    setToast({ kind, msg });
  }

  function addItem(item: { name: string; price: number }) {
    setCart((prev) => {
      const found = prev.find((line) => line.name === item.name);
      if (found) {
        return prev.map((line) =>
          line.name === item.name ? { ...line, quantity: line.quantity + 1 } : line
        );
      }
      return [...prev, { name: item.name, price: item.price, quantity: 1 }];
    });
  }

  function setQty(name: string, quantity: number) {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((line) => line.name !== name)
        : prev.map((line) => (line.name === name ? { ...line, quantity } : line))
    );
  }

  function getQty(name: string) {
    return cart.find((line) => line.name === name)?.quantity || 0;
  }

  function resetBill() {
    setCart([]);
    setDiscountPercent(0);
    setPaymentMode("UPI");
    setFreeFries(false);
    setCustomerName("");
    setCustomerPhone("");
    setBillOpen(false);
  }

  async function logout() {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch {
      // ignore
    }
    localStorage.removeItem(AUTH_KEY);
    onLogout();
  }

  async function connect() {
    if (!isPrinterSupported()) {
      show("err", "Use Chrome on Android or desktop for Bluetooth print");
      return;
    }
    try {
      await connectPrinter();
      setPrinterReady(true);
      show("ok", "Printer ready");
    } catch (err) {
      setPrinterReady(false);
      show("err", err instanceof Error ? err.message : "Printer connection failed");
    }
  }

  async function placeOrder() {
    if (cart.length === 0 && !freeFries) {
      show("err", "Cart empty");
      return;
    }
    setPlacing(true);
    try {
      const res = await fetch("/api/admin/orders/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((line) => ({ name: line.name, quantity: line.quantity })),
          discountPercent,
          freeFries,
          paymentMode,
          customerName: customerName.trim() || undefined,
          customerPhone: customerPhone.trim() || undefined,
          orderType: orderMode,
        }),
      });
      const data = (await res.json()) as {
        success?: boolean;
        orderNumber?: string;
        message?: string;
      };
      if (!res.ok || !data.success || !data.orderNumber) {
        show("err", data.message || "Order failed");
        return;
      }

      const printItems = freeFries
        ? [...cart, { name: "Classic Salted Fries (Half), FREE", price: 0, quantity: 1 }]
        : cart;
      const order: Order = {
        orderNumber: data.orderNumber,
        timestamp: new Date().toISOString(),
        items: printItems,
        subtotal,
        discountPercent,
        discountAmount,
        total,
        paymentMode,
        customerName: customerName.trim() || undefined,
        customerPhone: customerPhone.trim() || undefined,
        orderType: orderMode,
        source: "COUNTER",
      };
      setLastOrder(order);

      if (printerReady) {
        try {
          await printOrder(order);
          show("ok", `${data.orderNumber} placed and printed`);
        } catch (err) {
          setPrinterReady(false);
          show("info", `${data.orderNumber} saved. Print failed`);
          console.error(err);
        }
      } else {
        show("info", `${data.orderNumber} saved. Printer not connected`);
      }
      resetBill();
    } catch {
      show("err", "Network error");
    } finally {
      setPlacing(false);
    }
  }

  async function reprintLast() {
    if (!lastOrder) return;
    try {
      await printOrder(lastOrder);
      setPrinterReady(true);
      show("ok", `Reprinted ${lastOrder.orderNumber}`);
    } catch (err) {
      setPrinterReady(false);
      show("err", err instanceof Error ? err.message : "Print failed");
    }
  }

  function repeatLast() {
    if (!lastOrder) return;
    setCart(lastOrder.items.filter((item) => item.price > 0).map((item) => ({ ...item })));
    setDiscountPercent(lastOrder.discountPercent);
    setPaymentMode(lastOrder.paymentMode);
    setCustomerName(lastOrder.customerName || "");
    setCustomerPhone(lastOrder.customerPhone || "");
    setFreeFries(lastOrder.items.some((item) => item.name.includes("FREE")));
    setBillOpen(true);
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] pb-[86px] text-[#211f18] md:grid md:h-screen md:grid-cols-[148px_minmax(0,1fr)_410px] md:grid-rows-[58px_54px_minmax(0,1fr)] md:overflow-hidden md:pb-0">
      <header className="sticky top-0 z-40 border-b border-black/15 bg-[#17140d] px-3 py-3 text-[#f7eed2] md:col-span-3 md:flex md:h-[58px] md:items-center md:gap-4 md:py-0">
        <div className="flex items-center gap-3 md:w-[214px] md:shrink-0">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary font-[var(--font-heading)] text-lg font-black text-on-primary">
            B
          </div>
          <div>
            <div className="font-[var(--font-heading)] text-base font-black leading-none">
              BURGER <span className="text-primary">MINISTER</span>
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f7eed2]/60">
              POS App
            </div>
          </div>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && visibleItems[0]?.price != null) {
              addItem({ name: visibleItems[0].name, price: visibleItems[0].price });
            }
          }}
          placeholder="Search item, e.g. peri, coffee, cheese"
          className="mt-3 h-10 w-full rounded-lg border border-primary/35 bg-[#0f0d08] px-3 text-sm font-bold text-[#f7eed2] outline-none placeholder:text-[#f7eed2]/40 focus:border-primary md:mt-0"
        />
        <div className="mt-3 grid grid-cols-3 gap-2 md:mt-0 md:flex md:shrink-0">
          <button
            onClick={connect}
            className={`rounded-lg px-3 py-2 text-xs font-black ${
              printerReady
                ? "bg-secondary/20 text-secondary"
                : "bg-white text-[#211f18]"
            }`}
          >
            {printerReady ? "Printer Ready" : "Connect"}
          </button>
          <button onClick={resetBill} className="rounded-lg bg-primary px-3 py-2 text-xs font-black text-on-primary">
            New Bill
          </button>
          <button onClick={logout} className="rounded-lg bg-white/10 px-3 py-2 text-xs font-black text-white">
            Logout
          </button>
        </div>
      </header>

      <nav className="sticky top-[132px] z-30 flex gap-2 overflow-x-auto border-b border-black/10 bg-white px-2 py-2 md:top-auto md:col-span-2 md:row-start-2 md:items-center">
        {[
          ["DINE_IN", "Dine In"],
          ["TAKE_AWAY", "Take Away"],
          ["DELIVERY", "Delivery"],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setOrderMode(value as OrderMode)}
            className={`h-9 shrink-0 rounded-lg border px-4 text-xs font-black ${
              orderMode === value
                ? "border-[#1f5fbf] bg-[#1f5fbf] text-white"
                : "border-black/15 bg-[#f8f5ee]"
            }`}
          >
            {label}
          </button>
        ))}
        <a href="/admin" className="ml-auto grid h-9 shrink-0 place-items-center rounded-lg border border-black/15 bg-[#f8f5ee] px-4 text-xs font-black">
          Full Admin
        </a>
      </nav>

      <aside className="sticky top-[184px] z-20 flex gap-2 overflow-x-auto border-b border-black/10 bg-[#e7e1d3] px-2 py-2 md:top-auto md:row-start-3 md:block md:overflow-auto md:border-b-0 md:border-r md:px-2 md:py-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setQuery("");
            }}
            className={`mb-0 shrink-0 rounded-lg px-4 py-3 text-sm font-black md:mb-2 md:w-full md:text-left ${
              activeCategory === category && !query
                ? "bg-[#1f5fbf] text-white"
                : "bg-white text-[#373225]"
            }`}
          >
            {category}
          </button>
        ))}
      </aside>

      <section className="p-3 md:row-start-3 md:overflow-auto">
        <div className="mb-3 flex items-end justify-between gap-3">
          <h1 className="font-[var(--font-heading)] text-2xl font-black">Favorites</h1>
          <div className="text-xs font-bold text-black/50">Keys 1-9 on desktop</div>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 xl:grid-cols-5">
          {favoriteItems.map((item, index) => (
            <ItemButton
              key={item.name}
              item={item}
              qty={getQty(item.name)}
              hot
              prefix={`${index + 1}. `}
              onAdd={addItem}
            />
          ))}
        </div>

        <div className="mb-3 mt-5 flex items-end justify-between gap-3">
          <h2 className="font-[var(--font-heading)] text-2xl font-black">
            {query ? "Search Results" : activeCategory}
          </h2>
          <div className="text-xs font-bold text-black/50">
            {!query && activeCategory === "Momos"
              ? "Choose Veg or Paneer, then Half or Full"
              : query
                ? `${visibleItems.length} matching items`
                : "Tap item to add"}
          </div>
        </div>

        {!query && activeCategory === "Momos" ? (
          <MomoMatrix onAdd={addItem} />
        ) : (
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 xl:grid-cols-5">
            {visibleItems.map((item) => (
              <ItemButton key={item.name} item={item} qty={getQty(item.name)} onAdd={addItem} />
            ))}
          </div>
        )}
      </section>

      <aside
        className={`fixed inset-x-0 bottom-0 z-50 bg-white shadow-[0_-16px_34px_rgba(0,0,0,0.2)] transition-all md:static md:row-span-2 md:row-start-2 md:grid md:h-auto md:grid-rows-[auto_minmax(0,1fr)_auto] md:border-l md:border-black/10 md:shadow-none ${
          billOpen ? "h-[min(470px,72vh)]" : "h-[74px]"
        }`}
      >
        <button
          onClick={() => setBillOpen((open) => !open)}
          className="grid h-[74px] w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 border-t border-black/10 px-3 text-left md:hidden"
        >
          <span className="min-w-0">
            <span className="block text-[11px] font-black uppercase tracking-wider text-black/45">
              {totalQty} {totalQty === 1 ? "item" : "items"}
            </span>
            <span className="block truncate font-[var(--font-heading)] text-lg font-black">
              {lastLine ? `${lastLine.quantity} x ${lastLine.name}` : "Bill hidden, tap Bill"}
            </span>
          </span>
          <span className="font-[var(--font-heading)] text-2xl font-black text-primary">{money(total)}</span>
          <span className="rounded-lg bg-[#1f5fbf] px-4 py-3 text-xs font-black text-white">
            {billOpen ? "Hide" : "Bill"}
          </span>
        </button>

        <div className={`${billOpen ? "block" : "hidden"} border-b border-black/10 p-3 md:block`}>
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-[var(--font-heading)] text-2xl font-black">Bill</h2>
            <div className="flex gap-2">
              <button onClick={() => setBillOpen(false)} className="rounded-lg border border-black/15 px-3 py-2 text-xs font-black md:hidden">
                Hide
              </button>
              <button onClick={resetBill} className="rounded-lg border border-red-500/25 bg-red-500/5 px-3 py-2 text-xs font-black text-red-700">
                Clear
              </button>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <input
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              inputMode="numeric"
              placeholder="Phone optional"
              className="min-w-0 rounded-lg border border-black/15 bg-[#faf7f0] px-3 py-2 text-xs font-bold outline-none focus:border-primary"
            />
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Name optional"
              className="min-w-0 rounded-lg border border-black/15 bg-[#faf7f0] px-3 py-2 text-xs font-bold outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className={`${billOpen ? "block" : "hidden"} min-h-[96px] overflow-y-auto p-3 md:block`}>
          {cart.length === 0 && !freeFries ? (
            <div className="grid min-h-24 place-items-center text-center text-sm font-bold text-black/35">
              Add items, bill stays here.
            </div>
          ) : (
            <div className="space-y-2">
              {cart.map((line) => (
                <div key={line.name} className="rounded-lg bg-[#faf7f0] p-3">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                    <div>
                      <div className="break-words text-sm font-black">
                        {line.quantity} x {line.name}
                      </div>
                      <div className="mt-1 text-xs font-bold text-black/50">{money(line.price)} each</div>
                    </div>
                    <div className="min-w-[76px] text-right font-[var(--font-heading)] text-sm font-black text-primary">
                      {money(line.price * line.quantity)}
                    </div>
                  </div>
                  <div className="mt-2 inline-flex overflow-hidden rounded-lg border border-black/15 bg-white">
                    <button onClick={() => setQty(line.name, line.quantity - 1)} className="h-8 w-10 text-lg font-black text-primary">
                      -
                    </button>
                    <span className="grid h-8 w-9 place-items-center text-sm font-black">{line.quantity}</span>
                    <button onClick={() => addItem(line)} className="h-8 w-10 text-lg font-black text-primary">
                      +
                    </button>
                  </div>
                </div>
              ))}
              {freeFries && (
                <div className="rounded-lg bg-secondary/10 p-3 text-sm font-black text-green-700">
                  1 x Classic Salted Fries (Half), FREE
                </div>
              )}
            </div>
          )}
        </div>

        <div className={`${billOpen ? "block" : "hidden"} border-t border-black/10 p-3 md:block`}>
          <div className="grid grid-cols-3 gap-2">
            {[0, 5, 10, 30].map((percent) => (
              <button
                key={percent}
                onClick={() => setDiscountPercent(percent)}
                className={`h-11 rounded-lg border text-xs font-black ${
                  discountPercent === percent
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-black/15 bg-[#f7f2e8] text-black/60"
                }`}
              >
                {percent === 0 ? "No Disc" : `${percent}%`}
              </button>
            ))}
            {(["UPI", "CASH"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setPaymentMode(mode)}
                className={`h-11 rounded-lg border text-xs font-black ${
                  paymentMode === mode
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-black/15 bg-[#f7f2e8] text-black/60"
                }`}
              >
                {mode === "CASH" ? "Cash" : "UPI"}
              </button>
            ))}
            <button
              onClick={() => setFreeFries((v) => !v)}
              className={`h-11 rounded-lg border text-xs font-black ${
                freeFries
                  ? "border-secondary bg-secondary/15 text-green-700"
                  : "border-black/15 bg-[#f7f2e8] text-black/60"
              }`}
            >
              Free Fries
            </button>
          </div>

          <div className="mt-3 rounded-lg bg-[#faf7f0] p-3">
            <Row label="Items" value={String(totalQty)} />
            <Row label="Subtotal" value={money(subtotal)} />
            {discountAmount > 0 && <Row label="Discount" value={`-${money(discountAmount)}`} />}
            <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-center border-t border-black/10 pt-2">
              <span className="text-sm font-black">Total</span>
              <span className="min-w-[126px] text-right font-[var(--font-heading)] text-3xl font-black text-primary">
                {money(total)}
              </span>
            </div>
          </div>

          <button
            disabled={placing}
            onClick={placeOrder}
            className="mt-3 h-14 w-full rounded-lg bg-[#1f5fbf] text-base font-black text-white disabled:opacity-60"
          >
            {placing ? "Placing..." : printerReady ? "PLACE + PRINT" : "PLACE ORDER"}
          </button>

          {lastOrder && (
            <div className="mt-3 rounded-lg border border-secondary/25 bg-secondary/10 p-2">
              <div className="flex items-center justify-between gap-2 text-xs font-black text-green-800">
                <span>{lastOrder.orderNumber} - {money(lastOrder.total)} - {lastOrder.paymentMode}</span>
                <span>{printerReady ? "Printer ready" : "No printer"}</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button onClick={reprintLast} className="rounded-lg bg-white px-3 py-2 text-xs font-black text-green-800">
                  Reprint
                </button>
                <button onClick={repeatLast} className="rounded-lg bg-white px-3 py-2 text-xs font-black text-green-800">
                  Repeat
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {toast && (
        <div
          className={`fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full px-4 py-2 text-sm font-black shadow-lg ${
            toast.kind === "err"
              ? "bg-red-600 text-white"
              : toast.kind === "ok"
                ? "bg-secondary text-on-primary"
                : "bg-primary text-on-primary"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </main>
  );
}

function ItemButton({
  item,
  qty,
  hot = false,
  prefix = "",
  onAdd,
}: {
  item: { name: string; price?: number };
  qty: number;
  hot?: boolean;
  prefix?: string;
  onAdd: (item: { name: string; price: number }) => void;
}) {
  if (item.price == null) return null;
  return (
    <button
      onClick={() => onAdd({ name: item.name, price: item.price! })}
      className={`min-h-[96px] rounded-lg border p-3 text-left transition active:scale-[0.98] ${
        hot
          ? "border-primary/70 bg-[#fff2b9]"
          : "border-[#ddd4c1] bg-white hover:border-primary/70 hover:bg-[#fff8df]"
      }`}
    >
      <div className="min-h-10 font-[var(--font-heading)] text-sm font-black leading-tight">
        {prefix}{item.name}
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="font-[var(--font-heading)] text-lg font-black text-primary">{money(item.price)}</span>
        {qty > 0 ? (
          <span className="grid min-w-7 place-items-center rounded-full bg-secondary/20 px-2 py-1 text-xs font-black text-green-700">
            {qty}
          </span>
        ) : (
          <span className="text-xs font-bold text-black/50">Tap</span>
        )}
      </div>
    </button>
  );
}

function MomoMatrix({ onAdd }: { onAdd: (item: { name: string; price: number }) => void }) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <MomoColumn filling="Veg" field="veg" onAdd={onAdd} />
      <MomoColumn filling="Paneer" field="paneer" onAdd={onAdd} />
    </div>
  );
}

function MomoColumn({
  filling,
  field,
  onAdd,
}: {
  filling: "Veg" | "Paneer";
  field: "veg" | "paneer";
  onAdd: (item: { name: string; price: number }) => void;
}) {
  const isVeg = filling === "Veg";
  return (
    <div className={`overflow-hidden rounded-xl border-2 bg-white ${isVeg ? "border-secondary/60" : "border-primary/80"}`}>
      <div className={`flex items-center justify-between px-3 py-3 font-[var(--font-heading)] text-base font-black ${isVeg ? "bg-secondary/15 text-green-700" : "bg-primary/20 text-[#6f5600]"}`}>
        <span>{filling.toUpperCase()} MOMOS</span>
        <span className="grid h-4 w-4 place-items-center rounded border-2 border-current">
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      </div>
      {MOMOS.map((row) => {
        const [half, full] = row[field];
        const halfName = momoName(row.style, filling, "Half");
        const fullName = momoName(row.style, filling, "Full");
        return (
          <div key={row.style} className="grid grid-cols-[minmax(0,1fr)_74px_74px] items-center gap-2 border-t border-black/10 px-3 py-2">
            <div className="text-sm font-black leading-tight">{row.style}</div>
            {half == null ? (
              <button disabled className="min-h-12 rounded-lg border border-black/10 bg-[#faf7f0] text-[11px] font-black text-black/25">
                Half
                <span className="block text-[10px]">N/A</span>
              </button>
            ) : (
              <button
                onClick={() => onAdd({ name: halfName, price: half })}
                className="min-h-12 rounded-lg border border-black/15 bg-[#faf7f0] text-[11px] font-black hover:border-primary"
              >
                Half
                <span className="block text-[10px] text-black/55">{money(half)}</span>
              </button>
            )}
            <button
              onClick={() => onAdd({ name: fullName, price: full })}
              className="min-h-12 rounded-lg border border-black/15 bg-[#faf7f0] text-[11px] font-black hover:border-primary"
            >
              Full
              <span className="block text-[10px] text-black/55">{money(full)}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-xs font-bold text-black/60">
      <span>{label}</span>
      <strong className="min-w-[74px] text-right text-black/70">{value}</strong>
    </div>
  );
}
