import { NextResponse } from "next/server";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
};

type OrderData = {
  name: string;
  phone: string;
  address: string;
  orderType: string;
  note: string;
  items: OrderItem[];
  subtotal?: number;
  coupon?: string | null;
  discount?: number;
  freeFries?: boolean;
  totalPrice: number;
};

export async function POST(request: Request) {
  try {
    const order: OrderData = await request.json();

    const itemsList = order.items
      .map((i) => `${i.name} x${i.quantity} = ₹${i.subtotal}`)
      .join("\n");

    const orderSummary = `
NEW ORDER - Burger Minister
============================
Name: ${order.name}
Phone: ${order.phone}
Order Type: ${order.orderType}
Address: ${order.address || "N/A (Pickup)"}
Note: ${order.note || "None"}

Items:
${itemsList}

TOTAL: ₹${order.totalPrice}
============================
Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
    `.trim();

    let orderNumber = "";

    // Fallback generator: timestamp-based 3-digit number (uniqueness within a day is fine)
    // Used only if Apps Script doesn't return one (i.e. before script is updated)
    const fallbackOrderNumber = () => {
      const now = new Date();
      // IST minutes since midnight, then mod to 3 digits + a random 0-9 nudge for uniqueness
      const ist = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
      const minutesIntoDay = ist.getHours() * 60 + ist.getMinutes();
      // base from minutes (0-1439) + random tail so back-to-back orders differ
      const base = (minutesIntoDay % 999) + 1;
      const tail = Math.floor(Math.random() * 10);
      const num = ((base * 10 + tail) % 999) + 1;
      return "#" + String(num).padStart(3, "0");
    };

    // 1. Send to Google Sheets via Apps Script webhook → returns orderNumber
    const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK;
    if (sheetUrl) {
      try {
        const res = await fetch(sheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // ─── New keys (used by updated Apps Script v2) ───
            source: "WEBSITE",
            customerName: order.name,
            customerPhone: order.phone,
            orderType: order.orderType,
            address: order.address || "Pickup",
            note: order.note || "",
            // Items: legacy script reads this as a plain string for email body
            items: itemsList,
            // New script reads itemsArray for structured logging
            itemsArray: order.items.map((i) => ({
              name: i.name,
              quantity: i.quantity,
              price: i.price,
            })),
            subtotal: order.subtotal ?? order.totalPrice,
            coupon: order.coupon || "",
            discountAmount: order.discount || 0,
            freeFries: !!order.freeFries,
            paymentMode: "UPI",
            total: order.totalPrice,
            time: new Date().toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            }),
            // ─── Legacy keys (used by older Apps Script email handler) ───
            name: order.name,
            phone: order.phone,
            type: order.orderType,
            itemsText: itemsList,
          }),
        });
        const data = await res.json().catch(() => null);
        if (data?.orderNumber) orderNumber = data.orderNumber;
      } catch (err) {
        console.error("Google Sheets error:", err);
      }
    }

    // Fallback if sheet didn't return one (old Apps Script or webhook unavailable)
    if (!orderNumber) orderNumber = fallbackOrderNumber();

    // 2. Send email via Web3Forms
    const web3formsKey = process.env.WEB3FORMS_KEY;
    if (web3formsKey) {
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: `🍔 ${orderNumber || "New Order"} — ₹${order.totalPrice} from ${order.name}`,
            message:
              (orderNumber ? `Order Number: ${orderNumber}\n\n` : "") +
              orderSummary,
            from_name: "Burger Minister Orders",
          }),
        });
      } catch (err) {
        console.error("Email error:", err);
      }
    }

    console.log("\n" + (orderNumber ? `[${orderNumber}] ` : "") + orderSummary + "\n");

    return NextResponse.json({ success: true, orderNumber });
  } catch {
    return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
  }
}
