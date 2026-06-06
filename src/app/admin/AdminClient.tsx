"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { flattenMenu, type FlatItem } from "@/lib/menuData";
import { isPrinterSupported, printOrder } from "@/lib/printer";
import type { Order, OrderItem, OrderListItem } from "@/lib/orderTypes";
import { COUPONS } from "@/context/CartContext";
import BooksTab from "./BooksTab";

const AUTH_KEY = "bm-admin-auth";

type Tab = "search" | "new" | "books";
type Toast = { kind: "ok" | "err" | "info"; msg: string } | null;

export default function AdminClient() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    // Source of truth is the HTTP-only cookie set by /api/admin/auth POST.
    // localStorage flag is just a UX hint to skip the login flash if we
    // were already signed in. We still confirm with the server.
    const optimistic = localStorage.getItem(AUTH_KEY) === "1";
    if (optimistic) setAuthed(true);
    let alive = true;
    fetch("/api/admin/auth", { method: "GET", cache: "no-store" })
      .then((r) => {
        if (!alive) return;
        if (r.ok) {
          setAuthed(true);
          localStorage.setItem(AUTH_KEY, "1");
        } else {
          setAuthed(false);
          localStorage.removeItem(AUTH_KEY);
        }
      })
      .catch(() => {
        if (!alive) return;
        // Network blip: trust the optimistic flag if we had one.
        if (!optimistic) setAuthed(false);
      });
    return () => {
      alive = false;
    };
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
type Stats = { todayCount: number; lifetimeTotal: number; newCustomersToday: number } | null;

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
            newCustomersToday: data.stats.newCustomersToday || 0,
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

  async function logout() {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch {
      // Even if the network fails, clear local state.
    }
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
              {stats?.todayCount ?? "..."}
            </div>
          </div>
          <div className="h-8 w-px bg-outline-variant/15" />
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-on-surface/50">
              New Customers
            </div>
            <div className="font-[var(--font-heading)] text-xl font-bold text-[var(--tertiary,#b5ccff)]">
              {stats?.newCustomersToday ?? "..."}
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
                : "..."}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <nav className="mx-auto flex max-w-3xl gap-2 px-4 pb-3">
          <TabBtn active={tab === "search"} onClick={() => setTab("search")}>
            🔍 Search
          </TabBtn>
          <TabBtn active={tab === "new"} onClick={() => setTab("new")}>
            ➕ New Order
          </TabBtn>
          <TabBtn active={tab === "books"} onClick={() => setTab("books")}>
            💰 Books
          </TabBtn>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        {tab === "search" && <SearchTab onToast={setToast} />}
        {tab === "new" && <NewOrderTab onToast={setToast} onPlaced={refreshStats} />}
        {tab === "books" && <BooksTab onToast={setToast} />}
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
// Tab A: Search Order, with today's list + edit
// ─────────────────────────────────────────────────────────────────────────────
function SearchTab({ onToast }: { onToast: (t: Toast) => void }) {
  const [num, setNum] = useState("");
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [printing, setPrinting] = useState(false);
  const [listItems, setListItems] = useState<OrderListItem[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listTick, setListTick] = useState(0);
  const [editing, setEditing] = useState(false);
  // Phone history mode
  const [phoneHistory, setPhoneHistory] = useState<OrderListItem[] | null>(null);
  const [phoneHistoryFor, setPhoneHistoryFor] = useState<string>("");

  // Edit form state
  const [edName, setEdName] = useState("");
  const [edPhone, setEdPhone] = useState("");
  const [edPayment, setEdPayment] = useState<"UPI" | "CASH">("UPI");
  const [edNote, setEdNote] = useState("");
  const [edBusy, setEdBusy] = useState(false);

  // Edit-items state (mutable copy of existing order items — supports qty reduce/remove)
  const [edItems, setEdItems] = useState<CartLine[]>([]);
  // Add-items state (new items from menu picker)
  const addFlat = useMemo(() => flattenMenu(), []);
  const addCategories = useMemo(() => Object.keys(addFlat), [addFlat]);
  const [addActiveCat, setAddActiveCat] = useState(addCategories[0] ?? "");
  const [addCart, setAddCart] = useState<CartLine[]>([]);
  const [showAddPicker, setShowAddPicker] = useState(false);
  // Cancel-order confirmation state
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [cancelBusy, setCancelBusy] = useState(false);

  const addSubtotal = addCart.reduce((s, c) => s + c.price * c.quantity, 0);
  const edSubtotal  = edItems.reduce((s, c) => s + c.price * c.quantity, 0);
  const finalNewSubtotal = edSubtotal + addSubtotal;
  const finalNewDiscountAmt = Math.round(finalNewSubtotal * ((order?.discountPercent ?? 0) / 100));
  const finalNewTotal = Math.max(0, finalNewSubtotal - finalNewDiscountAmt);

  function setEdItemQty(name: string, qty: number) {
    setEdItems((prev) =>
      qty <= 0 ? prev.filter((c) => c.name !== name) : prev.map((c) => c.name === name ? { ...c, quantity: qty } : c)
    );
  }

  function addItemToCart(item: FlatItem) {
    setAddCart((prev) => {
      const ex = prev.find((c) => c.name === item.name);
      if (ex) return prev.map((c) => c.name === item.name ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { name: item.name, price: item.price, quantity: 1 }];
    });
  }
  function setAddQty(name: string, qty: number) {
    setAddCart((prev) => qty <= 0 ? prev.filter((c) => c.name !== name) : prev.map((c) => c.name === name ? { ...c, quantity: qty } : c));
  }
  function getAddQty(name: string) {
    return addCart.find((c) => c.name === name)?.quantity ?? 0;
  }

  const loadList = useCallback(async () => {
    setListLoading(true);
    try {
      const res = await fetch("/api/admin/orders/list?date=today", {
        cache: "no-store",
      });
      const data = await res.json();
      if (data?.success && Array.isArray(data.orders)) {
        setListItems(data.orders as OrderListItem[]);
      }
    } catch {
      // silently ignore; banner stays
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    loadList();
    const id = setInterval(loadList, 30_000);
    return () => clearInterval(id);
  }, [loadList, listTick]);

  async function fetchOrder(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    setBusy(true);
    setOrder(null);
    setEditing(false);
    setPhoneHistory(null);
    try {
      const res = await fetch(
        `/api/admin/orders/${encodeURIComponent(trimmed)}`
      );
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order as Order);
      } else {
        onToast({ kind: "err", msg: data.message || "Order not found" });
      }
    } catch {
      onToast({ kind: "err", msg: "Network error" });
    } finally {
      setBusy(false);
    }
  }

  async function fetchPhoneHistory(phone: string) {
    const clean = phone.replace(/\D/g, "");
    if (clean.length < 7) return;
    setBusy(true);
    setOrder(null);
    setEditing(false);
    setPhoneHistory(null);
    setPhoneHistoryFor(clean);
    try {
      const res = await fetch(
        `/api/admin/orders/by-phone?phone=${encodeURIComponent(clean)}&limit=10`
      );
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setPhoneHistory(data.orders as OrderListItem[]);
        if (data.orders.length === 0) {
          onToast({
            kind: "info",
            msg: `No orders found for ${clean}`,
          });
        }
      } else {
        onToast({ kind: "err", msg: data.message || "Lookup failed" });
      }
    } catch {
      onToast({ kind: "err", msg: "Network error" });
    } finally {
      setBusy(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = num.trim();
    if (!trimmed) return;
    // Smart detect: 7+ digits treat as phone, else order number
    if (trimmed.length >= 7) {
      fetchPhoneHistory(trimmed);
    } else {
      fetchOrder(trimmed);
    }
  }

  function clearPhoneHistory() {
    setPhoneHistory(null);
    setPhoneHistoryFor("");
  }

  function openEdit(o: Order) {
    setEdName(o.customerName || "");
    setEdPhone(o.customerPhone || "");
    setEdPayment((o.paymentMode === "CASH" ? "CASH" : "UPI") as "UPI" | "CASH");
    setEdNote(o.note || "");
    setEdItems(o.items.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })));
    setAddCart([]);
    setShowAddPicker(false);
    setAddActiveCat(addCategories[0] ?? "");
    setCancelConfirm(false);
    setEditing(true);
  }

  async function saveEdit() {
    if (!order?.rowIndex) {
      onToast({
        kind: "err",
        msg: "Cannot edit. This order has no row index (older Apps Script). Re-deploy the script.",
      });
      return;
    }
    setEdBusy(true);
    try {
      // Build final merged items list (edItems reduced/removed + addCart new items)
      const finalMap = new Map<string, CartLine>();
      for (const it of edItems) { if (it.quantity > 0) finalMap.set(it.name, { ...it }); }
      for (const add of addCart) {
        const ex = finalMap.get(add.name);
        if (ex) finalMap.set(add.name, { ...ex, quantity: ex.quantity + add.quantity });
        else finalMap.set(add.name, { name: add.name, price: add.price, quantity: add.quantity });
      }
      const finalItems = Array.from(finalMap.values());
      if (finalItems.length === 0) {
        onToast({ kind: "err", msg: "Cannot save — order must have at least one item. Cancel the order instead." });
        setEdBusy(false);
        return;
      }

      const res = await fetch("/api/admin/orders/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rowIndex: order.rowIndex,
          customerName: edName,
          customerPhone: edPhone,
          paymentMode: edPayment,
          note: edNote,
          updatedItems: finalItems.map((c) => ({ name: c.name, quantity: c.quantity })),
        }),
      });
      const data = await res.json();
      if (data?.success) {
        const itemsChanged = JSON.stringify(finalItems.map(i => i.name + i.quantity)) !==
          JSON.stringify(order.items.map(i => i.name + i.quantity));
        onToast({ kind: "ok", msg: itemsChanged ? `Order updated — new total ₹${data.newTotal ?? finalNewTotal}` : "Order updated" });
        setOrder({
          ...order,
          customerName: edName,
          customerPhone: edPhone,
          paymentMode: edPayment,
          note: edNote,
          items: finalItems,
          subtotal: data.newSubtotal ?? finalNewSubtotal,
          discountAmount: data.newDiscountAmount ?? finalNewDiscountAmt,
          total: data.newTotal ?? finalNewTotal,
        });
        setEdItems([]);
        setAddCart([]);
        setShowAddPicker(false);
        setEditing(false);
        setListTick((x) => x + 1);
      } else {
        onToast({ kind: "err", msg: data?.message || "Update failed" });
      }
    } catch {
      onToast({ kind: "err", msg: "Network error" });
    } finally {
      setEdBusy(false);
    }
  }

  async function doCancelOrder() {
    if (!order?.rowIndex) {
      onToast({ kind: "err", msg: "Cannot cancel: order has no row index" });
      return;
    }
    setCancelBusy(true);
    try {
      const res = await fetch("/api/admin/orders/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rowIndex: order.rowIndex }),
      });
      const data = await res.json();
      if (data?.success) {
        onToast({ kind: "ok", msg: `Order ${order.orderNumber} cancelled` });
        setOrder({ ...order, orderNumber: "❌ " + order.orderNumber, total: 0 });
        setCancelConfirm(false);
        setListTick((x) => x + 1);
      } else {
        onToast({ kind: "err", msg: data?.message || "Cancel failed" });
      }
    } catch {
      onToast({ kind: "err", msg: "Network error" });
    } finally {
      setCancelBusy(false);
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

      <form onSubmit={handleSubmit} className="mt-5">
        <div className="flex gap-2">
          <input
            inputMode="numeric"
            autoFocus
            value={num}
            onChange={(e) => setNum(e.target.value.replace(/\D/g, ""))}
            placeholder="045 or 9876543210"
            className="flex-1 rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-lg font-bold tracking-wider text-on-surface focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
          <button
            type="submit"
            disabled={busy}
            className="btn-honeyed rounded-xl px-5 text-sm font-semibold text-on-primary disabled:opacity-50"
          >
            {busy ? "…" : "Fetch"}
          </button>
        </div>
        <p className="mt-2 text-[11px] text-on-surface/40">
          Type an order number (3 to 4 digits) for that order, or a phone
          number (7 to 10 digits) for that customer&apos;s last 10 orders.
        </p>
      </form>

      {/* Order detail card */}
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

          {!editing && (order.customerName || order.customerPhone || order.note) && (
            <div className="mt-3 space-y-0.5 text-xs text-on-surface/50">
              {order.customerName && <div>Name: {order.customerName}</div>}
              {order.customerPhone && <div>Phone: {order.customerPhone}</div>}
              {order.note && <div>Note: {order.note}</div>}
            </div>
          )}

          {/* Edit form */}
          {editing && (
            <div className="mt-4 space-y-2 border-t border-outline-variant/10 pt-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary/70">
                Edit order
              </p>

              {/* Existing items — reduce or remove */}
              <div className="rounded-xl bg-surface-container p-3 space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface/50">Items</p>
                {edItems.length === 0 && (
                  <p className="text-xs text-on-surface/40">All items removed — add at least one below</p>
                )}
                {edItems.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-semibold">{item.name}</div>
                      <div className="text-[11px] text-primary">₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</div>
                    </div>
                    <div className="flex items-center overflow-hidden rounded-lg bg-surface-container-high ring-1 ring-outline-variant/30">
                      <button type="button" onClick={() => setEdItemQty(item.name, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center text-sm font-bold text-[var(--error)]">−</button>
                      <span className="w-5 text-center text-xs font-bold">{item.quantity}</span>
                      <button type="button" onClick={() => setEdItemQty(item.name, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center text-sm font-bold text-primary">+</button>
                    </div>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={edName}
                onChange={(e) => setEdName(e.target.value)}
                placeholder="Customer name"
                className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-low px-3 py-2.5 text-sm focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
              <input
                inputMode="numeric"
                value={edPhone}
                onChange={(e) => setEdPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="Phone"
                className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-low px-3 py-2.5 text-sm focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
              <div className="grid grid-cols-2 gap-2">
                {(["UPI", "CASH"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setEdPayment(m)}
                    className={`rounded-xl py-2 text-sm font-bold ${
                      edPayment === m
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-low text-on-surface/70"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={edNote}
                onChange={(e) => setEdNote(e.target.value)}
                placeholder="Note, optional"
                className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-low px-3 py-2.5 text-sm focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
              />

              {/* ── Add more items ── */}
              <div className="border-t border-outline-variant/10 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddPicker((x) => !x)}
                  className="flex w-full items-center justify-between rounded-xl bg-surface-container px-3 py-2.5 text-sm font-semibold text-on-surface/80"
                >
                  <span>+ Add items to order</span>
                  <svg className={`h-4 w-4 transition-transform ${showAddPicker ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showAddPicker && (
                  <div className="mt-2">
                    {/* Category strip */}
                    <div className="-mx-1 overflow-x-auto">
                      <div className="flex gap-1.5 px-1 pb-1">
                        {addCategories.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setAddActiveCat(c)}
                            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                              addActiveCat === c
                                ? "bg-primary text-on-primary"
                                : "bg-surface-container text-on-surface/60"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Item grid */}
                    <div className="mt-2 space-y-1.5">
                      {addFlat[addActiveCat]?.map((item) => {
                        const qty = getAddQty(item.name);
                        return (
                          <div key={item.name} className="flex items-center justify-between gap-2 rounded-xl bg-surface-container p-2.5">
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-xs font-semibold">{item.name}</div>
                              <div className="text-[11px] text-primary">₹{item.price}</div>
                            </div>
                            {qty === 0 ? (
                              <button
                                type="button"
                                onClick={() => addItemToCart(item)}
                                className="rounded-lg bg-primary/15 px-2.5 py-1 text-xs font-bold text-primary"
                              >
                                + Add
                              </button>
                            ) : (
                              <div className="flex items-center overflow-hidden rounded-lg bg-primary/15 ring-1 ring-primary/40">
                                <button type="button" onClick={() => setAddQty(item.name, qty - 1)} className="flex h-7 w-7 items-center justify-center text-primary text-sm">−</button>
                                <span className="w-5 text-center text-xs font-bold text-primary">{qty}</span>
                                <button type="button" onClick={() => addItemToCart(item)} className="flex h-7 w-7 items-center justify-center text-primary text-sm">+</button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Items to add summary */}
                {addCart.length > 0 && (
                  <div className="mt-2 rounded-xl bg-primary/10 p-3">
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Adding</p>
                    {addCart.map((c) => (
                      <div key={c.name} className="flex justify-between text-xs">
                        <span className="text-on-surface/80">{c.name} ×{c.quantity}</span>
                        <span className="text-primary font-semibold">+₹{c.price * c.quantity}</span>
                      </div>
                    ))}
                  </div>
                )}
                {/* Show updated total whenever items differ from original */}
                {(addCart.length > 0 || edSubtotal !== (order?.subtotal ?? 0)) && (
                  <div className="mt-2 flex justify-between rounded-xl bg-surface-container px-3 py-2 text-sm font-bold">
                    <span className="text-on-surface/70">New total</span>
                    <span className="text-primary">₹{finalNewTotal}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 rounded-xl bg-surface-container-low py-2.5 text-sm font-semibold text-on-surface/60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveEdit}
                  disabled={edBusy}
                  className="btn-honeyed flex-1 rounded-xl py-2.5 text-sm font-bold text-on-primary disabled:opacity-50"
                >
                  {edBusy ? "Saving…" : (addCart.length > 0 || edSubtotal !== (order?.subtotal ?? 0)) ? `Save — ₹${finalNewTotal}` : "Save changes"}
                </button>
              </div>
            </div>
          )}

          {!editing && (
            <div className="mt-5 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setCancelConfirm(false); openEdit(order); }}
                  className="rounded-full border border-outline-variant/30 py-3 text-sm font-semibold text-on-surface/80 hover:border-primary hover:text-primary"
                >
                  ✎  Edit
                </button>
                <button
                  onClick={doPrint}
                  disabled={printing}
                  className="btn-honeyed rounded-full py-3 text-sm font-semibold text-on-primary disabled:opacity-50"
                >
                  {printing ? "Printing…" : "🖨️  Print"}
                </button>
              </div>

              {/* Cancel order */}
              {!order.orderNumber.startsWith("❌") && (
                cancelConfirm ? (
                  <div className="rounded-xl border border-[var(--error)]/30 bg-[var(--error)]/5 p-3">
                    <p className="text-sm font-semibold text-[var(--error)]">Cancel {order.orderNumber}?</p>
                    <p className="mt-0.5 text-xs text-on-surface/50">Stays in sheet, marked cancelled. Cannot undo.</p>
                    <div className="mt-3 flex gap-2">
                      <button type="button" onClick={() => setCancelConfirm(false)}
                        className="flex-1 rounded-xl bg-surface-container-low py-2 text-sm font-semibold text-on-surface/60">
                        Keep
                      </button>
                      <button type="button" onClick={doCancelOrder} disabled={cancelBusy}
                        className="flex-1 rounded-xl bg-[var(--error)] py-2 text-sm font-bold text-[var(--on-error,#000)] disabled:opacity-50">
                        {cancelBusy ? "Cancelling…" : "Yes, Cancel"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCancelConfirm(true)}
                    className="w-full rounded-full border border-[var(--error)]/30 py-2.5 text-sm font-semibold text-[var(--error)]/70 hover:border-[var(--error)] hover:text-[var(--error)]"
                  >
                    ✕  Cancel Order
                  </button>
                )
              )}
            </div>
          )}

          {!isPrinterSupported() && (
            <p className="mt-2 text-center text-[11px] text-on-surface/40">
              Bluetooth print works on Chrome (Android/desktop). Not on iOS Safari.
            </p>
          )}
        </div>
      )}

      {/* Phone history results */}
      {phoneHistory !== null && (
        <div className="mt-8">
          <div className="flex items-baseline justify-between">
            <h3 className="font-[var(--font-heading)] text-base font-bold">
              Customer history{" "}
              <span className="ml-1 text-xs font-medium text-primary">
                {phoneHistoryFor}
              </span>
              {phoneHistory.length > 0 && (
                <span className="ml-2 text-xs font-medium text-on-surface/50">
                  (last {phoneHistory.length})
                </span>
              )}
            </h3>
            <button
              onClick={clearPhoneHistory}
              className="text-xs font-medium text-on-surface/50 hover:text-primary"
            >
              ← Back to today
            </button>
          </div>

          {phoneHistory.length === 0 ? (
            <div className="mt-3 rounded-xl bg-surface-container-low/40 px-4 py-6 text-center text-xs text-on-surface/40">
              No previous orders for this number.
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              {phoneHistory.map((row) => (
                <button
                  key={row.rowIndex}
                  onClick={() => fetchOrder(row.orderNumber)}
                  className="flex w-full items-center gap-3 rounded-xl bg-surface-container px-4 py-3 text-left transition-colors hover:bg-surface-container-high"
                >
                  <div className="shrink-0 font-[var(--font-heading)] text-base font-bold text-primary">
                    {row.orderNumber}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-on-surface">
                      {row.customerName || "Walk-in"}
                    </div>
                    <div className="text-[11px] text-on-surface/50">
                      {new Date(row.timestamp).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        day: "numeric",
                        month: "short",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                      {row.paymentMode && ` · ${row.paymentMode}`}
                      {row.source === "WEBSITE" && " · web"}
                      {row.source === "COUNTER" && " · counter"}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-[var(--font-heading)] text-sm font-bold text-on-surface">
                      ₹{row.total}
                    </div>
                  </div>
                </button>
              ))}
              {phoneHistory.length > 0 && (
                <div className="rounded-xl bg-surface-container-low/40 px-4 py-3 text-center text-[11px] text-on-surface/50">
                  Total spent across these {phoneHistory.length} order
                  {phoneHistory.length === 1 ? "" : "s"}:{" "}
                  <span className="font-bold text-primary">
                    ₹
                    {phoneHistory
                      .reduce((sum, r) => sum + r.total, 0)
                      .toLocaleString("en-IN")}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Today's orders list — hidden while phone-history is open */}
      {phoneHistory === null && (
        <div className="mt-8">
          <div className="flex items-baseline justify-between">
            <h3 className="font-[var(--font-heading)] text-base font-bold">
              Today&apos;s orders
              {listItems.length > 0 && (
                <span className="ml-2 text-xs font-medium text-on-surface/50">
                  ({listItems.length})
                </span>
              )}
            </h3>
            <button
              onClick={() => setListTick((x) => x + 1)}
              className="text-xs font-medium text-on-surface/50 hover:text-primary"
            >
              {listLoading ? "Loading…" : "Refresh"}
            </button>
          </div>

          {listItems.length === 0 && !listLoading && (
            <div className="mt-3 rounded-xl bg-surface-container-low/40 px-4 py-6 text-center text-xs text-on-surface/40">
              No orders logged today yet.
            </div>
          )}

          {listItems.length > 0 && (
            <div className="mt-3 space-y-2">
              {listItems.map((row) => (
                <button
                  key={row.rowIndex}
                  onClick={() => fetchOrder(row.orderNumber)}
                  className="flex w-full items-center gap-3 rounded-xl bg-surface-container px-4 py-3 text-left transition-colors hover:bg-surface-container-high"
                >
                  <div className="shrink-0 font-[var(--font-heading)] text-base font-bold text-primary">
                    {row.orderNumber}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-on-surface">
                      {row.customerName || (row.source === "COUNTER" ? "Counter walk-in" : "Online order")}
                    </div>
                    <div className="text-[11px] text-on-surface/50">
                      {row.customerPhone && row.customerPhone + " · "}
                      {new Date(row.timestamp).toLocaleTimeString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                      {row.paymentMode && ` · ${row.paymentMode}`}
                      {row.source === "WEBSITE" && " · web"}
                      {row.source === "COUNTER" && " · counter"}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-[var(--font-heading)] text-sm font-bold text-on-surface">
                      ₹{row.total}
                    </div>
                  </div>
                </button>
              ))}
            </div>
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
  const [freeFries, setFreeFries] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMode, setPaymentMode] = useState<"UPI" | "CASH">("UPI");
  const [expanded, setExpanded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [nameHint, setNameHint] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState<{
    orderCount: number;
    lastTotal: number;
    lastDate: string;
  } | null>(null);

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [couponErr, setCouponErr] = useState("");

  // Auto-fill customer name + show history when phone reaches 10 digits
  useEffect(() => {
    if (phone.length !== 10) { setNameHint(null); setCustomerInfo(null); return; }
    let active = true;
    fetch(`/api/admin/orders/by-phone?phone=${phone}&limit=10`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        const orders: OrderListItem[] = data?.orders ?? [];
        const found: string | null = orders[0]?.customerName || null;
        setNameHint(found);
        if (found) setName((prev) => prev || found);
        if (orders.length > 0) {
          const lastDate = new Date(orders[0].timestamp).toLocaleDateString("en-IN", {
            timeZone: "Asia/Kolkata", day: "numeric", month: "short",
          });
          setCustomerInfo({ orderCount: orders.length, lastTotal: orders[0].total, lastDate });
        } else {
          setCustomerInfo(null);
        }
      })
      .catch(() => {});
    return () => { active = false; };
  }, [phone]); // eslint-disable-line react-hooks/exhaustive-deps

  const subtotal = cart.reduce((s, c) => s + c.price * c.quantity, 0);
  const discountPercent = appliedCoupon?.percent ?? 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal - discountAmount;
  const totalQty = cart.reduce((s, c) => s + c.quantity, 0);

  function applyCoupon() {
    const key = couponInput.trim().toUpperCase();
    if (!key) { setCouponErr("Enter a coupon code"); return; }
    if (!COUPONS[key]) { setCouponErr("Invalid code"); return; }
    setAppliedCoupon({ code: key, percent: COUPONS[key].percent });
    setCouponInput("");
    setCouponErr("");
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponErr("");
  }

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
        ? [...cart, { name: "Peri Peri Fries (Half), FREE", price: 0, quantity: 1 }]
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
      setAppliedCoupon(null);
      setCouponInput("");
      setCouponErr("");
      setFreeFries(false);
      setName("");
      setPhone("");
      setNameHint(null);
      setCustomerInfo(null);
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
                  {/* Coupon code input */}
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between rounded-lg bg-secondary/10 px-3 py-2">
                      <span className="text-sm font-semibold text-secondary">
                        {appliedCoupon.code} — {appliedCoupon.percent}% off
                      </span>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="ml-2 rounded-full bg-secondary/20 px-2 py-0.5 text-xs font-bold text-secondary hover:bg-secondary/30"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponErr(""); }}
                          onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                          placeholder="Coupon code"
                          className="flex-1 rounded-xl border border-outline-variant/20 bg-surface-container px-3 py-2 text-sm uppercase tracking-wider text-on-surface placeholder:normal-case placeholder:tracking-normal focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
                        />
                        <button
                          type="button"
                          onClick={applyCoupon}
                          className="rounded-xl bg-primary/15 px-4 text-sm font-bold text-primary hover:bg-primary/25"
                        >
                          Apply
                        </button>
                      </div>
                      {couponErr && (
                        <p className="mt-1 text-xs text-red-400">{couponErr}</p>
                      )}
                    </div>
                  )}

                  {/* Free Fries toggle */}
                  <div className="flex items-center justify-between pt-1">
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
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Customer name (optional)"
                      className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-2.5 text-sm focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
                    />
                    {customerInfo && (
                    <div className="mt-1.5 flex items-center gap-2 rounded-lg bg-primary/8 px-2.5 py-1.5">
                      <span className="text-base">↩</span>
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-semibold text-primary">
                          {nameHint ?? "Returning customer"}
                        </span>
                        <span className="ml-1.5 text-[11px] text-on-surface/50">
                          {customerInfo.orderCount} order{customerInfo.orderCount > 1 ? "s" : ""} · last ₹{customerInfo.lastTotal} · {customerInfo.lastDate}
                        </span>
                      </div>
                    </div>
                  )}
                  </div>
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
                      label={`Discount (${discountPercent}%) ${appliedCoupon ? `· ${appliedCoupon.code}` : ""}`}
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
