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
const TZ = "Asia/Kolkata";
const NOTIFY_EMAIL = "Burgerminister38@gmail.com"; // owner email for new-order alerts

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

// Increments BOTH today's counter (daily reset) and lifetime counter (never resets)
function nextOrderNumber_(counter) {
  const today = Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd");
  const lastDate = counter.getRange("A1").getValue();
  let n = Number(counter.getRange("B1").getValue() || 0);
  let lifetime = Number(counter.getRange("C1").getValue() || 0);

  if (lastDate !== today) {
    n = 0;
    counter.getRange("A1").setValue(today);
  }
  n += 1;
  lifetime += 1;
  counter.getRange("B1").setValue(n);
  counter.getRange("C1").setValue(lifetime);

  return {
    orderNumber: "#" + String(n).padStart(3, "0"),
    todayCount: n,
    lifetimeTotal: lifetime,
  };
}

function getStats_(counter) {
  const today = Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd");
  const lastDate = counter.getRange("A1").getValue();
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

function doPost(e) {
  try {
    const { orders, counter } = ensureSheets_();
    const data = JSON.parse(e.postData.contents);
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
    const { orders, counter } = ensureSheets_();

    // Stats endpoint: ?stats=1 → returns counts only
    if (e.parameter && e.parameter.stats) {
      const stats = getStats_(counter);
      return ContentService.createTextOutput(
        JSON.stringify({ success: true, stats })
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
