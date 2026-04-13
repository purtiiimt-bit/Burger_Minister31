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
  totalPrice: number;
};

export async function POST(request: Request) {
  try {
    const order: OrderData = await request.json();

    // Format order items for display
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

    // 1. Send to Google Sheets via Apps Script webhook
    const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK;
    if (sheetUrl) {
      try {
        await fetch(sheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: order.name,
            phone: order.phone,
            orderType: order.orderType,
            address: order.address || "Pickup",
            items: itemsList,
            total: order.totalPrice,
            note: order.note || "",
            time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          }),
        });
      } catch (err) {
        console.error("Google Sheets error:", err);
      }
    }

    // 2. Send email via Web3Forms (free — 250/month)
    const web3formsKey = process.env.WEB3FORMS_KEY;
    if (web3formsKey) {
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: `🍔 New Order — ₹${order.totalPrice} from ${order.name}`,
            message: orderSummary,
            from_name: "Burger Minister Orders",
          }),
        });
      } catch (err) {
        console.error("Email error:", err);
      }
    }

    // Log to console as fallback
    console.log("\n" + orderSummary + "\n");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
  }
}
