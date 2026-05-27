/**
 * Burger Minister — Google Apps Script Web App
 *
 * Sheets:
 *   Orders   — append-only ledger of all orders
 *   Counter  — A1=last reset date (yyyy-MM-dd IST), B1=current counter
 *
 * After pasting: Deploy → Manage Deployments → Edit (pencil) →
 * "New version" → Deploy. Copy the URL into GOOGLE_SHEET_WEBHOOK
 * env var on Vercel + .env.local.
 */

const SHEET_NAME = "Orders";
const COUNTER_SHEET = "Counter";
const EXPENSES_SHEET = "Expenses";
const TZ = "Asia/Kolkata";
const NOTIFY_EMAIL = "Burgerminister38@gmail.com"; // owner email for new-order alerts

// ─────────────────────────────────────────────────────────────────────────
// HMAC SIGNATURE VERIFICATION (talks to Next.js /src/lib/appsScript.ts)
// Replace the empty string below with a long random secret (32+ chars).
// Set the SAME value as APPS_SCRIPT_SECRET in Vercel env vars.
// When SCRIPT_SECRET is empty, signature verification is disabled so the
// script keeps working during the first deployment. Set it as soon as you
// have also set the matching env var on Vercel.
// ─────────────────────────────────────────────────────────────────────────
const SCRIPT_SECRET = ""; // Set this in Apps Script editor — match APPS_SCRIPT_SECRET in Vercel env
const REPLAY_WINDOW_MS = 60 * 1000; // 60-second clock skew window

function hmacSha256Hex_(message, secret) {
  const bytes = Utilities.computeHmacSha256Signature(message, secret);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
    hex += (b < 16 ? "0" : "") + b.toString(16);
  }
  return hex;
}

function constantTimeEqual_(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

// Returns true when no secret is configured (passthrough), or when the
// supplied timestamp+signature pair is fresh AND valid.
function verifySignature_(ts, sig) {
  if (!SCRIPT_SECRET) return true; // signature enforcement disabled
  const tsNum = Number(ts);
  if (!ts || !sig || !isFinite(tsNum)) return false;
  const now = Date.now();
  if (Math.abs(now - tsNum) > REPLAY_WINDOW_MS) return false;
  const expected = hmacSha256Hex_(String(tsNum), SCRIPT_SECRET);
  return constantTimeEqual_(expected, String(sig));
}

function unauthorisedResponse_() {
  return ContentService.createTextOutput(
    JSON.stringify({ success: false, message: "Unauthorised" })
  ).setMimeType(ContentService.MimeType.JSON);
}

function ensureSheets_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let orders = ss.getSheetByName(SHEET_NAME);
  if (!orders) {
    orders = ss.insertSheet(SHEET_NAME);
    orders.appendRow([
      "Order #",
      "Timestamp",
      "Source",
      "Items (JSON)",
      "Subtotal",
      "Discount %",
      "Discount ₹",
      "Total",
      "Payment Mode",
      "Customer Name",
      "Customer Phone",
      "Order Type",
      "Address",
      "Note",
      "Coupon",
      "Lifetime #",
    ]);
  }
  let counter = ss.getSheetByName(COUNTER_SHEET);
  if (!counter) {
    counter = ss.insertSheet(COUNTER_SHEET);
    counter.getRange("A1").setValue("");   // last reset date (yyyy-MM-dd IST)
    counter.getRange("B1").setValue(0);    // today's counter (resets daily)
    counter.getRange("C1").setValue(0);    // lifetime counter (never resets)
    counter.getRange("A2").setValue("Last Reset");
    counter.getRange("B2").setValue("Today");
    counter.getRange("C2").setValue("Lifetime");
  }
  return { orders, counter };
}

// Safely convert whatever getValue() returns for A1 into a "yyyy-MM-dd" string.
// Google Sheets auto-converts "2026-05-27" stored as a string back to a Date
// object on the next read, which breaks a simple === comparison with today's
// formatted string.  Always go through Utilities.formatDate so the type doesn't matter.
function toDateStr_(value) {
  if (!value) return "";
  try {
    return Utilities.formatDate(
      value instanceof Date ? value : new Date(value),
      TZ,
      "yyyy-MM-dd"
    );
  } catch (e) {
    return "";
  }
}

// Increments BOTH today's counter (daily reset) and lifetime counter (never resets)
function nextOrderNumber_(counter) {
  const today = Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd");
  const lastDate = toDateStr_(counter.getRange("A1").getValue());
  let n = Number(counter.getRange("B1").getValue() || 0);
  let lifetime = Number(counter.getRange("C1").getValue() || 0);

  if (lastDate !== today) {
    n = 0;
    // Store as plain text to avoid Sheets auto-parsing the value as a Date
    counter.getRange("A1").setValue(today);
    SpreadsheetApp.flush();
  }
  n += 1;
  lifetime += 1;
  counter.getRange("B1").setValue(n);
  counter.getRange("C1").setValue(lifetime);
  SpreadsheetApp.flush();

  return {
    orderNumber: "#" + String(n).padStart(3, "0"),
    todayCount: n,
    lifetimeTotal: lifetime,
  };
}

function getStats_(counter) {
  const today = Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd");
  const lastDate = toDateStr_(counter.getRange("A1").getValue());
  // If today hasn't been reset yet, today count is 0 (will reset on next order)
  const todayCount =
    lastDate === today ? Number(counter.getRange("B1").getValue() || 0) : 0;
  const lifetime = Number(counter.getRange("C1").getValue() || 0);
  return { todayCount, lifetimeTotal: lifetime, lastReset: lastDate };
}

/**
 * Manually reset the daily counter (Today's #) to 0. Run this once before going
 * live so the first real order is #001. Lifetime counter is NOT touched here.
 * Editor → dropdown → resetCounter → ▶ Run.
 */
function resetCounter() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const counter = ss.getSheetByName(COUNTER_SHEET) || ss.insertSheet(COUNTER_SHEET);
  counter.getRange("A1").setValue("");
  counter.getRange("B1").setValue(0);
  // Don't touch C1 (lifetime)
}

/**
 * DANGER: Wipes the lifetime counter too. Only run if you really want to start
 * tracking from zero (e.g., new outlet, fresh launch).
 */
function resetLifetime() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const counter = ss.getSheetByName(COUNTER_SHEET) || ss.insertSheet(COUNTER_SHEET);
  counter.getRange("A1").setValue("");
  counter.getRange("B1").setValue(0);
  counter.getRange("C1").setValue(0);
}

/**
 * NUCLEAR: Wipes ALL business data. Keeps header rows, removes every order
 * and every expense, and resets counters to zero. Use this once to start
 * fresh on Day 1 of real operations.
 *
 * How to run:
 *   1. Apps Script editor → top dropdown → select `wipeAllData`
 *   2. Click ▶ Run
 *   3. Approve any permission popup
 *   4. Status: "Execution completed"
 *
 * Recovery: Google Sheets keeps a Version History under File menu — if you
 * run this by accident you can restore the previous state from there within
 * a few days.
 */
function wipeAllData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Orders sheet — drop everything except the header row
  const orders = ss.getSheetByName(SHEET_NAME);
  if (orders) {
    const last = orders.getLastRow();
    if (last > 1) {
      orders.deleteRows(2, last - 1);
    }
  }

  // Expenses sheet — drop everything except the header row
  const expenses = ss.getSheetByName(EXPENSES_SHEET);
  if (expenses) {
    const last = expenses.getLastRow();
    if (last > 1) {
      expenses.deleteRows(2, last - 1);
    }
  }

  // Counter — back to zero (today + lifetime) and clear last reset date
  const counter = ss.getSheetByName(COUNTER_SHEET) || ss.insertSheet(COUNTER_SHEET);
  counter.getRange("A1").setValue("");
  counter.getRange("B1").setValue(0);
  counter.getRange("C1").setValue(0);

  Logger.log("wipeAllData done. Orders + Expenses cleared. Counter reset to 0.");
}

// ─────────────────────────────────────────────────────────────
// BOOKS MODULE — Expenses sheet + Sales/Expense aggregations
// ─────────────────────────────────────────────────────────────

function ensureExpensesSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(EXPENSES_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(EXPENSES_SHEET);
    sheet.appendRow([
      "Date",
      "Time",
      "Timestamp",
      "Category",
      "Amount",
      "Note",
      "Status",
    ]);
  }
  return sheet;
}

// Compute IST date range for "today", "week" (last 7 days), "month" (current calendar month)
function dateRange_(period) {
  const nowIST = new Date(
    Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd'T'HH:mm:ss")
  );
  let from, to;
  if (period === "today") {
    from = new Date(nowIST);
    from.setHours(0, 0, 0, 0);
    to = new Date(nowIST);
    to.setHours(23, 59, 59, 999);
  } else if (period === "week") {
    from = new Date(nowIST);
    from.setDate(from.getDate() - 6);
    from.setHours(0, 0, 0, 0);
    to = new Date(nowIST);
    to.setHours(23, 59, 59, 999);
  } else if (period === "month") {
    from = new Date(nowIST.getFullYear(), nowIST.getMonth(), 1, 0, 0, 0, 0);
    to = new Date(nowIST);
    to.setHours(23, 59, 59, 999);
  } else {
    from = new Date(0);
    to = new Date();
  }
  return { from: from, to: to };
}

function inRange_(timestamp, from, to) {
  if (!timestamp) return false;
  const d = new Date(timestamp);
  if (isNaN(d.getTime())) return false;
  return d >= from && d <= to;
}

function aggregateBooks_(period) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const orders = ss.getSheetByName(SHEET_NAME);
  const expenses = ensureExpensesSheet_();
  const range = dateRange_(period);

  let sales = 0;
  let orderCount = 0;
  let cashSales = 0;
  let upiSales = 0;
  const itemCounts = {};
  const itemRevenue = {};

  if (orders) {
    const oRows = orders.getDataRange().getValues();
    for (let i = 1; i < oRows.length; i++) {
      const row = oRows[i];
      // Cols: [Order#, Timestamp, Source, Items, Subtotal, Disc%, DiscRs, Total, PayMode, Name, Phone, OrderType, Address, Note, Coupon, Lifetime]
      const ts = row[1];
      if (!inRange_(ts, range.from, range.to)) continue;
      const total = Number(row[7]) || 0;
      sales += total;
      orderCount += 1;
      const mode = String(row[8] || "UPI").toUpperCase();
      if (mode === "CASH") cashSales += total;
      else upiSales += total;
      try {
        const items = JSON.parse(row[3] || "[]");
        if (Array.isArray(items)) {
          items.forEach(function (it) {
            const name = it.name || "Unknown";
            const qty = Number(it.quantity || 1);
            const price = Number(it.price || 0);
            itemCounts[name] = (itemCounts[name] || 0) + qty;
            itemRevenue[name] = (itemRevenue[name] || 0) + qty * price;
          });
        }
      } catch (_) {
        // ignore malformed items
      }
    }
  }

  let totalExpenses = 0;
  const expenseByCategory = {};
  const eRows = expenses.getDataRange().getValues();
  for (let i = 1; i < eRows.length; i++) {
    const row = eRows[i];
    // Cols: [Date, Time, Timestamp, Category, Amount, Note, Status]
    const ts = row[2] || row[0];
    if (!inRange_(ts, range.from, range.to)) continue;
    const status = String(row[6] || "").toUpperCase();
    if (status === "DELETED") continue;
    const amount = Number(row[4]) || 0;
    const category = row[3] || "Misc";
    totalExpenses += amount;
    expenseByCategory[category] = (expenseByCategory[category] || 0) + amount;
  }

  const topItems = Object.keys(itemCounts)
    .map(function (name) {
      return { name: name, count: itemCounts[name], revenue: itemRevenue[name] || 0 };
    })
    .sort(function (a, b) {
      return b.count - a.count;
    })
    .slice(0, 10);

  const categories = Object.keys(expenseByCategory)
    .map(function (cat) {
      return { category: cat, amount: expenseByCategory[cat] };
    })
    .sort(function (a, b) {
      return b.amount - a.amount;
    });

  return {
    period: period,
    sales: sales,
    expenses: totalExpenses,
    net: sales - totalExpenses,
    orderCount: orderCount,
    avgOrder: orderCount > 0 ? Math.round(sales / orderCount) : 0,
    cashSales: cashSales,
    upiSales: upiSales,
    topItems: topItems,
    categories: categories,
  };
}

function feed_(dateParam) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const orders = ss.getSheetByName(SHEET_NAME);
  const expenses = ensureExpensesSheet_();

  let targetDate;
  if (!dateParam || dateParam === "today") {
    targetDate = Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd");
  } else {
    targetDate = dateParam;
  }
  // IST midnight to midnight
  const from = new Date(targetDate + "T00:00:00+05:30");
  const to = new Date(targetDate + "T23:59:59+05:30");

  const items = [];

  if (orders) {
    const oRows = orders.getDataRange().getValues();
    for (let i = 1; i < oRows.length; i++) {
      const row = oRows[i];
      const ts = row[1];
      if (!inRange_(ts, from, to)) continue;
      let firstItem = "Order";
      try {
        const parsed = JSON.parse(row[3] || "[]");
        if (Array.isArray(parsed) && parsed.length > 0) {
          firstItem = parsed[0].name + (parsed.length > 1 ? " + " + (parsed.length - 1) + " more" : "");
        }
      } catch (_) {}
      items.push({
        kind: "sale",
        time: ts,
        amount: Number(row[7]) || 0,
        label: row[0] + " · " + firstItem,
        paymentMode: row[8] || "UPI",
        source: row[2] || "WEBSITE",
      });
    }
  }

  const eRows = expenses.getDataRange().getValues();
  for (let i = 1; i < eRows.length; i++) {
    const row = eRows[i];
    const ts = row[2] || row[0];
    if (!inRange_(ts, from, to)) continue;
    const status = String(row[6] || "").toUpperCase();
    if (status === "DELETED") continue;
    const cat = row[3] || "Misc";
    const note = row[5] || "";
    items.push({
      kind: "expense",
      time: ts,
      amount: Number(row[4]) || 0,
      label: cat + (note ? " · " + note : ""),
      category: cat,
      rowIndex: i + 1,
    });
  }

  items.sort(function (a, b) {
    return new Date(b.time).getTime() - new Date(a.time).getTime();
  });
  return items.slice(0, 80);
}

function addExpense_(data) {
  const expenses = ensureExpensesSheet_();
  const now = new Date();
  let entryDate = now;
  if (data.date) {
    const parsed = new Date(data.date);
    if (!isNaN(parsed.getTime())) entryDate = parsed;
  }
  const amount = Number(data.amount) || 0;
  if (amount <= 0) {
    return { success: false, message: "Amount must be greater than zero" };
  }
  expenses.appendRow([
    Utilities.formatDate(entryDate, TZ, "yyyy-MM-dd"),
    Utilities.formatDate(entryDate, TZ, "HH:mm:ss"),
    now,
    String(data.category || "Misc"),
    amount,
    String(data.note || ""),
    "",
  ]);
  return { success: true };
}

function deleteExpense_(rowIndex) {
  const expenses = ensureExpensesSheet_();
  const idx = Number(rowIndex);
  if (!idx || idx < 2) {
    return { success: false, message: "Invalid row index" };
  }
  // Soft delete: mark Status = DELETED so we keep an audit trail
  expenses.getRange(idx, 7).setValue("DELETED");
  return { success: true };
}

// Bulk-save many expense entries in a single call. The Books UI batches
// pending entries client-side and then commits them all at once. This
// drives one Apps Script invocation per save, not one per row.
function addExpensesBatch_(data) {
  const items = Array.isArray(data.items) ? data.items : [];
  if (items.length === 0) {
    return { success: false, message: "No items to save" };
  }
  const expenses = ensureExpensesSheet_();
  const now = new Date();
  const rows = [];
  let totalAmount = 0;
  for (let i = 0; i < items.length; i++) {
    const it = items[i] || {};
    const amount = Number(it.amount) || 0;
    if (amount <= 0) continue;
    const entryDate = it.date ? new Date(it.date) : now;
    if (isNaN(entryDate.getTime())) continue;
    rows.push([
      Utilities.formatDate(entryDate, TZ, "yyyy-MM-dd"),
      Utilities.formatDate(entryDate, TZ, "HH:mm:ss"),
      now,
      String(it.category || "Misc"),
      amount,
      String(it.note || ""),
      "",
    ]);
    totalAmount += amount;
  }
  if (rows.length === 0) {
    return { success: false, message: "No valid entries" };
  }
  const startRow = expenses.getLastRow() + 1;
  expenses.getRange(startRow, 1, rows.length, 7).setValues(rows);
  return { success: true, count: rows.length, total: totalAmount };
}

// Returns the last `limit` orders placed by the given phone number.
// Useful for the admin "customer history" view.
function listOrdersByPhone_(phone, limit) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const orders = ss.getSheetByName(SHEET_NAME);
  if (!orders) return [];

  const target = String(phone || "").replace(/\D/g, "");
  if (!target) return [];
  const cap = Math.min(Math.max(1, Number(limit) || 10), 50);

  const out = [];
  const rows = orders.getDataRange().getValues();
  // Bottom-up so latest match wins
  for (let i = rows.length - 1; i >= 1 && out.length < cap; i--) {
    const rowPhone = String(rows[i][10] || "").replace(/\D/g, "");
    if (rowPhone === target) {
      out.push({
        orderNumber: rows[i][0],
        timestamp: rows[i][1],
        source: rows[i][2] || "WEBSITE",
        total: Number(rows[i][7]) || 0,
        paymentMode: rows[i][8] || "UPI",
        customerName: rows[i][9] || "",
        customerPhone: rows[i][10] || "",
        rowIndex: i + 1,
      });
    }
  }
  return out;
}

// List all orders for a given date (defaults to today IST).
// Returns the row index so the client can fetch/edit by it.
function listOrdersForDate_(dateParam) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const orders = ss.getSheetByName(SHEET_NAME);
  if (!orders) return [];

  let targetDate;
  if (!dateParam || dateParam === "today") {
    targetDate = Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd");
  } else {
    targetDate = dateParam;
  }
  const from = new Date(targetDate + "T00:00:00+05:30");
  const to = new Date(targetDate + "T23:59:59+05:30");

  const out = [];
  const rows = orders.getDataRange().getValues();
  for (let i = rows.length - 1; i >= 1; i--) {
    const row = rows[i];
    const ts = row[1];
    if (!inRange_(ts, from, to)) continue;
    out.push({
      orderNumber: row[0],
      timestamp: ts,
      source: row[2] || "WEBSITE",
      total: Number(row[7]) || 0,
      paymentMode: row[8] || "UPI",
      customerName: row[9] || "",
      customerPhone: row[10] || "",
      rowIndex: i + 1, // 1-based sheet row
    });
  }
  return out;
}

// Edit a previously placed order. Only safe fields are editable here.
// data: { rowIndex, customerName, customerPhone, paymentMode, note, orderType, address }
function editOrder_(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const orders = ss.getSheetByName(SHEET_NAME);
  if (!orders) return { success: false, message: "Orders sheet missing" };
  const idx = Number(data.rowIndex);
  if (!idx || idx < 2) {
    return { success: false, message: "Invalid row index" };
  }

  // Cols mapping (1-based):
  // 4 Items (JSON), 5 Subtotal, 6 Discount %, 7 Discount ₹, 8 Total
  // 9 Payment Mode, 10 Customer Name, 11 Customer Phone, 12 Order Type, 13 Address, 14 Note
  if (data.customerName !== undefined) {
    orders.getRange(idx, 10).setValue(String(data.customerName));
  }
  if (data.customerPhone !== undefined) {
    orders.getRange(idx, 11).setValue(String(data.customerPhone));
  }
  if (data.paymentMode !== undefined) {
    orders.getRange(idx, 9).setValue(String(data.paymentMode));
  }
  if (data.orderType !== undefined) {
    orders.getRange(idx, 12).setValue(String(data.orderType));
  }
  if (data.address !== undefined) {
    orders.getRange(idx, 13).setValue(String(data.address));
  }
  if (data.note !== undefined) {
    orders.getRange(idx, 14).setValue(String(data.note));
  }

  // ── Merge additional items into the order ──────────────────────────────────
  if (data.additionalItems && Array.isArray(data.additionalItems) && data.additionalItems.length > 0) {
    // Read existing items JSON
    const existingRaw = orders.getRange(idx, 4).getValue();
    let existingItems = [];
    try {
      const parsed = JSON.parse(String(existingRaw));
      if (Array.isArray(parsed)) existingItems = parsed;
    } catch (e) {
      // Legacy string format — cannot merge
      return {
        success: false,
        message: "This order uses a legacy items format and cannot have items added. Re-enter as new order.",
      };
    }

    // Merge by name (combine quantities for matching items)
    const itemMap = {};
    for (const it of existingItems) {
      if (it && it.name) itemMap[it.name] = { name: it.name, quantity: Number(it.quantity) || 0, price: Number(it.price) || 0 };
    }
    for (const add of data.additionalItems) {
      if (!add || !add.name) continue;
      if (itemMap[add.name]) {
        itemMap[add.name].quantity += Number(add.quantity) || 0;
      } else {
        itemMap[add.name] = { name: add.name, quantity: Number(add.quantity) || 0, price: Number(add.price) || 0 };
      }
    }
    const mergedItems = Object.values(itemMap);

    // Recalculate totals (preserve existing discount %)
    const newSubtotal = mergedItems.reduce(function(s, i) { return s + (i.price * i.quantity); }, 0);
    const discountPct = Number(orders.getRange(idx, 6).getValue() || 0);
    const newDiscountAmount = Math.round((newSubtotal * discountPct) / 100);
    const newTotal = Math.max(0, newSubtotal - newDiscountAmount);

    // Write back
    orders.getRange(idx, 4).setValue(JSON.stringify(mergedItems));
    orders.getRange(idx, 5).setValue(newSubtotal);
    orders.getRange(idx, 7).setValue(newDiscountAmount);
    orders.getRange(idx, 8).setValue(newTotal);
    SpreadsheetApp.flush();

    return {
      success: true,
      newSubtotal: newSubtotal,
      newDiscountAmount: newDiscountAmount,
      newTotal: newTotal,
    };
  }

  return { success: true };
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Signature gate. Next.js signs every request to this webhook so a leaked
    // URL alone cannot be used to write to the sheet.
    if (!verifySignature_(data && data._ts, data && data._sig)) {
      return unauthorisedResponse_();
    }

    // Books actions piggyback on POST. Use _action to route.
    if (data && data._action === "addExpense") {
      const result = addExpense_(data);
      return ContentService.createTextOutput(
        JSON.stringify(result)
      ).setMimeType(ContentService.MimeType.JSON);
    }
    if (data && data._action === "deleteExpense") {
      const result = deleteExpense_(data.rowIndex);
      return ContentService.createTextOutput(
        JSON.stringify(result)
      ).setMimeType(ContentService.MimeType.JSON);
    }
    if (data && data._action === "addExpensesBatch") {
      const result = addExpensesBatch_(data);
      return ContentService.createTextOutput(
        JSON.stringify(result)
      ).setMimeType(ContentService.MimeType.JSON);
    }
    if (data && data._action === "editOrder") {
      const result = editOrder_(data);
      return ContentService.createTextOutput(
        JSON.stringify(result)
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const { orders, counter } = ensureSheets_();
    const numbers = nextOrderNumber_(counter);
    const orderNumber = numbers.orderNumber;

    // Prefer structured itemsArray (new clients); fall back to items (legacy string or array)
    const itemsRaw = data.itemsArray || data.items || [];
    const itemsJson =
      typeof itemsRaw === "string" ? itemsRaw : JSON.stringify(itemsRaw);

    orders.appendRow([
      orderNumber,
      new Date(),
      data.source || "WEBSITE",
      itemsJson,
      data.subtotal || 0,
      data.discountPercent || 0,
      data.discountAmount || 0,
      data.total || 0,
      data.paymentMode || "UPI",
      data.customerName || "",
      data.customerPhone || "",
      data.orderType || "",
      data.address || "",
      data.note || "",
      data.coupon || "",
      numbers.lifetimeTotal,
    ]);

    // Email notification (kept from original script, with order number prepended)
    try {
      const itemsHuman =
        typeof data.items === "string"
          ? data.items
          : (Array.isArray(data.items) ? data.items : [])
              .map(function (i) {
                return (i.quantity || 1) + "x " + (i.name || "?") + " — Rs " + (i.price || 0);
              })
              .join("\n");

      const emailBody =
        "NEW ORDER " + orderNumber + "\n\n" +
        "Source: " + (data.source || "WEBSITE") + "\n" +
        "Name: " + (data.customerName || data.name || "—") + "\n" +
        "Phone: " + (data.customerPhone || data.phone || "—") + "\n" +
        "Type: " + (data.orderType || data.type || "—") + "\n" +
        "Address: " + (data.address || "—") + "\n\n" +
        "Items:\n" + (itemsHuman || "—") + "\n\n" +
        "Subtotal: Rs " + (data.subtotal || 0) + "\n" +
        (data.discountAmount ? "Discount: -Rs " + data.discountAmount + "\n" : "") +
        (data.freeFries ? "Free Fries: YES\n" : "") +
        "Total: Rs " + (data.total || 0) + "\n" +
        "Payment: " + (data.paymentMode || "UPI") + "\n" +
        "Note: " + (data.note || "—") + "\n" +
        "Time: " + (data.time || "");

      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "🍔 " + orderNumber + " — Rs " + (data.total || 0) + " from " + (data.customerName || data.name || "Counter"),
        body: emailBody,
      });
    } catch (mailErr) {
      // Don't fail the order if email fails
      Logger.log("Mail error: " + mailErr);
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        orderNumber: orderNumber,
        todayCount: numbers.todayCount,
        lifetimeTotal: numbers.lifetimeTotal,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    // Signature gate for GETs too. The webhook is publicly callable; this
    // is the only thing stopping someone with the URL from reading data.
    if (
      !verifySignature_(
        e && e.parameter && e.parameter._ts,
        e && e.parameter && e.parameter._sig
      )
    ) {
      return unauthorisedResponse_();
    }

    const { orders, counter } = ensureSheets_();

    // Stats endpoint: ?stats=1 → returns counts only
    if (e.parameter && e.parameter.stats) {
      const stats = getStats_(counter);
      return ContentService.createTextOutput(
        JSON.stringify({ success: true, stats: stats })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Books endpoints: ?books=today|week|month | ?books=feed&date=today
    if (e.parameter && e.parameter.books) {
      const action = String(e.parameter.books);
      if (action === "today" || action === "week" || action === "month") {
        const agg = aggregateBooks_(action);
        return ContentService.createTextOutput(
          JSON.stringify(Object.assign({ success: true }, agg))
        ).setMimeType(ContentService.MimeType.JSON);
      }
      if (action === "feed") {
        const items = feed_(e.parameter.date || "today");
        return ContentService.createTextOutput(
          JSON.stringify({ success: true, feed: items })
        ).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Orders list endpoint: ?orders=today | ?orders=yyyy-MM-dd
    if (e.parameter && e.parameter.orders) {
      const list = listOrdersForDate_(String(e.parameter.orders));
      return ContentService.createTextOutput(
        JSON.stringify({ success: true, orders: list })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Customer history endpoint: ?phone=9876543210 | optional &limit=10
    if (e.parameter && e.parameter.phone) {
      const list = listOrdersByPhone_(
        e.parameter.phone,
        e.parameter.limit || 10
      );
      return ContentService.createTextOutput(
        JSON.stringify({ success: true, orders: list, phone: e.parameter.phone })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const param = (e.parameter && e.parameter.number) || "";
    const target = "#" + String(param).replace(/^#/, "").padStart(3, "0");

    const values = orders.getDataRange().getValues();
    // Search bottom-up so latest match wins (today's reset takes priority)
    for (let i = values.length - 1; i >= 1; i--) {
      if (values[i][0] === target) {
        let items = [];
        try {
          items = JSON.parse(values[i][3] || "[]");
        } catch (_) {
          items = [];
        }
        const order = {
          orderNumber: values[i][0],
          timestamp: values[i][1],
          source: values[i][2],
          items: items,
          subtotal: Number(values[i][4]) || 0,
          discountPercent: Number(values[i][5]) || 0,
          discountAmount: Number(values[i][6]) || 0,
          total: Number(values[i][7]) || 0,
          paymentMode: values[i][8] || "UPI",
          customerName: values[i][9] || "",
          customerPhone: values[i][10] || "",
          orderType: values[i][11] || "",
          address: values[i][12] || "",
          note: values[i][13] || "",
          rowIndex: i + 1,
        };
        return ContentService.createTextOutput(
          JSON.stringify({ success: true, order })
        ).setMimeType(ContentService.MimeType.JSON);
      }
    }
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: "Order not found" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
