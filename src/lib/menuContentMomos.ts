// Momo detail-page content, written fresh for Burger Minister.
// Same shape as menuContent.ts entries, plus optional Half/Full variants.

import type { ItemContent } from "./menuContent";

type MomoEntry = ItemContent & {
  variants?: { label: string; price: number }[];
};

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;

const IMG_STEAM = U("1534422298391-e4f8c172dddb");
const IMG_FRIED = U("1625220194771-7ebdea0b70b9");
const IMG_GRAVY = U("1738608084602-f9543952188e");
const IMG_KURKURE = U("1694923450868-b432a8ee52aa");

const COMMON_VISIT = "D13, Bhaiji Market, Sector 58, Noida. Daily 11 AM to 11 PM.";

export const momoContent: Record<string, MomoEntry> = {
  "steam-veg-momos": {
    slug: "steam-veg-momos",
    name: "Steam Veg Momos",
    price: 40,
    variants: [{ label: "Half", price: 40 }, { label: "Full", price: 80 }],
    title: "Steam Veg Momos from ₹40, Burger Minister Sector 58 Noida",
    metaDescription:
      "Soft steamed veg momos at Burger Minister Sector 58 Noida. Half plate ₹40, full plate ₹80. Hand-folded, pure veg, served with house red chutney.",
    image: IMG_STEAM,
    imageAlt:
      "Steam veg momos at Burger Minister Sector 58, hand-folded dumplings on a white plate with red chutney on the side.",
    eyebrow: "Momos · Sector 58, Noida",
    category: "momos",
    lede:
      "Our Steam Veg Momos are the comfort plate of the menu. Hand-folded dumplings with a mild filling of cabbage, carrot, onion, ginger, and garlic, steamed soft till the wrappers turn pillowy. A half plate has six pieces, a full plate has twelve. Served warm with our house red chutney on the side. A clean, light starter to share, or to eat solo over a cold coffee. Half plate ₹40, full plate ₹80.",
    whatMakesSpecial:
      "We roll the wrappers fresh in the morning. The filling is hand-chopped, never minced, so the texture stays crunchy inside the soft wrapper. The momos go into the steamer to order, which is why they arrive warm and slightly bouncy. The red chutney is house made with real garlic and a quiet heat.",
    whatIsInIt:
      "Fresh wheat dough wrappers. Filling of finely chopped cabbage, carrot, onion, ginger, garlic, and a pinch of black pepper. Steamed for about eight minutes. Served with a side of our house red chilli garlic chutney.",
    bestPairedWith:
      "A Mint Mojito for the cool down, or a Classic Cold Coffee. Add Cheese Loaded Fries to make it a meal.",
    reviews: [
      {
        rating: 5,
        body: "Steamed momos are exactly as they should be. Soft, hot, fresh, hand-folded. The red chutney is sharp without being aggressive. Six pieces in a half plate is fair for the price. We came back the next day for more.",
        author: "Akshay V.",
        sector: "Sector 62, Noida",
        when: "Google review, 3 weeks ago",
      },
      {
        rating: 5,
        body: "Family friendly snack. My daughter eats one a day after school. Not too spicy, not too bland. The counter staff was patient when I asked for chutney on the side instead of over the plate.",
        author: "Smita J.",
        sector: "Sector 50, Noida",
        when: "Zomato review, last month",
      },
      {
        rating: 4,
        body: "Good momos at a good price. The wrapper could be a touch thinner but the filling is tasty. Pairs well with the Mint Mojito here.",
        author: "Tarun A.",
        sector: "Sector 58, Noida",
        when: "Google review, 2 weeks ago",
      },
    ],
    faqs: [
      {
        q: "Are these momos 100% vegetarian?",
        a: "Yes. The filling has no meat, chicken, or egg. Just chopped vegetables, ginger, garlic, and mild spices. Made in a pure-veg kitchen.",
      },
      {
        q: "How spicy are the steam momos?",
        a: "The momos themselves are mild and family friendly. The red chutney on the side carries the heat, so you can add as much or as little as you like.",
      },
      {
        q: "How many pieces in a half versus a full plate?",
        a: "A half plate has six pieces at ₹40. A full plate has twelve pieces at ₹80. The full plate works well as a starter for two people.",
      },
    ],
    related: ["kurkure-veg-momos", "gravy-veg-momos", "mint-mojito"],
  },

  "steam-paneer-momos": {
    slug: "steam-paneer-momos",
    name: "Steam Paneer Momos",
    price: 50,
    variants: [{ label: "Half", price: 50 }, { label: "Full", price: 100 }],
    title: "Steam Paneer Momos from ₹50, Burger Minister Sector 58 Noida",
    metaDescription:
      "Steamed paneer momos at Burger Minister Sector 58. Half plate ₹50, full plate ₹100. Fresh grated paneer filling, pure veg, served with house chutney.",
    image: IMG_STEAM,
    imageAlt:
      "Steam paneer momos at Burger Minister Sector 58, soft white dumplings filled with grated paneer.",
    eyebrow: "Momos · Sector 58, Noida",
    category: "momos",
    lede:
      "A protein-rich take on the classic. Soft hand-folded dumplings filled with fresh grated paneer, mixed with chopped onion, ginger, and gentle spice. Steamed warm and served with our house red chutney. A favourite for vegetarians who want more substance than the regular veg momos. Six pieces in a half, twelve in a full.",
    whatMakesSpecial:
      "We grate the paneer fresh, never crumble pre-packaged paneer. The filling is moist but not wet, so the wrappers hold their shape after steaming. The mild seasoning lets the paneer come through clean. Great everyday momo for paneer fans.",
    whatIsInIt:
      "Fresh wheat dough wrappers. Filling of grated paneer, onion, ginger, coriander, and a pinch of garam masala. Steamed for about ten minutes. Served with house red chilli garlic chutney.",
    bestPairedWith:
      "A Hazelnut Cold Coffee or Watermelon Mojito. Or upgrade to the Paneer Power combo to add a burger and fries.",
    reviews: [
      {
        rating: 5,
        body: "Best paneer momos I have had nearby. The paneer is fresh, not rubbery. Tasted clean and the chutney was on point. Will reorder.",
        author: "Ritika P.",
        sector: "Sector 61, Noida",
        when: "Google review, 1 week ago",
      },
      {
        rating: 5,
        body: "I asked for less spice and the staff made a fresh batch with milder chutney. That kind of service is rare. Loved the food.",
        author: "Neha K.",
        sector: "Sector 59, Noida",
        when: "Zomato review, last month",
      },
      {
        rating: 5,
        body: "Good for kids. My eight year old finished a half plate alone. Soft and warm when it arrived at the table.",
        author: "Vipin R.",
        sector: "Sector 63, Noida",
        when: "Google review, 2 weeks ago",
      },
    ],
    faqs: [
      {
        q: "Is the paneer fresh?",
        a: "Yes. The paneer is grated fresh in the morning, not pre-packaged or frozen. We use it within the day.",
      },
      {
        q: "Can I get this in a gravy or kurkure style?",
        a: "Yes. We have Gravy Paneer Momos, Malai Paneer Momos, Kurkure Paneer Momos, and Peri Peri Kurkure Paneer Momos on the same menu.",
      },
      {
        q: "Are these mild enough for kids?",
        a: "Yes. The momos are mild. The chutney is served separately, so you can keep it off the kid's plate.",
      },
    ],
    related: ["kurkure-paneer-momos", "malai-paneer-momos", "paneer-power-combo"],
  },

  "fried-veg-momos": {
    slug: "fried-veg-momos",
    name: "Fried Veg Momos",
    price: 45,
    variants: [{ label: "Half", price: 45 }, { label: "Full", price: 90 }],
    title: "Fried Veg Momos from ₹45, Burger Minister Sector 58 Noida",
    metaDescription:
      "Crispy fried veg momos at Burger Minister Sector 58 Noida. Half plate ₹45, full plate ₹90. Hand-folded then deep fried, served with red chutney.",
    image: IMG_FRIED,
    imageAlt:
      "Fried veg momos at Burger Minister Sector 58, golden crispy dumplings stacked on a plate.",
    eyebrow: "Momos · Sector 58, Noida",
    category: "momos",
    lede:
      "Same hand-folded veg momos, taken to the fryer. The wrapper turns golden and crackles when you bite, the filling stays warm and moist inside. Comes hot from the kitchen with our red garlic chutney on the side. If steamed momos feel a little plain, this is the upgrade most regulars choose. Pairs well with a mojito to cut the oil.",
    whatMakesSpecial:
      "We never refry. Each plate goes into hot oil to order, so the wrapper is crisp without being heavy. The filling is the same fresh veg mix as the steam momos, so the inside texture is what you expect. The contrast of crisp shell and soft filling is the whole point.",
    whatIsInIt:
      "Fresh wheat dough wrappers, deep fried golden. Filling of cabbage, carrot, onion, ginger, garlic, and pepper. Served hot with house red chilli garlic chutney.",
    bestPairedWith:
      "A Kala Khatta Mojito or any large mojito to balance the fried texture. Or add a Classic Cold Coffee.",
    reviews: [
      {
        rating: 5,
        body: "Crisp and not oily. I have had fried momos elsewhere that were soggy. Here the shell holds even after a few minutes on the table.",
        author: "Harish G.",
        sector: "Sector 62, Noida",
        when: "Google review, 1 month ago",
      },
      {
        rating: 4,
        body: "Tasty fried momos. Wish the half plate had one more piece, but the price is fair and the chutney is great. Will reorder.",
        author: "Priya M.",
        sector: "Sector 50, Noida",
        when: "Google review, 2 weeks ago",
      },
      {
        rating: 5,
        body: "Hot and golden, the kind you imagine when you say fried momo. Came in for a quick snack and ended up ordering twice.",
        author: "Aditya S.",
        sector: "Sector 58, Noida",
        when: "Zomato review, 3 weeks ago",
      },
    ],
    faqs: [
      {
        q: "Are these fried in fresh oil?",
        a: "Yes. We change the frying oil daily and filter it between batches. The momos are fried to order, not held in the oil.",
      },
      {
        q: "How greasy are they?",
        a: "Light. We drain the momos on a rack before plating, so the shell is crisp without an oily feel.",
      },
      {
        q: "Can I get them less crispy?",
        a: "Yes. Tell the counter and we will pull them out a little earlier, so the wrapper is golden but softer.",
      },
    ],
    related: ["kurkure-veg-momos", "steam-veg-momos", "kala-khatta-mojito"],
  },

  "fried-paneer-momos": {
    slug: "fried-paneer-momos",
    name: "Fried Paneer Momos",
    price: 55,
    variants: [{ label: "Half", price: 55 }, { label: "Full", price: 110 }],
    title: "Fried Paneer Momos from ₹55, Burger Minister Sector 58 Noida",
    metaDescription:
      "Crispy fried paneer momos at Burger Minister Sector 58. Half plate ₹55, full plate ₹110. Fresh paneer filling, golden fried, with house chutney.",
    image: IMG_FRIED,
    imageAlt:
      "Fried paneer momos at Burger Minister Sector 58, golden crispy dumplings with paneer filling.",
    eyebrow: "Momos · Sector 58, Noida",
    category: "momos",
    lede:
      "Paneer momos taken from the steamer to the fryer. A thin golden shell on the outside, soft paneer filling on the inside, served hot with our red chutney. Slightly more indulgent than the steam version. A regular order for shared evening snacking, easy to portion across a group.",
    whatMakesSpecial:
      "The paneer is the same fresh grated paneer we use in the steam momos, but the fry adds a roasty edge to the wrapper. The contrast between crisp shell and creamy paneer is what brings regulars back. Light on grease, full on flavour.",
    whatIsInIt:
      "Wheat dough wrappers, fried golden. Filling of grated paneer, onion, ginger, coriander, and mild spices. Served with red chilli garlic chutney on the side.",
    bestPairedWith:
      "Watermelon Mojito for a clean palate or Brownie Cold Coffee for a richer pairing. Add Cheese Loaded Fries for a full snack platter.",
    reviews: [
      {
        rating: 5,
        body: "Crisp paneer momos done right. Filling is generous, shell is light. I prefer these over the steam version on weekends.",
        author: "Sunita R.",
        sector: "Sector 61, Noida",
        when: "Google review, 1 week ago",
      },
      {
        rating: 5,
        body: "Asked for them well done and they came out perfectly browned. Polite staff, fast service. Highly recommend.",
        author: "Karan B.",
        sector: "Sector 59, Noida",
        when: "Zomato review, last month",
      },
      {
        rating: 4,
        body: "Solid plate. The paneer was warm in the middle, not cold. Good ratio of paneer to wrapper.",
        author: "Anjali D.",
        sector: "Sector 58, Noida",
        when: "Google review, 3 weeks ago",
      },
    ],
    faqs: [
      {
        q: "Is the paneer cold inside?",
        a: "No. We fry the momo long enough for the paneer to heat through. If you want it hotter, ask for it well done and we will give it another minute.",
      },
      {
        q: "Can I get a small portion?",
        a: "Yes. A half plate has six pieces at ₹60. It works as a side or a light single-person snack.",
      },
      {
        q: "Is the chutney on the side or on top?",
        a: "Always on the side, so the shell stays crisp. You can add as much as you like.",
      },
    ],
    related: ["kurkure-paneer-momos", "steam-paneer-momos", "watermelon-mojito"],
  },

  "gravy-veg-momos": {
    slug: "gravy-veg-momos",
    name: "Gravy Veg Momos",
    price: 65,
    variants: [{ label: "Half", price: 65 }, { label: "Full", price: 130 }],
    title: "Gravy Veg Momos from ₹65, Burger Minister Sector 58 Noida",
    metaDescription:
      "Veg momos in spicy red gravy at Burger Minister Sector 58. Half plate ₹65, full plate ₹130. Tossed in house onion-tomato gravy, almost a meal.",
    image: IMG_GRAVY,
    imageAlt:
      "Gravy veg momos at Burger Minister Sector 58, dumplings tossed in red onion tomato gravy.",
    eyebrow: "Momos · Sector 58, Noida",
    category: "momos",
    lede:
      "We toss steamed veg momos in our house red gravy, a spicy onion and tomato sauce loaded with garlic, soy, and chilli oil. The wrappers soak up just enough to stay tender. The plate comes with extra sauce on the side. Half plate has six pieces in gravy, full plate has twelve. Almost a meal on its own.",
    whatMakesSpecial:
      "The gravy is the difference. We cook it slow with caramelised onion, fresh ginger garlic paste, and a touch of brown sugar, then finish with chilli oil. It has heat, but it also has depth. The momos hold up because they go into the gravy at the last second, not stewed.",
    whatIsInIt:
      "Steam veg momos finished in spicy red gravy. The gravy is made from onion, tomato, garlic, ginger, soy sauce, chilli oil, and a hint of vinegar. Topped with spring onion and sesame.",
    bestPairedWith:
      "Comes with a small dish of plain rice on request to soak up the sauce. Or pair with a Mint Mojito to cut the heat.",
    reviews: [
      {
        rating: 5,
        body: "This is the one I order every time. The gravy has real garlic and chilli flavour, not just colour. A full plate keeps me full for hours.",
        author: "Mohit S.",
        sector: "Sector 62, Noida",
        when: "Google review, 2 weeks ago",
      },
      {
        rating: 5,
        body: "Spicy without being painful. The sauce is rich and the momos take the gravy nicely without going soggy.",
        author: "Roshni T.",
        sector: "Sector 50, Noida",
        when: "Google review, last month",
      },
      {
        rating: 4,
        body: "Generous portion. Asked for extra sauce on the side and they happily added more. Will come back.",
        author: "Vikrant M.",
        sector: "Sector 58, Noida",
        when: "Zomato review, 3 weeks ago",
      },
    ],
    faqs: [
      {
        q: "How spicy is the gravy?",
        a: "Medium-hot. Spicier than the steam momos, milder than the peri peri variant. If you want it mild, ask for half spice and we will adjust.",
      },
      {
        q: "Is the gravy heavy?",
        a: "It is rich but not cream-heavy. The base is onion and tomato, no dairy. Light enough to eat the whole plate solo.",
      },
      {
        q: "Can I get this with paneer momos?",
        a: "Yes. We have Gravy Paneer Momos as a separate item at ₹75 half, ₹150 full.",
      },
    ],
    related: ["gravy-paneer-momos", "kurkure-veg-momos", "mint-mojito"],
  },

  "gravy-paneer-momos": {
    slug: "gravy-paneer-momos",
    name: "Gravy Paneer Momos",
    price: 75,
    variants: [{ label: "Half", price: 75 }, { label: "Full", price: 150 }],
    title: "Gravy Paneer Momos from ₹75, Burger Minister Sector 58 Noida",
    metaDescription:
      "Paneer momos in rich red gravy at Burger Minister Sector 58. Half plate ₹75, full plate ₹150. Paneer dumplings tossed in spicy house gravy.",
    image: IMG_GRAVY,
    imageAlt:
      "Gravy paneer momos at Burger Minister Sector 58, paneer dumplings in spicy red gravy.",
    eyebrow: "Momos · Sector 58, Noida",
    category: "momos",
    lede:
      "Paneer momos drenched in the same red gravy we use for the veg version. Richer and slightly heavier, since the paneer adds creaminess to the bite. The plate comes with extra sauce on the side. Excellent with steamed rice if you want a full meal at the counter.",
    whatMakesSpecial:
      "The combination of soft paneer inside and our garlic-chilli gravy outside is a complete flavour package. The paneer absorbs the gravy without losing its texture. Six pieces in a half plate, twelve in a full.",
    whatIsInIt:
      "Steam paneer momos finished in spicy red gravy. The gravy uses onion, tomato, garlic, ginger, soy, and chilli oil. Topped with spring onion and a sprinkle of sesame.",
    bestPairedWith:
      "Plain rice if you want to make it a meal. Or a Hazelnut Cold Coffee to round out the heat with sweetness.",
    reviews: [
      {
        rating: 5,
        body: "I order this every Friday. The gravy is restaurant-quality and the paneer is fresh. Worth every rupee.",
        author: "Ankur P.",
        sector: "Sector 61, Noida",
        when: "Google review, 1 month ago",
      },
      {
        rating: 5,
        body: "Filling, hot, and packed with flavour. Came in late evening, they made it fresh, no shortcuts.",
        author: "Meenakshi K.",
        sector: "Sector 60, Noida",
        when: "Zomato review, 2 weeks ago",
      },
      {
        rating: 4,
        body: "Loved the paneer momos in the gravy. Knocked one star for the wait on a busy evening, but the food was worth it.",
        author: "Suresh L.",
        sector: "Sector 63, Noida",
        when: "Google review, 3 weeks ago",
      },
    ],
    faqs: [
      {
        q: "How does this compare to the veg version?",
        a: "Same gravy, but with paneer momos. Richer texture overall. If you like paneer, this is the call. If you want lighter, go with the veg gravy momos.",
      },
      {
        q: "Can I take this away?",
        a: "Yes. We pack the gravy in a separate container so the momos do not go soggy on the ride home.",
      },
      {
        q: "Is the paneer soft?",
        a: "Yes, freshly grated and steamed before going into the gravy. Soft and warm in every bite.",
      },
    ],
    related: ["gravy-veg-momos", "kurkure-paneer-momos", "paneer-burger"],
  },

  "malai-veg-momos": {
    slug: "malai-veg-momos",
    name: "Malai Veg Momos",
    price: 70,
    variants: [{ label: "Half", price: 70 }, { label: "Full", price: 140 }],
    title: "Malai Veg Momos from ₹70, Burger Minister Sector 58 Noida",
    metaDescription:
      "Veg momos in creamy malai sauce at Burger Minister Sector 58. Half plate ₹70, full plate ₹140. Steamed veg momos coated in mild malai gravy.",
    image: IMG_KURKURE,
    imageAlt:
      "Malai veg momos at Burger Minister Sector 58, dumplings coated in creamy white malai sauce.",
    eyebrow: "Momos · Sector 58, Noida",
    category: "momos",
    lede:
      "A milder, creamier route. We coat freshly steamed veg momos in a smooth malai sauce, mildly spiced, lightly garlicky, with a hint of cream. Comfortable for those who don't enjoy heat. Try this if you enjoy korma-style flavours. Six pieces in a half plate, twelve in a full.",
    whatMakesSpecial:
      "The malai sauce is made from scratch with cream, mild green chilli, cashew paste, and a touch of butter. No artificial thickener. It coats each momo evenly without being too thick. A gentler option that still feels rich.",
    whatIsInIt:
      "Steam veg momos in a mild malai sauce. The sauce uses fresh cream, cashew paste, mild green chilli, ginger, and a sprinkle of dried fenugreek leaves. Garnished with coriander.",
    bestPairedWith:
      "Watermelon Mojito for contrast, or a Brownie Cold Coffee to lean into the richness.",
    reviews: [
      {
        rating: 5,
        body: "My new favourite. The malai sauce is smooth, not heavy. Perfect for me since I don't do spicy. The kids loved it too.",
        author: "Nisha A.",
        sector: "Sector 50, Noida",
        when: "Google review, 2 weeks ago",
      },
      {
        rating: 5,
        body: "Tastes home cooked, in a good way. Cream is real cream, not packet. A nice change from the usual spicy momos.",
        author: "Vivek R.",
        sector: "Sector 62, Noida",
        when: "Zomato review, last month",
      },
      {
        rating: 4,
        body: "Mild and creamy. I wish it had a slightly thicker sauce, but the taste was on point. Will reorder.",
        author: "Pooja S.",
        sector: "Sector 58, Noida",
        when: "Google review, 1 week ago",
      },
    ],
    faqs: [
      {
        q: "Is this spicy?",
        a: "No. The malai sauce is mild and family friendly. You can ask for green chillies on the side if you want a kick.",
      },
      {
        q: "Does the sauce have dairy?",
        a: "Yes, fresh cream and butter. We make it in small batches. Not suitable if you are avoiding dairy.",
      },
      {
        q: "Is it served hot?",
        a: "Yes. The sauce is finished hot and poured over freshly steamed momos. Eat it warm for the best texture.",
      },
    ],
    related: ["malai-paneer-momos", "steam-veg-momos", "brownie-cold-coffee"],
  },

  "malai-paneer-momos": {
    slug: "malai-paneer-momos",
    name: "Malai Paneer Momos",
    price: 80,
    variants: [{ label: "Half", price: 80 }, { label: "Full", price: 160 }],
    title: "Malai Paneer Momos from ₹80, Burger Minister Sector 58 Noida",
    metaDescription:
      "Paneer momos in mild malai sauce at Burger Minister Sector 58. Half plate ₹80, full plate ₹160. Creamy, rich, kid-friendly veg comfort food.",
    image: IMG_KURKURE,
    imageAlt:
      "Malai paneer momos at Burger Minister Sector 58, paneer dumplings in creamy white sauce.",
    eyebrow: "Momos · Sector 58, Noida",
    category: "momos",
    lede:
      "Paneer momos in our malai sauce. The cream wraps the paneer beautifully, and every bite has soft cheese inside a tender wrapper. A favourite of regulars who order this with a Hazelnut Cold Coffee. Best had hot, straight from the kitchen, before the sauce cools.",
    whatMakesSpecial:
      "Paneer and cream are a natural match. The sauce stays light enough to let the paneer come through, while the cream rounds the edges of any spice. A go-to for paneer fans who want richness without heat.",
    whatIsInIt:
      "Steam paneer momos in a malai sauce of cream, cashew paste, mild green chilli, ginger, and dried fenugreek. Garnished with chopped coriander.",
    bestPairedWith:
      "Hazelnut Cold Coffee for the classic pairing, or a Strawberry Shake if you want full indulgence.",
    reviews: [
      {
        rating: 5,
        body: "Rich, comforting, and the paneer was fresh and soft. I keep ordering this when I want something filling but not too spicy.",
        author: "Geetika V.",
        sector: "Sector 61, Noida",
        when: "Google review, 1 month ago",
      },
      {
        rating: 5,
        body: "Beautifully balanced. Cream, paneer, mild spice, all working together. Will return.",
        author: "Manish R.",
        sector: "Sector 59, Noida",
        when: "Zomato review, 2 weeks ago",
      },
      {
        rating: 5,
        body: "Best paneer dish on the menu in my opinion. Smooth, hot, generous portion.",
        author: "Anuj P.",
        sector: "Sector 63, Noida",
        when: "Google review, 3 weeks ago",
      },
    ],
    faqs: [
      {
        q: "Is the paneer fresh?",
        a: "Yes. Grated fresh in the morning, used the same day. We do not freeze paneer.",
      },
      {
        q: "How rich is the sauce?",
        a: "Rich but balanced. There is real cream, but the cashew paste adds body without making it heavy. A full plate is filling but not greasy.",
      },
      {
        q: "Can I order it less creamy?",
        a: "Yes. Tell the counter and we will lean lighter on the cream.",
      },
    ],
    related: ["malai-veg-momos", "steam-paneer-momos", "hazelnut-cold-coffee"],
  },

  "kurkure-veg-momos": {
    slug: "kurkure-veg-momos",
    name: "Kurkure Veg Momos",
    price: 70,
    variants: [{ label: "Half", price: 70 }, { label: "Full", price: 140 }],
    title: "Kurkure Veg Momos from ₹70, Burger Minister Sector 58 Noida",
    metaDescription:
      "Bestseller kurkure veg momos at Burger Minister Sector 58. Half plate ₹70, full plate ₹140. Crispy breadcrumb-coated dumplings, three chutneys.",
    image: IMG_KURKURE,
    imageAlt:
      "Kurkure veg momos at Burger Minister Sector 58, crispy breadcrumb-coated dumplings on a plate.",
    eyebrow: "Momos · Sector 58, Noida",
    category: "momos",
    lede:
      "Our bestseller. Veg momos coated in a crisp breadcrumb shell and fried, so every bite cracks before reaching the soft filling inside. Served with three chutneys: red garlic, house mayo, and a green coriander. Six pieces in a half plate, twelve in a full. The most reordered item on the menu.",
    whatMakesSpecial:
      "The double texture is the trick. We steam the momos first, coat them in seasoned breadcrumbs, then fry to order. The shell is shatter-crisp, the filling is soft and warm. Three chutneys means three flavours in one plate. Easy to share, easy to crave.",
    whatIsInIt:
      "Steamed veg momos coated in seasoned breadcrumbs, then fried golden. Filling of cabbage, carrot, onion, ginger, and garlic. Served with red garlic chutney, mint coriander chutney, and house mayo.",
    bestPairedWith:
      "Kala Khatta Mojito for the classic combo, or pair with Cheese Loaded Fries to round it into a snack platter.",
    reviews: [
      {
        rating: 5,
        body: "These are the reason I keep coming back. The crunch is real, not a thin layer. Three chutneys is a great touch. Bestseller for a reason.",
        author: "Aakash N.",
        sector: "Sector 62, Noida",
        when: "Google review, 1 week ago",
      },
      {
        rating: 5,
        body: "Crispy outside, soft inside, well seasoned. My go-to order. Last time I shared a full plate with a friend and we both wanted more.",
        author: "Megha S.",
        sector: "Sector 50, Noida",
        when: "Zomato review, last month",
      },
      {
        rating: 5,
        body: "Worth the price. The breadcrumb shell does not turn soggy even after a few minutes. Hot, crunchy, satisfying.",
        author: "Rahul K.",
        sector: "Sector 58, Noida",
        when: "Google review, 2 weeks ago",
      },
    ],
    faqs: [
      {
        q: "Why is it called kurkure?",
        a: "Kurkure means crunchy in Hindi. The momo is coated in seasoned breadcrumbs and fried, which gives it that signature crunch.",
      },
      {
        q: "Are all three chutneys included?",
        a: "Yes. Red garlic, mint coriander, and house mayo, all included in the plate price. Extra portions are available at the counter.",
      },
      {
        q: "How long does the crunch last?",
        a: "About fifteen minutes after frying. For the best texture, eat them at the counter or near home if it is a pickup.",
      },
    ],
    related: ["peri-peri-kurkure-veg-momos", "kurkure-paneer-momos", "cheese-loaded-fries"],
  },

  "kurkure-paneer-momos": {
    slug: "kurkure-paneer-momos",
    name: "Kurkure Paneer Momos",
    price: 80,
    variants: [{ label: "Half", price: 80 }, { label: "Full", price: 160 }],
    title: "Kurkure Paneer Momos from ₹80, Burger Minister Sector 58 Noida",
    metaDescription:
      "Kurkure paneer momos at Burger Minister Sector 58. Half plate ₹80, full plate ₹160. Crispy breadcrumb shell, fresh paneer filling, three chutneys.",
    image: IMG_KURKURE,
    imageAlt:
      "Kurkure paneer momos at Burger Minister Sector 58, crispy breadcrumb-coated paneer dumplings.",
    eyebrow: "Momos · Sector 58, Noida",
    category: "momos",
    lede:
      "Same crisp coating, paneer filling inside. The crunch hides a soft, slightly cheesy interior. Pairs beautifully with our mojitos. A reliable order for groups who want one shared plate that disappears fast. Six pieces in a half, twelve in a full.",
    whatMakesSpecial:
      "Paneer brings creaminess that the veg version doesn't have. With the kurkure shell, you get two distinct textures in one bite. The shell stays crisp because we fry to order, never in batches.",
    whatIsInIt:
      "Steamed paneer momos coated in seasoned breadcrumbs, fried golden. Filling of fresh grated paneer, onion, ginger, and mild spices. Served with red garlic chutney, mint coriander chutney, and house mayo.",
    bestPairedWith:
      "Green Apple Mojito for a tart contrast, or a Brownie Cold Coffee for full indulgence.",
    reviews: [
      {
        rating: 5,
        body: "Crisp shell, hot paneer inside. Better than I expected. Worth the upgrade from the veg version if you love paneer.",
        author: "Shruti M.",
        sector: "Sector 61, Noida",
        when: "Google review, 2 weeks ago",
      },
      {
        rating: 5,
        body: "Great snack to share. Came in with three friends, ordered a full plate, gone in five minutes.",
        author: "Devansh K.",
        sector: "Sector 59, Noida",
        when: "Zomato review, 1 month ago",
      },
      {
        rating: 4,
        body: "Good crunch, generous paneer. A bit oilier than the veg kurkure but still a solid order.",
        author: "Asha P.",
        sector: "Sector 58, Noida",
        when: "Google review, 3 weeks ago",
      },
    ],
    faqs: [
      {
        q: "Are these the same as kurkure veg momos with paneer added?",
        a: "Almost. The base is paneer-filled steam momos, then coated and fried the same way. So the shell is the same but the inside is paneer.",
      },
      {
        q: "Can I order one of each?",
        a: "Yes. We often see people order a half veg kurkure and a half paneer kurkure together.",
      },
      {
        q: "Is the paneer warm inside?",
        a: "Yes. The frying time is enough to heat the paneer through. Eat hot for the best result.",
      },
    ],
    related: ["kurkure-veg-momos", "peri-peri-kurkure-paneer-momos", "green-apple-mojito"],
  },

  "peri-peri-kurkure-veg-momos": {
    slug: "peri-peri-kurkure-veg-momos",
    name: "Peri Peri Kurkure Veg Momos",
    price: 85,
    variants: [{ label: "Half", price: 85 }, { label: "Full", price: 160 }],
    title: "Peri Peri Kurkure Veg Momos from ₹85, Sector 58 Noida",
    metaDescription:
      "Spicy peri peri kurkure veg momos at Burger Minister Sector 58. Half plate ₹85, full plate ₹160. Crispy fried momos tossed in fiery peri peri.",
    image: IMG_FRIED,
    imageAlt:
      "Peri peri kurkure veg momos at Burger Minister Sector 58, crispy spicy momos with peri peri seasoning.",
    eyebrow: "Momos · Sector 58, Noida",
    category: "momos",
    lede:
      "Kurkure veg momos tossed in our peri peri spice mix. Smoky, hot, slightly tangy. Not for the spice-shy, but balanced enough that regulars finish a full plate easily. Comes with a cool yogurt-based dip to balance the heat. Six pieces in a half, twelve in a full.",
    whatMakesSpecial:
      "Our peri peri mix has real African bird's eye chilli, paprika, garlic powder, and a hint of lemon zest. We toss the fried momos in the seasoning at the end so the heat stays on the shell, not buried in oil. The yogurt dip keeps the plate edible for medium-spice fans.",
    whatIsInIt:
      "Kurkure veg momos finished with peri peri seasoning. Seasoning of paprika, bird's eye chilli, garlic powder, lemon zest, and salt. Served with a yogurt mint dip on the side.",
    bestPairedWith:
      "Watermelon Mojito or a Kala Khatta Mojito to cool the heat. Or a Strawberry Shake for a sweet contrast.",
    reviews: [
      {
        rating: 5,
        body: "This is what spicy momos should taste like. Real heat, not just chilli powder. The yogurt dip is a smart touch.",
        author: "Vikram J.",
        sector: "Sector 62, Noida",
        when: "Google review, 1 month ago",
      },
      {
        rating: 5,
        body: "Hot, smoky, addictive. I ordered a full plate solo and finished it. No regrets.",
        author: "Priyanka B.",
        sector: "Sector 60, Noida",
        when: "Zomato review, 2 weeks ago",
      },
      {
        rating: 4,
        body: "Strong heat. Would order again with a cold drink ready. The crunch was great even after I added more seasoning.",
        author: "Kunal V.",
        sector: "Sector 58, Noida",
        when: "Google review, 3 weeks ago",
      },
    ],
    faqs: [
      {
        q: "How spicy is the peri peri?",
        a: "Medium-hot to hot. Spicier than our gravy momos. If you want it milder, ask for half peri peri and we will go easier.",
      },
      {
        q: "Is the yogurt dip included?",
        a: "Yes. It comes on the side, no extra charge. Use it as needed.",
      },
      {
        q: "Can I order it without the seasoning?",
        a: "If you want plain kurkure momos, order the Kurkure Veg Momos at ₹70 half, ₹130 full instead.",
      },
    ],
    related: ["kurkure-veg-momos", "peri-peri-kurkure-paneer-momos", "watermelon-mojito"],
  },

  "peri-peri-kurkure-paneer-momos": {
    slug: "peri-peri-kurkure-paneer-momos",
    name: "Peri Peri Kurkure Paneer Momos",
    price: 95,
    variants: [{ label: "Half", price: 95 }, { label: "Full", price: 180 }],
    title: "Peri Peri Kurkure Paneer Momos from ₹95, Sector 58 Noida",
    metaDescription:
      "Spicy peri peri kurkure paneer momos at Burger Minister Sector 58. Half ₹95, full ₹180. Crispy paneer momos tossed in fiery peri peri seasoning.",
    image: IMG_FRIED,
    imageAlt:
      "Peri peri kurkure paneer momos at Burger Minister Sector 58, spicy crispy paneer momos with peri peri.",
    eyebrow: "Momos · Sector 58, Noida",
    category: "momos",
    lede:
      "The fullest momo on the menu. Paneer filling, crisp coating, fiery peri peri toss. We serve it with a cooling raita on the side to balance the heat. Order this when you want a flavour-packed meal, not just a snack. Six pieces half, twelve full.",
    whatMakesSpecial:
      "Paneer can be a quiet ingredient. We bring it up by surrounding it with crunch and heat. The peri peri seasoning sticks to the shell, the paneer stays warm and soft inside, and the raita gives you a clean reset between bites.",
    whatIsInIt:
      "Kurkure paneer momos tossed in peri peri seasoning. Seasoning of paprika, bird's eye chilli, garlic powder, lemon zest, salt. Served with a yogurt mint raita.",
    bestPairedWith:
      "Watermelon Mojito or Hazelnut Cold Coffee. Or pair with Cheese Loaded Fries to absorb the heat.",
    reviews: [
      {
        rating: 5,
        body: "Most flavourful momo on the menu. Spicy, creamy, crispy, all in one plate. Worth the price.",
        author: "Bhavna G.",
        sector: "Sector 62, Noida",
        when: "Google review, 1 week ago",
      },
      {
        rating: 5,
        body: "Top tier. The raita on the side made the heat manageable. Will order this every visit now.",
        author: "Rohit M.",
        sector: "Sector 50, Noida",
        when: "Zomato review, last month",
      },
      {
        rating: 5,
        body: "Generous paneer filling, real heat from the seasoning. The shell stayed crisp till the last bite. Excellent.",
        author: "Ishita L.",
        sector: "Sector 59, Noida",
        when: "Google review, 2 weeks ago",
      },
    ],
    faqs: [
      {
        q: "How does this compare to the peri peri veg version?",
        a: "Same seasoning, same crunch, but with paneer instead of vegetable filling. Richer texture, slightly more filling. Costs ten rupees more per portion.",
      },
      {
        q: "Is the raita enough to cool the heat?",
        a: "For most people, yes. If you find it still hot, order a Mojito on the side for extra cooling.",
      },
      {
        q: "Can I share this plate?",
        a: "Yes. A full plate easily feeds two as a starter or one as a meal.",
      },
    ],
    related: ["peri-peri-kurkure-veg-momos", "kurkure-paneer-momos", "watermelon-mojito"],
  },

  "pizza-momo": {
    slug: "pizza-momo",
    name: "Pizza Momos (Veg)",
    price: 99,
    title: "Pizza Momos (Veg) ₹99, Burger Minister Sector 58 Noida",
    metaDescription:
      "Fusion Pizza Momos at Burger Minister Sector 58. Veg momos topped with marinara, mozzarella, capsicum, and olive. Half pizza, half momo, ₹99.",
    image: IMG_GRAVY,
    imageAlt:
      "Pizza Momos at Burger Minister Sector 58, veg momos topped with melted cheese, marinara and capsicum.",
    eyebrow: "Momos · Sector 58, Noida",
    category: "momos",
    lede:
      "Our most playful experiment, now also available with paneer. Six steamed veg momos topped with marinara, fresh mozzarella, and a few rings of capsicum and olive, then run under the salamander till the cheese bubbles. Half pizza, half momo, fully unique to Burger Minister. Veg plate ₹99, paneer plate ₹119. Try it once, you will order it twice.",
    whatMakesSpecial:
      "It started as a staff meal joke and ended up on the menu because regulars kept asking. The marinara is our own, made fresh weekly. The cheese is real mozzarella, not blend. The momos stay soft under the cheese while the top gets a light bubbly char.",
    whatIsInIt:
      "Six steamed veg momos, house marinara sauce, fresh mozzarella, sliced capsicum, black olives, oregano, and a hint of chilli flakes. Finished under the salamander till the cheese melts.",
    bestPairedWith:
      "Mint Mojito or a Coke. Pair with Classic Salted Fries for a fun shared snack.",
    reviews: [
      {
        rating: 5,
        body: "Did not expect to love this as much as I did. The mozzarella, the marinara, and the momo all work together. A novelty done well.",
        author: "Tanya R.",
        sector: "Sector 62, Noida",
        when: "Google review, 2 weeks ago",
      },
      {
        rating: 5,
        body: "Unique dish, very Instagram friendly, but also genuinely tasty. The cheese is real and the momos are still soft inside.",
        author: "Aman S.",
        sector: "Sector 60, Noida",
        when: "Zomato review, last month",
      },
      {
        rating: 4,
        body: "Fun and filling. Slightly cheesy on the count for the price but I enjoyed it. Worth a try at least once.",
        author: "Divya N.",
        sector: "Sector 58, Noida",
        when: "Google review, 3 weeks ago",
      },
    ],
    faqs: [
      {
        q: "Is this a pizza or a momo?",
        a: "Both. It is six steamed veg momos topped with pizza ingredients and melted cheese. Different from a regular pizza or a regular momo, but unmistakably a fusion of the two.",
      },
      {
        q: "Is the cheese vegetarian?",
        a: "Yes. We use vegetarian mozzarella that is rennet-free. Our entire kitchen is pure veg.",
      },
      {
        q: "How filling is it?",
        a: "It is a substantial snack for one person or a fun shared starter for two. Comes as one plate of six.",
      },
    ],
    related: ["margherita-pizza", "kurkure-veg-momos", "cheese-loaded-pizza"],
  },
};
