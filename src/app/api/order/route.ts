import { NextResponse } from "next/server";
import { validateCustomerOrder } from "@/lib/orderValidation";
import { postSigned } from "@/lib/appsScript";

// Mirrored from CartContext for the email summary builder. Kept here so this
// server route never crosses the "use client" boundary.
const FREE_FRIES_ITEM = "Classic Salted Fries (Half), FREE";

type ClientItem = {
  name: string;
  quantity: number;
  price?: number;
  subtotal?: number;
};

type ClientOrder = {
  name: string;
  phone: string;
  address: string;
  orderType: string;
  note: string;
  items: ClientItem[];
  subtotal?: number;
  coupon?: string | null;
  discount?: number;
  freeFries?: boolean;
  totalPrice?: number;
};

export async function POST(request: Request) {
  let order: ClientOrder;
  try {
    order = (await request.json()) as ClientOrder;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // ── Server-side validation. NEVER trust client prices ──────────────────
  const validation = validateCustomerOrder({
    items: order.items,
    coupon: order.coupon,
  });
  if (!validation.ok) {
    return NextResponse.json(
      { error: validation.reason, success: false },
      { status: 400 }
    );
  }
  const safe = validation.order;

  // Light sanity on customer details
  const customerName = String(order.name || "").slice(0, 80).trim();
  const customerPhone = String(order.phone || "")
    .replace(/[^0-9+]/g, "")
    .slice(0, 15);
  if (!customerName || !customerPhone) {
    return NextResponse.json(
      { error: "Name and phone required", success: false },
      { status: 400 }
    );
  }
  const orderType = String(order.orderType || "pickup").slice(0, 40);
  const address = String(order.address || "").slice(0, 250);
  const note = String(order.note || "").slice(0, 250);

  // Items for the email + sheet log (built from validated server-side values)
  const itemsText = safe.items
    .map((i) =>
      i.name === FREE_FRIES_ITEM
        ? `${i.name} (complimentary)`
        : `${i.name} x${i.quantity} = ₹${i.subtotal}`
    )
    .join("\n");

  const orderSummary = `
NEW ORDER - Burger Minister
============================
Name: ${customerName}
Phone: ${customerPhone}
Order Type: ${orderType}
Address: ${address || "N/A (Pickup)"}
Note: ${note || "None"}

Items:
${itemsText}

Subtotal: ₹${safe.subtotal}
${safe.discountAmount > 0 ? `Discount (${safe.coupon}): -₹${safe.discountAmount}\n` : ""}${safe.freeFriesEarned ? "Free Fries: YES\n" : ""}TOTAL: ₹${safe.total}
============================
Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
  `.trim();

  // Fallback order number used only if Apps Script is unreachable.
  const fallbackOrderNumber = () =>
    "#" + String((Date.now() % 9999) + 1).padStart(4, "0");

  let orderNumber = "";

  const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  if (sheetUrl) {
    try {
      const data = (await postSigned(sheetUrl, {
        // New-format keys
        source: "WEBSITE",
        customerName,
        customerPhone,
        orderType,
        address: address || "Pickup",
        note,
        items: itemsText, // legacy script reads this as a string in email body
        itemsArray: safe.items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
        subtotal: safe.subtotal,
        coupon: safe.coupon || "",
        discountAmount: safe.discountAmount,
        discountPercent: safe.discountPercent,
        freeFries: safe.freeFriesEarned,
        paymentMode: "UPI",
        total: safe.total,
        time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        // Legacy keys
        name: customerName,
        phone: customerPhone,
        type: orderType,
        itemsText,
      })) as { orderNumber?: string } | null;
      if (data?.orderNumber) orderNumber = data.orderNumber;
    } catch (err) {
      console.error("Google Sheets error:", err);
    }
  }

  if (!orderNumber) orderNumber = fallbackOrderNumber();

  // Email via Web3Forms (independent of Apps Script email)
  const web3formsKey = process.env.WEB3FORMS_KEY;
  if (web3formsKey) {
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `🍔 ${orderNumber} (₹${safe.total}) from ${customerName}`,
          message: `Order Number: ${orderNumber}\n\n${orderSummary}`,
          from_name: "Burger Minister Orders",
        }),
      });
    } catch (err) {
      console.error("Email error:", err);
    }
  }

  console.log("\n[" + orderNumber + "] " + orderSummary + "\n");

  return NextResponse.json({
    success: true,
    orderNumber,
    total: safe.total,
    subtotal: safe.subtotal,
    discountAmount: safe.discountAmount,
    freeFriesEarned: safe.freeFriesEarned,
  });
}
