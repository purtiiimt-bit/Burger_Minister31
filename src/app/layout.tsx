import type { Metadata } from "next";
import { Epilogue, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LayoutChrome from "@/components/LayoutChrome";
import PWARegister from "@/components/PWARegister";
import { CartProvider } from "@/context/CartContext";
import {
  LocalBusinessSchema,
  OrganizationSchema,
  WebSiteSchema,
} from "@/components/Schema";

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
    default: "Burger Minister, Pure Veg Cafe in Sector 58 Noida",
    template: "%s",
  },
  description:
    "100% pure vegetarian dine-in cafe at D13, Bhaiji Market, Sector 58, Noida. Burgers, momos, pizza, fries, shakes. Open daily 11 AM to 11 PM.",
  keywords: [
    // Brand
    "burger minister",
    "burger minister noida",
    "burger minister sector 58",
    // Core veg / category
    "best veg burger in noida",
    "veg burger noida",
    "pure veg restaurant sector 58 noida",
    "100% vegetarian restaurant noida",
    "kurkure momos noida",
    "veg momos noida",
    "paneer momos noida",
    "peri peri momos noida",
    "veg sandwich noida",
    "cheese burger noida",
    "paneer burger noida",
    "aloo tikki burger noida",
    "veg pizza noida",
    "milkshake noida",
    "cold coffee noida",
    "loaded fries noida",
    // Late night
    "late night food noida",
    "late night veg food noida",
    "late night delivery sector 58",
    "open till 3 am noida",
    // Sectors within ~3km of Sector 58
    "food delivery sector 58 noida",
    "burger delivery sector 58",
    "veg restaurant sector 58 noida",
    "veg restaurant sector 59 noida",
    "veg restaurant sector 60 noida",
    "veg restaurant sector 61 noida",
    "veg restaurant sector 62 noida",
    "veg restaurant sector 63 noida",
    "veg restaurant sector 50 noida",
    "veg restaurant sector 51 noida",
    "veg restaurant sector 52 noida",
    "veg restaurant sector 55 noida",
    "veg restaurant sector 56 noida",
    "veg restaurant sector 57 noida",
    // Nearby colonies / villages (within ~3km)
    "mamura noida food",
    "bishanpura noida food",
    "hoshiyarpur noida food",
    // Landmarks (within ~3km of Sector 58)
    "food near sector 62 it park",
    "food near stellar it park",
    "food near mahagun mall",
    "food near sector 51 metro",
    "food near sector 52 metro",
    // Catering / parties
    "veg catering sector 58 noida",
    "bulk veg burger order noida",
    "office party food sector 58",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Burger Minister. Crowned with Flavour, Served with Pride",
    description:
      "100% pure vegetarian dine-in restaurant in Sector 58 Noida. Handcrafted burgers, fresh momos, BM Special fries, milkshakes and more, made fresh to order. Open 11 AM to 11 PM.",
    url: "https://burger-minister.com",
    siteName: "Burger Minister",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1660715683691-d1614d1dd361?w=1200&h=630&q=80&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Burger Minister. 100% pure veg burgers, Sector 58 Noida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Burger Minister. Crowned with Flavour, Served with Pride",
    description:
      "Sector 58 Noida's pure veg dine-in restaurant. Burgers, momos, fries and shakes, made fresh to order. Open 11 AM to 11 PM.",
    images: [
      "https://images.unsplash.com/photo-1660715683691-d1614d1dd361?w=1200&h=630&q=80&auto=format&fit=crop",
    ],
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
  manifest: "/manifest.json",
  themeColor: "#16130b",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    title: "Burger Minister",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
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
        <PWARegister />
        <OrganizationSchema />
        <WebSiteSchema />
        <LocalBusinessSchema />
        <CartProvider>
          <LayoutChrome>{children}</LayoutChrome>
        </CartProvider>
      </body>
    </html>
  );
}
