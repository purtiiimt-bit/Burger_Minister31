"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Period = "today" | "week" | "month";

type TopItem = { name: string; count: number; revenue: number };
type CategoryAgg = { category: string; amount: number };

type BooksStats = {
  success: boolean;
  period: Period;
  sales: number;
  expenses: number;
  net: number;
  orderCount: number;
  avgOrder: number;
  cashSales: number;
  upiSales: number;
  topItems: TopItem[];
  categories: CategoryAgg[];
};

type FeedItem = {
  kind: "sale" | "expense";
  time: string;
  amount: number;
  label: string;
  paymentMode?: string;
  source?: string;
  category?: string;
  rowIndex?: number;
};

type Toast = { kind: "ok" | "err" | "info"; msg: string } | null;

const EXPENSE_CATEGORIES = [
  "Raw Materials",
  "Gas/Fuel",
  "Salary",
  "Rent",
  "Electricity",
  "Packaging",
  "Maintenance",
  "Marketing",
  "Misc",
  "Other",
] as const;

const PERIOD_LABELS: Record<Period, string> = {
  today: "Today",
  week: "This Week",
  month: "This Month",
};

function formatINR(n: number): string {
  return n.toLocaleString("en-IN");
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "";
  }
}

export default function BooksTab({
  onToast,
}: {
  onToast: (t: Toast) => void;
}) {
  const [period, setPeriod] = useState<Period>("today");
  const [stats, setStats] = useState<BooksStats | null>(null);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshTick, setRefreshTick] = useState(0);

  // Expense form state
  const [exCategory, setExCategory] = useState<string>("Raw Materials");
  const [exCustomCategory, setExCustomCategory] = useState<string>("");
  const [exAmount, setExAmount] = useState<string>("");
  const [exNote, setExNote] = useState<string>("");
  const [exBusy, setExBusy] = useState(false);

  // Pending entries staged locally before bulk save
  type PendingExpense = {
    id: string;
    category: string;
    amount: number;
    note: string;
  };
  const PENDING_KEY = "bm-pending-expenses";
  const [pending, setPending] = useState<PendingExpense[]>([]);

  // Load pending list from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PENDING_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setPending(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
    } catch {
      // ignore
    }
  }, [pending]);

  const pendingTotal = pending.reduce((sum, p) => sum + p.amount, 0);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [sRes, fRes] = await Promise.all([
        fetch(`/api/admin/books?period=${period}`, { cache: "no-store" }),
        fetch(`/api/admin/books?feed=today`, { cache: "no-store" }),
      ]);
      const s = await sRes.json();
      const f = await fRes.json();
      if (s?.success) setStats(s as BooksStats);
      if (f?.success && Array.isArray(f.feed)) setFeed(f.feed as FeedItem[]);
    } catch {
      onToast({ kind: "err", msg: "Failed to load Books" });
    } finally {
      setLoading(false);
    }
  }, [period, onToast]);

  useEffect(() => {
    fetchAll();
    const id = setInterval(fetchAll, 60_000); // poll every 60s
    return () => clearInterval(id);
  }, [fetchAll, refreshTick]);

  function addPending(e: React.FormEvent) {
    e.preventDefault();
    const amount = Number(exAmount);
    if (!amount || amount <= 0) {
      onToast({ kind: "err", msg: "Enter a valid amount" });
      return;
    }
    const isOther = exCategory === "Other";
    const finalCategory = isOther ? exCustomCategory.trim() : exCategory;
    if (isOther && !finalCategory) {
      onToast({ kind: "err", msg: "Type a category name for Other" });
      return;
    }
    const entry: PendingExpense = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      category: finalCategory,
      amount,
      note: exNote.trim(),
    };
    setPending((prev) => [...prev, entry]);
    onToast({
      kind: "ok",
      msg: `Added ₹${formatINR(amount)} ${finalCategory} to pending list`,
    });
    setExAmount("");
    setExNote("");
    setExCustomCategory("");
    if (isOther) setExCategory("Raw Materials");
  }

  function removePending(id: string) {
    setPending((prev) => prev.filter((p) => p.id !== id));
  }

  function clearPending() {
    if (pending.length === 0) return;
    if (
      !confirm(`Clear ${pending.length} pending entries without saving?`)
    )
      return;
    setPending([]);
  }

  async function saveAllPending() {
    if (pending.length === 0) return;
    setExBusy(true);
    try {
      const res = await fetch("/api/admin/expense/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: pending.map((p) => ({
            category: p.category,
            amount: p.amount,
            note: p.note || undefined,
          })),
        }),
      });
      const data = await res.json();
      if (data?.success) {
        onToast({
          kind: "ok",
          msg: `Saved ${data.count} entries (₹${formatINR(data.total ?? pendingTotal)})`,
        });
        setPending([]);
        setRefreshTick((x) => x + 1);
      } else {
        onToast({ kind: "err", msg: data?.message || "Save failed" });
      }
    } catch {
      onToast({ kind: "err", msg: "Network error" });
    } finally {
      setExBusy(false);
    }
  }

  async function deleteExpense(rowIndex: number) {
    if (!confirm("Delete this expense? This can be undone in the sheet.")) return;
    try {
      const res = await fetch(`/api/admin/expense?row=${rowIndex}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data?.success) {
        onToast({ kind: "ok", msg: "Expense deleted" });
        setRefreshTick((x) => x + 1);
      } else {
        onToast({ kind: "err", msg: data?.message || "Delete failed" });
      }
    } catch {
      onToast({ kind: "err", msg: "Network error" });
    }
  }

  const netPositive = (stats?.net ?? 0) >= 0;
  const maxCategory = useMemo(() => {
    if (!stats?.categories?.length) return 0;
    return Math.max(...stats.categories.map((c) => c.amount));
  }, [stats]);

  return (
    <div className="pb-32">
      {/* Period switcher */}
      <div className="flex gap-2">
        {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`flex-1 rounded-xl border-2 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              period === p
                ? "border-primary bg-primary/10 text-primary"
                : "border-outline-variant/15 bg-surface-container text-on-surface/60"
            }`}
          >
            {PERIOD_LABELS[p]}
          </button>
        ))}
      </div>

      {/* Headline stats */}
      <div className="mt-5 rounded-2xl bg-surface-container p-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-on-surface/40">
              Sales
            </div>
            <div className="mt-1 font-[var(--font-heading)] text-3xl font-bold text-primary">
              ₹{stats ? formatINR(stats.sales) : "..."}
            </div>
            {stats && (
              <div className="mt-1 text-[11px] text-on-surface/50">
                {stats.orderCount} order{stats.orderCount === 1 ? "" : "s"}
                {stats.avgOrder > 0 && ` · avg ₹${formatINR(stats.avgOrder)}`}
              </div>
            )}
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-on-surface/40">
              Expenses
            </div>
            <div className="mt-1 font-[var(--font-heading)] text-3xl font-bold text-tertiary">
              ₹{stats ? formatINR(stats.expenses) : "..."}
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-outline-variant/10 pt-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-on-surface/40">
                Net {PERIOD_LABELS[period]}
              </div>
              <div
                className={`mt-1 font-[var(--font-heading)] text-4xl font-bold ${
                  netPositive ? "text-secondary" : "text-red-400"
                }`}
              >
                {netPositive ? "" : "-"}₹
                {stats ? formatINR(Math.abs(stats.net)) : "..."}
              </div>
            </div>
            <button
              onClick={() => setRefreshTick((x) => x + 1)}
              className="text-xs font-medium text-on-surface/50 hover:text-primary"
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {stats && (stats.cashSales > 0 || stats.upiSales > 0) && (
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-surface-container-low/60 px-3 py-2">
                <div className="text-on-surface/40">UPI</div>
                <div className="font-semibold text-on-surface">
                  ₹{formatINR(stats.upiSales)}
                </div>
              </div>
              <div className="rounded-lg bg-surface-container-low/60 px-3 py-2">
                <div className="text-on-surface/40">Cash</div>
                <div className="font-semibold text-on-surface">
                  ₹{formatINR(stats.cashSales)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Today's timeline */}
      <section className="mt-7">
        <h3 className="font-[var(--font-heading)] text-base font-bold">
          Today&apos;s activity
        </h3>
        <p className="mt-0.5 text-xs text-on-surface/50">
          Sales and expenses logged today, latest first.
        </p>
        <div className="mt-3 space-y-2">
          {feed.length === 0 && !loading && (
            <div className="rounded-xl bg-surface-container-low/40 px-4 py-6 text-center text-xs text-on-surface/40">
              Nothing logged today yet. Place an order or add an expense below.
            </div>
          )}
          {feed.map((entry, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl bg-surface-container px-4 py-2.5"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  entry.kind === "sale"
                    ? "bg-secondary/15 text-secondary"
                    : "bg-tertiary-container/40 text-tertiary"
                }`}
              >
                {entry.kind === "sale" ? "↑" : "↓"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-on-surface">
                  {entry.label}
                </div>
                <div className="text-[11px] text-on-surface/40">
                  {formatTime(entry.time)}
                  {entry.paymentMode && ` · ${entry.paymentMode}`}
                  {entry.source === "WEBSITE" && " · web"}
                  {entry.source === "COUNTER" && " · counter"}
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`font-[var(--font-heading)] text-sm font-bold ${
                    entry.kind === "sale" ? "text-secondary" : "text-tertiary"
                  }`}
                >
                  {entry.kind === "sale" ? "+" : "−"}₹{formatINR(entry.amount)}
                </div>
                {entry.kind === "expense" && entry.rowIndex && (
                  <button
                    onClick={() => deleteExpense(entry.rowIndex!)}
                    className="text-[10px] text-on-surface/40 hover:text-red-400"
                  >
                    delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top selling items */}
      {stats && stats.topItems.length > 0 && (
        <section className="mt-8">
          <h3 className="font-[var(--font-heading)] text-base font-bold">
            Top sellers, {PERIOD_LABELS[period].toLowerCase()}
          </h3>
          <div className="mt-3 space-y-1.5">
            {stats.topItems.slice(0, 8).map((item, i) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-lg bg-surface-container-low/60 px-3 py-2 text-xs"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span className="w-4 text-primary/60">{i + 1}.</span>
                  <span className="truncate text-on-surface/80">
                    {item.name}
                  </span>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-on-surface/80">{item.count}×</span>
                  <span className="ml-2 text-primary">
                    ₹{formatINR(item.revenue)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Expense category breakdown */}
      {stats && stats.categories.length > 0 && (
        <section className="mt-8">
          <h3 className="font-[var(--font-heading)] text-base font-bold">
            Expense breakdown
          </h3>
          <div className="mt-3 space-y-2">
            {stats.categories.map((c) => {
              const pct = maxCategory > 0 ? (c.amount / maxCategory) * 100 : 0;
              return (
                <div
                  key={c.category}
                  className="rounded-lg bg-surface-container-low/60 px-3 py-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-on-surface/80">{c.category}</span>
                    <span className="font-semibold text-tertiary">
                      ₹{formatINR(c.amount)}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-container">
                    <div
                      className="h-full rounded-full bg-tertiary/60"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Pending entries (KhataBook-style draft list) */}
      {pending.length > 0 && (
        <section className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-baseline justify-between">
            <h3 className="font-[var(--font-heading)] text-base font-bold text-primary">
              Pending entries ({pending.length})
            </h3>
            <span className="text-xs font-semibold text-on-surface/60">
              Not saved yet
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {pending.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-xl bg-surface-container px-3 py-2.5"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-on-surface">
                    {p.category}
                  </div>
                  {p.note && (
                    <div className="text-[11px] text-on-surface/50">{p.note}</div>
                  )}
                </div>
                <div className="font-[var(--font-heading)] text-sm font-bold text-tertiary">
                  ₹{formatINR(p.amount)}
                </div>
                <button
                  type="button"
                  onClick={() => removePending(p.id)}
                  aria-label="Remove from list"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-on-surface/40 hover:bg-red-500/10 hover:text-red-400"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-primary/15 pt-3 text-sm">
            <span className="text-on-surface/60">Total to save</span>
            <span className="font-[var(--font-heading)] text-lg font-bold text-primary">
              ₹{formatINR(pendingTotal)}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-[1fr_2fr] gap-2">
            <button
              type="button"
              onClick={clearPending}
              className="rounded-xl bg-surface-container py-2.5 text-sm font-semibold text-on-surface/60 transition-colors hover:text-red-400"
            >
              Clear list
            </button>
            <button
              type="button"
              onClick={saveAllPending}
              disabled={exBusy}
              className="btn-honeyed rounded-xl py-2.5 text-sm font-bold text-on-primary disabled:opacity-50"
            >
              {exBusy ? "Saving…" : `Save all (${pending.length})`}
            </button>
          </div>

          <p className="mt-2 text-center text-[10px] text-on-surface/40">
            All entries save together in one go. One sheet write, one
            notification.
          </p>
        </section>
      )}

      {/* Sticky expense entry form */}
      <form
        onSubmit={addPending}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-outline-variant/15 bg-surface/95 backdrop-blur"
      >
        <div className="mx-auto max-w-3xl space-y-2 px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-primary/70">
              Add expense to list
            </p>
            {pending.length > 0 && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-secondary">
                {pending.length} pending · ₹{formatINR(pendingTotal)}
              </span>
            )}
          </div>

          {/* Category chip row (horizontally scrollable on mobile) */}
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-1.5 pb-1">
              {EXPENSE_CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setExCategory(c)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    exCategory === c
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container text-on-surface/60 hover:text-on-surface"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional custom category input when "Other" is picked */}
          {exCategory === "Other" && (
            <input
              type="text"
              value={exCustomCategory}
              onChange={(e) => setExCustomCategory(e.target.value)}
              placeholder="Type your category (e.g. Internet, Repair)"
              className="w-full rounded-xl border border-primary/40 bg-primary/5 px-3 py-2.5 text-sm focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
              autoFocus
            />
          )}

          {/* Amount + Save */}
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <div className="flex items-center rounded-xl border border-outline-variant/20 bg-surface-container-low px-3">
              <span className="text-on-surface/40">₹</span>
              <input
                inputMode="decimal"
                value={exAmount}
                onChange={(e) =>
                  setExAmount(e.target.value.replace(/[^0-9.]/g, ""))
                }
                placeholder="Amount"
                className="w-full bg-transparent px-2 py-2.5 text-sm focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={exBusy}
              className="btn-honeyed rounded-xl px-5 text-sm font-bold text-on-primary disabled:opacity-50"
            >
              + Add
            </button>
          </div>

          {/* Note (full width) */}
          <input
            type="text"
            value={exNote}
            onChange={(e) => setExNote(e.target.value)}
            placeholder="Note, optional (e.g. Paneer 5kg)"
            className="w-full rounded-xl border border-outline-variant/20 bg-surface-container-low px-3 py-2.5 text-sm focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
        </div>
      </form>
    </div>
  );
}
