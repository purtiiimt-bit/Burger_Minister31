// Web Bluetooth thermal printer (ESC/POS)
// Works in Chrome on Android / desktop. Not supported in Safari iOS.

import type { Order } from "./orderTypes";
import { buildEscPosReceipt } from "./escpos";

const PRINTER_SERVICE_UUID = "000018f0-0000-1000-8000-00805f9b34fb";
const PRINTER_CHAR_UUID = "00002af1-0000-1000-8000-00805f9b34fb";

let cachedChar: BluetoothRemoteGATTCharacteristic | null = null;

export function isPrinterSupported(): boolean {
  if (typeof navigator === "undefined") return false;
  return "bluetooth" in navigator;
}

export async function connectPrinter(): Promise<BluetoothRemoteGATTCharacteristic> {
  if (cachedChar && cachedChar.service.device.gatt?.connected) return cachedChar;

  if (!isPrinterSupported()) {
    throw new Error(
      "Web Bluetooth not supported on this browser. Use Chrome on Android."
    );
  }

  const device = await navigator.bluetooth!.requestDevice({
    filters: [{ services: [PRINTER_SERVICE_UUID] }],
    optionalServices: [PRINTER_SERVICE_UUID],
  });

  if (!device.gatt) throw new Error("No GATT on device");

  const server = await device.gatt.connect();
  const service = await server.getPrimaryService(PRINTER_SERVICE_UUID);
  const char = await service.getCharacteristic(PRINTER_CHAR_UUID);
  cachedChar = char;
  return char;
}

export function disconnectPrinter() {
  if (cachedChar?.service.device.gatt?.connected) {
    cachedChar.service.device.gatt.disconnect();
  }
  cachedChar = null;
}

export async function printOrder(order: Order): Promise<void> {
  const char = await connectPrinter();
  const bytes = buildEscPosReceipt(order);

  // Bluetooth LE has a typical 20-byte (sometimes up to 244) MTU.
  // Chunking at 20 bytes is the safe default for cheap thermal printers.
  const CHUNK = 20;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    const chunk = bytes.slice(i, i + CHUNK);
    await char.writeValue(chunk);
  }
}
