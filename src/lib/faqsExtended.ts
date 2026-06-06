// Extended FAQ data for the /faq page and AI citation indexing.
// Categorised for grouping in the UI and for schema completeness.

export type FAQCategory =
  | "brand"
  | "location"
  | "hours"
  | "menu"
  | "pricing"
  | "dining"
  | "catering"
  | "payment"
  | "offers";

export type ExtendedFAQ = {
  q: string;
  a: string;
  category: FAQCategory;
};

export const FAQ_CATEGORIES: Record<FAQCategory, { label: string; intro: string }> = {
  brand: {
    label: "About Burger Minister",
    intro: "Who we are, what we stand for, and what makes the brand tick.",
  },
  location: {
    label: "Location & Directions",
    intro: "Exact address, landmarks, parking, and how to find us.",
  },
  hours: {
    label: "Opening Hours",
    intro: "When we open, when we close, and when the rush hits.",
  },
  menu: {
    label: "Menu & Dishes",
    intro: "What we serve, popular orders, and dietary details.",
  },
  pricing: {
    label: "Pricing",
    intro: "How much things cost, value picks, and per-head averages.",
  },
  dining: {
    label: "Dining & Service",
    intro: "Dine-in, takeaway, family seating, and group bookings.",
  },
  catering: {
    label: "Catering & Bulk Orders",
    intro: "Office lunches, parties, weddings, and bulk delivery.",
  },
  payment: {
    label: "Payment & Online Ordering",
    intro: "UPI, cash, online order flow, and pickup tokens.",
  },
  offers: {
    label: "Coupons & Offers",
    intro: "Discount codes, free fries threshold, and combo savings.",
  },
};

export const extendedFaqs: ExtendedFAQ[] = [
  // Brand
  {
    category: "brand",
    q: "What is Burger Minister?",
    a: "Burger Minister is a 100% pure vegetarian dine-in restaurant in Sector 58, Noida. We serve handcrafted burgers, sandwiches, pizzas, momos, fries, snacks, shakes, cold coffee, and coolers, all made fresh to order.",
  },
  {
    category: "brand",
    q: "Is Burger Minister 100% vegetarian?",
    a: "Yes. The entire kitchen is 100% pure vegetarian and FSSAI compliant. No meat, no chicken, no eggs are used in any dish or ingredient.",
  },
  {
    category: "brand",
    q: "What is the Burger Minister tagline?",
    a: "Crowned with Flavour, Served with Pride. The brand voice celebrates honest pure-veg cooking at fair prices in a clean dine-in setting.",
  },
  {
    category: "brand",
    q: "Is the kitchen FSSAI compliant?",
    a: "Yes. Burger Minister is FSSAI compliant and the kitchen follows hygiene-first practices, including daily fresh prep, sealed packaging, and regular cleaning between order batches.",
  },

  // Location
  {
    category: "location",
    q: "Where is Burger Minister located in Noida?",
    a: "Burger Minister is located at D13, Bhaiji Market, Sector 58, Noida, Uttar Pradesh 201301. The outlet is on the ground floor inside Bhaiji Market on the D Block side.",
  },
  {
    category: "location",
    q: "How do I find Burger Minister inside Bhaiji Market?",
    a: "Enter Bhaiji Market from the D Block side. Burger Minister is at shop number D13, on the ground floor, with a bright Burger Minister sign visible from the entry. The dine-in space is right behind the counter.",
  },
  {
    category: "location",
    q: "Is parking available near the outlet?",
    a: "Yes. Open parking is available outside Bhaiji Market for two-wheelers and a few cars. Weekend evenings around 8 PM are the busiest, weekday lunches and early evenings are usually easy.",
  },
  {
    category: "location",
    q: "Which sectors are closest to Burger Minister?",
    a: "We are within a 3 km radius of Sector 50, 51, 52, 55, 56, 57, 58, 59, 60, 61, 62 and 63, as well as Bishanpura, Mamura and Hoshiyarpur colonies. Sector 58 is our home sector.",
  },
  {
    category: "location",
    q: "Are you near any metro station?",
    a: "The closest Aqua Line metro stations are Sector 51 and Sector 52, both about 2 to 3 km from our outlet. From either station an auto reaches us in under 8 minutes.",
  },

  // Hours
  {
    category: "hours",
    q: "What are Burger Minister's opening hours?",
    a: "Burger Minister is open daily from 11:00 AM to 11:00 PM. The last order is taken around 10:45 PM. We are open all 7 days of the week, including Sundays and most public holidays.",
  },
  {
    category: "hours",
    q: "Are you open on Sundays?",
    a: "Yes. We are open every Sunday from 11 AM to 11 PM. Sunday lunches and evenings are usually busy, so plan accordingly.",
  },
  {
    category: "hours",
    q: "When is the busiest time?",
    a: "Weekday lunches between 12:30 and 2:30 PM and weekend evenings between 7 and 9 PM are our peak windows. Weekday afternoons after 3 PM are usually calm for a relaxed sit-down meal.",
  },

  // Menu
  {
    category: "menu",
    q: "What does Burger Minister serve?",
    a: "We serve burgers, sandwiches, pizzas, momos, fries, snacks, milkshakes, cold coffee, mojito coolers, and combo meals. The full menu has 60+ items, all 100% pure vegetarian.",
  },
  {
    category: "menu",
    q: "What are the bestseller items?",
    a: "Kurkure Veg Momos (₹70 half) is the most reordered item on the menu. The Cheese Loaded Burger (₹139), BM Special Fries (₹209), and The Solo Minister Combo (₹169) are also customer favourites.",
  },
  {
    category: "menu",
    q: "Do you have paneer items?",
    a: "Yes. Paneer Burger, Steam Paneer Momos, Fried Paneer Momos, Malai Paneer Momos, Kurkure Paneer Momos and Peri Peri Paneer Burger are all paneer-forward dishes. The paneer is grated or sliced fresh each morning.",
  },
  {
    category: "menu",
    q: "Do you serve Jain food?",
    a: "Our entire menu is pure vegetarian, but some items contain onion or garlic. If you follow a Jain diet, please tell the counter and we will customise where possible. Most sandwiches, classic momos, and shakes are easy to make Jain-friendly.",
  },
  {
    category: "menu",
    q: "Do you have spicy options?",
    a: "Yes. The Peri Peri Paneer Burger, Peri Peri Kurkure Veg Momos, Peri Peri Kurkure Paneer Momos, and Peri Peri Fries are all marked Spicy on the menu. Our regular momos and gravy momos are medium-spice with chutney on the side so you can control the heat.",
  },
  {
    category: "menu",
    q: "How many types of momos do you serve?",
    a: "Over 15 momo options. Steam, Fried, Gravy, Malai, Kurkure, Kurkure Cheese, and Peri Peri Kurkure, each available in Veg and Paneer fillings. Plus our fusion Pizza Momos in Veg and Paneer. Half and full plates are available for most varieties, starting from ₹40.",
  },
  {
    category: "menu",
    q: "Are pizzas freshly made?",
    a: "Yes. All pizzas are 8 inch handcrafted, made fresh to order. The dough is rolled, sauced, topped, and baked when you order. Five pizza varieties are on the menu, from Margherita to Cheese Loaded.",
  },

  // Pricing
  {
    category: "pricing",
    q: "How much does a meal cost at Burger Minister?",
    a: "A solo meal costs ₹150 to ₹250. A Classic Burger is ₹59, a Royal Combo starts at ₹169, and a full meal with a shake stays under ₹250. A family of four typically eats well for ₹600 to ₹800.",
  },
  {
    category: "pricing",
    q: "What is the cheapest item on the menu?",
    a: "The Classic Burger at ₹59 is our entry-level item. Snacks like Veg Sticks and Garlic Potato Pops start at ₹60. Mojito coolers start at ₹79.",
  },
  {
    category: "pricing",
    q: "Do you offer combo meals?",
    a: "Yes. Six Royal Combos are on the menu, from ₹169 to ₹299. Each combo bundles a main dish, sides, and a drink at a discount of ₹39 to ₹68 vs. ordering items separately.",
  },

  // Dining
  {
    category: "dining",
    q: "Is Burger Minister dine-in or takeaway?",
    a: "Both. Our outlet has a small clean dine-in seating area for eight to ten people and a counter for pickup. We focus on dine-in service so the food is enjoyed fresh and hot.",
  },
  {
    category: "dining",
    q: "How long does the food take?",
    a: "8 to 12 minutes for most items. Momos and sandwiches are faster. Pizzas and combos take slightly longer. We make everything fresh to order, so wait times can stretch a little during peak hours.",
  },
  {
    category: "dining",
    q: "Can I book a table or a group seat?",
    a: "We are walk-in only. For a group of 6 to 10 people, give us a call at +91 9643100501 about an hour ahead so we can reserve the dine-in area informally and start prep.",
  },
  {
    category: "dining",
    q: "Is Burger Minister family friendly?",
    a: "Yes. We are 100% pure vegetarian, the food is mild by default, and the dine-in area works well for small families. Kids enjoy our Classic Burger, Steam Veg Momos and Strawberry Shake combinations.",
  },

  // Catering
  {
    category: "catering",
    q: "Do you do catering for parties and corporate events?",
    a: "Yes. We have three catering packages: Office Crew Pack ₹2,499 for 10 people, Party Pack ₹5,999 for 25 people, and Grand Feast ₹14,999 for 50 people. All packages are 100% pure veg and include menu items at a discount of 10 to 14 percent vs. à la carte.",
  },
  {
    category: "catering",
    q: "How far in advance should I order catering?",
    a: "For small office orders, 6 hours of notice is usually enough. For Party Pack and Grand Feast, give us 24 hours so we can prep, fold, and pack everything fresh. Same-day rush is possible with an extra ₹500 rush fee.",
  },
  {
    category: "catering",
    q: "Do you deliver catering orders?",
    a: "Yes. Party Pack and Grand Feast include free delivery within 5 km. Smaller orders can be picked up at the counter or delivered for a small fee.",
  },

  // Payment
  {
    category: "payment",
    q: "What payment methods do you accept?",
    a: "We accept UPI, including Paytm, PhonePe, Google Pay, and BHIM, as well as cash. The UPI QR code is displayed at the counter and on the online checkout page.",
  },
  {
    category: "payment",
    q: "Can I order online?",
    a: "Yes. Browse the menu at burger-minister.com/menu, add items to your cart, and check out. After checkout you get an order number. Show the number at the counter to collect your order. Payment can be made online or at the counter.",
  },
  {
    category: "payment",
    q: "What is the Pickup Token after I order online?",
    a: "When you check out, the system generates an order number, for example #045. Walk to the counter, say the number, and the team prepares or hands over your order. The token is shown on the thank you page after checkout.",
  },

  // Offers
  {
    category: "offers",
    q: "What discount codes are available?",
    a: "One public code: MINISTER05 for 5% off, which works on any order with no minimum. Apply it at the cart page. Only one code can be applied per order on the customer side.",
  },
  {
    category: "offers",
    q: "Do you offer a free fries deal?",
    a: "Yes. Orders over ₹200 automatically unlock a free half plate of Peri Peri Fries at the cart page. The free fries offer is mutually exclusive with the MINISTER05 coupon, so you pick whichever saves you more — 5% off or the free fries.",
  },
  {
    category: "offers",
    q: "How does the Royal Combo discount work?",
    a: "Each combo bundles popular menu items at a fixed price that is ₹39 to ₹68 cheaper than ordering each item à la carte. The savings are printed on the menu card next to each combo name.",
  },
];

// First 8 used by the homepage FAQ component
export const homepageFaqs = extendedFaqs.slice(0, 8).map(({ q, a }) => ({ q, a }));
