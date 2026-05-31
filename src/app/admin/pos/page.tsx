import type { Metadata } from "next";
import POSClient from "./POSClient";

export const metadata: Metadata = {
  title: "BM POS",
  robots: { index: false, follow: false },
};

export default function AdminPOSPage() {
  return <POSClient />;
}
