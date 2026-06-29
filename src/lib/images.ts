// Curated 100% vegetarian Unsplash imagery for Burger Minister
// All photo IDs hand-picked: visible green/leafy veggies, paneer/tikki style
// composition, or clearly non-meat dishes (sandwiches/momos/fries/drinks).
// All under Unsplash license (free commercial use).

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const images = {
  // Hero — wide veg burger composition
  heroBg: u("1571091655789-405eb7a3a3a8", 1920),

  // Burgers (verified veg compositions — visible greens, no exposed meat patty)
  ministerSpecial: u("1660715683691-d1614d1dd361", 800),
  cheeseBurger: u("1568901346375-23c9450c58cd", 800),
  paneerRoyale: u("1603064752734-4c48eff53d05", 800),
  alooTikki: u("1611309454921-16cef3438ee0", 800),
  paneerTikka: u("1586190848861-99aa4a171e90", 800),
  vegWhopper: u("1520072959219-c595dc870360", 800),

  // Fries
  classicFries: u("1573080496219-bb080dd4f877", 800),
  periPeriFries: u("1630384060421-cb20d0e0649d", 800),
  cheeseFries: u("1585109649139-366815a0d713", 800),

  // Momos / dumplings (always veg in our menu)
  steamedMomos: u("1534422298391-e4f8c172dddb", 800),
  friedMomos: u("1625220194771-7ebdea0b70b9", 800),
  tandooriMomos: u("1694923450868-b432a8ee52aa", 800),

  // Beverages (drinks — naturally veg-safe)
  lemonade: u("1621263764928-df1444c5e859", 800),
  coldCoffee: u("1461023058943-07fcbe16d735", 800),
  mangoShake: u("1623065422902-30a2d299bbe4", 800),
  oreoShake: u("1572490122747-3968b75cc699", 800),

  // Combos — verified veg burger compositions
  valuCombo: u("1513185158878-8d8c2a2a3da3", 800),
  premiumCombo: u("1673006768521-1f5f2ed92b41", 800),
  familyFeast: u("1520072959219-c595dc870360", 1200),

  // Category banners
  catBurgers: u("1568901346375-23c9450c58cd", 1200),
  catSandwiches: u("1611309454921-16cef3438ee0", 1200),
  catMomos: u("1534422298391-e4f8c172dddb", 1200),
  catFries: u("1573080496219-bb080dd4f877", 1200),
  catPizza: u("1565299624946-b28f40a0ae38", 1200),
  catShakes: u("1572490122747-3968b75cc699", 1200),
  catCoffee: u("1461023058943-07fcbe16d735", 1200),
  catCoolers: u("1621263764928-df1444c5e859", 1200),

  // About
  kitchen: u("1466978913421-dad2ebd01d17", 1200),

  // Catering
  corporateEvent: u("1414235077428-338989a2e8c0", 800),
  birthdayParty: u("1530103862676-de8c9debad1d", 800),
  bulkOrder: u("1555396273-367ea4eb4db5", 800),
};

// Real photos of the actual outlet (D13 Bhaiji Market, Sector 58 Noida).
// Local, optimized WebP under /public/photos. Used on About + Contact pages
// where authentic, on-location imagery beats stock (trust / local E-E-A-T).
const p = (file: string) => `/photos/${file}`;

export const realPhotos = {
  owner: p("burger-minister-owner-sector-58-noida.webp"),
  welcome: p("burger-minister-pure-veg-cafe-welcome-noida.webp"),
  happyCustomers: p("burger-minister-happy-customers-noida.webp"),
  tableService: p("burger-minister-table-service-sector-58.webp"),
  interiorBusy: p("burger-minister-cafe-interior-sector-58-noida.webp"),
  interiorSeating: p("burger-minister-dine-in-seating-noida.webp"),
  interiorAmbience: p("burger-minister-cafe-ambience-noida.webp"),
  storefrontNight: p("burger-minister-storefront-night-bhaiji-market.webp"),
  storefrontDay: p("burger-minister-storefront-sector-58-noida.webp"),
  vegPizza: p("burger-minister-veg-pizza-noida.webp"),
  freshPizza: p("burger-minister-fresh-pizza-sector-58.webp"),
  periPeriCheeseFries: p("burger-minister-peri-peri-cheese-fries-noida.webp"),
};
