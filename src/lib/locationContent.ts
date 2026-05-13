// Local-SEO landing pages for sectors within 3 km of our Sector 58 outlet.
// Each page is hand-written, English, no em-dashes, keyword-rich for the target sector.

export type LocationFAQ = { q: string; a: string };
export type PopularItem = { slug: string; name: string; price: number; tagline: string };

export type Location = {
  slug: string; // /near/{slug}
  sectorLabel: string; // "Sector 62, Noida"
  sectorShort: string; // "Sector 62"
  isHome?: boolean; // true for the sector that contains our outlet (Sector 58)
  distanceKm: string; // "2.5 km"
  travelTime: string; // "8 minutes by auto, 5 minutes by car"
  title: string;
  metaDescription: string;
  h1: string;
  intro: string; // first paragraph after H1
  whyVisit: string; // second paragraph: why visitors choose us
  landmarks: string[]; // landmarks near this sector
  directions: string; // how to find us from this sector
  popular: PopularItem[]; // 3 top-seller items linked
  faqs: LocationFAQ[];
};

export const locationContent: Record<string, Location> = {
  "sector-58-noida": {
    slug: "sector-58-noida",
    sectorLabel: "Sector 58, Noida",
    sectorShort: "Sector 58",
    isHome: true,
    distanceKm: "Right here",
    travelTime: "A 2-minute walk inside Bhaiji Market",
    title: "Burger Minister Sector 58 Noida, D13 Bhaiji Market Pure Veg",
    metaDescription:
      "Burger Minister is a 100% pure veg cafe at D13, Bhaiji Market, Sector 58, Noida. Burgers from ₹59, momos, shakes. Dine-in 11 AM to 11 PM, all 7 days.",
    h1: "Burger Minister in Sector 58, Noida",
    intro:
      "We are right here in Sector 58. Burger Minister sits at D13 in Bhaiji Market, the small commercial pocket every Sector 58 resident already knows. If you live in the Sector 58 society blocks, work in the small offices along the main road, or shop in Bhaiji Market on weekends, we are likely the closest pure veg cafe to you.",
    whyVisit:
      "Sector 58 regulars come back to us for the same three reasons. The food is 100% pure vegetarian, the kitchen is FSSAI compliant, and the prices stay friendly. A Classic Burger is ₹59. A Kurkure Veg Momos half plate is ₹70. A full lunch combo starts at ₹169. We make everything fresh to order, dine-in only, in a small clean space that fits eight to ten people inside.",
    landmarks: [
      "Inside Bhaiji Market, D Block",
      "Sector 58 main road",
      "Walking distance from Sector 58 society blocks",
      "Near the Sector 58 Bishanpura crossing",
    ],
    directions:
      "From any Sector 58 society block, walk to Bhaiji Market and look for D13. We are on the ground floor with a bright Burger Minister sign and a small dine-in seating area. From the Sector 58 main road, enter Bhaiji Market from the D Block side and we are the second shop on the right.",
    popular: [
      {
        slug: "classic-burger",
        name: "Classic Burger",
        price: 59,
        tagline: "The everyday burger most Sector 58 walk-ins order first.",
      },
      {
        slug: "kurkure-veg-momos",
        name: "Kurkure Veg Momos",
        price: 70,
        tagline: "Our bestseller and the most reordered item from regulars.",
      },
      {
        slug: "solo-minister-combo",
        name: "The Solo Minister Combo",
        price: 169,
        tagline: "Burger, fries, and a Coke. A full quick lunch for ₹169.",
      },
    ],
    faqs: [
      {
        q: "Where exactly is Burger Minister in Sector 58 Noida?",
        a: "We are at D13, Bhaiji Market, Sector 58, Noida, Uttar Pradesh 201301. Inside Bhaiji Market on the D Block side, ground floor.",
      },
      {
        q: "Is there parking near the Sector 58 outlet?",
        a: "Yes. There is open parking right outside Bhaiji Market for two-wheelers and a few cars. On weekends evenings it can fill up, so weekday lunches are usually easy.",
      },
      {
        q: "Do you offer dine-in seating in Sector 58?",
        a: "Yes. We have a small dine-in area inside the outlet that seats eight to ten people. Pickup at the counter is also available if you want to take it home.",
      },
      {
        q: "What are your hours in Sector 58?",
        a: "We are open from 11 AM to 11 PM every day, including weekends. The kitchen takes the last order around 10:45 PM.",
      },
    ],
  },

  "sector-62-noida": {
    slug: "sector-62-noida",
    sectorLabel: "Sector 62, Noida",
    sectorShort: "Sector 62",
    distanceKm: "Around 2.5 km",
    travelTime: "8 minutes by auto, 5 minutes by car",
    title: "Veg Restaurant Near Sector 62 Noida, Burger Minister Cafe",
    metaDescription:
      "Looking for a pure veg restaurant near Sector 62 Noida? Burger Minister at D13 Bhaiji Market is 2.5 km from Stellar IT Park. Burgers from ₹59, open 11 AM to 11 PM.",
    h1: "Veg Restaurant Near Sector 62, Noida",
    intro:
      "If you work in Sector 62 and want a quick pure veg lunch, Burger Minister is one of the closest dine-in cafes. We are about 2.5 km away at D13 Bhaiji Market in Sector 58, which is roughly an 8-minute auto ride or 5 minutes by car from Stellar IT Park, Advant Navis, or Embassy Galaxy. A lot of our weekday lunch regulars come from these offices.",
    whyVisit:
      "Office crowds from Sector 62 pick us for three practical reasons. First, the price. A Classic Burger is ₹59, a combo is ₹169, so the entire team can eat without checking the menu twice. Second, the speed. We make everything to order in 8 to 12 minutes, so you can be back at your desk inside the hour. Third, the food is 100% pure vegetarian and fresh, which suits mixed-diet teams where someone is always avoiding meat.",
    landmarks: [
      "Stellar IT Park",
      "Advant Navis Business Park",
      "Embassy Galaxy",
      "Felix Hospital",
      "Sector 62 main commercial belt",
    ],
    directions:
      "From Stellar IT Park, take the road towards the Sector 58 Bishanpura crossing. Turn into Bhaiji Market in Sector 58 from the D Block side. We are at D13, the second shop on the right. Most autos know Bhaiji Market by name.",
    popular: [
      {
        slug: "solo-minister-combo",
        name: "The Solo Minister Combo",
        price: 169,
        tagline: "The fastest full lunch for one person, burger plus fries plus Coke.",
      },
      {
        slug: "cheese-loaded-burger",
        name: "Cheese Loaded Burger",
        price: 139,
        tagline: "The reorder favourite for cheese-loving office colleagues.",
      },
      {
        slug: "kurkure-veg-momos",
        name: "Kurkure Veg Momos",
        price: 70,
        tagline: "Bestselling momos. Easy to share with a couple of colleagues.",
      },
    ],
    faqs: [
      {
        q: "How far is Burger Minister from Sector 62 Noida?",
        a: "About 2.5 km. By auto it is roughly an 8-minute ride. By car it is closer to 5 minutes with light traffic. Most rides cost around ₹40 to ₹60 one way.",
      },
      {
        q: "Can I order in bulk for an office lunch from Sector 62?",
        a: "Yes. For a team lunch, give us a call at +91 9643100501 at least 30 minutes ahead. For 20+ plates, we recommend ordering an hour ahead so we can prep without rushing.",
      },
      {
        q: "Is Burger Minister pure vegetarian?",
        a: "Yes. The kitchen is 100% pure vegetarian, FSSAI compliant. No meat, no chicken, no eggs are used. Suitable for mixed-diet teams from Sector 62.",
      },
      {
        q: "Are you open during Sector 62 office lunch hours?",
        a: "Yes. We open at 11 AM and stay open till 11 PM, all 7 days. Our peak lunch window is 12:30 to 2:30 PM, when Sector 62 offices come in.",
      },
    ],
  },

  "bishanpura-noida": {
    slug: "bishanpura-noida",
    sectorLabel: "Bishanpura, Noida",
    sectorShort: "Bishanpura",
    distanceKm: "Less than 1 km",
    travelTime: "About 5 minutes on foot",
    title: "Pure Veg Cafe Near Bishanpura Noida, Burger Minister Sector 58",
    metaDescription:
      "Burger Minister is a pure veg cafe near Bishanpura Noida, a 5-minute walk away at D13 Bhaiji Market, Sector 58. Family-friendly, dine-in, open 11 AM to 11 PM.",
    h1: "Burger Minister Near Bishanpura, Noida",
    intro:
      "Bishanpura and our outlet share a wall, almost. Burger Minister sits at D13 Bhaiji Market in Sector 58, less than a kilometre from Bishanpura colony. Most of our walk-in regulars are Bishanpura residents who drop in for an evening burger or pick up a shake on the way back from the market.",
    whyVisit:
      "If you live in Bishanpura, you do not need to plan a meal out at our cafe. It is a 5-minute walk. We are open from 11 AM to 11 PM, every single day, including Sundays. Bring the family for a weekend dinner or come solo for a quick after-work bite. We keep the menu 100% pure vegetarian, the food fresh to order, and the prices friendly so it works as both a treat and a regular stop.",
    landmarks: [
      "Bishanpura main lane",
      "Bishanpura colony entrance",
      "Adjacent to Sector 58",
      "Near the Sector 58 Bishanpura crossing",
    ],
    directions:
      "From Bishanpura, walk towards the Sector 58 side at the crossing. Enter Bhaiji Market in Sector 58 and look for D13 on the ground floor. The Burger Minister sign is visible from the entry. It is one of the shortest walks to a sit-down veg cafe from Bishanpura colony.",
    popular: [
      {
        slug: "steam-veg-momos",
        name: "Steam Veg Momos",
        price: 45,
        tagline: "A light snack stop on the way back from Bhaiji Market.",
      },
      {
        slug: "classic-sandwich",
        name: "Classic Sandwich",
        price: 99,
        tagline: "A quick weeknight grab for Bishanpura residents.",
      },
      {
        slug: "mint-mojito",
        name: "Mint Mojito",
        price: 79,
        tagline: "Most ordered cooler for the walk home in summer.",
      },
    ],
    faqs: [
      {
        q: "How close is Burger Minister to Bishanpura Noida?",
        a: "Less than 1 km. It is a 5-minute walk from most parts of Bishanpura. No auto or car needed for a regular visit.",
      },
      {
        q: "Is the Bishanpura nearby outlet family friendly?",
        a: "Yes. We are 100% pure vegetarian, the food is mild by default, and we have a small dine-in area that works for families. Kids enjoy the Classic Burger, Steam Momos, and Strawberry Shake combinations.",
      },
      {
        q: "Can I do a quick takeaway from Bishanpura?",
        a: "Yes. Walk in, place your order at the counter, and we usually have it ready in 8 to 12 minutes. Faster for momos and sandwiches, a little longer for burgers and combos.",
      },
      {
        q: "Are you open in the evening for Bishanpura walk-ins?",
        a: "Yes. We are open every evening till 11 PM, all 7 days. Saturday and Sunday evenings are busiest, so walk in by 9 PM if you want a calmer dine-in seat.",
      },
    ],
  },

  "sector-57-noida": {
    slug: "sector-57-noida",
    sectorLabel: "Sector 57, Noida",
    sectorShort: "Sector 57",
    distanceKm: "About 1.5 km",
    travelTime: "5 minutes by auto or scooter",
    title: "Veg Cafe Near Sector 57 Noida, Burger Minister at Sector 58",
    metaDescription:
      "Pure veg cafe near Sector 57 Noida. Burger Minister at D13 Bhaiji Market, Sector 58, is 1.5 km away. Burgers from ₹59, momos, shakes. Dine-in 11 AM to 11 PM.",
    h1: "Pure Veg Cafe Near Sector 57, Noida",
    intro:
      "Sector 57 residents are some of our most regular customers. Burger Minister is about 1.5 km from Sector 57 at D13 Bhaiji Market, Sector 58. The auto ride takes 5 to 7 minutes and the scooter ride is even shorter. A lot of school and college students from Sector 57 drop in after class for momos and a shake.",
    whyVisit:
      "Sector 57 picks us for three reasons. The menu is 100% pure vegetarian. The prices stay student friendly with burgers from ₹59 and snacks under ₹100. And the kitchen is fast, so a quick afternoon stop fits inside a tuition break. We have a small clean dine-in space that seats eight to ten, perfect for a friends' catch-up.",
    landmarks: [
      "Sector 57 main road",
      "Sector 57 residential blocks",
      "Schools in Sector 57",
      "Common Sector 57 to Sector 58 connector road",
    ],
    directions:
      "From Sector 57, take the connector road to Sector 58. Once on the Sector 58 main road, look for Bhaiji Market on the D Block side and enter. We are at D13, ground floor.",
    popular: [
      {
        slug: "cheesy-burger",
        name: "Cheesy Burger",
        price: 79,
        tagline: "The most ordered burger from Sector 57 students and young professionals.",
      },
      {
        slug: "kurkure-veg-momos",
        name: "Kurkure Veg Momos",
        price: 70,
        tagline: "Crunchy bestseller, easy to share with two or three friends.",
      },
      {
        slug: "oreo-shake",
        name: "Oreo Shake",
        price: 109,
        tagline: "Sweet finish for the ride back to Sector 57.",
      },
    ],
    faqs: [
      {
        q: "How far is Burger Minister from Sector 57 Noida?",
        a: "Around 1.5 km. The auto ride is 5 to 7 minutes and costs about ₹40. A scooter takes 3 to 4 minutes.",
      },
      {
        q: "Is Burger Minister good for Sector 57 students?",
        a: "Yes. We are 100% pure veg and prices start at ₹59 for a Classic Burger. Snacks like Veg Sticks, Cheese Corn Triangles, and Garlic Potato Pops are all under ₹80 per portion.",
      },
      {
        q: "Can I get a quick dine-in seat after class?",
        a: "Yes. Afternoons after 3 PM are usually quiet. By 7 PM the evening rush starts. Weekdays are easier than weekends for a relaxed sit-down meal.",
      },
      {
        q: "Do you have combo meals?",
        a: "Yes. Our Royal Combos start at ₹169 for The Solo Minister Combo, which includes a Classic Burger, fries, and a Coke. Six combos in total, all 100% pure veg.",
      },
    ],
  },

  "sector-61-noida": {
    slug: "sector-61-noida",
    sectorLabel: "Sector 61, Noida",
    sectorShort: "Sector 61",
    distanceKm: "About 1.5 km",
    travelTime: "5 minutes by auto or scooter",
    title: "Veg Burgers Near Sector 61 Noida, Burger Minister Cafe",
    metaDescription:
      "Veg burgers and momos near Sector 61 Noida. Burger Minister is 1.5 km away at D13 Bhaiji Market, Sector 58. Dine-in, 100% pure veg, open 11 AM to 11 PM.",
    h1: "Veg Burgers Near Sector 61, Noida",
    intro:
      "Sector 61 sits just across the main road from Sector 58. Burger Minister is at D13 Bhaiji Market in Sector 58, about 1.5 km from most parts of Sector 61. The drive or auto is 5 minutes, the scooter is shorter, and many of our regulars from Sector 61 just bike across in the evening for a fresh meal.",
    whyVisit:
      "Sector 61 chooses us for the simple reasons. The food is 100% pure vegetarian. The kitchen is FSSAI compliant. And the menu has variety, so burgers, sandwiches, momos, pizzas, shakes, and coolers all live in one place. A family of four can eat well for under ₹600 with a Royal Combo and a couple of mojitos.",
    landmarks: [
      "Sector 61 residential blocks",
      "Sector 61 park",
      "Sector 61 to Sector 58 main road connector",
      "Bhaiji Market in Sector 58",
    ],
    directions:
      "From Sector 61, head across the Sector 58 Sector 61 dividing road and enter Bhaiji Market on the D Block side. We are at D13, ground floor. Most Sector 61 residents already know Bhaiji Market by name.",
    popular: [
      {
        slug: "cheese-loaded-burger",
        name: "Cheese Loaded Burger",
        price: 139,
        tagline: "Family favourite at our outlet, often ordered by Sector 61 regulars.",
      },
      {
        slug: "paneer-power-combo",
        name: "The Paneer Power Combo",
        price: 229,
        tagline: "A full meal for one. Paneer Burger plus fries plus a Mint Mojito.",
      },
      {
        slug: "kurkure-paneer-momos",
        name: "Kurkure Paneer Momos",
        price: 80,
        tagline: "Crunchy paneer momos, perfect to share between two.",
      },
    ],
    faqs: [
      {
        q: "How far is Burger Minister from Sector 61 Noida?",
        a: "Around 1.5 km, just across the main road. The auto ride is 4 to 5 minutes. On a scooter you can be at the counter in under 3 minutes.",
      },
      {
        q: "Can I get a family meal from Sector 61?",
        a: "Yes. Our Group Platter at ₹299 feeds 4 to 5 people as snacks. Or pair a few combos. A family of four eats well for under ₹600 with combos and mojitos.",
      },
      {
        q: "Do you serve pizzas?",
        a: "Yes. We do 8 inch handcrafted pizzas. Margherita is ₹139, Farmhouse is ₹169, Cheese Loaded is ₹199. All 100% pure vegetarian.",
      },
      {
        q: "What are the best snacks for the ride back?",
        a: "Garlic Potato Pops (₹60), Veg Sticks (₹60), and Cheese Corn Triangles (₹80) all travel well. Mojitos travel well too if you ask for a sealed cup.",
      },
    ],
  },

  "sector-55-noida": {
    slug: "sector-55-noida",
    sectorLabel: "Sector 55, Noida",
    sectorShort: "Sector 55",
    distanceKm: "About 2.5 km",
    travelTime: "6 to 8 minutes by auto, 5 minutes by car",
    title: "Veg Restaurant Near Sector 55 Noida, Burger Minister at Sector 58",
    metaDescription:
      "Pure veg restaurant near Sector 55 Noida. Burger Minister is 2.5 km away at D13 Bhaiji Market, Sector 58. Burgers from ₹59, momos, milkshakes. Daily 11 AM to 11 PM.",
    h1: "Pure Veg Restaurant Near Sector 55, Noida",
    intro:
      "Sector 55 is one of the older residential pockets near our outlet. Burger Minister is at D13 Bhaiji Market in Sector 58, about 2.5 km from Sector 55. The auto ride takes 6 to 8 minutes and the drive is 5 minutes with normal traffic. Several Sector 55 families have us on their weekend rotation.",
    whyVisit:
      "Sector 55 families pick us because the food works for everyone at the table. The menu is 100% pure vegetarian. Kids order Classic Burgers and Strawberry Shakes. Teens go for the Kurkure Momos and Oreo Shakes. Parents lean into combos. The prices are friendly, so a family of four typically eats well under ₹700, including drinks.",
    landmarks: [
      "Sector 55 residential blocks",
      "Sector 55 community parks",
      "Sector 55 to Sector 58 main connector",
      "Local markets in Sector 55",
    ],
    directions:
      "From Sector 55, take the road towards Sector 58 and the Bishanpura crossing. Enter Bhaiji Market from the D Block side. We are at D13 on the ground floor. Easy parking outside for two-wheelers and a few cars.",
    popular: [
      {
        slug: "cheese-loaded-burger",
        name: "Cheese Loaded Burger",
        price: 139,
        tagline: "The reliable family favourite from our weekend Sector 55 regulars.",
      },
      {
        slug: "group-platter-combo",
        name: "The Group Platter",
        price: 299,
        tagline: "A snack platter for 4 to 5 people. Great for a family movie night at home.",
      },
      {
        slug: "strawberry-shake",
        name: "Strawberry Shake",
        price: 99,
        tagline: "The most ordered shake from Sector 55 kids.",
      },
    ],
    faqs: [
      {
        q: "How far is Burger Minister from Sector 55 Noida?",
        a: "Around 2.5 km. Auto rides take 6 to 8 minutes and usually cost ₹50 to ₹60. By car it is closer to 5 minutes in normal traffic.",
      },
      {
        q: "Is it a family friendly restaurant?",
        a: "Yes. We are 100% pure vegetarian, the food is mild by default, and we have a small clean dine-in area. Spicier items like Peri Peri Kurkure Momos are clearly marked as Spicy on the menu so families can avoid if needed.",
      },
      {
        q: "What is the best combo for a family of four from Sector 55?",
        a: "Two Royal Combos plus a Group Platter at ₹299 works well. Or four Classic Burgers (₹59 each) with two milkshakes and a portion of Cheese Loaded Fries. Both options stay under ₹700.",
      },
      {
        q: "Do you have parking near the outlet?",
        a: "Yes. Open parking outside Bhaiji Market is usually available. On weekend evenings it can fill up around 8 PM, so coming a little earlier is easier.",
      },
    ],
  },
};

export function getLocation(slug: string): Location | null {
  return locationContent[slug] || null;
}

export function getAllLocationSlugs(): string[] {
  return Object.keys(locationContent);
}
