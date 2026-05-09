import { faqs } from "@/lib/faqs";
import { menuData, type MenuItemData } from "@/lib/menuData";

const SITE_URL = "https://burger-minister.com";
const RESTAURANT_ID = `${SITE_URL}/#restaurant`;
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// ─── Real Google reviews (also used by Testimonials component) ──────────
export const realReviews = [
  {
    author: "Shorya Sagar",
    rating: 5,
    body: "I recently visited Burger Minister in Noida and I lovee his burgers and momos. His kurkure momo was soo delicious and yummy, and the service was so good. Bhaiya is very polite. Definitely coming back!",
    datePublished: "2026-04-01",
  },
  {
    author: "Madhukar Yadav",
    rating: 5,
    body: "If you're a snack lover, this place is an absolute gem! The peri peri fries are perfectly crispy with the right amount of spice. Veg momos are a total delight — soft, juicy, and packed with flavor. Highly recommended!",
    datePublished: "2026-02-01",
  },
  {
    author: "Abhishek Choudhary",
    rating: 5,
    body: "Food was delightful. I tried fried Momos and the chocolate shake. Do try their authentic burger. The portion and prices are also great. The guy was really polite and friendly. Undoubtedly I am returning back.",
    datePublished: "2026-01-12",
  },
  {
    author: "Sarwagy Singh Virat",
    rating: 5,
    body: "Bhaiya bohot ache hai, khaana bhi acha hai, must try everything. All night delivery available.",
    datePublished: "2025-12-15",
  },
  {
    author: "Kartik",
    rating: 5,
    body: "Such a tasty burger with perfectly crispy fries and kurkure momo. Loved every bite. Must try — also pocket friendly!",
    datePublished: "2026-02-05",
  },
];

// ─── Local Business / FoodEstablishment ────────────────────────────────
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": RESTAURANT_ID,
    name: "Burger Minister",
    alternateName: "BM — Burger Minister · Crowned with Flavour, Served with Pride",
    slogan: "Crowned with Flavour, Served with Pride",
    description:
      "Burger Minister is Sector 58 Noida's most-loved 100% pure-veg late-night kitchen. Handcrafted burgers, kurkure momos, BM Special fries, sandwiches, pizza, shakes and coolers — fresh to order, FSSAI-compliant, hygiene first. Daily 4 PM – 3 AM.",
    url: SITE_URL,
    telephone: "+91-9643100501",
    image: [
      `${SITE_URL}/qr-code.png`,
      "https://images.unsplash.com/photo-1660715683691-d1614d1dd361?w=1200&h=630&q=80&auto=format&fit=crop",
    ],
    priceRange: "₹₹",
    servesCuisine: ["Indian", "Fast Food", "Vegetarian", "Burgers", "Momos"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "C-44, C Block, Sector 58",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201301",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.6085",
      longitude: "77.3646",
    },
    hasMap: "https://maps.app.goo.gl/JGiLiytokNhZE2Da9",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "16:00",
        closes: "03:00",
      },
    ],
    acceptsReservations: "False",
    menu: `${SITE_URL}/menu`,
    hasMenu: { "@id": `${SITE_URL}/menu#menu` },
    paymentAccepted: "Cash, UPI, Paytm, PhonePe, Google Pay",
    currenciesAccepted: "INR",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
    review: realReviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
      reviewBody: r.body,
      datePublished: r.datePublished,
      itemReviewed: { "@id": RESTAURANT_ID },
    })),
    areaServed: [
      { "@type": "City", name: "Noida" },
      { "@type": "Place", name: "Sector 58, Noida" },
      { "@type": "Place", name: "Sector 59, Noida" },
      { "@type": "Place", name: "Sector 60, Noida" },
      { "@type": "Place", name: "Sector 61, Noida" },
      { "@type": "Place", name: "Sector 62, Noida" },
      { "@type": "Place", name: "Sector 63, Noida" },
      { "@type": "Place", name: "Sector 50, Noida" },
      { "@type": "Place", name: "Sector 51, Noida" },
      { "@type": "Place", name: "Sector 52, Noida" },
      { "@type": "Place", name: "Sector 55, Noida" },
      { "@type": "Place", name: "Sector 56, Noida" },
      { "@type": "Place", name: "Sector 57, Noida" },
      { "@type": "Place", name: "Mamura, Noida" },
      { "@type": "Place", name: "Bishanpura, Noida" },
      { "@type": "Place", name: "Hoshiyarpur, Noida" },
    ],
    sameAs: [
      "https://www.instagram.com/burger_minister562",
      "https://maps.app.goo.gl/JGiLiytokNhZE2Da9",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Organization (brand entity) ───────────────────────────────────────
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Burger Minister",
    legalName: "Burger Minister",
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    image: `${SITE_URL}/icon-512.png`,
    description:
      "Burger Minister — Crowned with Flavour, Served with Pride. A 100% pure-vegetarian late-night kitchen in Sector 58, Noida.",
    foundingDate: "2024",
    foundingLocation: {
      "@type": "Place",
      name: "Sector 58, Noida, Uttar Pradesh, India",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-9643100501",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
    sameAs: [
      "https://www.instagram.com/burger_minister562",
      "https://maps.app.goo.gl/JGiLiytokNhZE2Da9",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── WebSite + sitelinks SearchAction ──────────────────────────────────
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Burger Minister",
    alternateName: "BM",
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/menu?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── BreadcrumbList (per inner page) ──────────────────────────────────
type Crumb = { name: string; url: string };
export function BreadcrumbSchema({ trail }: { trail: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url.startsWith("http") ? c.url : `${SITE_URL}${c.url}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────
export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Menu + MenuItem for each dish (Restaurant rich results) ──────────
function priceForItem(item: MenuItemData): number {
  if (item.price !== undefined) return item.price;
  if (item.variants && item.variants.length > 0) return item.variants[0].price;
  return 0;
}

export function MenuSchema() {
  const sections = Object.entries(menuData).map(([catName, items]) => ({
    "@type": "MenuSection",
    name: catName,
    hasMenuItem: items.flatMap((item) => {
      // For variant items emit one MenuItem per variant
      if (item.variants && item.variants.length > 0) {
        return item.variants.map((v) => ({
          "@type": "MenuItem",
          name: `${item.name} (${v.label})`,
          description: item.description,
          suitableForDiet: "https://schema.org/VegetarianDiet",
          offers: {
            "@type": "Offer",
            price: v.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
        }));
      }
      return [
        {
          "@type": "MenuItem",
          name: item.name,
          description: item.description,
          suitableForDiet: "https://schema.org/VegetarianDiet",
          offers: {
            "@type": "Offer",
            price: priceForItem(item),
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
        },
      ];
    }),
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${SITE_URL}/menu#menu`,
    name: "Burger Minister Menu",
    inLanguage: "en-IN",
    hasMenuSection: sections,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
