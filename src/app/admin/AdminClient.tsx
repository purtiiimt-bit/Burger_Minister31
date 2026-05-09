"use client";

import { useEffect, useMemo, useState } from "react";
import { flattenMenu, type FlatItem } from "@/lib/menuData";
import { isPrinterSupported, printOrder } from "@/lib/printer";
import type { Order, OrderItem } from "@/lib/orderTypes";

const AUTH_KEY = "bm-admin-auth";

type Tab = "search" | "new";
type Toast = { kind: "ok" | "err" | "info"; msg: string } | null;

export default function AdminClient() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(localStorage.getItem(AUTH_KEY) === "1");
  }, []);

  if (authed === null) return null; // hydration guard
  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;
  return <Panel onLogout={() => setAuthed(false)} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Login screen
// ─────────────────────────────────────────────────────────────────────────────
function Login({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) {
        localStorage.setItem(AUTH_KEY, "1");
        onSuccess();
      } else {
        setErr("Wrong password");
      }
    } catch {
      setErr("Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl bg-surface-container p-6"
      >
        <div className="text-center">
          <div className="font-[var(--font-heading)] text-xl font-bold tracking-tight">
            BURGER <span className="text-primary">MINISTER</span>
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.18em] text-on-surface/50">
            Admin Panel
          </div>
        </div>

        <label className="mt-6 block text-sm font-medium text-on-surface/70">
          Password
        </label>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoFocus
          className="mt-1.5 w-full rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-on-surface focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
        />
        {err && <p className="mt-2 text-xs text-red-400">{err}</p>}

        <button
          type="submit"
          disabled={busy}
          className="btn-honeyed mt-5 w-full rounded-full py-3 text-sm font-semibold text-on-primary disabled:opacity-50"
        >
          {busy ? "Checking…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main panel
// ─────────────────────────────────────────────────────────────────────────────
type Stats = { todayCount: number; lifetimeTotal: number } | null;

function Panel({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("search");
  const [toast, setToast] = useState<Toast>(null);
  const [stats, setStats] = useState<Stats>(null);
  const [statsTick, setStatsTick] = useState(0);

  // Fetch stats on mount + every 30s + after every successful order
  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch("/api/admin/stats", { cache: "no-store" });
        const data = await res.json();
        if (alive && data?.success && data.stats) {
          setStats({
            todayCount: data.stats.todayCount || 0,
            lifetimeTotal: data.stats.lifetimeTotal || 0,
          });
        }
      } catch {
        // ignore
      }
    }
    load();
    const id = setInterval(load, 30000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [statsTick]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    onLogout();
  }

  const refreshStats = () => setStatsTick((x) => x + 1);

  return (
    <div className="min-h-screen pb-24">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-outline-variant/10 bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div>
            <div className="font-[var(--font-heading)] text-sm font-bold tracking-tight">
              BURGER <span className="text-primary">MINISTER</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-on-surface/50">
              Admin Panel
            </div>
          </div>
          <button
            onClick={logout}
            className="text-xs font-medium text-on-surface/60 hover:text-primary"
          >
            Logout
          </button>
        </div>

        {/* Stats strip */}
        <div className="mx-auto flex max-w-3xl items-center justify-around gap-2 border-t border-outline-variant/10 px-4 py-2.5">
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-on-surface/50">
              Today
            </div>
            <div className="font-[var(--font-heading)] text-xl font-bold text-primary">
              {stats?.todayCount ?? "—"}
            </div>
          </div>
          <div className="h-8 w-px bg-outline-variant/15" />
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-on-surface/50">
              Lifetime
            </div>
            <div className="font-[var(--font-heading)] text-xl font-bold text-secondary">
              {stats?.lifetimeTotal != null
                ? stats.lifetimeTotal.toLocaleString("en-IN")
                : "—"}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <nav className="mx-auto flex max-w-3xl gap-2 px-4 pb-3">
          <TabBtn active={tab === "search"} onClick={() => setTab("search")}>
            🔍 Search Order
          </TabBtn>
          <TabBtn active={tab === "new"} onClick={() => setTab("new")}>
            ➕ New Order
          </TabBtn>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        {tab === "search" ? (
          <SearchTab onToast={setToast} />
        ) : (
          <NewOrderTab onToast={setToast} onPlaced={refreshStats} />
        )}
      </main>

      {toast && (
        <div
          className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full px-4 py-2 text-sm font-semibold shadow-lg ${
            toast.kind === "ok"
              ? "bg-secondary text-on-primary"
              : toast.kind === "err"
                ? "bg-red-500 text-white"
                : "bg-primary text-on-primary"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all ${
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-outline-variant/15 bg-surface-container text-on-surface/60 hover:text-on-surface"
      }`}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab A: Search Order
// ─────────────────────────────────────────────────────────────────────────────
function SearchTab({ onToast }: { onToast: (t: Toast) => void }) {
  const [num, setNum] = useState("");
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [printing, setPrinting] = useState(false);

  async function fetchOrder(e?: React.FormEvent) {
    e?.preventDefault();
    if (!num.trim()) return;
    setBusy(true);
    setOrder(null);
    try {
      const res = await fetch(`/api/admin/orders/${encodeURIComponent(num.trim())}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        onToast({ kind: "err", msg: data.message || "Order not found" });
      }
    } catch {
      onToast({ kind: "err", msg: "Network error" });
    } finally {
      setBusy(false);
    }
  }

  async function doPrint() {
    if (!order) return;
    setPrinting(true);
    try {
      await printOrder(order);
      onToast({ kind: "ok", msg: "Sent to printer" });
    } catch (err) {
      onToast({
        kind: "err",
        msg: err instanceof Error ? err.message : "Print failed",
      });
    } finally {
      setPrinting(false);
    }
  }

  return (
    <div>
      <h2 className="font-[var(--font-heading)] text-2xl font-bold">
        Find <span className="text-primary">Order</span>
      </h2>

      <form onSubmit={fetchOrder} className="mt-5 flex gap-2">
        <input
          inputMode="numeric"
          autoFocus
          value={num}
          onChange={(e) => setNum(e.target.value.replace(/\D/g, ""))}
          placeholder="045"
          className="flex-1 rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-lg font-bold tracking-wider text-on-surface focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
        />
        <button
          type="submit"
          disabled={busy}
          className="btn-honeyed rounded-xl px-5 text-sm font-semibold text-on-primary disabled:opacity-50"
        >
          {busy ? "…" : "Fetch"}
        </button>
      </form>

      {order && (
        <div className="mt-5 rounded-2xl bg-surface-container p-5">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="font-[var(--font-heading)] text-3xl font-bold text-primary">
                {order.orderNumber}
              </div>
              <div className="mt-0.5 text-xs text-on-surface/50">
                {new Date(order.timestamp).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </div>
            </div>
            <div className="flex gap-2">
              <Badge>{order.source}</Badge>
              <Badge tone="primary">{order.paymentMode}</Badge>
            </div>
          </div>

          <div className="mt-4 space-y-1 border-t border-outline-variant/10 pt-4">
            {order.items.map((i: OrderItem) => (
              <div
                key={i.name}
                className="flex justify-between text-sm text-on-surface/80"
              >
                <span>
                  {i.quantity}× {i.name}
                </span>
                <span>₹{i.price * i.quantity}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-1 border-t border-outline-variant/10 pt-4 text-sm">
            <Row label="Subtotal" value={`₹${order.subtotal}`} />
            {order.discountAmount > 0 && (
              <Row
                label={`Discount (${order.discountPercent}%)`}
                value={`-₹${order.discountAmount}`}
                tone="secondary"
              />
            )}
            <div className="mt-2 flex items-center justify-between border-t border-outline-variant/10 pt-3">
              <span className="font-semibold">Total</span>
              <span className="font-[var(--font-heading)] text-2xl font-bold text-primary">
                ₹{order.total}
              </span>
            </div>
          </div>

          {(order.customerName || order.customerPhone) && (
            <div className="mt-3 space-y-0.5 text-xs text-on-surface/50">
              {order.customerName && <div>Name: {order.customerName}</div>}
              {order.customerPhone && <div>Phone: {order.customerPhone}</div>}
            </div>
          )}

          <button
            onClick={doPrint}
            disabled={printing}
            className="btn-honeyed mt-5 w-full rounded-full py-3 text-sm font-semibold text-on-primary disabled:opacity-50"
          >
            {printing ? "Printing…" : "🖨️  Print Kitchen Ticket"}
          </button>
          {!isPrinterSupported() && (
            <p className="mt-2 text-center text-[11px] text-on-surface/40">
              Bluetooth print works on Chrome (Android/desktop). Not on iOS Safari.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function Badge({
  tone = "default",
  children,
}: {
  tone?: "default" | "primary";
  children: React.ReactNode;
}) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
        tone === "primary"
          ? "bg-primary/15 text-primary"
          : "bg-surface-variant text-on-surface/60"
      }`}
    >
      {children}
    </span>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "secondary";
}) {
  return (
    <div
      className={`flex justify-between ${
        tone === "secondary" ? "text-secondary" : "text-on-surface/70"
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab B: New Order
// ─────────────────────────────────────────────────────────────────────────────
type CartLine = { name: string; price: number; quantity: number };

function NewOrderTab({
  onToast,
  onPlaced,
}: {
  onToast: (t: Toast) => void;
  onPlaced?: () => void;
}) {
  const flat = useMemo(() => flattenMenu(), []);
  const categories = useMemo(() => Object.keys(flat), [flat]);
  const [activeCat, setActiveCat] = useState(categories[0]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [discount, setDiscount] = useState(false);
  const [freeFries, setFreeFries] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMode, setPaymentMode] = useState<"UPI" | "CASH">("UPI");
  const [expanded, setExpanded] = useState(false);
  const [busy, setBusy] = useState(false);

  const subtotal = cart.reduce((s, c) => s + c.price * c.quantity, 0);
  const discountPercent = discount ? 10 : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal - discountAmount;
  const totalQty = cart.reduce((s, c) => s + c.quantity, 0);

  function addItem(item: FlatItem) {
    setCart((prev) => {
      const existing = prev.find((c) => c.name === item.name);
      if (existing) {
        return prev.map((c) =>
          c.name === item.name ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { name: item.name, price: item.price, quantity: 1 }];
    });
  }

  function setQty(name: string, qty: number) {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((c) => c.name !== name);
      return prev.map((c) => (c.name === name ? { ...c, quantity: qty } : c));
    });
  }

  function getQty(name: string) {
    return cart.find((c) => c.name === name)?.quantity || 0;
  }

  async function placeOrder() {
    if (cart.length === 0) {
      onToast({ kind: "err", msg: "Cart empty" });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/orders/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          subtotal,
          discountPercent,
          discountAmount,
          total,
          paymentMode,
          freeFries,
          customerName: name || undefined,
          customerPhone: phone || undefined,
        }),
      });
      const data = await res.json();
      if (!data?.success || !data.orderNumber) {
        onToast({ kind: "err", msg: data?.message || "Failed" });
        setBusy(false);
        return;
      }

      // Append free fries as ₹0 line so kitchen sees it on the printed ticket
      const printItems = freeFries
        ? [...cart, { name: "Classic Salted Fries (Half) — FREE", price: 0, quantity: 1 }]
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
        customerName: name || undefined,
        customerPhone: phone || undefined,
        source: "COUNTER",
      };

      // Try to print
      try {
        await printOrder(order);
        onToast({ kind: "ok", msg: `Order ${data.orderNumber} placed & printed` });
      } catch (err) {
        onToast({
          kind: "info",
          msg: `Order ${data.orderNumber} saved. Print failed: ${
            err instanceof Error ? err.message : "?"
          }`,
        });
      }

      // Reset
      setCart([]);
      setDiscount(false);
      setFreeFries(false);
      setName("");
      setPhone("");
      setPaymentMode("UPI");
      setExpanded(false);
      onPlaced?.();
    } catch {
      onToast({ kind: "err", msg: "Network error" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {/* Category strip */}
      <div className="-mx-4 overflow-x-auto px-4">
        <div className="flex gap-2 pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
                activeCat === c
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface/70"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Item grid */}
      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {flat[activeCat]?.map((item) => {
          const qty = getQty(item.name);
          return (
            <div
              key={item.name}
              className="flex items-center justify-between gap-3 rounded-xl bg-surface-container p-3"
            >
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{item.name}</div>
                <div className="text-xs text-primary">₹{item.price}</div>
              </div>
              {qty === 0 ? (
                <button
                  onClick={() => addItem(item)}
                  className="rounded-lg bg-primary/15 px-3 py-1.5 text-xs font-bold text-primary"
                >
                  + Add
                </button>
              ) : (
                <div className="flex items-center overflow-hidden rounded-lg bg-primary/15 ring-1 ring-primary/40">
                  <button
                    onClick={() => setQty(item.name, qty - 1)}
                    className="flex h-8 w-8 items-center justify-center text-primary"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-primary">
                    {qty}
                  </span>
                  <button
                    onClick={() => addItem(item)}
                    className="flex h-8 w-8 items-center justify-center text-primary"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Cart panel */}
      {totalQty > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-outline-variant/15 bg-surface/95 backdrop-blur">
          <div className="mx-auto max-w-3xl px-4 py-3">
            <button
              onClick={() => setExpanded((x) => !x)}
              className="flex w-full items-center justify-between"
            >
              <div className="text-left">
                <div className="text-xs uppercase tracking-wider text-on-surface/50">
                  {totalQty} item{totalQty > 1 ? "s" : ""} · {expanded ? "Hide" : "View Cart"}
                </div>
                <div className="font-[var(--font-heading)] text-2xl font-bold text-primary">
                  ₹{total}
                </div>
              </div>
              <svg
                className={`h-5 w-5 text-on-surface/60 transition-transform ${
                  expanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>

            {expanded && (
              <div className="mt-3 space-y-3">
                <div className="max-h-48 space-y-1 overflow-y-auto rounded-xl bg-surface-container-low p-3">
                  {cart.map((c) => (
                    <div key={c.name} className="flex items-center justify-between text-sm">
                      <span className="truncate">
                        {c.quantity}× {c.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-primary">₹{c.price * c.quantity}</span>
                        <button
                          onClick={() => setQty(c.name, 0)}
                          className="text-xs text-on-surface/40 hover:text-red-400"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 rounded-xl bg-surface-container-low p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">10% Discount</span>
                    <button
                      onClick={() => setDiscount((d) => !d)}
                      className={`relative h-6 w-11 rounded-full transition ${
                        discount ? "bg-secondary" : "bg-surface-variant"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                          discount ? "left-5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">🍟 Free Fries</span>
                    <button
                      onClick={() => setFreeFries((f) => !f)}
                      className={`relative h-6 w-11 rounded-full transition ${
                        freeFries ? "bg-secondary" : "bg-surface-variant"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                          freeFries ? "left-5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-[10px] text-on-surface/40">
                    Admin can apply both — customer side they&apos;re mutually exclusive.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Customer name (optional)"
                    className="rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-2.5 text-sm focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                  <input
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="Phone (optional)"
                    className="rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-2.5 text-sm focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {(["UPI", "CASH"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setPaymentMode(m)}
                      className={`rounded-xl py-2.5 text-sm font-bold ${
                        paymentMode === m
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container text-on-surface/70"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <div className="space-y-1 text-sm">
                  <Row label="Subtotal" value={`₹${subtotal}`} />
                  {discountAmount > 0 && (
                    <Row
                      label="Discount (10%)"
                      value={`-₹${discountAmount}`}
                      tone="secondary"
                    />
                  )}
                  <div className="flex items-center justify-between border-t border-outline-variant/10 pt-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-[var(--font-heading)] text-xl font-bold text-primary">
                      ₹{total}
                    </span>
                  </div>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={busy}
                  className="btn-honeyed w-full rounded-full py-3.5 text-sm font-bold text-on-primary disabled:opacity-50"
                >
                  {busy ? "Placing…" : "Place Order & Print"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
