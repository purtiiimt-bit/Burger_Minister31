import { faqs } from "@/lib/faqs";

const SITE_URL = "https://burger-minister.com";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": `${SITE_URL}/#restaurant`,
    name: "Burger Minister",
    alternateName: "Burger Minister - Best Veg Burgers in Noida",
    description:
      "100% Pure Vegetarian burger restaurant in Sector 58, Noida. Premium veg burgers, momos, sandwiches, fries, pizza, shakes and more. Fresh daily, hygiene first.",
    url: SITE_URL,
    telephone: "+91-9643100501",
    image: `${SITE_URL}/qr-code.png`,
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
    hasMenu: `${SITE_URL}/menu`,
    paymentAccepted: "Cash, UPI, Paytm, PhonePe, Google Pay",
    currenciesAccepted: "INR",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: [
      { "@type": "City", name: "Noida" },
      { "@type": "Place", name: "Sector 58, Noida" },
      { "@type": "Place", name: "Sector 59, Noida" },
      { "@type": "Place", name: "Sector 62, Noida" },
      { "@type": "Place", name: "Sector 63, Noida" },
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

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
