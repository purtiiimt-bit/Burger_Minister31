// AUTO-GENERATED from design zip on initial scaffold, then maintained by hand.
// Long-form per-item SEO content for /menu/[slug] pages.

export type ItemReview = {
  rating: number;
  body: string;
  author: string;
  sector: string;
  when: string;
};
export type ItemFAQ = { q: string; a: string };
export type ItemVariant = { label: string; price: number };
export type ItemContent = {
  slug: string;
  name: string;
  price: number;
  title: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  category: string;
  lede: string;
  whatMakesSpecial: string;
  whatIsInIt: string;
  bestPairedWith: string;
  reviews: ItemReview[];
  faqs: ItemFAQ[];
  related: string[];
  variants?: ItemVariant[];
};

export const menuContent: Record<string, ItemContent> = {
  "bm-special-fries": {
    "slug": "bm-special-fries",
    "name": "BM Special Fries (Minister's Pick)",
    "price": 209,
    "title": "BM Special Fries ₹209, Minister's Pick, Burger Minister Noida",
    "metaDescription": "Our signature loaded fries with sauces, cheese, jalapenos, microgreens. ₹209 in Sector 58, Noida. The Minister's Pick.",
    "image": "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=1200&q=80",
    "imageAlt": "BM Special Fries loaded with cheese sauce, jalapeños, microgreens and red chilli flakes signature dish.",
    "eyebrow": "Fries · Sector 58, Noida",
    "category": "fries",
    "lede": "The BM Special Fries is our signature fries dish. The Minister's Pick. Loaded fries with our cheese sauce, a special drizzle of our house BM sauce, sliced pickled jalapeños, fresh microgreens, and a finishing dust of red chilli flakes. Two hundred nine rupees. The fries we put on our biggest poster.",
    "whatMakesSpecial": "It's the layering. Most 'loaded fries' elsewhere just dump everything on top and call it a day. We layer in order: hot fries, cheese sauce, jalapeños, BM sauce, microgreens, chilli flakes. Each bite hits multiple flavors. Salty, creamy, tangy, spicy, fresh, all at once.",
    "whatIsInIt": "Fresh hand-cut crispy fries, house cheese sauce, our BM sauce (tangy mayo-based with a hint of mustard and herbs), pickled green jalapeños, fresh microgreens (or coriander leaves on backup), red chilli flakes, a finishing salt sprinkle.",
    "bestPairedWith": "A Cold Coffee or Brownie Cold Coffee for a treat meal. Or share with two people as a starter before pizza or burgers.",
    "reviews": [
      {
        "rating": 5,
        "body": "These fries are dangerously addictive. Stayed crispy even after we sat and chatted for twenty minutes. Will order every visit.",
        "author": "Riya D.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 4 days ago"
      },
      {
        "rating": 5,
        "body": "Worth the extra over salted fries. The seasoning sticks properly to the fries instead of falling off in the box. Tells me they toss it right.",
        "author": "Vivek K.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 2 weeks ago"
      },
      {
        "rating": 5,
        "body": "Ordered for a group of four and everyone went back for more. Pair with a Cold Coffee, life sorted.",
        "author": "Aditi M.",
        "sector": "Sector 63, Noida",
        "when": "Google, last month"
      }
    ],
    "faqs": [
      {
        "q": "How spicy are these?",
        "a": "Medium. The jalapeños bring a kick but they're pickled so the heat is tame. The chilli flakes add a final note. Not overpowering."
      },
      {
        "q": "Is this enough for one person as a meal?",
        "a": "For most people, yes, as a snack-meal. For someone with a bigger appetite, pair it with a burger. Sharing with two works too."
      },
      {
        "q": "What is the BM sauce?",
        "a": "Our signature mayo-based sauce with mustard, herbs, and a hint of vinegar. Made fresh weekly. The recipe is closely guarded."
      }
    ],
    "related": [
      "cheese-loaded-fries",
      "double-cheesy-patty-burger",
      "cheese-lover-combo"
    ]
  },
  "brownie-cold-coffee": {
    "slug": "brownie-cold-coffee",
    "name": "Brownie Cold Coffee",
    "price": 149,
    "title": "Brownie Cold Coffee ₹149, Burger Minister Sector 58 Noida",
    "metaDescription": "Real brownie pieces inside cold coffee, dessert and drink combined. ₹149 in Sector 58, Noida. Cult favorite.",
    "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=1200&q=80",
    "imageAlt": "Brownie cold coffee with chocolate brownie chunks, milk, ice and chocolate drizzle in tall glass.",
    "eyebrow": "Cold Coffee · Sector 58, Noida",
    "category": "",
    "lede": "The Brownie Cold Coffee is our cult favorite. Cold coffee base with real chocolate brownie pieces blended in plus chunks visible in the glass. One hundred forty-nine rupees. Dessert and coffee in one tall glass.",
    "whatMakesSpecial": "We use actual brownie, not brownie-flavor syrup. Brownie chunks are blended in for flavor distribution, then a few larger chunks are added on top so you can scoop them with a spoon while drinking. It's coffee, drink, and dessert simultaneously.",
    "whatIsInIt": "Cold coffee base, milk, sugar (less than other flavored options because brownie adds sweetness), chocolate brownie pieces (some blended, some chunked), a chocolate sauce drizzle.",
    "bestPairedWith": "This is a meal in itself for many. If pairing, a savory snack like Cheese Sticks balances the sweetness. Avoid pairing with another dessert item or you'll overload on sugar.",
    "reviews": [
      {
        "rating": 5,
        "body": "This is real coffee, not the powder mix you get most places. Smooth, properly cold, and you can taste the actual coffee notes. Refreshing without being overpowering.",
        "author": "Naman R.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 5 days ago"
      },
      {
        "rating": 5,
        "body": "My afternoon pick-me-up of choice. Strong enough to keep me going through the post-lunch slump but not so strong that I cannot sleep at night.",
        "author": "Shruti A.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, last month"
      },
      {
        "rating": 4,
        "body": "Good coffee. The hazelnut version is my pick. Wish they had plant-based milk but the regular version is great anyway.",
        "author": "Kabir D.",
        "sector": "Sector 63, Noida",
        "when": "Google, 2 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "Where do the brownies come from?",
        "a": "We bake our brownies in-house twice a week. Fresh brownies are used the same day they are baked."
      },
      {
        "q": "How sweet is this?",
        "a": "Sweet but not too sweet. The brownie itself is dark chocolate which has a slight bitterness that balances the milk and sugar."
      },
      {
        "q": "Is it like a milkshake or a coffee?",
        "a": "Closer to a coffee with dessert in it. The base is real cold coffee, not just chocolate milk. You taste the coffee through the chocolate."
      }
    ],
    "related": [
      "caramel-cold-coffee",
      "oreo-shake",
      "kitkat-shake"
    ]
  },
  "butterscotch-shake": {
    "slug": "butterscotch-shake",
    "name": "Butterscotch Shake",
    "price": 99,
    "title": "Butterscotch Shake ₹99, Burger Minister Sector 58 Noida",
    "metaDescription": "Classic butterscotch shake with that nutty sweetness. ₹99 in Sector 58, Noida. Pure veg cafe.",
    "image": "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=1200&q=80",
    "imageAlt": "Butterscotch milkshake with crunchy caramel bits, vanilla ice cream, and milk in tall glass.",
    "eyebrow": "Milkshakes · Sector 58, Noida",
    "category": "milkshakes",
    "lede": "Butterscotch Shake is our take on the classic Indian butterscotch flavor everyone grew up eating in ice cream form. Thick, creamy, with that nutty butterscotch sweetness. Ninety-nine rupees.",
    "whatMakesSpecial": "Butterscotch is an Indian classic flavor and most people who try it remember it. We use a butterscotch sauce that has small crunchy bits of caramelized sugar, which add texture to an otherwise smooth shake. It's not just sweet, it has a buttery, slightly toasty edge.",
    "whatIsInIt": "Vanilla ice cream, milk, butterscotch sauce with crunchy bits, sugar (adjustable), ice. Topped with extra crunchy bits.",
    "bestPairedWith": "A Cheese Loaded Burger for the rich combo, or any of our sandwiches.",
    "reviews": [
      {
        "rating": 5,
        "body": "Thick enough that the straw stands up by itself. Real ice cream blend, you can tell. Kids in our group could not stop drinking it.",
        "author": "Anjali S.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Properly sweet but not sickly. The shake-to-ice ratio is right. Pair with a pizza and you have a full meal for two.",
        "author": "Rahul K.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 3 weeks ago"
      },
      {
        "rating": 4,
        "body": "Loved the Oreo one especially. Cookie chunks in every other sip. Could ask for less sugar if needed and they oblige.",
        "author": "Sanya P.",
        "sector": "Sector 59, Noida",
        "when": "Google, last month"
      }
    ],
    "faqs": [
      {
        "q": "Are the crunchy bits in the shake?",
        "a": "Yes. Small pieces of caramelized sugar suspended in the butterscotch sauce. You'll feel them as you drink."
      },
      {
        "q": "Is this an Indian flavor or American?",
        "a": "Butterscotch is global but it's particularly popular in India. The version we make is closer to the Indian style with the crunch."
      },
      {
        "q": "Will it be too sweet for adults?",
        "a": "Some adults find it sweet. The butterscotch and ice cream both add sweetness. Ask for less sugar if you prefer it less sweet."
      }
    ],
    "related": [
      "chocolate-shake",
      "strawberry-shake",
      "oreo-shake"
    ]
  },
  "caramel-cold-coffee": {
    "slug": "caramel-cold-coffee",
    "name": "Caramel Cold Coffee",
    "price": 119,
    "title": "Caramel Cold Coffee ₹119, Burger Minister Sector 58 Noida",
    "metaDescription": "Sweet caramel drizzle on cold coffee, dessert in a glass. ₹119 in Sector 58, Noida. Pure veg cafe.",
    "image": "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1200&q=80",
    "imageAlt": "Caramel cold coffee with caramel sauce drizzle, milk, and ice in tall glass.",
    "eyebrow": "Cold Coffee · Sector 58, Noida",
    "category": "",
    "lede": "Caramel Cold Coffee is for the customer who wants their coffee to lean toward dessert. Cold coffee base, caramel syrup blended in, a drizzle of caramel sauce on top of the glass. One hundred nineteen rupees. The sweet option.",
    "whatMakesSpecial": "The caramel drizzle on top is real caramel sauce, not just syrup. It sits on the foam and slowly drips down through the drink, which means your first sips are sweeter and the last sips taste more like regular coffee. The flavor evolves as you drink.",
    "whatIsInIt": "Brewed cold coffee, milk, caramel syrup, caramel sauce drizzle, sugar (adjustable), ice.",
    "bestPairedWith": "A Brownie Cold Coffee mood substitute, or a Cheese Sandwich for sweet-savory balance.",
    "reviews": [
      {
        "rating": 5,
        "body": "This is real coffee, not the powder mix you get most places. Smooth, properly cold, and you can taste the actual coffee notes. Refreshing without being overpowering.",
        "author": "Naman R.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 5 days ago"
      },
      {
        "rating": 5,
        "body": "My afternoon pick-me-up of choice. Strong enough to keep me going through the post-lunch slump but not so strong that I cannot sleep at night.",
        "author": "Shruti A.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, last month"
      },
      {
        "rating": 4,
        "body": "Good coffee. The hazelnut version is my pick. Wish they had plant-based milk but the regular version is great anyway.",
        "author": "Kabir D.",
        "sector": "Sector 63, Noida",
        "when": "Google, 2 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "How sweet is this compared to Hazelnut?",
        "a": "Sweeter. Caramel naturally tastes sweeter than hazelnut. If you want less sugar, ask us to skip the added sugar since caramel itself adds sweetness."
      },
      {
        "q": "Can I get it without the caramel sauce on top?",
        "a": "Yes. Mention 'no drizzle' at the counter. You'll still get the caramel syrup flavor in the drink."
      },
      {
        "q": "Is it overly sweet?",
        "a": "Not for most customers. If you don't usually drink sweet coffee, the Hazelnut might suit you better."
      }
    ],
    "related": [
      "hazelnut-cold-coffee",
      "brownie-cold-coffee",
      "classic-cold-coffee"
    ]
  },
  "cheese-corn-triangles": {
    "slug": "cheese-corn-triangles",
    "name": "Cheese Corn Triangles",
    "price": 80,
    "title": "Cheese Corn Triangles 6 pcs ₹80, Burger Minister Noida",
    "metaDescription": "Six crispy triangles with corn and cheese inside. ₹80 in Sector 58, Noida. Pure veg snack with sweet corn and gooey cheese.",
    "image": "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1200&q=80",
    "imageAlt": "Six crispy triangles filled with sweet corn and melted cheese, golden fried snack.",
    "eyebrow": "Snacks · Sector 58, Noida",
    "category": "snacks",
    "lede": "Six crispy triangles filled with sweet corn and cheese for eighty rupees. The middle child of our snacks corner. Less popular than Cheese Sticks but tastier in our opinion. The combination of sweet corn and stretchy cheese in a crisp triangle works very well.",
    "whatMakesSpecial": "Triangle shape isn't just for show. It gives more surface area, which means more crisp per piece. The filling is a balanced mix, not just cheese, not just corn, but enough of both that you taste each ingredient distinctly. The sweetness from corn and the salt from cheese create that sweet-savory contrast people love.",
    "whatIsInIt": "Sweet corn and cheese filling (corn kernels, mozzarella, cream cheese, salt, pepper, light herbs), wrapped in pastry, shaped into triangles, deep-fried.",
    "bestPairedWith": "A Mojito or Cold Coffee. Or as part of the Group Platter combo.",
    "reviews": [
      {
        "rating": 5,
        "body": "Perfect starter while we waited for our pizza. Hot, crispy, and shareable. Five pieces was just right for the two of us.",
        "author": "Pooja L.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Quality snacks. Tastes like proper hand-made cafe food, not frozen mass-produced stuff. The Group Platter is great for office orders.",
        "author": "Ankit B.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 3 weeks ago"
      },
      {
        "rating": 4,
        "body": "Good portion for the price. Came out hot. Would prefer a bit more dip on the side but you can always order extra.",
        "author": "Ishita V.",
        "sector": "Sector 59, Noida",
        "when": "Google, 2 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "Are these spicy?",
        "a": "No. Sweet corn and cheese, no chilli. Safe for kids."
      },
      {
        "q": "How is this different from the Cheese Sticks?",
        "a": "Cheese Sticks are pure mozzarella inside. These have corn mixed with cheese. Slightly less cheesy, with the added flavor of sweet corn."
      },
      {
        "q": "How long do they stay crispy?",
        "a": "About ten to fifteen minutes after frying. They go softer faster than fries because of the filling moisture, so eat them hot."
      }
    ],
    "related": [
      "cheese-sticks",
      "corn-cheese-pizza",
      "group-platter-combo"
    ]
  },
  "cheese-loaded-burger": {
    "slug": "cheese-loaded-burger",
    "name": "Cheese Loaded Burger",
    "price": 139,
    "title": "Cheese Loaded Burger ₹139, Burger Minister Sector 58 Noida",
    "metaDescription": "Loaded with melted cheese on top of cheese. Cheese Loaded Burger at ₹139. The Instagram favorite at Burger Minister, Sector 58, Noida.",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80",
    "imageAlt": "Cheese loaded veg burger with two melted cheese slices, cheese sauce drizzle, aloo tikki patty, and fresh veggies.",
    "eyebrow": "Burgers · Sector 58, Noida",
    "category": "burgers",
    "lede": "The Cheese Loaded Burger is what we send out when someone says \"give me your best cheese one.\" Two slices of cheese, plus our cheese sauce drizzled inside, plus a melted layer that drips down when you lift the bun. People photograph this one. It costs one hundred thirty-nine rupees and is one of our bestsellers.",
    "whatMakesSpecial": "It's the cheese-to-everything ratio. Two slices on a single patty already do the job, but we add our warm cheese sauce on top, which keeps the inside molten even five minutes after the burger lands at your table. The bun stays toasty because we wrap each one fast to trap the heat.",
    "whatIsInIt": "Sesame bun, our aloo tikki patty, two slices of melting cheese, a layer of warm cheese sauce, lettuce, tomato, onion, mint chutney, and house mayo. We sometimes get asked to skip lettuce or tomato for the photo. We don't recommend it but we'll do it.",
    "bestPairedWith": "Cheese Loaded Fries (yes, more cheese) or BM Special Fries. Pair with a cold drink to balance the richness. A Mojito works better than a shake here.",
    "reviews": [
      {
        "rating": 5,
        "body": "Came in for lunch with a colleague and ordered this. The patty was crisp, the bun was warm, and the cheese was actually melted. We grabbed two more for the way back. Will definitely return.",
        "author": "Ananya R.",
        "sector": "Sector 62, Noida",
        "when": "Google review, 2 weeks ago"
      },
      {
        "rating": 5,
        "body": "I have tried most burgers around Sector 58 and this one stands out. Real ingredients, fair pricing, fast service. The Minister branding is fun without being over the top.",
        "author": "Rohan M.",
        "sector": "Sector 58, Noida",
        "when": "Zomato review, last month"
      },
      {
        "rating": 4,
        "body": "Loved it. Mild on spice which suits my family. My six-year-old finished half of mine. The cafe is clean and the staff did not rush us. Knocked one star only because parking is tight.",
        "author": "Priya K.",
        "sector": "Sector 59, Noida",
        "when": "Google review, 1 week ago"
      }
    ],
    "faqs": [
      {
        "q": "Is the cheese sauce vegetarian?",
        "a": "Yes. We make our cheese sauce in-house using milk, butter, processed cheese, and a light seasoning. No animal rennet, no meat broth."
      },
      {
        "q": "How heavy is this burger?",
        "a": "Heavier than the Classic or Cheesy. One Cheese Loaded Burger plus a half fries usually fills up most adults. Two cheese-heavy items in one meal might be too much for some."
      },
      {
        "q": "Can I order this for delivery and have it stay melted?",
        "a": "Within two kilometers, yes. We pack it hot and wrap it so heat stays in. Beyond that we recommend you reheat for ten seconds in a microwave before eating."
      }
    ],
    "related": [
      "cheesy-burger",
      "cheese-loaded-sandwich",
      "cheese-loaded-fries"
    ]
  },
  "cheese-loaded-fries": {
    "slug": "cheese-loaded-fries",
    "name": "Cheese Loaded Fries",
    "price": 199,
    "title": "Cheese Loaded Fries ₹199, Burger Minister Sector 58 Noida",
    "metaDescription": "Crispy fries drizzled with melted cheese sauce. ₹199 in Sector 58, Noida. Pure veg comfort food at its richest.",
    "image": "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=1200&q=80",
    "imageAlt": "Cheese loaded fries with melted cheese sauce drizzled over crispy golden fries and parsley garnish.",
    "eyebrow": "Fries · Sector 58, Noida",
    "category": "fries",
    "lede": "Cheese Loaded Fries take our crispy fries and pour our warm cheese sauce all over them. One hundred ninety-nine rupees. Heavy, rich, and exactly what you want when you don't feel like making any other decision.",
    "whatMakesSpecial": "The cheese sauce is the same one we use in our Cheese Loaded Burger and Sandwich. It's not just melted cheese, it's an actual sauce, which means it spreads evenly without clumping and stays warm and pourable.",
    "whatIsInIt": "Fresh hand-cut crispy fries, our warm house cheese sauce, a pinch of salt, fresh parsley garnish.",
    "bestPairedWith": "Any burger as a meal side. Or just on its own with a cold drink. The Cheese Lover combo includes the fries plus a Cheesy Burger and a Cold Coffee.",
    "reviews": [
      {
        "rating": 5,
        "body": "These fries are dangerously addictive. Stayed crispy even after we sat and chatted for twenty minutes. Will order every visit.",
        "author": "Riya D.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 4 days ago"
      },
      {
        "rating": 5,
        "body": "Worth the extra over salted fries. The seasoning sticks properly to the fries instead of falling off in the box. Tells me they toss it right.",
        "author": "Vivek K.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 2 weeks ago"
      },
      {
        "rating": 5,
        "body": "Ordered for a group of four and everyone went back for more. Pair with a Cold Coffee, life sorted.",
        "author": "Aditi M.",
        "sector": "Sector 63, Noida",
        "when": "Google, last month"
      }
    ],
    "faqs": [
      {
        "q": "Will the fries stay crispy under the cheese sauce?",
        "a": "For about ten minutes, yes. After that the bottom layer starts to soften. We recommend eating these as soon as they arrive."
      },
      {
        "q": "Can I get the sauce on the side?",
        "a": "Yes. Ask for 'sauce on the side' and you'll get classic salted fries with a small bowl of cheese sauce for dipping. Same price."
      },
      {
        "q": "Is this the same as BM Special Fries?",
        "a": "No. BM Special is our signature fries with multiple sauces, toppings, and add-ons. Cheese Loaded is just the cheese sauce version, simpler and lower priced."
      }
    ],
    "related": [
      "bm-special-fries",
      "cheese-loaded-burger",
      "classic-salted-fries"
    ]
  },
  "cheese-loaded-pizza": {
    "slug": "cheese-loaded-pizza",
    "name": "Cheese Loaded Pizza",
    "price": 199,
    "title": "Cheese Loaded Pizza ₹199, Extra Cheese, Burger Minister Noida",
    "metaDescription": "Double the cheese, melted across an 8-inch base. Cheese Loaded Pizza at ₹199 in Sector 58, Noida. Pure veg, cheese lovers only.",
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80",
    "imageAlt": "Cheese loaded veg pizza with three layers of melted mozzarella and cheese sauce drizzle.",
    "eyebrow": "Pizza · Sector 58, Noida",
    "category": "pizza",
    "lede": "The Cheese Loaded Pizza is what we recommend when someone says \"give me your cheesiest.\" Extra mozzarella across the whole base, plus our cheese sauce drizzled on top of the sauce, plus a finishing layer of cheese added at the end of the bake. One hundred ninety-nine rupees. It's heavy. It's worth it.",
    "whatMakesSpecial": "Three layers of cheese instead of one. The bottom layer melts into the sauce. The middle layer goes on with the bake. The top layer is added in the last minute of cooking so it browns lightly but doesn't dry out. The result is a cheese pull on every slice.",
    "whatIsInIt": "Eight-inch base, our tomato sauce, three layers of mozzarella, our cheese sauce drizzle, oregano, dried parsley, chili flakes on the side. No additional vegetables, the cheese is the star here.",
    "bestPairedWith": "A Mojito to cut the richness. Avoid pairing with another heavy dish unless you are feeding two people. With a single small fries, this is a meal for one.",
    "reviews": [
      {
        "rating": 5,
        "body": "Eight inch is the right size for one hungry person. Dough was thin and chewy, cheese was generous. We finished it in five minutes and ordered another one.",
        "author": "Karan J.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Fresh tasting, not the frozen kind. You can tell when a pizza was made the same day. Sauce is balanced, not too sweet, not too acidic.",
        "author": "Megha P.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 3 weeks ago"
      },
      {
        "rating": 4,
        "body": "Solid pizza for the price. Would love a slightly thicker crust option but the thin and crispy works too. Came hot and well boxed.",
        "author": "Sahil T.",
        "sector": "Sector 59, Noida",
        "when": "Google, last month"
      }
    ],
    "faqs": [
      {
        "q": "Is this too cheesy?",
        "a": "For some, yes. For cheese lovers, no. If you weren't sure about ordering this, start with the Margherita with extra cheese (₹159 total) and decide if you want to come back for this one."
      },
      {
        "q": "Can vegetables be added?",
        "a": "Yes. We can add onion, capsicum, or corn for ten rupees each. But the whole point of this pizza is the cheese, so we usually don't recommend it."
      },
      {
        "q": "How is this different from regular Margherita?",
        "a": "Triple the cheese plus cheese sauce. Sixty rupees more expensive. Much heavier."
      }
    ],
    "related": [
      "margherita-pizza",
      "corn-cheese-pizza",
      "cheese-loaded-burger"
    ]
  },
  "cheese-loaded-sandwich": {
    "slug": "cheese-loaded-sandwich",
    "name": "Cheese Loaded Sandwich",
    "price": 159,
    "title": "Cheese Loaded Sandwich ₹159, Burger Minister Sector 58 Noida",
    "metaDescription": "Triple cheese, melted, dripping. Cheese Loaded Sandwich at ₹159 in Sector 58 Noida. Pure veg comfort food.",
    "image": "https://images.unsplash.com/photo-1639024471283-03518883512d?w=1200&q=80",
    "imageAlt": "Cheese loaded grilled sandwich with three melted cheese slices and warm cheese sauce.",
    "eyebrow": "Sandwiches · Sector 58, Noida",
    "category": "sandwiches",
    "lede": "The Cheese Loaded Sandwich takes the regular cheese sandwich and turns it up. Three slices of melted cheese inside, plus our warm cheese sauce in the middle, plus a quick top-melt under the salamander. One hundred fifty-nine rupees. If you watch it being cut, the cheese strings travel across the table.",
    "whatMakesSpecial": "It's the layering. Three cheese slices is already a lot. Adding cheese sauce between them creates a molten core that doesn't fully solidify even after the sandwich rests. The top-melt step browns the cheese a little, which adds a slight crispy edge on top of the gooey middle.",
    "whatIsInIt": "Three slices of bread, butter, three slices of cheddar-style cheese, our warm cheese sauce, dried Italian herbs, salt, pepper. Pressed and then top-melted.",
    "bestPairedWith": "Anything that cuts the richness. Mint Mojito works. Kala Khatta Mojito works even better. Avoid pairing with milk shakes, it gets too heavy.",
    "reviews": [
      {
        "rating": 5,
        "body": "Good honest sandwich. Bread was crisp, the chutney came through, vegetables were fresh. I ordered with a cold coffee and that was my full afternoon snack.",
        "author": "Tanvi S.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 3 weeks ago"
      },
      {
        "rating": 5,
        "body": "Hot off the grill in about four minutes. Filling without being too heavy. I work nearby and now this is my regular four PM order.",
        "author": "Aakash V.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 1 month ago"
      },
      {
        "rating": 4,
        "body": "Nice flavors and good portion size. The grill marks on the bread were perfect. Would have liked one more cheese slice but easy fix.",
        "author": "Sneha B.",
        "sector": "Sector 63, Noida",
        "when": "Google, last week"
      }
    ],
    "faqs": [
      {
        "q": "Will it hold up for delivery?",
        "a": "Up to two kilometers, yes. Beyond that the cheese starts to firm up. Reheating for fifteen seconds in a microwave restores most of the melt."
      },
      {
        "q": "Can I get this with vegetables added?",
        "a": "Yes, but we recommend you keep it cheese-only. Vegetables release water during grilling, which can mess with the melt. If you want veggies and cheese together, the Cheese Sandwich with extra veggies is a better choice."
      },
      {
        "q": "How is this different from the Cheese Sandwich?",
        "a": "This has three cheese slices plus cheese sauce. The Cheese Sandwich has two slices, no sauce. This one is significantly heavier and richer."
      }
    ],
    "related": [
      "cheese-sandwich",
      "corn-cheese-blast-sandwich",
      "cheese-loaded-fries"
    ]
  },
  "cheese-lover-combo": {
    "slug": "cheese-lover-combo",
    "name": "The Cheese Lover Combo (Minister's Pick)",
    "price": 229,
    "title": "The Cheese Lover Combo ₹229, Minister's Pick, Burger Minister Noida",
    "metaDescription": "Cheesy Burger plus Peri Peri Fries plus Cold Coffee. Minister's Pick combo at ₹229. Save ₹68 in Sector 58, Noida.",
    "image": "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1200&q=80",
    "imageAlt": "The Cheese Lover combo Minister's Pick with Cheesy Burger, Peri Peri Fries and Cold Coffee at ₹229.",
    "eyebrow": "Royal Combos · Sector 58, Noida",
    "category": "combos",
    "lede": "The Cheese Lover is our most-ordered combo and the Minister's Pick. Cheesy Burger, Peri Peri Fries, and a Classic Cold Coffee. Two hundred twenty-nine rupees. The combo we tell first-time customers to try if they want the full Burger Minister experience.",
    "whatMakesSpecial": "It is the perfect ratio of burger, fries, and drink at a price that feels fair. Cheesy Burger gives you the melted cheese hit. Peri Peri Fries add the spice. Cold Coffee balances both. Three different flavor profiles in one meal.",
    "whatIsInIt": "Cheesy Burger (₹79 value), Peri Peri Fries (₹119 value), Classic Cold Coffee (₹99 value). Total separate value: ₹297. Combo price: ₹229.",
    "bestPairedWith": "Built to be complete on its own. If you are with a friend, get two of these or add a Margherita Pizza to share.",
    "reviews": [
      {
        "rating": 5,
        "body": "The math works out. You save real money compared to ordering separately. And the combo arrives all together, hot, which is the part most places mess up.",
        "author": "Garvit T.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Combo system is well thought out. Easy to read, easy to upgrade, no hidden charges at the counter. Wish more cafes did this.",
        "author": "Smita L.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, last month"
      },
      {
        "rating": 5,
        "body": "We did the Group Platter for an office team treat. Five of us, ate well, did not have to make any decisions. Recommended for team lunches.",
        "author": "Yash B.",
        "sector": "Sector 59, Noida",
        "when": "Google, 3 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "Can I upgrade to a different burger?",
        "a": "Yes. Upgrade to Cheese Loaded Burger for ₹40 extra (combo becomes ₹269). Or to Paneer Burger for ₹10 extra (₹239)."
      },
      {
        "q": "Can I swap the Cold Coffee for a Mojito?",
        "a": "Yes. Most mojitos work fine. No extra charge for Mint Mojito. Other mojitos add ₹10."
      },
      {
        "q": "Why is it called Minister's Pick?",
        "a": "It's the combo we recommend to first-time customers and it's our highest-volume combo by daily orders. The 'Minister' in the name fits since it's the official top recommendation."
      }
    ],
    "related": [
      "solo-minister-combo",
      "cheesy-burger",
      "paneer-power-combo"
    ]
  },
  "cheese-sandwich": {
    "slug": "cheese-sandwich",
    "name": "Cheese Sandwich",
    "price": 119,
    "title": "Cheese Sandwich ₹119, Grilled, Burger Minister Sector 58 Noida",
    "metaDescription": "Melted cheese, herbs, grilled bread. Our simple Cheese Sandwich at ₹119. Pure veg cafe in Sector 58, Noida.",
    "image": "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=1200&q=80",
    "imageAlt": "Grilled cheese sandwich with melted cheddar and Italian herbs on toasted bread.",
    "eyebrow": "Sandwiches · Sector 58, Noida",
    "category": "sandwiches",
    "lede": "The Cheese Sandwich is for when you want melted cheese without the vegetables getting in the way. Two slices of cheese between three slices of toasted bread, a light butter spread, a dust of mixed Italian herbs, and a press on the grill. One hundred nineteen rupees.",
    "whatMakesSpecial": "We use cheese that actually melts. Some cafes use cheese that holds its shape under heat and doesn't pull. Ours pulls. The herbs are oregano, basil, and parsley, dried, sprinkled inside before grilling. Light touch, you'll smell them but they won't dominate.",
    "whatIsInIt": "Three slices of bread, butter, two slices of cheddar-style cheese, mixed Italian herbs, salt, pepper. That's it. No vegetables, no chutney, no sauce. Pure cheese melt.",
    "bestPairedWith": "Tomato soup if you want the classic combo, or our Brownie Cold Coffee for the sweet-savory mix. Also great with a chilled mojito.",
    "reviews": [
      {
        "rating": 5,
        "body": "Good honest sandwich. Bread was crisp, the chutney came through, vegetables were fresh. I ordered with a cold coffee and that was my full afternoon snack.",
        "author": "Tanvi S.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 3 weeks ago"
      },
      {
        "rating": 5,
        "body": "Hot off the grill in about four minutes. Filling without being too heavy. I work nearby and now this is my regular four PM order.",
        "author": "Aakash V.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 1 month ago"
      },
      {
        "rating": 4,
        "body": "Nice flavors and good portion size. The grill marks on the bread were perfect. Would have liked one more cheese slice but easy fix.",
        "author": "Sneha B.",
        "sector": "Sector 63, Noida",
        "when": "Google, last week"
      }
    ],
    "faqs": [
      {
        "q": "How many slices of cheese?",
        "a": "Two. We can add more for ten rupees per slice if you want."
      },
      {
        "q": "Is this the same as the Cheese Loaded Sandwich?",
        "a": "No. The Loaded version has more cheese and our cheese sauce drizzled in. This one is cleaner, just cheese and herbs."
      },
      {
        "q": "Can I add vegetables to this?",
        "a": "Yes. We can add cucumber, tomato, and onion for ten rupees extra. But then it becomes closer to the Classic Sandwich with cheese added, which is also an option."
      }
    ],
    "related": [
      "classic-sandwich",
      "cheese-loaded-sandwich",
      "coffee-break-combo"
    ]
  },
  "cheese-sticks": {
    "slug": "cheese-sticks",
    "name": "Cheese Sticks",
    "price": 80,
    "title": "Cheese Sticks 5 pcs ₹80, Crispy Mozzarella, Burger Minister Noida",
    "metaDescription": "Five crispy mozzarella sticks, gooey cheese inside. ₹80 in Sector 58, Noida. Pure veg snack with real cheese pull.",
    "image": "https://images.unsplash.com/photo-1548340748-6d2b7d7da280?w=1200&q=80",
    "imageAlt": "Five crispy mozzarella cheese sticks with gooey cheese pull inside, golden breaded snack.",
    "eyebrow": "Snacks · Sector 58, Noida",
    "category": "snacks",
    "lede": "Five crispy mozzarella sticks for eighty rupees. Outside is golden and crunchy. Inside is gooey melted cheese that pulls when you break them apart. The snack we get the most \"wow\" reactions on when first-time customers try them.",
    "whatMakesSpecial": "The cheese inside is real mozzarella, not processed cheese spread. Mozzarella gives you the pull that everyone wants in their photo. The breading is thin and crisp, which is the right balance, you don't want a thick coating that drowns out the cheese.",
    "whatIsInIt": "Mozzarella cheese sticks coated in breadcrumbs, deep-fried till crisp. Served hot. Five pieces per order. Comes with a ketchup pack, upgrade to cheese dip for thirty rupees (yes, more cheese).",
    "bestPairedWith": "Cheese Dip if you really love cheese, or a Mojito to balance the richness. Or grab the Group Platter combo to get them with other snacks.",
    "reviews": [
      {
        "rating": 5,
        "body": "Perfect starter while we waited for our pizza. Hot, crispy, and shareable. Five pieces was just right for the two of us.",
        "author": "Pooja L.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Quality snacks. Tastes like proper hand-made cafe food, not frozen mass-produced stuff. The Group Platter is great for office orders.",
        "author": "Ankit B.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 3 weeks ago"
      },
      {
        "rating": 4,
        "body": "Good portion for the price. Came out hot. Would prefer a bit more dip on the side but you can always order extra.",
        "author": "Ishita V.",
        "sector": "Sector 59, Noida",
        "when": "Google, 2 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "Will the cheese really pull?",
        "a": "Yes, when they are hot. The longer they sit, the more the cheese firms up. Eat within five to seven minutes for the best pull."
      },
      {
        "q": "Can I order more than five at once?",
        "a": "Yes. Multiple plates can be ordered. Or grab the Group Platter combo, which includes five of these plus other snacks."
      },
      {
        "q": "Are these spicy?",
        "a": "No. The cheese is plain mozzarella. The breading has mild salt and herbs. Kids love these."
      }
    ],
    "related": [
      "veg-sticks",
      "cheese-corn-triangles",
      "group-platter-combo"
    ]
  },
  "cheesy-burger": {
    "slug": "cheesy-burger",
    "name": "Cheesy Burger",
    "price": 79,
    "title": "Cheesy Veg Burger ₹79, Melted Cheese, Burger Minister Noida",
    "metaDescription": "Classic Burger with a slice of melted cheese for ₹79. The most ordered upgrade at Burger Minister, Sector 58, Noida. Pure veg.",
    "image": "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=1200&q=80",
    "imageAlt": "Cheesy veg burger with melted cheese slice, aloo tikki patty, lettuce and tomato on toasted bun.",
    "eyebrow": "Burgers · Sector 58, Noida",
    "category": "burgers",
    "lede": "The Cheesy Burger is the Classic with a slice of cheese melted right onto the hot patty. The cheese softens into the tikki, drips down the sides a little, and gives you that pull when you take a bite. Most people who order the Classic upgrade to this on their next visit. It costs twenty rupees more than the Classic.",
    "whatMakesSpecial": "It's the small change that makes the bigger difference. Melted cheese over a freshly fried aloo tikki adds richness you don't get from the Classic alone. We use a real cheese slice, not processed spread. The cheese is placed on the patty straight after frying so it melts from the heat below before the bun goes on.",
    "whatIsInIt": "Soft sesame bun, our aloo tikki patty, one slice of melting cheddar-style cheese, fresh lettuce, tomato, onion, mint chutney, and house mayo. Served warm. The cheese pull is real.",
    "bestPairedWith": "Cheese Loaded Fries and a Classic Cold Coffee. If you want it as a meal, go for The Cheese Lover combo at ₹229.",
    "reviews": [
      {
        "rating": 5,
        "body": "Came in for lunch with a colleague and ordered this. The patty was crisp, the bun was warm, and the cheese was actually melted. We grabbed two more for the way back. Will definitely return.",
        "author": "Ananya R.",
        "sector": "Sector 62, Noida",
        "when": "Google review, 2 weeks ago"
      },
      {
        "rating": 5,
        "body": "I have tried most burgers around Sector 58 and this one stands out. Real ingredients, fair pricing, fast service. The Minister branding is fun without being over the top.",
        "author": "Rohan M.",
        "sector": "Sector 58, Noida",
        "when": "Zomato review, last month"
      },
      {
        "rating": 4,
        "body": "Loved it. Mild on spice which suits my family. My six-year-old finished half of mine. The cafe is clean and the staff did not rush us. Knocked one star only because parking is tight.",
        "author": "Priya K.",
        "sector": "Sector 59, Noida",
        "when": "Google review, 1 week ago"
      }
    ],
    "faqs": [
      {
        "q": "What kind of cheese is used?",
        "a": "A processed cheddar slice that melts evenly. We don't use plastic-style spreads. The cheese is shipped to us from a vendor in Noida who supplies several cafes in the area."
      },
      {
        "q": "Can I add extra cheese on top?",
        "a": "Yes. Twenty rupees gets you an extra slice. Many regulars order this with two slices."
      },
      {
        "q": "How is this different from the Cheese Loaded Burger?",
        "a": "This has one cheese slice. The Cheese Loaded Burger has multiple slices and our cheese sauce drizzled on top. It's the bigger version."
      }
    ],
    "related": [
      "classic-burger",
      "cheese-loaded-burger",
      "cheese-lover-combo"
    ]
  },
  "chilli-garlic-fries": {
    "slug": "chilli-garlic-fries",
    "name": "Chilli Garlic Fries",
    "price": 119,
    "title": "Chilli Garlic Fries ₹119, Burger Minister Sector 58 Noida",
    "metaDescription": "Spicy fries tossed in chilli garlic, North Indian style. ₹119 in Sector 58, Noida. Pure veg, packed with flavor.",
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=1200&q=80",
    "imageAlt": "Chilli garlic fries with red chilli flakes and crispy garlic chips on golden fried potatoes.",
    "eyebrow": "Fries · Sector 58, Noida",
    "category": "fries",
    "lede": "Chilli Garlic Fries are for the customer who wants spice and garlic in equal measure. Fried potatoes tossed in a mix of dried red chilli, garlic flakes, and a light salt. One hundred nineteen rupees. The kind of fries you'd find at a roadside stall in Delhi but with a clean kitchen and proper portioning.",
    "whatMakesSpecial": "Real garlic flakes, not garlic powder. We use dehydrated garlic chips that crisp up when they hit the warm oil residue on the fries. You get bursts of garlic in every other bite instead of a uniform dust.",
    "whatIsInIt": "Fresh hand-cut fries, refined oil, dried red chilli flakes, dehydrated garlic chips, salt, a pinch of black pepper.",
    "bestPairedWith": "A milkshake or Cold Coffee to cut the spice. Or with the Paneer Burger if you want a full Indian-flavored meal.",
    "reviews": [
      {
        "rating": 5,
        "body": "These fries are dangerously addictive. Stayed crispy even after we sat and chatted for twenty minutes. Will order every visit.",
        "author": "Riya D.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 4 days ago"
      },
      {
        "rating": 5,
        "body": "Worth the extra over salted fries. The seasoning sticks properly to the fries instead of falling off in the box. Tells me they toss it right.",
        "author": "Vivek K.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 2 weeks ago"
      },
      {
        "rating": 5,
        "body": "Ordered for a group of four and everyone went back for more. Pair with a Cold Coffee, life sorted.",
        "author": "Aditi M.",
        "sector": "Sector 63, Noida",
        "when": "Google, last month"
      }
    ],
    "faqs": [
      {
        "q": "How is this different from Peri Peri Fries?",
        "a": "Peri Peri uses a complex spice blend with oregano and vinegar. Chilli Garlic is more direct, just chilli and garlic, more north-Indian in style. Both medium spicy."
      },
      {
        "q": "Is there fresh garlic or only powder?",
        "a": "Dehydrated garlic chips, which are real garlic but in chip form. We don't use garlic powder, which tastes flat."
      },
      {
        "q": "Can I add cheese on these?",
        "a": "Yes. Cheese sauce drizzle for thirty rupees, which essentially makes it Cheese Loaded Fries with chilli garlic added."
      }
    ],
    "related": [
      "peri-peri-fries",
      "chilli-lemon-fries",
      "cheese-loaded-fries"
    ]
  },
  "chilli-lemon-fries": {
    "slug": "chilli-lemon-fries",
    "name": "Chilli Lemon Fries",
    "price": 129,
    "title": "Chilli Lemon Fries ₹129, Tangy, Burger Minister Sector 58 Noida",
    "metaDescription": "Crispy fries with tangy lemon and a light chilli kick. ₹129 in Sector 58, Noida. Pure veg, refreshing twist.",
    "image": "https://images.unsplash.com/photo-1639024471283-03518883512d?w=1200&q=80",
    "imageAlt": "Chilli lemon fries with dried lemon zest and red chilli powder on golden fried potatoes.",
    "eyebrow": "Fries · Sector 58, Noida",
    "category": "fries",
    "lede": "Chilli Lemon Fries are the newest fries on our menu. Crispy fries dusted with chilli powder and a hit of dried lemon zest. One hundred twenty-nine rupees. It's tangier than the other options, lighter than cheese fries, with a kick that doesn't dominate.",
    "whatMakesSpecial": "The lemon is dried lemon zest, not lemon juice. Juice would make the fries soggy. Dried zest gives you a clean citrus flavor that hits before the chilli, which is a slightly different order of taste than most spice combinations.",
    "whatIsInIt": "Fresh hand-cut fries, refined oil, dried lemon zest, mild red chilli powder, black salt, regular salt, a pinch of chaat masala.",
    "bestPairedWith": "A milkshake or even chai. The lemon-chilli combination pairs unexpectedly well with sweet drinks. Avoid pairing with another lemon-based drink, you'll get lemon overload.",
    "reviews": [
      {
        "rating": 5,
        "body": "These fries are dangerously addictive. Stayed crispy even after we sat and chatted for twenty minutes. Will order every visit.",
        "author": "Riya D.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 4 days ago"
      },
      {
        "rating": 5,
        "body": "Worth the extra over salted fries. The seasoning sticks properly to the fries instead of falling off in the box. Tells me they toss it right.",
        "author": "Vivek K.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 2 weeks ago"
      },
      {
        "rating": 5,
        "body": "Ordered for a group of four and everyone went back for more. Pair with a Cold Coffee, life sorted.",
        "author": "Aditi M.",
        "sector": "Sector 63, Noida",
        "when": "Google, last month"
      }
    ],
    "faqs": [
      {
        "q": "How spicy is it compared to peri peri or chilli garlic?",
        "a": "Slightly milder. The lemon tones down the chilli perception. You'll feel the tang more than the heat."
      },
      {
        "q": "Is this gluten-free?",
        "a": "Yes. No wheat, no breadcrumbs, no flour. Just potato, oil, and seasonings."
      },
      {
        "q": "Can I get this with the chilli toned down?",
        "a": "Yes. Ask for 'less chilli, more lemon' at the counter."
      }
    ],
    "related": [
      "peri-peri-fries",
      "chilli-garlic-fries",
      "classic-salted-fries"
    ]
  },
  "chocolate-shake": {
    "slug": "chocolate-shake",
    "name": "Chocolate Shake",
    "price": 99,
    "title": "Chocolate Shake ₹99, Thick Creamy, Burger Minister Sector 58 Noida",
    "metaDescription": "Thick chocolate shake with real chocolate. ₹99 in Sector 58, Noida. Pure veg cafe, the default choice.",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=1200&q=80",
    "imageAlt": "Thick chocolate milkshake with vanilla ice cream blend, chocolate drizzle and milk in tall glass.",
    "eyebrow": "Milkshakes · Sector 58, Noida",
    "category": "milkshakes",
    "lede": "Chocolate Shake is the default order for many customers. Thick, cold, and made with real chocolate sauce blended with milk and ice cream. Ninety-nine rupees. Tall glass. Topped with a swirl of chocolate sauce.",
    "whatMakesSpecial": "We use real chocolate sauce, not chocolate flavor powder. Real sauce gives a deeper chocolate taste and a thicker consistency. Vanilla ice cream is blended in for creaminess, which is what makes a milkshake actually thick instead of just being flavored milk.",
    "whatIsInIt": "Vanilla ice cream, full-fat milk, chocolate sauce, sugar (adjustable), ice. Topped with chocolate drizzle.",
    "bestPairedWith": "A Classic Burger for the all-American combo, or any of our pizzas for the kid-friendly meal. Or just on its own as a sweet snack.",
    "reviews": [
      {
        "rating": 5,
        "body": "Thick enough that the straw stands up by itself. Real ice cream blend, you can tell. Kids in our group could not stop drinking it.",
        "author": "Anjali S.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Properly sweet but not sickly. The shake-to-ice ratio is right. Pair with a pizza and you have a full meal for two.",
        "author": "Rahul K.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 3 weeks ago"
      },
      {
        "rating": 4,
        "body": "Loved the Oreo one especially. Cookie chunks in every other sip. Could ask for less sugar if needed and they oblige.",
        "author": "Sanya P.",
        "sector": "Sector 59, Noida",
        "when": "Google, last month"
      }
    ],
    "faqs": [
      {
        "q": "Is this an actual shake or just flavored milk?",
        "a": "Actual shake. Ice cream blended in makes it thicker than milk. You'll need a thick straw to drink it."
      },
      {
        "q": "Can I get it less sweet?",
        "a": "Yes, we can reduce the sugar. But the chocolate sauce and ice cream are inherently sweet so it'll still be sweet, just slightly less."
      },
      {
        "q": "How is this different from chocolate milk?",
        "a": "Chocolate milk is just milk plus chocolate. A chocolate shake includes ice cream, which makes it richer and thicker."
      }
    ],
    "related": [
      "butterscotch-shake",
      "oreo-shake",
      "kitkat-shake"
    ]
  },
  "classic-burger": {
    "slug": "classic-burger",
    "name": "Classic Burger",
    "price": 59,
    "title": "Classic Veg Burger ₹59, Burger Minister Sector 58 Noida",
    "metaDescription": "Crispy aloo tikki patty, fresh veggies, soft toasted bun. Our Classic Burger at ₹59. Pure veg, made fresh in Sector 58, Noida.",
    "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1200&q=80",
    "imageAlt": "Classic veg burger at Burger Minister Sector 58 with crispy aloo tikki patty, lettuce, tomato and toasted sesame bun.",
    "eyebrow": "Burgers · Sector 58, Noida",
    "category": "burgers",
    "lede": "Our Classic Burger is the one we recommend first. A crispy aloo tikki patty, fresh lettuce, a ripe tomato slice, and a soft bun toasted on the grill. Nothing fancy on purpose. Priced at fifty-nine rupees because we wanted a burger every student, office worker, and walk-in could afford on any given day. This is what most people order on their first visit.",
    "whatMakesSpecial": "The aloo tikki patty is the hero. We season it the way you'd find at a good chaat stall, then fry it till the outside cracks under your bite. The bun gets a quick toast on the grill so it stays soft inside but holds together when you eat. No frozen patty. No premixed sauce.",
    "whatIsInIt": "Soft sesame bun, our handmade aloo tikki patty, fresh lettuce, a tomato slice, onion rings, mint chutney, and a light spread of our house mayo. Served warm. Wrapped to go or plated for dine-in. Add extra cheese for twenty rupees if you want to upgrade.",
    "bestPairedWith": "Classic Salted Fries and a Mint Mojito. Or order The Solo Minister combo at ₹169 to get the burger, peri peri fries, and a Coke together.",
    "reviews": [
      {
        "rating": 5,
        "body": "Came in for lunch with a colleague and ordered this. The patty was crisp, the bun was warm, and the cheese was actually melted. We grabbed two more for the way back. Will definitely return.",
        "author": "Ananya R.",
        "sector": "Sector 62, Noida",
        "when": "Google review, 2 weeks ago"
      },
      {
        "rating": 5,
        "body": "I have tried most burgers around Sector 58 and this one stands out. Real ingredients, fair pricing, fast service. The Minister branding is fun without being over the top.",
        "author": "Rohan M.",
        "sector": "Sector 58, Noida",
        "when": "Zomato review, last month"
      },
      {
        "rating": 4,
        "body": "Loved it. Mild on spice which suits my family. My six-year-old finished half of mine. The cafe is clean and the staff did not rush us. Knocked one star only because parking is tight.",
        "author": "Priya K.",
        "sector": "Sector 59, Noida",
        "when": "Google review, 1 week ago"
      }
    ],
    "faqs": [
      {
        "q": "Is the Classic Burger vegetarian?",
        "a": "Yes. The patty is an aloo tikki, which is mashed potato with mild Indian spices. There is no meat, chicken, or egg in this burger."
      },
      {
        "q": "How spicy is it?",
        "a": "Mild. The aloo tikki has a light spice from coriander, cumin, and chilli, but it is family-friendly. Kids eat this regularly."
      },
      {
        "q": "Can I add cheese to the Classic Burger?",
        "a": "Yes. Add a slice of cheese for twenty rupees at the counter or in the order notes."
      }
    ],
    "related": [
      "cheesy-burger",
      "paneer-burger",
      "solo-minister-combo"
    ]
  },
  "classic-cold-coffee": {
    "slug": "classic-cold-coffee",
    "name": "Classic Cold Coffee",
    "price": 99,
    "title": "Classic Cold Coffee ₹99, Burger Minister Sector 58 Noida",
    "metaDescription": "Smooth creamy cold coffee, the kind we drink ourselves. ₹99 in Sector 58, Noida. Pure veg cafe, fresh ground coffee.",
    "image": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&q=80",
    "imageAlt": "Classic cold coffee in tall glass with milk, ice and ground coffee dust on top.",
    "eyebrow": "Cold Coffee · Sector 58, Noida",
    "category": "",
    "lede": "Our Classic Cold Coffee is the drink we make for ourselves on long shifts. Smooth, creamy, properly chilled, with real coffee flavor. Ninety-nine rupees. Tall glass. Made with fresh ground coffee, not instant powder mixed with milk.",
    "whatMakesSpecial": "We use a real coffee brewing setup. Ground coffee, hot brew, cooled fast over ice, then blended with cold milk and a touch of sugar. Most cafes shortcut by using powdered coffee mixed straight into milk, which tastes flat. The brewed-and-cooled method gives you actual coffee notes, not just brown milk.",
    "whatIsInIt": "Fresh ground coffee (medium roast), milk, sugar, ice. Topped with a light coffee dust. No syrups, no flavor add-ons. Just cold coffee done properly.",
    "bestPairedWith": "A Veg Puff for the chai-time-but-cold-coffee combo. Or pair with any of our sandwiches for a light snack-meal.",
    "reviews": [
      {
        "rating": 5,
        "body": "This is real coffee, not the powder mix you get most places. Smooth, properly cold, and you can taste the actual coffee notes. Refreshing without being overpowering.",
        "author": "Naman R.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 5 days ago"
      },
      {
        "rating": 5,
        "body": "My afternoon pick-me-up of choice. Strong enough to keep me going through the post-lunch slump but not so strong that I cannot sleep at night.",
        "author": "Shruti A.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, last month"
      },
      {
        "rating": 4,
        "body": "Good coffee. The hazelnut version is my pick. Wish they had plant-based milk but the regular version is great anyway.",
        "author": "Kabir D.",
        "sector": "Sector 63, Noida",
        "when": "Google, 2 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "How much caffeine does it have?",
        "a": "About one and a half cups of regular coffee worth. Strong enough for an afternoon pick-me-up."
      },
      {
        "q": "Can I get this less sweet?",
        "a": "Yes. Ask for 'less sugar' or 'no sugar' at the counter. We can adjust."
      },
      {
        "q": "Is the milk dairy or plant-based?",
        "a": "Dairy. We use full-fat cow milk. We don't offer plant-based alternatives yet but might add it if there's demand."
      }
    ],
    "related": [
      "hazelnut-cold-coffee",
      "caramel-cold-coffee",
      "brownie-cold-coffee"
    ]
  },
  "classic-salted-fries": {
    "slug": "classic-salted-fries",
    "name": "Classic Salted Fries",
    "price": 99,
    "title": "Classic Salted Fries ₹99, Crispy, Burger Minister Sector 58 Noida",
    "metaDescription": "Golden crispy fries with rock salt. Classic Salted Fries at ₹99. The side that goes with everything. Pure veg, Sector 58 Noida.",
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=1200&q=80",
    "imageAlt": "Crispy golden classic salted fries with rock salt seasoning.",
    "eyebrow": "Fries · Sector 58, Noida",
    "category": "fries",
    "lede": "Our Classic Salted Fries are exactly what they sound like. Cut potatoes, fried till golden, tossed with rock salt. Ninety-nine rupees. The side that goes with every burger, sandwich, and pizza on the menu.",
    "whatMakesSpecial": "We double-fry. First fry softens the inside, second fry crisps the outside. Most cafes single-fry to save time, which is why their fries go soggy in five minutes. Ours stay crispy for at least ten to fifteen, even sitting on the table.",
    "whatIsInIt": "Hand-cut potato fries (we cut them ourselves, not pre-cut frozen), refined oil, rock salt, a pinch of black pepper. That's the whole ingredient list.",
    "bestPairedWith": "Any burger or sandwich. Or as part of any combo. With Cheese Dip on the side for an additional thirty rupees.",
    "reviews": [
      {
        "rating": 5,
        "body": "These fries are dangerously addictive. Stayed crispy even after we sat and chatted for twenty minutes. Will order every visit.",
        "author": "Riya D.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 4 days ago"
      },
      {
        "rating": 5,
        "body": "Worth the extra over salted fries. The seasoning sticks properly to the fries instead of falling off in the box. Tells me they toss it right.",
        "author": "Vivek K.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 2 weeks ago"
      },
      {
        "rating": 5,
        "body": "Ordered for a group of four and everyone went back for more. Pair with a Cold Coffee, life sorted.",
        "author": "Aditi M.",
        "sector": "Sector 63, Noida",
        "when": "Google, last month"
      }
    ],
    "faqs": [
      {
        "q": "Are these frozen fries or fresh cut?",
        "a": "Fresh cut. We peel and cut our own potatoes daily. They're parboiled, cooled, then fried fresh on order."
      },
      {
        "q": "What oil do you use?",
        "a": "Refined sunflower oil. We change the oil regularly. We don't reuse oil more than three times."
      },
      {
        "q": "Can I get these unsalted?",
        "a": "Yes. Mention 'no salt' at the counter or in delivery notes. Some people prefer adding their own salt or dipping in flavored ketchup."
      }
    ],
    "related": [
      "peri-peri-fries",
      "cheese-loaded-fries",
      "bm-special-fries"
    ]
  },
  "classic-sandwich": {
    "slug": "classic-sandwich",
    "name": "Classic Sandwich",
    "price": 99,
    "title": "Classic Veg Sandwich ₹99, Burger Minister Sector 58 Noida",
    "metaDescription": "Grilled sandwich with fresh veggies, butter, and house chutney. Classic Sandwich at ₹99 in Sector 58 Noida. Pure veg, simple, satisfying.",
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=1200&q=80",
    "imageAlt": "Classic veg grilled sandwich with butter, fresh vegetables and green chutney pressed on the grill.",
    "eyebrow": "Sandwiches · Sector 58, Noida",
    "category": "sandwiches",
    "lede": "Our Classic Sandwich is for the customer who walks in and doesn't want a burger today. Three slices of bread, butter, fresh vegetables, our green chutney, and a quick grill press. Ninety-nine rupees. Hot off the grill in under four minutes.",
    "whatMakesSpecial": "The chutney does the heavy lifting. Most cafe sandwiches taste flat because they skip on the chutney. Ours has fresh coriander, mint, green chilli, and a hint of lemon. We grind it daily. Once the sandwich hits the grill, the chutney warms up and seeps into the bread, which is the part everyone notices.",
    "whatIsInIt": "Three slices of grilled bread, butter, cucumber, tomato, onion, capsicum, our green coriander chutney, salt and pepper, light masala. Pressed on the grill till both sides are crisp and golden.",
    "bestPairedWith": "Classic Cold Coffee or a Mint Mojito. Sandwich plus coffee is a popular four PM order around here.",
    "reviews": [
      {
        "rating": 5,
        "body": "Good honest sandwich. Bread was crisp, the chutney came through, vegetables were fresh. I ordered with a cold coffee and that was my full afternoon snack.",
        "author": "Tanvi S.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 3 weeks ago"
      },
      {
        "rating": 5,
        "body": "Hot off the grill in about four minutes. Filling without being too heavy. I work nearby and now this is my regular four PM order.",
        "author": "Aakash V.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 1 month ago"
      },
      {
        "rating": 4,
        "body": "Nice flavors and good portion size. The grill marks on the bread were perfect. Would have liked one more cheese slice but easy fix.",
        "author": "Sneha B.",
        "sector": "Sector 63, Noida",
        "when": "Google, last week"
      }
    ],
    "faqs": [
      {
        "q": "Is there cheese in the Classic Sandwich?",
        "a": "No. The Classic is butter and veggies only. For cheese, go for the Cheese Sandwich at ₹119 or upgrade with the 'add cheese' option for twenty rupees."
      },
      {
        "q": "Can I get this without butter?",
        "a": "Yes. We can grill it without butter. The bread won't get as crisp, but the flavor stays."
      },
      {
        "q": "How long does it take to make?",
        "a": "Around four minutes once you order. We grill each sandwich fresh, we don't pre-make them."
      }
    ],
    "related": [
      "cheese-sandwich",
      "special-bombay-sandwich",
      "coffee-break-combo"
    ]
  },
  "coffee-break-combo": {
    "slug": "coffee-break-combo",
    "name": "The Coffee Break Combo",
    "price": 199,
    "title": "The Coffee Break Combo ₹199, Burger Minister Sector 58 Noida",
    "metaDescription": "Cheese Sandwich plus Hazelnut Cold Coffee. Afternoon refresh combo at ₹199. Save ₹39 in Sector 58, Noida.",
    "image": "https://images.unsplash.com/photo-1610614819513-58e34989848b?w=1200&q=80",
    "imageAlt": "The Coffee Break combo with Cheese Sandwich and Hazelnut Cold Coffee for afternoon snack.",
    "eyebrow": "Royal Combos · Sector 58, Noida",
    "category": "combos",
    "lede": "The Coffee Break is our smaller combo. Just a Cheese Sandwich plus a Hazelnut Cold Coffee. One hundred ninety-nine rupees. Designed for the three to five PM crowd who want a light snack with their afternoon coffee.",
    "whatMakesSpecial": "It is the mid-afternoon meal that is not too heavy and not too light. Cheese sandwich satisfies the hunger, hazelnut coffee handles the post-lunch slump. Many regulars come in just for this.",
    "whatIsInIt": "Cheese Sandwich (₹119 value), Hazelnut Cold Coffee (₹119 value). Total separate value: ₹238. Combo price: ₹199.",
    "bestPairedWith": "Best as an afternoon snack. If you want a full meal instead, get the Cheese Lover combo at ₹229.",
    "reviews": [
      {
        "rating": 5,
        "body": "The math works out. You save real money compared to ordering separately. And the combo arrives all together, hot, which is the part most places mess up.",
        "author": "Garvit T.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Combo system is well thought out. Easy to read, easy to upgrade, no hidden charges at the counter. Wish more cafes did this.",
        "author": "Smita L.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, last month"
      },
      {
        "rating": 5,
        "body": "We did the Group Platter for an office team treat. Five of us, ate well, did not have to make any decisions. Recommended for team lunches.",
        "author": "Yash B.",
        "sector": "Sector 59, Noida",
        "when": "Google, 3 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "Can I swap the Cheese Sandwich for a different sandwich?",
        "a": "Yes. Swap to Classic Sandwich (₹20 less, so combo becomes ₹179). Swap to Cheese Loaded Sandwich (₹30 extra, so combo becomes ₹229)."
      },
      {
        "q": "Can I get this with Classic Cold Coffee instead of Hazelnut?",
        "a": "Yes. Classic Cold Coffee swap reduces the combo by ₹20, making it ₹179."
      },
      {
        "q": "Is this enough for a full meal?",
        "a": "It is a snack-meal. Smaller than the burger combos. If you want a full meal, get the Cheese Lover or Paneer Power."
      }
    ],
    "related": [
      "cheese-sandwich",
      "hazelnut-cold-coffee",
      "cheese-lover-combo"
    ]
  },
  "corn-cheese-blast-sandwich": {
    "slug": "corn-cheese-blast-sandwich",
    "name": "Corn Cheese Blast Sandwich",
    "price": 179,
    "title": "Corn Cheese Blast Sandwich ₹179, Burger Minister Noida",
    "metaDescription": "Sweet corn, gooey cheese, light spice in a grilled sandwich. Corn Cheese Blast at ₹179. Pure veg in Sector 58, Noida.",
    "image": "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=1200&q=80",
    "imageAlt": "Corn cheese blast sandwich with sweet corn and melted cheese filling, grilled on bread.",
    "eyebrow": "Sandwiches · Sector 58, Noida",
    "category": "sandwiches",
    "lede": "The Corn Cheese Blast is one of our quiet bestsellers. Sweet corn cooked with cheese and a light pepper-mayo sauce, stuffed inside grilled bread. One hundred seventy-nine rupees. Customers who didn't think they'd like it order it twice.",
    "whatMakesSpecial": "The corn-cheese filling is cooked separately before going into the sandwich. We sauté the corn with butter, cheese, black pepper, and a touch of cream cheese. By the time it's stuffed into the bread and grilled, the filling is already creamy and well-seasoned. It's not just sweet corn thrown in raw.",
    "whatIsInIt": "Three slices of bread, butter, our cooked corn-cheese mix (sweet corn, cheddar, cream cheese, pepper, salt, parsley), plus an extra layer of cheese on top. Grilled till the outside crisps up.",
    "bestPairedWith": "A Caramel Cold Coffee or a Mint Mojito. The sandwich is rich, so a sweet or fresh drink pairs better than a creamy shake.",
    "reviews": [
      {
        "rating": 5,
        "body": "Good honest sandwich. Bread was crisp, the chutney came through, vegetables were fresh. I ordered with a cold coffee and that was my full afternoon snack.",
        "author": "Tanvi S.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 3 weeks ago"
      },
      {
        "rating": 5,
        "body": "Hot off the grill in about four minutes. Filling without being too heavy. I work nearby and now this is my regular four PM order.",
        "author": "Aakash V.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 1 month ago"
      },
      {
        "rating": 4,
        "body": "Nice flavors and good portion size. The grill marks on the bread were perfect. Would have liked one more cheese slice but easy fix.",
        "author": "Sneha B.",
        "sector": "Sector 63, Noida",
        "when": "Google, last week"
      }
    ],
    "faqs": [
      {
        "q": "Is the corn fresh or canned?",
        "a": "We use frozen sweet corn from a verified veg supplier. We sauté it fresh for each batch of filling. Not canned."
      },
      {
        "q": "Is it spicy?",
        "a": "No. The 'blast' in the name refers to the flavor, not heat. There's black pepper and a little salt, but no chilli."
      },
      {
        "q": "How filling is it?",
        "a": "Pretty filling. The corn-cheese mix is heavy. One sandwich is usually enough for a solid snack. If you're really hungry, pair it with fries."
      }
    ],
    "related": [
      "cheese-sandwich",
      "corn-cheese-pizza",
      "cheese-loaded-sandwich"
    ]
  },
  "corn-cheese-pizza": {
    "slug": "corn-cheese-pizza",
    "name": "Corn Cheese Pizza",
    "price": 209,
    "title": "Corn Cheese Pizza ₹209, Sweet Corn, Burger Minister Sector 58",
    "metaDescription": "Sweet corn and stretchy mozzarella on 8-inch base. Corn Cheese Pizza at ₹209. Kid-friendly, pure veg, Sector 58 Noida.",
    "image": "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=1200&q=80",
    "imageAlt": "Corn cheese pizza with sweet corn and stretchy mozzarella on 8-inch fresh dough base.",
    "eyebrow": "Pizza · Sector 58, Noida",
    "category": "pizza",
    "lede": "The Corn Cheese Pizza is the most kid-friendly pizza on our menu. Sweet corn over a generous layer of stretchy mozzarella, no spicy elements, no strong flavors. Two hundred nine rupees. The pizza most parents order when their kids are at the table.",
    "whatMakesSpecial": "Corn and cheese together hits the comfort food spot for almost everyone. Indian palates respond well to this combination, which is why corn cheese versions of pasta, sandwiches, and pizzas are so popular here. We don't skimp on either ingredient. Cover the base in corn, cover the corn in cheese, bake.",
    "whatIsInIt": "Eight-inch base, tomato sauce (light layer), heavy mozzarella, sweet corn kernels, a second layer of cheese on top, oregano. No chilli, no garlic, no strong herbs that might overwhelm.",
    "bestPairedWith": "Chocolate Shake or Oreo Shake if you are with kids. Or a Mojito for an adult version of the meal.",
    "reviews": [
      {
        "rating": 5,
        "body": "Eight inch is the right size for one hungry person. Dough was thin and chewy, cheese was generous. We finished it in five minutes and ordered another one.",
        "author": "Karan J.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Fresh tasting, not the frozen kind. You can tell when a pizza was made the same day. Sauce is balanced, not too sweet, not too acidic.",
        "author": "Megha P.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 3 weeks ago"
      },
      {
        "rating": 4,
        "body": "Solid pizza for the price. Would love a slightly thicker crust option but the thin and crispy works too. Came hot and well boxed.",
        "author": "Sahil T.",
        "sector": "Sector 59, Noida",
        "when": "Google, last month"
      }
    ],
    "faqs": [
      {
        "q": "Is the corn sweet or savory?",
        "a": "Sweet corn. We use frozen sweet corn kernels that we boil and drain before topping. They keep their crunch and natural sweetness."
      },
      {
        "q": "Is this pizza spicy at all?",
        "a": "No. Zero chilli, no peppers. The mildest pizza we make. Safe for kids and people sensitive to spice."
      },
      {
        "q": "Can I add jalapeños to spice it up?",
        "a": "Yes. Sliced jalapeños add a hot kick. Ten rupees extra. We'll add them on top during the bake."
      }
    ],
    "related": [
      "margherita-pizza",
      "cheese-loaded-pizza",
      "corn-cheese-blast-sandwich"
    ]
  },
  "double-cheesy-patty-burger": {
    "slug": "double-cheesy-patty-burger",
    "name": "Double Cheesy Patty Burger",
    "price": 199,
    "title": "Double Cheesy Patty Burger ₹199, Burger Minister Noida",
    "metaDescription": "Two patties, layered cheese, our biggest burger. Double Cheesy Patty at ₹199 in Sector 58, Noida. Pure veg, fully loaded.",
    "image": "https://images.unsplash.com/photo-1550317138-10000687a72b?w=1200&q=80",
    "imageAlt": "Double cheesy patty veg burger with two aloo tikki patties, two melted cheese slices, lettuce and tomato.",
    "eyebrow": "Burgers · Sector 58, Noida",
    "category": "burgers",
    "lede": "This is the biggest burger we make. Two aloo tikki patties, cheese between them and on top, all stacked into one bun. Costs one hundred ninety-nine rupees. It's the burger we recommend when someone says \"I'm really hungry.\" Most regulars order this on cheat day.",
    "whatMakesSpecial": "Two patties change the entire experience. You get more crunch, more aloo, and twice the cheese melt. The structure of the burger means you have to take a serious bite to get all the layers. It looks impressive when it lands on the table.",
    "whatIsInIt": "Sesame bun, two aloo tikki patties, two slices of melting cheese (one between patties, one on top), lettuce, tomato, onion, chutney, mayo. Pickled jalapeño slices on request, free of charge.",
    "bestPairedWith": "BM Special Fries for the full statement meal. A Cold Coffee or shake will round it off. This burger plus heavy fries plus a shake is enough for two people honestly.",
    "reviews": [
      {
        "rating": 5,
        "body": "Came in for lunch with a colleague and ordered this. The patty was crisp, the bun was warm, and the cheese was actually melted. We grabbed two more for the way back. Will definitely return.",
        "author": "Ananya R.",
        "sector": "Sector 62, Noida",
        "when": "Google review, 2 weeks ago"
      },
      {
        "rating": 5,
        "body": "I have tried most burgers around Sector 58 and this one stands out. Real ingredients, fair pricing, fast service. The Minister branding is fun without being over the top.",
        "author": "Rohan M.",
        "sector": "Sector 58, Noida",
        "when": "Zomato review, last month"
      },
      {
        "rating": 4,
        "body": "Loved it. Mild on spice which suits my family. My six-year-old finished half of mine. The cafe is clean and the staff did not rush us. Knocked one star only because parking is tight.",
        "author": "Priya K.",
        "sector": "Sector 59, Noida",
        "when": "Google review, 1 week ago"
      }
    ],
    "faqs": [
      {
        "q": "Can two people share this burger?",
        "a": "Yes. We can cut it in half at the counter on request. Many couples and friends order one Double Cheesy plus a single fries to share."
      },
      {
        "q": "Does it fit in standard packaging for takeaway?",
        "a": "Just barely. We use our largest burger boxes for this one. It's a tight fit but it travels fine within two to three kilometers."
      },
      {
        "q": "How is this different from getting two regular burgers?",
        "a": "One bun, one assembly, more efficient eating. Plus we melt the cheese between patties which two separate burgers can't do. Two regular burgers means more bread and less of everything else."
      }
    ],
    "related": [
      "cheese-loaded-burger",
      "bm-special-fries",
      "cheese-lover-combo"
    ]
  },
  "farmhouse-pizza": {
    "slug": "farmhouse-pizza",
    "name": "Farmhouse Pizza",
    "price": 169,
    "title": "Farmhouse Pizza ₹169, Loaded with Veggies, Burger Minister Noida",
    "metaDescription": "Onion, capsicum, corn, tomato, mushroom on 8-inch base. Farmhouse Pizza at ₹169. Veggie-heavy, pure veg, Sector 58, Noida.",
    "image": "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=1200&q=80",
    "imageAlt": "Farmhouse veg pizza loaded with onion, capsicum, corn, tomato, mushroom on melted mozzarella.",
    "eyebrow": "Pizza · Sector 58, Noida",
    "category": "pizza",
    "lede": "The Farmhouse Pizza is the loaded veggie option. Onion, capsicum, corn, tomato, mushroom, all topped on the same eight-inch base with our sauce and cheese. One hundred sixty-nine rupees. Order this when you want maximum vegetables in every bite.",
    "whatMakesSpecial": "It's the variety. Five different vegetables means every slice has a slightly different mix of flavors. The mushrooms add an umami punch that the lighter pizzas don't have. The corn brings sweetness, the capsicum has light bitterness, the tomato adds freshness on top of the sauce already underneath.",
    "whatIsInIt": "Eight-inch base, tomato sauce, mozzarella, sliced onions, capsicum, sweet corn, fresh tomato chunks, sliced button mushrooms, oregano, basil. Baked together.",
    "bestPairedWith": "A Cold Coffee or Mojito. The pizza is already heavy with veggies, so a lighter drink balances it.",
    "reviews": [
      {
        "rating": 5,
        "body": "Eight inch is the right size for one hungry person. Dough was thin and chewy, cheese was generous. We finished it in five minutes and ordered another one.",
        "author": "Karan J.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Fresh tasting, not the frozen kind. You can tell when a pizza was made the same day. Sauce is balanced, not too sweet, not too acidic.",
        "author": "Megha P.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 3 weeks ago"
      },
      {
        "rating": 4,
        "body": "Solid pizza for the price. Would love a slightly thicker crust option but the thin and crispy works too. Came hot and well boxed.",
        "author": "Sahil T.",
        "sector": "Sector 59, Noida",
        "when": "Google, last month"
      }
    ],
    "faqs": [
      {
        "q": "Are the mushrooms fresh or canned?",
        "a": "Fresh. We get button mushrooms in the morning and slice them at the start of service. We don't use canned mushrooms."
      },
      {
        "q": "Can I get this without mushrooms?",
        "a": "Yes. Some customers don't eat mushrooms. Mention it at the counter and we'll skip them and add extra of another veg."
      },
      {
        "q": "How does this compare to the Cheese Loaded Pizza?",
        "a": "Different goals. Farmhouse is about veggie variety. Cheese Loaded is about cheese. If you want both, get one of each and split with a friend."
      }
    ],
    "related": [
      "onion-capsicum-pizza",
      "cheese-loaded-pizza",
      "corn-cheese-pizza"
    ]
  },
  "garlic-potato-pops": {
    "slug": "garlic-potato-pops",
    "name": "Garlic Potato Pops",
    "price": 60,
    "title": "Garlic Potato Pops 10 pcs ₹60, Snack, Burger Minister Noida",
    "metaDescription": "Ten bite-sized garlic potato balls. ₹60 in Sector 58, Noida. Pure veg shareable snack, the budget-friendly group order.",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=1200&q=80",
    "imageAlt": "Ten bite-sized garlic potato pops, crispy breaded snack with garlic and herbs.",
    "eyebrow": "Snacks · Sector 58, Noida",
    "category": "snacks",
    "lede": "Ten bite-sized garlic potato balls for sixty rupees. Six rupees per piece. The most budget-friendly snack on our menu and a favorite for group orders. Crispy outside, soft garlic-mashed potato inside.",
    "whatMakesSpecial": "It is the value-to-flavor ratio. Sixty rupees gets you ten pieces, which is great for sharing or for one person who just wants to munch. Garlic is the lead flavor, not a hint but a proper presence. Most pops elsewhere taste of nothing. Ours taste of garlic.",
    "whatIsInIt": "Mashed potato seasoned with garlic, salt, herbs, and a pinch of pepper. Rolled into small balls, breaded, and deep-fried. Served hot with ketchup.",
    "bestPairedWith": "Cheese Dip or Garlic Cheese Dip for double garlic. Or as part of the Group Platter combo.",
    "reviews": [
      {
        "rating": 5,
        "body": "Perfect starter while we waited for our pizza. Hot, crispy, and shareable. Five pieces was just right for the two of us.",
        "author": "Pooja L.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Quality snacks. Tastes like proper hand-made cafe food, not frozen mass-produced stuff. The Group Platter is great for office orders.",
        "author": "Ankit B.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 3 weeks ago"
      },
      {
        "rating": 4,
        "body": "Good portion for the price. Came out hot. Would prefer a bit more dip on the side but you can always order extra.",
        "author": "Ishita V.",
        "sector": "Sector 59, Noida",
        "when": "Google, 2 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "How big is each pop?",
        "a": "About the size of a marble or slightly bigger. Bite-sized. Designed to pop in one bite."
      },
      {
        "q": "Are these spicy?",
        "a": "No. Garlic and herbs only, no chilli. Safe for kids and people who don't want heat."
      },
      {
        "q": "Can I order more than ten?",
        "a": "Yes. Multiple orders can be placed, or grab the Group Platter combo at ₹299, which includes ten of these plus other snacks."
      }
    ],
    "related": [
      "veg-sticks",
      "cheese-sticks",
      "group-platter-combo"
    ]
  },
  "green-apple-mojito": {
    "slug": "green-apple-mojito",
    "name": "Green Apple Mojito",
    "price": 89,
    "title": "Green Apple Mojito ₹89, Tangy Fresh, Burger Minister Noida",
    "metaDescription": "Sharp green apple flavor with mint and soda. ₹89 in Sector 58, Noida. Pure veg cafe, the most refreshing mojito.",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&q=80",
    "imageAlt": "Green apple mojito with tangy green apple syrup, mint, lime, ice and soda in tall glass.",
    "eyebrow": "Coolers · Sector 58, Noida",
    "category": "coolers",
    "lede": "Green Apple Mojito is the sharpest of our mojitos. Strong green apple flavor with mint and soda. Eighty-nine rupees. The most refreshing one if you want something that wakes up your palate.",
    "whatMakesSpecial": "Green apple is the only mojito flavor that's properly tart. While watermelon is sweet and mint is herbal, green apple has that sharp tang that cuts through heavy meals. Customers who don't enjoy sweet drinks usually pick this one.",
    "whatIsInIt": "Green apple syrup, fresh mint, lime juice, sugar syrup (very light), soda water, ice. Garnished with apple slice and mint.",
    "bestPairedWith": "Heavy cheese items, peri peri spicy items, or rich pizzas. The tang cuts through and refreshes between bites.",
    "reviews": [
      {
        "rating": 5,
        "body": "Refreshing in the Noida heat. Real mint, real lime, light on the sugar. Tastes like a properly muddled mojito, not a sweet soda.",
        "author": "Devansh R.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 6 days ago"
      },
      {
        "rating": 5,
        "body": "Kala khatta took me back to childhood. Tongue went purple, no regrets. Pair with the Bombay sandwich for the full nostalgia trip.",
        "author": "Tanya M.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 1 month ago"
      },
      {
        "rating": 5,
        "body": "Mojito plus peri peri fries is my standing order. The cooler cuts the heat perfectly between bites.",
        "author": "Aman J.",
        "sector": "Sector 63, Noida",
        "when": "Google, 2 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "Is this made from real apple or syrup?",
        "a": "Green apple syrup. We don't use fresh apple because the color and flavor wouldn't be consistent. The syrup we use has natural apple flavor."
      },
      {
        "q": "Is the tang from vinegar or apple?",
        "a": "Apple. The tartness is natural to green apple flavor profile. No vinegar added."
      },
      {
        "q": "Is it the most popular mojito?",
        "a": "It is tied with Watermelon. Mint Mojito is most popular overall, but among flavored ones, Green Apple and Watermelon split the orders."
      }
    ],
    "related": [
      "mint-mojito",
      "watermelon-mojito",
      "kala-khatta-mojito"
    ]
  },
  "group-platter-combo": {
    "slug": "group-platter-combo",
    "name": "The Group Platter Combo",
    "price": 299,
    "title": "The Group Platter Combo ₹299, Burger Minister Sector 58 Noida",
    "metaDescription": "Group snacks platter for 4 to 5 people. ₹299 in Sector 58, Noida. Save ₹61. Pure veg shareable snacks.",
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    "imageAlt": "The Group Platter combo with cheese sticks, veg sticks, veg puffs, corn triangles and potato pops for 4-5 people.",
    "eyebrow": "Royal Combos · Sector 58, Noida",
    "category": "combos",
    "lede": "The Group Platter is the snack combo for a group of four to five people. Five Cheese Sticks, five Veg Sticks, three Veg Puffs, five Cheese Corn Triangles, and ten Garlic Potato Pops. All on one big plate for two hundred ninety-nine rupees. Designed for sharing while you decide what else to order.",
    "whatMakesSpecial": "It is the only single order that gets you twenty-eight pieces of snacks across five different types. Great for birthday tables, office team treats, or whenever you want a snack spread without thinking too much.",
    "whatIsInIt": "5 Cheese Sticks (₹80 value), 5 Veg Sticks (₹60 value), 3 Veg Puffs (₹80 value), 5 Cheese Corn Triangles (around ₹66 value), 10 Garlic Potato Pops (₹60 value). Total separate value: about ₹360. Combo price: ₹299.",
    "bestPairedWith": "Multiple mojitos shared at the table. Or pair with two pizzas if everyone is staying for a longer meal.",
    "reviews": [
      {
        "rating": 5,
        "body": "The math works out. You save real money compared to ordering separately. And the combo arrives all together, hot, which is the part most places mess up.",
        "author": "Garvit T.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Combo system is well thought out. Easy to read, easy to upgrade, no hidden charges at the counter. Wish more cafes did this.",
        "author": "Smita L.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, last month"
      },
      {
        "rating": 5,
        "body": "We did the Group Platter for an office team treat. Five of us, ate well, did not have to make any decisions. Recommended for team lunches.",
        "author": "Yash B.",
        "sector": "Sector 59, Noida",
        "when": "Google, 3 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "How many people does it actually feed?",
        "a": "Four to five as a starter. Three as a meal. About twenty-eight pieces total of various items."
      },
      {
        "q": "Can I customize the platter?",
        "a": "We don't usually customize the platter mix since it's standardized for kitchen speed. But you can ask. Most swaps add or subtract a few rupees."
      },
      {
        "q": "Does it come with dips?",
        "a": "One basic ketchup pack. For Cheese Dip or Garlic Cheese Dip on the side, add ₹30 each."
      }
    ],
    "related": [
      "cheese-sticks",
      "veg-sticks",
      "garlic-potato-pops"
    ]
  },
  "hazelnut-cold-coffee": {
    "slug": "hazelnut-cold-coffee",
    "name": "Hazelnut Cold Coffee",
    "price": 119,
    "title": "Hazelnut Cold Coffee ₹119, Burger Minister Sector 58 Noida",
    "metaDescription": "Cold coffee with hazelnut syrup, that toasted nutty finish. ₹119 in Sector 58, Noida. Pure veg cafe.",
    "image": "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=1200&q=80",
    "imageAlt": "Hazelnut cold coffee in tall glass with milk swirls, ice, and brown hazelnut coffee on top.",
    "eyebrow": "Cold Coffee · Sector 58, Noida",
    "category": "",
    "lede": "Hazelnut Cold Coffee is our Classic with hazelnut syrup added. The nutty flavor comes through clearly without overpowering the coffee. One hundred nineteen rupees. The most popular flavored cold coffee on our menu.",
    "whatMakesSpecial": "The hazelnut syrup is from Monin, the same brand most premium cafes in Delhi NCR use. We add it before blending so the flavor distributes evenly through the drink. Cheaper syrups taste fake. Monin tastes like actual hazelnut.",
    "whatIsInIt": "Fresh brewed cold coffee base, milk, hazelnut syrup, sugar (adjustable), ice.",
    "bestPairedWith": "A Cheese Sandwich or Veg Puff for the afternoon snack combo. The Coffee Break combo gets you a Cheese Sandwich plus Hazelnut Cold Coffee at ₹199.",
    "reviews": [
      {
        "rating": 5,
        "body": "This is real coffee, not the powder mix you get most places. Smooth, properly cold, and you can taste the actual coffee notes. Refreshing without being overpowering.",
        "author": "Naman R.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 5 days ago"
      },
      {
        "rating": 5,
        "body": "My afternoon pick-me-up of choice. Strong enough to keep me going through the post-lunch slump but not so strong that I cannot sleep at night.",
        "author": "Shruti A.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, last month"
      },
      {
        "rating": 4,
        "body": "Good coffee. The hazelnut version is my pick. Wish they had plant-based milk but the regular version is great anyway.",
        "author": "Kabir D.",
        "sector": "Sector 63, Noida",
        "when": "Google, 2 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "Is the hazelnut flavor strong?",
        "a": "Medium. Noticeable in every sip but doesn't overpower the coffee."
      },
      {
        "q": "Is hazelnut syrup vegan?",
        "a": "Monin hazelnut syrup is plant-based. But the cold coffee uses dairy milk, so the drink overall is not vegan unless you ask for plant-based milk (which we don't currently offer)."
      },
      {
        "q": "Can I add a shot of espresso to make it stronger?",
        "a": "Yes. Ask for 'extra shot' for twenty rupees. Doubles the caffeine and coffee intensity."
      }
    ],
    "related": [
      "classic-cold-coffee",
      "caramel-cold-coffee",
      "coffee-break-combo"
    ]
  },
  "kala-khatta-mojito": {
    "slug": "kala-khatta-mojito",
    "name": "Kala Khatta Mojito",
    "price": 89,
    "title": "Kala Khatta Mojito ₹89, Desi Cooler, Burger Minister Noida",
    "metaDescription": "Tangy desi kala khatta with mint and soda. ₹89 in Sector 58, Noida. Pure veg cafe, the Indian twist on mojito.",
    "image": "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=1200&q=80",
    "imageAlt": "Kala khatta mojito with purple kala khatta syrup, mint, lime and soda in tall glass.",
    "eyebrow": "Coolers · Sector 58, Noida",
    "category": "coolers",
    "lede": "Kala Khatta Mojito is our desi twist on the classic. Tangy kala khatta (made from jamun, tamarind, and Indian spices) mixed with mint and soda. Eighty-nine rupees. Reminds most Indians of childhood gola.",
    "whatMakesSpecial": "Kala khatta is a uniquely Indian flavor. Sweet, tangy, slightly salty, with a deep purple-black color. We use a kala khatta syrup that has the right balance, not too sweet, not too sour. The mint adds freshness that the regular gola version doesn't have.",
    "whatIsInIt": "Kala khatta syrup, fresh mint (muddled), lime juice, sugar syrup (light), soda water, ice, a pinch of black salt. Garnished with mint and a slice of lime.",
    "bestPairedWith": "A Special Bombay Sandwich for the full desi snack-time combo. Or with any cheesy item to cut the richness.",
    "reviews": [
      {
        "rating": 5,
        "body": "Refreshing in the Noida heat. Real mint, real lime, light on the sugar. Tastes like a properly muddled mojito, not a sweet soda.",
        "author": "Devansh R.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 6 days ago"
      },
      {
        "rating": 5,
        "body": "Kala khatta took me back to childhood. Tongue went purple, no regrets. Pair with the Bombay sandwich for the full nostalgia trip.",
        "author": "Tanya M.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 1 month ago"
      },
      {
        "rating": 5,
        "body": "Mojito plus peri peri fries is my standing order. The cooler cuts the heat perfectly between bites.",
        "author": "Aman J.",
        "sector": "Sector 63, Noida",
        "when": "Google, 2 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "What is kala khatta exactly?",
        "a": "It's a flavor made from jamun fruit, tamarind, dry mango, and spices including black salt. Indian flavor profile, sweet-tangy-salty all at once."
      },
      {
        "q": "Will my tongue turn purple?",
        "a": "A little, yes. Kala khatta has natural color from jamun. It is harmless and fades in a few minutes."
      },
      {
        "q": "Is it spicy?",
        "a": "No. The black salt gives it a savory hint but it's not chilli-spicy."
      }
    ],
    "related": [
      "mint-mojito",
      "watermelon-mojito",
      "green-apple-mojito"
    ]
  },
  "kitkat-shake": {
    "slug": "kitkat-shake",
    "name": "Kitkat Shake",
    "price": 109,
    "title": "Kitkat Shake ₹109, Crunchy Wafer, Burger Minister Noida",
    "metaDescription": "Crumbled Kitkat in every sip, creamy and crunchy. ₹109 in Sector 58, Noida. Pure veg cafe.",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=1200&q=80",
    "imageAlt": "Kitkat milkshake with crumbled wafer pieces, chocolate, vanilla ice cream in tall glass with Kitkat on rim.",
    "eyebrow": "Milkshakes · Sector 58, Noida",
    "category": "milkshakes",
    "lede": "Kitkat Shake has crumbled Kitkat wafer blended into the shake plus broken pieces visible throughout. One hundred nine rupees. Creamy with a wafer crunch in every other sip.",
    "whatMakesSpecial": "The wafer texture is what sets this apart from the Chocolate Shake. The wafer breaks down in the shake but doesn't fully dissolve, so you get little crunchy bites. We use full Kitkat bars, not Kitkat-flavor syrup.",
    "whatIsInIt": "Vanilla ice cream, milk, Kitkat wafer bars (blended and broken), chocolate sauce, sugar (adjustable), ice. Topped with a piece of Kitkat on the glass rim.",
    "bestPairedWith": "Pizza, fries, or just on its own. Pairs well with savory items because the chocolate-wafer flavor doesn't clash with anything.",
    "reviews": [
      {
        "rating": 5,
        "body": "Thick enough that the straw stands up by itself. Real ice cream blend, you can tell. Kids in our group could not stop drinking it.",
        "author": "Anjali S.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Properly sweet but not sickly. The shake-to-ice ratio is right. Pair with a pizza and you have a full meal for two.",
        "author": "Rahul K.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 3 weeks ago"
      },
      {
        "rating": 4,
        "body": "Loved the Oreo one especially. Cookie chunks in every other sip. Could ask for less sugar if needed and they oblige.",
        "author": "Sanya P.",
        "sector": "Sector 59, Noida",
        "when": "Google, last month"
      }
    ],
    "faqs": [
      {
        "q": "How many Kitkat bars in one shake?",
        "a": "About two fingers worth of Kitkat broken into the shake."
      },
      {
        "q": "Is it more chocolate or more wafer?",
        "a": "Even split. The chocolate from the Kitkat melts into the shake. The wafer adds texture."
      },
      {
        "q": "Can I get more Kitkat in mine?",
        "a": "Yes. Extra Kitkat fingers for fifteen rupees each."
      }
    ],
    "related": [
      "oreo-shake",
      "chocolate-shake",
      "brownie-cold-coffee"
    ]
  },
  "margherita-pizza": {
    "slug": "margherita-pizza",
    "name": "Margherita Pizza (8 inch)",
    "price": 139,
    "title": "Margherita Pizza 8 inch ₹139, Burger Minister Sector 58 Noida",
    "metaDescription": "Classic tomato sauce, mozzarella, handcrafted 8-inch base. Margherita Pizza at ₹139 in Sector 58, Noida. Pure veg, fresh dough.",
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80",
    "imageAlt": "Eight-inch Margherita pizza with tomato sauce, melted mozzarella and basil on fresh dough.",
    "eyebrow": "Pizza · Sector 58, Noida",
    "category": "pizza",
    "lede": "Our Margherita is the simplest pizza on the menu and arguably the toughest to get right. Tomato sauce, mozzarella, fresh dough rolled to eight inches. One hundred thirty-nine rupees. Made fresh per order, not pre-baked.",
    "whatMakesSpecial": "The sauce. Pizza is mostly sauce and cheese in execution, and most cafes get lazy with the sauce. Ours is cooked down from tomatoes, garlic, oregano, basil, and a little olive oil. It's smooth, not chunky, and slightly sweet from the slow cook. The dough rests overnight, which gives it a chew you don't get from same-day dough.",
    "whatIsInIt": "Hand-rolled eight-inch base, our slow-cooked tomato sauce, mozzarella cheese, dried oregano, basil. Baked till the cheese bubbles and the crust browns at the edges.",
    "bestPairedWith": "Peri Peri Fries to balance the simple pizza, or a Mojito for a clean meal. The Pizza Share combo at ₹269 gets you the pizza plus fries plus a mojito.",
    "reviews": [
      {
        "rating": 5,
        "body": "Eight inch is the right size for one hungry person. Dough was thin and chewy, cheese was generous. We finished it in five minutes and ordered another one.",
        "author": "Karan J.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Fresh tasting, not the frozen kind. You can tell when a pizza was made the same day. Sauce is balanced, not too sweet, not too acidic.",
        "author": "Megha P.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 3 weeks ago"
      },
      {
        "rating": 4,
        "body": "Solid pizza for the price. Would love a slightly thicker crust option but the thin and crispy works too. Came hot and well boxed.",
        "author": "Sahil T.",
        "sector": "Sector 59, Noida",
        "when": "Google, last month"
      }
    ],
    "faqs": [
      {
        "q": "Is the dough fresh or pre-made?",
        "a": "Fresh. We prepare the dough in the morning and rest it for at least four hours before stretching. We don't use frozen pizza bases."
      },
      {
        "q": "How many people does one Margherita feed?",
        "a": "One person if you're really hungry. Splittable between two as a snack. Three to four if everyone takes one slice as part of a larger meal."
      },
      {
        "q": "Can I get extra cheese on the Margherita?",
        "a": "Yes. Add extra cheese for twenty rupees. It moves it closer to the Cheese Loaded Pizza but at a slightly lower price."
      }
    ],
    "related": [
      "cheese-loaded-pizza",
      "farmhouse-pizza",
      "pizza-share-combo"
    ]
  },
  "mint-mojito": {
    "slug": "mint-mojito",
    "name": "Mint Mojito",
    "price": 79,
    "title": "Mint Mojito ₹79, Refreshing, Burger Minister Sector 58 Noida",
    "metaDescription": "Fresh mint, lime, ice. Virgin mint mojito at ₹79 in Sector 58, Noida. Pure veg cafe, the summer essential.",
    "image": "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=1200&q=80",
    "imageAlt": "Mint mojito with fresh muddled mint, lime wedge, ice and soda water in tall glass.",
    "eyebrow": "Coolers · Sector 58, Noida",
    "category": "coolers",
    "lede": "Mint Mojito is our most-ordered cooler. Fresh mint, lime juice, sugar, soda, ice. Seventy-nine rupees. The default summer drink and the one most regulars pair with their burgers and pizzas.",
    "whatMakesSpecial": "Fresh mint, muddled to release the oils. Most cafes skip the muddling step, which is why their mojitos taste like flavored soda. Ours actually taste of mint. The lime is fresh-squeezed, not from bottled juice.",
    "whatIsInIt": "Fresh mint leaves (muddled), fresh lime juice, sugar syrup, soda water, ice. Garnished with lime wedge and a mint sprig. Tall glass.",
    "bestPairedWith": "Any spicy item to cool it down. Pairs especially well with Peri Peri Fries, Peri Peri Paneer Burger, and Cheese Loaded items.",
    "reviews": [
      {
        "rating": 5,
        "body": "Refreshing in the Noida heat. Real mint, real lime, light on the sugar. Tastes like a properly muddled mojito, not a sweet soda.",
        "author": "Devansh R.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 6 days ago"
      },
      {
        "rating": 5,
        "body": "Kala khatta took me back to childhood. Tongue went purple, no regrets. Pair with the Bombay sandwich for the full nostalgia trip.",
        "author": "Tanya M.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 1 month ago"
      },
      {
        "rating": 5,
        "body": "Mojito plus peri peri fries is my standing order. The cooler cuts the heat perfectly between bites.",
        "author": "Aman J.",
        "sector": "Sector 63, Noida",
        "when": "Google, 2 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "Is this alcoholic?",
        "a": "No. This is a virgin mojito, no alcohol. We're a pure veg vegetarian cafe and we don't serve any alcohol."
      },
      {
        "q": "How much sugar?",
        "a": "Light to medium. We can make it less sweet on request. Some prefer no sugar at all, which keeps it very refreshing."
      },
      {
        "q": "Is the mint fresh or dried?",
        "a": "Fresh. We get mint daily. Dried mint wouldn't give the same flavor."
      }
    ],
    "related": [
      "kala-khatta-mojito",
      "watermelon-mojito",
      "green-apple-mojito"
    ]
  },
  "onion-capsicum-pizza": {
    "slug": "onion-capsicum-pizza",
    "name": "Onion Capsicum Pizza",
    "price": 149,
    "title": "Onion Capsicum Pizza ₹149, Burger Minister Sector 58 Noida",
    "metaDescription": "Crisp onions, capsicum, tangy tomato sauce on 8-inch base. Onion Capsicum Pizza at ₹149 in Sector 58, Noida.",
    "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1200&q=80",
    "imageAlt": "Onion capsicum veg pizza with sliced onions, green capsicum, mozzarella, oregano on 8-inch base.",
    "eyebrow": "Pizza · Sector 58, Noida",
    "category": "pizza",
    "lede": "The Onion Capsicum is what most customers default to after trying the Margherita. Same fresh dough, same sauce, plus a generous topping of sliced onions and green capsicum. One hundred forty-nine rupees. Goes faster than the Margherita on most days.",
    "whatMakesSpecial": "The onions and capsicum get a quick par-cook before going on the pizza. This means they stay slightly crunchy after the bake instead of turning watery. Most cafes throw raw veg on and bake it, which doesn't work for short-bake pizzas like ours.",
    "whatIsInIt": "Eight-inch base, our tomato sauce, mozzarella, par-cooked sliced onions, par-cooked green capsicum, oregano, basil.",
    "bestPairedWith": "A Mojito or Cold Coffee. Pizza plus mojito plus fries combo is a popular three PM order.",
    "reviews": [
      {
        "rating": 5,
        "body": "Eight inch is the right size for one hungry person. Dough was thin and chewy, cheese was generous. We finished it in five minutes and ordered another one.",
        "author": "Karan J.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Fresh tasting, not the frozen kind. You can tell when a pizza was made the same day. Sauce is balanced, not too sweet, not too acidic.",
        "author": "Megha P.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 3 weeks ago"
      },
      {
        "rating": 4,
        "body": "Solid pizza for the price. Would love a slightly thicker crust option but the thin and crispy works too. Came hot and well boxed.",
        "author": "Sahil T.",
        "sector": "Sector 59, Noida",
        "when": "Google, last month"
      }
    ],
    "faqs": [
      {
        "q": "Can I add other vegetables?",
        "a": "Yes. Extra toppings start at ten rupees per veg. Most-requested additions are corn, jalapeño, and olives."
      },
      {
        "q": "Is the capsicum spicy?",
        "a": "No. We use green bell pepper, which has no heat. It is mild and slightly sweet."
      },
      {
        "q": "Is this baked or pan-fried?",
        "a": "Baked. We use a small commercial oven that runs at high temperature for short bakes, which gives the crust a proper texture."
      }
    ],
    "related": [
      "farmhouse-pizza",
      "margherita-pizza",
      "corn-cheese-pizza"
    ]
  },
  "oreo-shake": {
    "slug": "oreo-shake",
    "name": "Oreo Shake",
    "price": 109,
    "title": "Oreo Shake ₹109, Cookies in Shake, Burger Minister Noida",
    "metaDescription": "Loaded with Oreo cookie chunks blended in. ₹109 in Sector 58, Noida. Pure veg cafe, kids' favorite.",
    "image": "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=1200&q=80",
    "imageAlt": "Oreo cookie milkshake with blended and chunked Oreos, vanilla ice cream and whole cookie on top.",
    "eyebrow": "Milkshakes · Sector 58, Noida",
    "category": "milkshakes",
    "lede": "Oreo Shake is loaded with Oreo cookie chunks blended into a vanilla ice cream and milk base. One hundred nine rupees. The shake that's most often ordered alongside a kids' meal.",
    "whatMakesSpecial": "We don't go light on the cookies. About four to five Oreos go into each shake, blended in two stages, some pulverized for flavor and some left chunky for texture. You'll get pieces in every sip.",
    "whatIsInIt": "Vanilla ice cream, full-fat milk, Oreo cookies (blended and chunked), sugar, ice. Topped with crushed Oreo and a whole cookie on the rim.",
    "bestPairedWith": "A Margherita Pizza or Corn Cheese Pizza for the kids' table. Adults pair it with Cheese Sticks or sandwiches.",
    "reviews": [
      {
        "rating": 5,
        "body": "Thick enough that the straw stands up by itself. Real ice cream blend, you can tell. Kids in our group could not stop drinking it.",
        "author": "Anjali S.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Properly sweet but not sickly. The shake-to-ice ratio is right. Pair with a pizza and you have a full meal for two.",
        "author": "Rahul K.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 3 weeks ago"
      },
      {
        "rating": 4,
        "body": "Loved the Oreo one especially. Cookie chunks in every other sip. Could ask for less sugar if needed and they oblige.",
        "author": "Sanya P.",
        "sector": "Sector 59, Noida",
        "when": "Google, last month"
      }
    ],
    "faqs": [
      {
        "q": "How many Oreos are in one shake?",
        "a": "About four to five whole cookies blended in, plus a sprinkle of crushed Oreo on top."
      },
      {
        "q": "Is the cookie blend smooth or chunky?",
        "a": "Both. Some Oreos go in early for smooth blend, some go in at the end for visible chunks."
      },
      {
        "q": "Can I get extra Oreos in mine?",
        "a": "Yes. Two extra cookies for twenty rupees. Some customers order this for the Insta photo."
      }
    ],
    "related": [
      "kitkat-shake",
      "chocolate-shake",
      "brownie-cold-coffee"
    ]
  },
  "paneer-burger": {
    "slug": "paneer-burger",
    "name": "Paneer Burger",
    "price": 99,
    "title": "Paneer Burger ₹99, Pure Veg, Burger Minister Sector 58 Noida",
    "metaDescription": "Fresh paneer patty, light spices, soft bun. Paneer Burger at ₹99. Protein-rich pure veg option in Sector 58, Noida.",
    "image": "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=1200&q=80",
    "imageAlt": "Paneer burger with grilled paneer patty, fresh lettuce, tomato, and onion in toasted sesame bun.",
    "eyebrow": "Burgers · Sector 58, Noida",
    "category": "burgers",
    "lede": "Our Paneer Burger is built for the customer who wants more protein and a different texture from the aloo tikki. We use fresh paneer, grill it with a light marinade, and stack it into the same toasted bun with lettuce, tomato, and onion. Priced at ninety-nine rupees. Stays under the hundred-rupee mark on purpose. Marwari and Jain families order this the most.",
    "whatMakesSpecial": "Paneer in a burger format is harder to do than it sounds. The paneer needs to hold its shape and not turn rubbery. We marinate ours in a yogurt and spice mix for a few hours before grilling, which keeps it soft inside while the outside picks up colour from the grill. It's a real paneer slab, not a paneer-flavored patty.",
    "whatIsInIt": "Soft sesame bun, a grilled paneer slab with our yogurt and spice marinade, lettuce, tomato slice, onion rings, mint chutney, and house mayo. No egg in the bun or sauces. Suitable for strict vegetarians.",
    "bestPairedWith": "Peri Peri Fries and a Mint Mojito. Or get The Paneer Power combo at ₹229 for the full meal.",
    "reviews": [
      {
        "rating": 5,
        "body": "Came in for lunch with a colleague and ordered this. The patty was crisp, the bun was warm, and the cheese was actually melted. We grabbed two more for the way back. Will definitely return.",
        "author": "Ananya R.",
        "sector": "Sector 62, Noida",
        "when": "Google review, 2 weeks ago"
      },
      {
        "rating": 5,
        "body": "I have tried most burgers around Sector 58 and this one stands out. Real ingredients, fair pricing, fast service. The Minister branding is fun without being over the top.",
        "author": "Rohan M.",
        "sector": "Sector 58, Noida",
        "when": "Zomato review, last month"
      },
      {
        "rating": 4,
        "body": "Loved it. Mild on spice which suits my family. My six-year-old finished half of mine. The cafe is clean and the staff did not rush us. Knocked one star only because parking is tight.",
        "author": "Priya K.",
        "sector": "Sector 59, Noida",
        "when": "Google review, 1 week ago"
      }
    ],
    "faqs": [
      {
        "q": "Is the paneer fresh or frozen?",
        "a": "Fresh. We get paneer delivered daily and use it the same day. Anything not used by closing time gets prepped for the next day's marinades."
      },
      {
        "q": "How spicy is the paneer?",
        "a": "Light to medium. The marinade has yogurt, ginger garlic, coriander, and a pinch of red chilli. Most kids eat this without issues."
      },
      {
        "q": "Can I get this without onion?",
        "a": "Yes. Mention 'no onion' at the counter or in your delivery notes. We'll skip it."
      }
    ],
    "related": [
      "peri-peri-paneer-burger",
      "classic-burger",
      "paneer-power-combo"
    ]
  },
  "paneer-power-combo": {
    "slug": "paneer-power-combo",
    "name": "The Paneer Power Combo",
    "price": 229,
    "title": "The Paneer Power Combo ₹229, Burger Minister Sector 58 Noida",
    "metaDescription": "Paneer Burger plus Peri Peri Fries plus Mint Mojito. Pure veg refresher combo at ₹229. Save ₹68 in Noida.",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80",
    "imageAlt": "The Paneer Power combo with Paneer Burger, Peri Peri Fries and Mint Mojito at ₹229.",
    "eyebrow": "Royal Combos · Sector 58, Noida",
    "category": "combos",
    "lede": "The Paneer Power is for customers who want protein and a refreshing drink. Paneer Burger, Peri Peri Fries, and a Mint Mojito. Two hundred twenty-nine rupees. The combo most pure veg families pick when they are dining as a group.",
    "whatMakesSpecial": "It is the protein-forward combo. Paneer replaces aloo for higher protein, Peri Peri Fries add crunch, Mint Mojito refreshes the palate between spicy bites. Pure veg, no compromise.",
    "whatIsInIt": "Paneer Burger (₹99 value), Peri Peri Fries (₹119 value), Mint Mojito (₹79 value). Total separate value: ₹297. Combo price: ₹229.",
    "bestPairedWith": "Best for groups with one paneer eater and one cheese eater. Order this and a Cheese Lover combo together for a balanced two-person meal.",
    "reviews": [
      {
        "rating": 5,
        "body": "The math works out. You save real money compared to ordering separately. And the combo arrives all together, hot, which is the part most places mess up.",
        "author": "Garvit T.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Combo system is well thought out. Easy to read, easy to upgrade, no hidden charges at the counter. Wish more cafes did this.",
        "author": "Smita L.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, last month"
      },
      {
        "rating": 5,
        "body": "We did the Group Platter for an office team treat. Five of us, ate well, did not have to make any decisions. Recommended for team lunches.",
        "author": "Yash B.",
        "sector": "Sector 59, Noida",
        "when": "Google, 3 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "Can I upgrade to Peri Peri Paneer Burger?",
        "a": "Yes. Upgrade adds ₹50 to the combo (becomes ₹279). Makes it spicier."
      },
      {
        "q": "Can I swap the mojito for a shake or cold coffee?",
        "a": "Yes. Shakes add ₹20-30 (varies by flavor). Cold coffee adds ₹20."
      },
      {
        "q": "Why is the Mint Mojito the default in this combo?",
        "a": "It pairs well with paneer's mild flavor. The fresh mint cleans the palate. Customer survey also showed this combination most-ordered."
      }
    ],
    "related": [
      "paneer-burger",
      "cheese-lover-combo",
      "mint-mojito"
    ]
  },
  "peri-peri-fries": {
    "slug": "peri-peri-fries",
    "name": "Peri Peri Fries",
    "price": 119,
    "title": "Peri Peri Fries ₹119, Spicy, Burger Minister Sector 58 Noida",
    "metaDescription": "Crispy fries tossed in our peri peri seasoning. ₹119 in Sector 58, Noida. Pure veg, signature spice blend.",
    "image": "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=1200&q=80",
    "imageAlt": "Peri peri fries tossed in red signature peri peri seasoning, crispy golden fries.",
    "eyebrow": "Fries · Sector 58, Noida",
    "category": "fries",
    "lede": "Peri Peri Fries are our most-ordered fries. Same crispy double-fried potato, tossed in our peri peri seasoning right after they come out of the fryer. One hundred nineteen rupees. The spice clings to the fries because of the residual oil, no soggy mess.",
    "whatMakesSpecial": "The seasoning is mixed in-house. Most cafes use store-bought peri peri powder, which is fine but generic. Ours has dried red chilli, paprika, garlic powder, oregano, salt, and a touch of vinegar powder for tang. We toss it on warm fries so it sticks.",
    "whatIsInIt": "Fresh hand-cut fries, refined oil, our peri peri seasoning (red chilli, paprika, garlic, oregano, salt, vinegar powder).",
    "bestPairedWith": "Any burger to balance the heat with something cooling. Mint Mojito on the side helps. Cheese Dip also tones down the spice if you like dipping.",
    "reviews": [
      {
        "rating": 5,
        "body": "These fries are dangerously addictive. Stayed crispy even after we sat and chatted for twenty minutes. Will order every visit.",
        "author": "Riya D.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 4 days ago"
      },
      {
        "rating": 5,
        "body": "Worth the extra over salted fries. The seasoning sticks properly to the fries instead of falling off in the box. Tells me they toss it right.",
        "author": "Vivek K.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 2 weeks ago"
      },
      {
        "rating": 5,
        "body": "Ordered for a group of four and everyone went back for more. Pair with a Cold Coffee, life sorted.",
        "author": "Aditi M.",
        "sector": "Sector 63, Noida",
        "when": "Google, last month"
      }
    ],
    "faqs": [
      {
        "q": "How spicy is it?",
        "a": "Medium to hot. About a six out of ten on the spice scale. Strong enough that you'll notice, not so much that you can't enjoy them."
      },
      {
        "q": "Can I get the seasoning on the side instead of tossed?",
        "a": "Yes. Ask for 'peri peri masala on the side.' You'll get the salted fries with a small portion of the seasoning to control the amount."
      },
      {
        "q": "Why do all your combos come with Peri Peri Fries by default?",
        "a": "Customer preference. Survey of regulars showed peri peri was the most-requested upgrade. We made it the default for combos with no extra charge."
      }
    ],
    "related": [
      "classic-salted-fries",
      "chilli-garlic-fries",
      "peri-peri-paneer-burger"
    ]
  },
  "peri-peri-paneer-burger": {
    "slug": "peri-peri-paneer-burger",
    "name": "Peri Peri Paneer Burger",
    "price": 149,
    "title": "Peri Peri Paneer Burger ₹149, Spicy, Burger Minister Noida",
    "metaDescription": "Grilled paneer with our peri peri seasoning. Spicy paneer burger at ₹149 in Sector 58, Noida. Pure veg with a kick.",
    "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=1200&q=80",
    "imageAlt": "Spicy peri peri paneer burger with grilled paneer patty, peri peri seasoning, lettuce, tomato in toasted bun.",
    "eyebrow": "Burgers · Sector 58, Noida",
    "category": "burgers",
    "lede": "This one is for the customer who wants spice and protein in the same bite. A grilled paneer patty rubbed in our peri peri seasoning, layered with cooling veggies to balance the heat. One hundred forty-nine rupees. It's the burger our peri peri fries fans graduate to.",
    "whatMakesSpecial": "The peri peri rub is the same one we use on our fries, but applied to paneer it does something different. The yogurt in the paneer marinade tones down the burn just enough, while the rub gives you the kick on every bite. It's hot, not painful. Most spice-lovers say it's a perfect six out of ten.",
    "whatIsInIt": "Sesame bun, grilled paneer slab with peri peri rub, lettuce, tomato, onion, mint chutney, and a light cooling spread. No mayo bomb here because we want the spice to come through.",
    "bestPairedWith": "Cold Coffee or a Mojito to cool down. Avoid pairing with peri peri fries unless you can handle a lot of heat at once.",
    "reviews": [
      {
        "rating": 5,
        "body": "Came in for lunch with a colleague and ordered this. The patty was crisp, the bun was warm, and the cheese was actually melted. We grabbed two more for the way back. Will definitely return.",
        "author": "Ananya R.",
        "sector": "Sector 62, Noida",
        "when": "Google review, 2 weeks ago"
      },
      {
        "rating": 5,
        "body": "I have tried most burgers around Sector 58 and this one stands out. Real ingredients, fair pricing, fast service. The Minister branding is fun without being over the top.",
        "author": "Rohan M.",
        "sector": "Sector 58, Noida",
        "when": "Zomato review, last month"
      },
      {
        "rating": 4,
        "body": "Loved it. Mild on spice which suits my family. My six-year-old finished half of mine. The cafe is clean and the staff did not rush us. Knocked one star only because parking is tight.",
        "author": "Priya K.",
        "sector": "Sector 59, Noida",
        "when": "Google review, 1 week ago"
      }
    ],
    "faqs": [
      {
        "q": "How spicy is the peri peri seasoning?",
        "a": "Medium to hot. It has dried red chilli, paprika, garlic, vinegar powder, and oregano. Stronger than chilli garlic fries, milder than ghost pepper anything."
      },
      {
        "q": "Can you make this less spicy?",
        "a": "We can do a half-rub version. Ask for 'light peri peri' at the counter. It cuts the heat by about forty percent."
      },
      {
        "q": "Is this gluten-free?",
        "a": "No. The bun has wheat. The paneer and seasoning are gluten-free but the bread is not. We don't have a gluten-free bun option yet."
      }
    ],
    "related": [
      "paneer-burger",
      "peri-peri-fries",
      "cheese-loaded-burger"
    ]
  },
  "pizza-share-combo": {
    "slug": "pizza-share-combo",
    "name": "The Pizza Share Combo",
    "price": 269,
    "title": "The Pizza Share Combo ₹269, Burger Minister Sector 58 Noida",
    "metaDescription": "Margherita Pizza plus Peri Peri Fries plus Mint Mojito. Combo for two at ₹269. Save ₹48 in Sector 58, Noida.",
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80",
    "imageAlt": "The Pizza Share combo with Margherita Pizza, Peri Peri Fries and Mint Mojito built for two at ₹269.",
    "eyebrow": "Royal Combos · Sector 58, Noida",
    "category": "combos",
    "lede": "The Pizza Share is built for two people splitting a meal. Margherita Pizza, Peri Peri Fries, and a Mint Mojito. Two hundred sixty-nine rupees. Order this when you are with a friend or partner and want everyone to taste a bit of everything.",
    "whatMakesSpecial": "It is the date-meal combo. Pizza is the centerpiece, fries are the side, mojito is the shared drink. Easy to split and casual enough to feel relaxed.",
    "whatIsInIt": "Margherita Pizza eight inches (₹139 value), Peri Peri Fries (₹119 value), Mint Mojito (₹79 value). Total separate value: ₹337. Combo price: ₹269.",
    "bestPairedWith": "Designed for two. For one really hungry person, this also works as a full meal.",
    "reviews": [
      {
        "rating": 5,
        "body": "The math works out. You save real money compared to ordering separately. And the combo arrives all together, hot, which is the part most places mess up.",
        "author": "Garvit T.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Combo system is well thought out. Easy to read, easy to upgrade, no hidden charges at the counter. Wish more cafes did this.",
        "author": "Smita L.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, last month"
      },
      {
        "rating": 5,
        "body": "We did the Group Platter for an office team treat. Five of us, ate well, did not have to make any decisions. Recommended for team lunches.",
        "author": "Yash B.",
        "sector": "Sector 59, Noida",
        "when": "Google, 3 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "Can I upgrade to a different pizza?",
        "a": "Yes. Onion Capsicum (₹10 extra), Farmhouse (₹30 extra), Cheese Loaded (₹60 extra), Corn Cheese (₹70 extra)."
      },
      {
        "q": "Is one pizza enough for two?",
        "a": "For light eaters, yes. For bigger appetites, you might want to add an extra burger or sandwich. The fries help fill it out."
      },
      {
        "q": "Can I get two mojitos instead of one?",
        "a": "Yes. Second mojito adds ₹79. Some couples do this to have one each."
      }
    ],
    "related": [
      "margherita-pizza",
      "cheese-lover-combo",
      "group-platter-combo"
    ]
  },
  "solo-minister-combo": {
    "slug": "solo-minister-combo",
    "name": "The Solo Minister Combo",
    "price": 169,
    "title": "The Solo Minister Combo ₹169, Burger Minister Sector 58 Noida",
    "metaDescription": "Classic Burger plus Peri Peri Fries plus Coke. Quick solo lunch combo at ₹169. Save ₹49 in Sector 58, Noida.",
    "image": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=1200&q=80",
    "imageAlt": "The Solo Minister combo meal with Classic Burger, Peri Peri Fries and Coke at ₹169.",
    "eyebrow": "Royal Combos · Sector 58, Noida",
    "category": "combos",
    "lede": "The Solo Minister is our entry-level combo. Classic Burger plus Peri Peri Fries plus a Coke. All for one hundred sixty-nine rupees. You save about forty-nine rupees compared to ordering separately. Built for the solo eater who wants a complete meal without thinking too hard about it.",
    "whatMakesSpecial": "It is the value-meal that hits the sweet spot. Single price, complete meal, no upsells. The Coke comes in a chilled bottle, not a glass, so you can take it back to your desk if you are doing takeaway.",
    "whatIsInIt": "Classic Burger (₹59 value), Peri Peri Fries (₹119 value), Coke 250 ml (₹40 value). Total separate value: ₹218. Combo price: ₹169.",
    "bestPairedWith": "Best for solo eaters. If you are with someone, get The Cheese Lover combo instead so you both have a proper meal.",
    "reviews": [
      {
        "rating": 5,
        "body": "The math works out. You save real money compared to ordering separately. And the combo arrives all together, hot, which is the part most places mess up.",
        "author": "Garvit T.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Combo system is well thought out. Easy to read, easy to upgrade, no hidden charges at the counter. Wish more cafes did this.",
        "author": "Smita L.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, last month"
      },
      {
        "rating": 5,
        "body": "We did the Group Platter for an office team treat. Five of us, ate well, did not have to make any decisions. Recommended for team lunches.",
        "author": "Yash B.",
        "sector": "Sector 59, Noida",
        "when": "Google, 3 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "Can I swap the Peri Peri Fries for Salted Fries?",
        "a": "Yes. Same price. Mention 'salted fries' at the counter. We standardize on Peri Peri because it's our most popular, but salted is always available."
      },
      {
        "q": "Can I swap the Coke for a mojito?",
        "a": "Yes. Mojito swap adds forty rupees because mojitos cost more than the included Coke."
      },
      {
        "q": "Is this enough for one person?",
        "a": "For most adults, yes. If you are really hungry, upgrade the burger to Cheesy or Cheese Loaded for ₹20 or ₹80 extra."
      }
    ],
    "related": [
      "cheese-lover-combo",
      "paneer-power-combo",
      "classic-burger"
    ]
  },
  "special-bombay-sandwich": {
    "slug": "special-bombay-sandwich",
    "name": "Special Bombay Sandwich",
    "price": 99,
    "title": "Special Bombay Sandwich ₹99, Mumbai Style, Burger Minister Noida",
    "metaDescription": "Mumbai-style stacked sandwich with chutney, vegetables, and a signature spice mix. ₹99 in Sector 58, Noida. Pure veg.",
    "image": "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=1200&q=80",
    "imageAlt": "Special Bombay sandwich with layered vegetables, green chutney, sandwich masala and grilled bread.",
    "eyebrow": "Sandwiches · Sector 58, Noida",
    "category": "sandwiches",
    "lede": "The Special Bombay Sandwich is our take on the Mumbai street-style sandwich that anyone who lived in or visited Mumbai will recognize. Multiple layers of vegetables, a spread of chutney on every layer, sandwich masala dusted between, and the whole thing pressed till the bread crisps up. Ninety-nine rupees.",
    "whatMakesSpecial": "The masala is what separates a real Bombay Sandwich from a regular grilled one. Our sandwich masala is a mix of black salt, dry mango powder, cumin, and chaat masala. Sprinkled on the vegetables right before grilling, it gives the whole thing that street-cart taste people remember from Marine Drive or Churchgate station.",
    "whatIsInIt": "Three slices of bread, generous green chutney, butter, sliced cucumber, tomato, potato (boiled and sliced thin), beetroot, capsicum, our Bombay sandwich masala dust, salt, and pepper. Pressed till golden.",
    "bestPairedWith": "A Mint Mojito or Watermelon Mojito. Cold and fresh sides go best with this. Also pairs well with chai if you're going for the full Mumbai vibe.",
    "reviews": [
      {
        "rating": 5,
        "body": "Good honest sandwich. Bread was crisp, the chutney came through, vegetables were fresh. I ordered with a cold coffee and that was my full afternoon snack.",
        "author": "Tanvi S.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 3 weeks ago"
      },
      {
        "rating": 5,
        "body": "Hot off the grill in about four minutes. Filling without being too heavy. I work nearby and now this is my regular four PM order.",
        "author": "Aakash V.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 1 month ago"
      },
      {
        "rating": 4,
        "body": "Nice flavors and good portion size. The grill marks on the bread were perfect. Would have liked one more cheese slice but easy fix.",
        "author": "Sneha B.",
        "sector": "Sector 63, Noida",
        "when": "Google, last week"
      }
    ],
    "faqs": [
      {
        "q": "What makes it \"Bombay style\"?",
        "a": "The masala dust, the boiled potato slices, and the layered approach. Most other sandwiches don't include boiled potato or beetroot. We do. That's the signature."
      },
      {
        "q": "Is there cheese in this?",
        "a": "Not standard. Add cheese for twenty rupees at the counter if you want. Many regulars do."
      },
      {
        "q": "How big is it?",
        "a": "Three slices of bread cut diagonally into four triangles. A solid snack for one person, or splittable between two if you also order something else."
      }
    ],
    "related": [
      "classic-sandwich",
      "cheese-sandwich",
      "corn-cheese-blast-sandwich"
    ]
  },
  "strawberry-shake": {
    "slug": "strawberry-shake",
    "name": "Strawberry Shake",
    "price": 99,
    "title": "Strawberry Shake ₹99, Burger Minister Sector 58 Noida",
    "metaDescription": "Fresh strawberry milkshake, light and pink. ₹99 in Sector 58, Noida. Pure veg cafe, kid-friendly.",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80",
    "imageAlt": "Pink strawberry milkshake with vanilla ice cream blend, strawberry sauce swirl and milk in tall glass.",
    "eyebrow": "Milkshakes · Sector 58, Noida",
    "category": "milkshakes",
    "lede": "Strawberry Shake is the lightest of our shakes. Pink, fresh, slightly tangy from real strawberry, blended with vanilla ice cream and milk. Ninety-nine rupees.",
    "whatMakesSpecial": "We use strawberry crush that has actual fruit pulp, not just artificial flavoring. The pink color is natural, the taste is closer to ripe strawberry than candy. It's the shake we usually recommend for customers who don't want something too heavy or chocolate-rich.",
    "whatIsInIt": "Vanilla ice cream, milk, strawberry crush (with real fruit), sugar (adjustable), ice. Topped with a swirl of strawberry sauce.",
    "bestPairedWith": "Almost anything. The light flavor doesn't compete with the meal. Good with sandwiches, pizza, or burgers. Popular with kids and customers who prefer milder drinks.",
    "reviews": [
      {
        "rating": 5,
        "body": "Thick enough that the straw stands up by itself. Real ice cream blend, you can tell. Kids in our group could not stop drinking it.",
        "author": "Anjali S.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Properly sweet but not sickly. The shake-to-ice ratio is right. Pair with a pizza and you have a full meal for two.",
        "author": "Rahul K.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 3 weeks ago"
      },
      {
        "rating": 4,
        "body": "Loved the Oreo one especially. Cookie chunks in every other sip. Could ask for less sugar if needed and they oblige.",
        "author": "Sanya P.",
        "sector": "Sector 59, Noida",
        "when": "Google, last month"
      }
    ],
    "faqs": [
      {
        "q": "Does it have fresh strawberries?",
        "a": "Strawberry crush, which has fruit pulp. We don't add fresh whole strawberries to keep the texture smooth."
      },
      {
        "q": "Is the color natural?",
        "a": "The strawberry crush we use has a small amount of food coloring along with natural fruit color. The pink is close to natural but slightly enhanced."
      },
      {
        "q": "Is this the least sweet shake?",
        "a": "Roughly tied with chocolate. The strawberry has natural tang which makes it taste less sweet than butterscotch or kitkat."
      }
    ],
    "related": [
      "chocolate-shake",
      "butterscotch-shake",
      "watermelon-mojito"
    ]
  },
  "veg-puff": {
    "slug": "veg-puff",
    "name": "BM Puff",
    "price": 80,
    "title": "BM Puff 3 pcs ₹80, Flaky Veg Snack, Burger Minister Sector 58",
    "metaDescription": "Three flaky BM Puffs with spiced veg filling. ₹80 in Sector 58, Noida. Pure veg, the chai-time classic done the Burger Minister way.",
    "image": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=1200&q=80",
    "imageAlt": "Three veg puffs with flaky pastry and spiced vegetable filling, baked golden.",
    "eyebrow": "Snacks · Sector 58, Noida",
    "category": "snacks",
    "lede": "Three flaky vegetable puffs for eighty rupees. The chai-time classic that we all grew up eating from bakery counters. Crisp pastry outside, lightly spiced vegetable filling inside. We make ours fresh through the day, not from a frozen box.",
    "whatMakesSpecial": "The pastry. A real puff needs proper layered pastry that flakes when you bite it, not a doughy biscuit. We get our pastry from a vendor who specializes in this, and we bake them in-house so they're always hot when served. Most cafes microwave frozen puffs, which kills the layers.",
    "whatIsInIt": "Layered flaky pastry, vegetable filling (potato, peas, carrot, onion, Indian spices, mild chilli). Baked till the pastry puffs up and turns golden.",
    "bestPairedWith": "A Classic Cold Coffee or chai. The puff with hot coffee is the morning combo we make for ourselves on cold days.",
    "reviews": [
      {
        "rating": 5,
        "body": "Perfect starter while we waited for our pizza. Hot, crispy, and shareable. Five pieces was just right for the two of us.",
        "author": "Pooja L.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Quality snacks. Tastes like proper hand-made cafe food, not frozen mass-produced stuff. The Group Platter is great for office orders.",
        "author": "Ankit B.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 3 weeks ago"
      },
      {
        "rating": 4,
        "body": "Good portion for the price. Came out hot. Would prefer a bit more dip on the side but you can always order extra.",
        "author": "Ishita V.",
        "sector": "Sector 59, Noida",
        "when": "Google, 2 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "Why is it called Veg Puff and not McPuff?",
        "a": "It is the same flaky vegetable puff classic, rebadged as BM Puff so the name is our own. Three pieces per plate at ₹80. Pure veg, spiced potato and peas filling, baked golden."
      },
      {
        "q": "Are these spicy?",
        "a": "Mild. There's a touch of chilli and Indian spices in the filling, similar to any vegetable patty you'd find at a bakery. Family-friendly."
      },
      {
        "q": "Can I order just one?",
        "a": "We sell in packs of three. Single orders cause more wastage and slower kitchen. Three is the minimum."
      }
    ],
    "related": [
      "veg-sticks",
      "garlic-potato-pops",
      "classic-cold-coffee"
    ]
  },
  "veg-sticks": {
    "slug": "veg-sticks",
    "name": "Veg Sticks",
    "price": 60,
    "title": "Veg Sticks 5 pcs ₹60, Crispy Snack, Burger Minister Noida",
    "metaDescription": "Five crispy vegetable sticks, light and shareable. ₹60 in Sector 58, Noida. Pure veg snack, great with cheese dip.",
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=1200&q=80",
    "imageAlt": "Five crispy vegetable sticks with golden breadcrumb coating served as a snack.",
    "eyebrow": "Snacks · Sector 58, Noida",
    "category": "snacks",
    "lede": "Five crispy vegetable sticks for sixty rupees. Light, shareable, and the kind of snack you order at the start of a meal while the rest of the order is being prepped. Pairs well with our cheese dips.",
    "whatMakesSpecial": "They are light enough that they don't fill you up before the main meal arrives. The breading is thin and well-seasoned, the veg inside stays soft. We serve five pieces, which is the right portion for one person to snack on or for two people to share as a starter.",
    "whatIsInIt": "Vegetable filling (potato, peas, corn, carrot, light spices) coated in a breadcrumb shell. Deep-fried till crisp. Served hot with a small ketchup pack or upgrade to cheese dip for thirty rupees.",
    "bestPairedWith": "Cheese Dip on the side. Or as part of the Group Platter combo at ₹299 if you want all the snacks together.",
    "reviews": [
      {
        "rating": 5,
        "body": "Perfect starter while we waited for our pizza. Hot, crispy, and shareable. Five pieces was just right for the two of us.",
        "author": "Pooja L.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 1 week ago"
      },
      {
        "rating": 5,
        "body": "Quality snacks. Tastes like proper hand-made cafe food, not frozen mass-produced stuff. The Group Platter is great for office orders.",
        "author": "Ankit B.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 3 weeks ago"
      },
      {
        "rating": 4,
        "body": "Good portion for the price. Came out hot. Would prefer a bit more dip on the side but you can always order extra.",
        "author": "Ishita V.",
        "sector": "Sector 59, Noida",
        "when": "Google, 2 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "What vegetables are inside?",
        "a": "Potato, peas, sweet corn, and carrot, with light Indian seasoning. The exact mix can vary slightly day to day depending on what is freshest."
      },
      {
        "q": "How is this different from the Cheese Sticks?",
        "a": "Cheese Sticks are mostly cheese filled with breadcrumb coating. Veg Sticks are vegetable filling, no cheese inside."
      },
      {
        "q": "Are these spicy?",
        "a": "No. Mild Indian seasoning, no chilli. Safe for kids."
      }
    ],
    "related": [
      "cheese-sticks",
      "garlic-potato-pops",
      "group-platter-combo"
    ]
  },
  "watermelon-mojito": {
    "slug": "watermelon-mojito",
    "name": "Watermelon Mojito",
    "price": 89,
    "title": "Watermelon Mojito ₹89, Fresh Fruit, Burger Minister Noida",
    "metaDescription": "Fresh watermelon blend with mint, lime, soda. ₹89 in Sector 58, Noida. Pure veg cafe, the summer favorite.",
    "image": "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=1200&q=80",
    "imageAlt": "Watermelon mojito with fresh blended watermelon, mint, lime in tall glass with watermelon wedge.",
    "eyebrow": "Coolers · Sector 58, Noida",
    "category": "coolers",
    "lede": "Watermelon Mojito is the easy summer drink. Fresh watermelon blended with mint, lime, and soda. Eighty-nine rupees. Light, fruity, and one of those drinks you can have anytime.",
    "whatMakesSpecial": "We use real watermelon, not watermelon syrup. The fruit is blended fresh in small batches through the day so it doesn't sit around losing freshness. The natural sugar from watermelon means we add less sugar syrup than other mojitos.",
    "whatIsInIt": "Fresh watermelon pulp, mint (muddled), lime juice, light sugar syrup, soda water, ice. Garnished with watermelon wedge and mint.",
    "bestPairedWith": "Almost anything. Easy to drink with any meal. Especially good with salty snacks like fries or sandwiches.",
    "reviews": [
      {
        "rating": 5,
        "body": "Refreshing in the Noida heat. Real mint, real lime, light on the sugar. Tastes like a properly muddled mojito, not a sweet soda.",
        "author": "Devansh R.",
        "sector": "Sector 58, Noida",
        "when": "Google review, 6 days ago"
      },
      {
        "rating": 5,
        "body": "Kala khatta took me back to childhood. Tongue went purple, no regrets. Pair with the Bombay sandwich for the full nostalgia trip.",
        "author": "Tanya M.",
        "sector": "Sector 62, Noida",
        "when": "Zomato, 1 month ago"
      },
      {
        "rating": 5,
        "body": "Mojito plus peri peri fries is my standing order. The cooler cuts the heat perfectly between bites.",
        "author": "Aman J.",
        "sector": "Sector 63, Noida",
        "when": "Google, 2 weeks ago"
      }
    ],
    "faqs": [
      {
        "q": "Is the watermelon fresh or frozen?",
        "a": "Fresh. We cut watermelon every morning. If watermelon isn't in season, we may sometimes substitute, but we'll tell you in advance."
      },
      {
        "q": "How sweet is it?",
        "a": "Naturally sweet from the watermelon plus a little syrup. Not too sweet. Some customers ask for no added syrup which makes it very fresh-tasting."
      },
      {
        "q": "Are there seeds?",
        "a": "No. We strain the blend to remove seeds before serving."
      }
    ],
    "related": [
      "mint-mojito",
      "kala-khatta-mojito",
      "green-apple-mojito"
    ]
  }
};

// Merge in hand-written Momo entries from sibling file
import { momoContent } from "./menuContentMomos";

const mergedContent: Record<string, ItemContent> = {
  ...menuContent,
  ...momoContent,
};

export function getItem(slug: string): ItemContent | null {
  return mergedContent[slug] || null;
}

export function getAllSlugs(): string[] {
  return Object.keys(mergedContent);
}

export function getMergedMenuContent(): Record<string, ItemContent> {
  return mergedContent;
}
