import type { Metadata } from "next";
import { Epilogue, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Burger Minister | Premium 100% Veg Burgers in Noida",
    template: "%s | Burger Minister",
  },
  description:
    "Burger Minister — Noida's favorite 100% Pure Vegetarian burger restaurant. Premium burgers, fresh ingredients, hygiene-first kitchen. Order now!",
  keywords: [
    "burger",
    "vegetarian",
    "veg burger",
    "noida",
    "burger minister",
    "pure veg",
    "fast food",
  ],
  openGraph: {
    title: "Burger Minister | Premium 100% Veg Burgers in Noida",
    description:
      "Noida's favorite 100% Pure Vegetarian burger restaurant. Premium burgers crafted with love.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${epilogue.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
