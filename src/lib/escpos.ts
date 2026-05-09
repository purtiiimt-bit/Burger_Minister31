import type { Order } from "./orderTypes";

// ESC/POS command bytes
const ESC = 0x1b;
const GS = 0x1d;
const LF = 0x0a;

const cmd = {
  init: () => Uint8Array.of(ESC, 0x40), // ESC @
  alignLeft: () => Uint8Array.of(ESC, 0x61, 0),
  alignCenter: () => Uint8Array.of(ESC, 0x61, 1),
  alignRight: () => Uint8Array.of(ESC, 0x61, 2),
  boldOn: () => Uint8Array.of(ESC, 0x45, 1),
  boldOff: () => Uint8Array.of(ESC, 0x45, 0),
  doubleSize: () => Uint8Array.of(GS, 0x21, 0x11), // double width + height
  normalSize: () => Uint8Array.of(GS, 0x21, 0x00),
  feed: (n = 1) => Uint8Array.of(ESC, 0x64, n),
  cut: () => Uint8Array.of(GS, 0x56, 0x00), // full cut
  newline: () => Uint8Array.of(LF),
};

const enc = new TextEncoder();
const text = (s: string) => enc.encode(s);

// Concatenate Uint8Arrays
function concat(...arrs: Uint8Array[]): Uint8Array {
  const total = arrs.reduce((sum, a) => sum + a.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const a of arrs) {
    out.set(a, offset);
    offset += a.length;
  }
  return out;
}

// Right-pad name + right-align price within line width (typically 32 chars on 58mm)
function lineItem(qty: number, name: string, amount: string, width = 32): string {
  const left = `${qty}x ${name}`;
  const padding = Math.max(1, width - left.length - amount.length);
  const safeName =
    left.length + amount.length + 1 > width
      ? left.slice(0, width - amount.length - 2) + "."
      : left;
  const newPadding = Math.max(1, width - safeName.length - amount.length);
  return safeName + " ".repeat(newPadding) + amount;
}

function divider(width = 32): string {
  return "-".repeat(width);
}

function fancyDivider(width = 32): string {
  return "=".repeat(width);
}

function pad(value: string, width = 32): string {
  return value.padEnd(width).slice(0, width);
}

function rs(amount: number): string {
  // Avoid ₹ glyph (codepage compat) — use "Rs"
  return `Rs ${amount}`;
}

export function buildEscPosReceipt(order: Order): Uint8Array {
  const W = 32;

  const parts: Uint8Array[] = [];
  parts.push(cmd.init());

  // Header
  parts.push(cmd.alignCenter());
  parts.push(cmd.boldOn());
  parts.push(cmd.doubleSize());
  parts.push(text("BURGER MINISTER"));
  parts.push(cmd.newline());
  parts.push(cmd.normalSize());
  parts.push(cmd.boldOff());
  parts.push(text("Cafe & Diner * Pure Veg"));
  parts.push(cmd.newline());
  parts.push(text(fancyDivider(W)));
  parts.push(cmd.newline());
  parts.push(cmd.newline());

  // Order number — big
  parts.push(cmd.boldOn());
  parts.push(cmd.doubleSize());
  parts.push(text(`ORDER ${order.orderNumber}`));
  parts.push(cmd.newline());
  parts.push(cmd.normalSize());
  parts.push(cmd.boldOff());
  parts.push(cmd.newline());

  // Date / Time
  const dt = new Date(order.timestamp);
  const dateStr = dt.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  parts.push(text(dateStr));
  parts.push(cmd.newline());

  parts.push(cmd.alignLeft());
  parts.push(text(divider(W)));
  parts.push(cmd.newline());

  // Items
  for (const item of order.items) {
    parts.push(text(lineItem(item.quantity, item.name, rs(item.price * item.quantity), W)));
    parts.push(cmd.newline());
  }

  parts.push(text(divider(W)));
  parts.push(cmd.newline());

  // Totals
  parts.push(text(lineItem(0, "Subtotal:", rs(order.subtotal), W).replace(/^0x /, "")));
  parts.push(cmd.newline());
  if (order.discountAmount > 0) {
    parts.push(
      text(
        pad(`Discount (${order.discountPercent}%):`, W - 10) +
          `-${rs(order.discountAmount).padStart(9)}`
      )
    );
    parts.push(cmd.newline());
  }
  parts.push(cmd.boldOn());
  parts.push(cmd.doubleSize());
  parts.push(text(`TOTAL: ${rs(order.total)}`));
  parts.push(cmd.newline());
  parts.push(cmd.normalSize());
  parts.push(cmd.boldOff());

  parts.push(text(divider(W)));
  parts.push(cmd.newline());

  parts.push(text(`Payment: ${order.paymentMode}`));
  parts.push(cmd.newline());
  if (order.customerName) {
    parts.push(text(`Name:    ${order.customerName}`));
    parts.push(cmd.newline());
  }
  if (order.customerPhone) {
    parts.push(text(`Phone:   ${order.customerPhone}`));
    parts.push(cmd.newline());
  }
  parts.push(text(`Source:  ${order.source}`));
  parts.push(cmd.newline());

  parts.push(cmd.alignCenter());
  parts.push(cmd.newline());
  parts.push(text(fancyDivider(W)));
  parts.push(cmd.newline());
  parts.push(text("Thank you for visiting!"));
  parts.push(cmd.newline());
  parts.push(text("Sec 58, Noida"));
  parts.push(cmd.newline());
  parts.push(text(fancyDivider(W)));
  parts.push(cmd.newline());

  parts.push(cmd.feed(4));
  parts.push(cmd.cut());

  return concat(...parts);
}
