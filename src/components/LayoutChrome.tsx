"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Wraps the page with Navbar/Footer except on admin routes (which run their own UI)
export default function LayoutChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const bare = path?.startsWith("/admin");

  if (bare) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
