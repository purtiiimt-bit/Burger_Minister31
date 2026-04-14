import type { Metadata } from "next";
import { Epilogue, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { LocalBusinessSchema } from "@/components/Schema";

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
  metadataBase: new URL("https://burger-minister.com"),
  title: {
    default: "Burger Minister | Best 100% Veg Burgers in Sector 58, Noida",
    template: "%s | Burger Minister",
  },
  description:
    "Burger Minister — Noida's favorite 100% Pure Vegetarian burger restaurant in Sector 58. Premium veg burgers, momos, fries, sandwiches, pizza & shakes. Fresh daily. Order online!",
  keywords: [
    "burger minister",
    "veg burger noida",
    "best veg burger in noida",
    "pure veg restaurant sector 58",
    "vegetarian burger noida",
    "momos noida",
    "veg fast food noida",
    "burger delivery noida",
    "sector 58 restaurant",
    "kurkure momos noida",
    "paneer burger",
    "cheese burger noida",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Burger Minister | Best 100% Veg Burgers in Sector 58, Noida",
    description:
      "Noida's favorite 100% Pure Vegetarian burger restaurant. Premium burgers, momos, fries & more crafted fresh daily.",
    url: "https://burger-minister.com",
    siteName: "Burger Minister",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Burger Minister | Best 100% Veg Burgers in Noida",
    description:
      "Noida's favorite 100% Pure Vegetarian burger restaurant. Order now!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <LocalBusinessSchema />
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
