export type Variant = { label: string; price: number };
export type MenuItemData = {
  name: string;
  description: string;
  veg: boolean;
  tag?: string;
  price?: number;
  variants?: Variant[];
};

// Helper for Momos (Half / Full) — preserved as-is per requirement
const HF = (half: number, full: number): Variant[] => [
  { label: "Half", price: half },
  { label: "Full", price: full },
];

export const menuData: Record<string, MenuItemData[]> = {
  Burgers: [
    { name: "Classic Burger", price: 59, description: "Crispy aloo tikki patty, fresh veggies, soft toasted bun.", veg: true },
    { name: "Cheesy Burger", price: 79, description: "Melted cheese over our classic crispy patty.", veg: true },
    { name: "Paneer Burger", price: 99, description: "Spiced paneer tikka patty with crisp veggies.", veg: true },
    { name: "Cheese Loaded Burger", price: 139, description: "Extra cheese overload for the real cheese lovers.", veg: true, tag: "Bestseller" },
    { name: "Peri Peri Paneer Burger", price: 149, description: "Fiery peri peri paneer with melted cheese.", veg: true, tag: "Spicy" },
    { name: "Double Cheesy Patty Burger", price: 199, description: "Two patties, double cheese, double the crunch.", veg: true, tag: "Premium" },
  ],
  Sandwiches: [
    { name: "Classic Sandwich", price: 99, description: "Fresh veggies, butter, and mint chutney on toasted bread.", veg: true },
    { name: "Special Bombay Sandwich", price: 99, description: "Mumbai street-style sandwich with green chutney and spiced veggies.", veg: true },
    { name: "Cheese Sandwich", price: 119, description: "Melted cheese grilled to perfection with herbs.", veg: true },
    { name: "Cheese Loaded Sandwich", price: 159, description: "Indulgent extra cheese, dripping and gooey.", veg: true, tag: "Popular" },
    { name: "Corn Cheese Blast Sandwich", price: 179, description: "Sweet corn and gooey cheese with crisp veggies.", veg: true, tag: "Premium" },
  ],
  Pizza: [
    { name: "Margherita Pizza", price: 139, description: "Classic tomato sauce and mozzarella on fresh dough. 8 inch.", veg: true },
    { name: "Onion Capsicum Pizza", price: 149, description: "Crisp onions and capsicum over a cheesy base.", veg: true },
    { name: "Farmhouse Pizza", price: 169, description: "Onion, capsicum, mushroom, and tomato on cheese.", veg: true, tag: "Popular" },
    { name: "Cheese Loaded Pizza", price: 199, description: "Extra cheese overload. For cheese lovers only.", veg: true, tag: "Bestseller" },
    { name: "Corn Cheese Pizza", price: 209, description: "Sweet corn and a gooey cheese blanket.", veg: true, tag: "Premium" },
  ],
  Momos: [
    { name: "Steam Veg Momos", description: "Soft steamed veg dumplings served with spicy chutney.", veg: true, variants: HF(45, 80) },
    { name: "Steam Paneer Momos", description: "Steamed paneer filled momos with sharp chutney.", veg: true, variants: HF(55, 100) },
    { name: "Fried Veg Momos", description: "Crispy golden fried veg momos.", veg: true, variants: HF(50, 90) },
    { name: "Fried Paneer Momos", description: "Golden fried paneer momos with a crunch.", veg: true, variants: HF(60, 110) },
    { name: "Gravy Veg Momos", description: "Momos tossed in a spicy red gravy.", veg: true, tag: "Popular", variants: HF(65, 120) },
    { name: "Gravy Paneer Momos", description: "Paneer momos drenched in rich spicy gravy.", veg: true, variants: HF(75, 140) },
    { name: "Malai Veg Momos", description: "Creamy malai sauce coated veg momos.", veg: true, variants: HF(70, 130) },
    { name: "Malai Paneer Momos", description: "Creamy malai paneer momos, mild and rich.", veg: true, variants: HF(80, 150) },
    { name: "Kurkure Veg Momos", description: "Extra crunchy kurkure coated momos.", veg: true, tag: "Bestseller", variants: HF(70, 130) },
    { name: "Kurkure Paneer Momos", description: "Kurkure coated paneer momos with a crunch.", veg: true, variants: HF(80, 150) },
    { name: "Peri Peri Kurkure Veg Momos", description: "Fiery peri peri kurkure veg momos.", veg: true, tag: "Spicy", variants: HF(85, 160) },
    { name: "Peri Peri Kurkure Paneer Momos", description: "Peri peri kurkure paneer momos, with serious heat.", veg: true, variants: HF(95, 180) },
    { name: "Pizza Momo", price: 90, description: "Fusion pizza style momos. Cheesy and tangy.", veg: true, tag: "Fusion" },
  ],
  Fries: [
    { name: "Classic Salted Fries", price: 99, description: "Golden crispy fries with a pinch of rock salt.", veg: true },
    { name: "Peri Peri Fries", price: 119, description: "Tossed in our fiery peri peri seasoning.", veg: true },
    { name: "Chilli Garlic Fries", price: 119, description: "Spicy chilli garlic toss, bold and punchy.", veg: true },
    { name: "Chilli Lemon Fries", price: 129, description: "Tangy chilli and lemon zest. Refreshing kick.", veg: true },
    { name: "Cheese Loaded Fries", price: 199, description: "Drizzled with melted cheese sauce.", veg: true, tag: "Bestseller" },
    { name: "BM Special Fries", price: 209, description: "Our signature loaded fries with cheese, sauces, and toppings.", veg: true, tag: "Chef's Special" },
  ],
  Snacks: [
    { name: "Veg Sticks (5 pcs)", price: 60, description: "Crispy veg fingers served with a dip.", veg: true },
    { name: "Cheese Sticks (5 pcs)", price: 80, description: "Gooey mozzarella sticks, perfectly crunchy.", veg: true },
    { name: "Mc Puff (3 pcs)", price: 80, description: "Flaky puff stuffed with spiced veggies.", veg: true },
    { name: "Garlic Potato Pops (10 pcs)", price: 60, description: "Crunchy garlic potato bites, snackable size.", veg: true },
    { name: "Cheese Corn Triangles (6 pcs)", price: 80, description: "Crispy triangles loaded with cheese and corn.", veg: true, tag: "Popular" },
  ],
  "Royal Combos": [
    { name: "The Solo Minister Combo", price: 169, description: "Classic Burger with Peri Peri Fries and a Coke. A quick solo lunch.", veg: true, tag: "Save ₹49" },
    { name: "The Coffee Break Combo", price: 199, description: "Cheese Sandwich with Hazelnut Cold Coffee. An afternoon refresh.", veg: true, tag: "Save ₹39" },
    { name: "The Cheese Lover Combo", price: 229, description: "Cheesy Burger with Peri Peri Fries and Classic Cold Coffee. A full meal.", veg: true, tag: "Save ₹68" },
    { name: "The Paneer Power Combo", price: 229, description: "Paneer Burger with Peri Peri Fries and Mint Mojito. Pure-veg refresher.", veg: true, tag: "Save ₹68" },
    { name: "The Pizza Share Combo", price: 269, description: "Margherita Pizza with Peri Peri Fries and Mint Mojito. Perfect for two.", veg: true, tag: "Save ₹68" },
    { name: "The Group Platter", price: 299, description: "Cheese Sticks, Veg Sticks, Mc Puff, Cheese Corn Triangles, and Garlic Potato Pops. Snack platter for a group of 4 to 5.", veg: true, tag: "Save ₹61" },
  ],
  "Cold Coffee": [
    { name: "Classic Cold Coffee", price: 99, description: "Rich, creamy cold coffee blended fresh.", veg: true },
    { name: "Hazelnut Cold Coffee", price: 119, description: "Hazelnut flavoured iced coffee, smooth and nutty.", veg: true },
    { name: "Caramel Cold Coffee", price: 119, description: "Sweet caramel drizzle over chilled coffee.", veg: true, tag: "Popular" },
    { name: "Brownie Cold Coffee", price: 149, description: "Cold coffee blended with chocolate brownie chunks.", veg: true, tag: "Premium" },
  ],
  "Milk Shakes": [
    { name: "Chocolate Shake", price: 99, description: "Rich chocolate milkshake, thick and creamy.", veg: true },
    { name: "Butterscotch Shake", price: 99, description: "Buttery butterscotch flavour, nostalgic and sweet.", veg: true },
    { name: "Strawberry Shake", price: 99, description: "Fresh strawberry blended into creamy milk.", veg: true },
    { name: "Oreo Shake", price: 109, description: "Creamy shake loaded with Oreo crumbles.", veg: true, tag: "Favourite" },
    { name: "Kitkat Shake", price: 109, description: "Chocolatey Kitkat blended into a thick shake.", veg: true },
  ],
  Coolers: [
    { name: "Mint Mojito", price: 79, description: "Refreshing mint and lime cooler, served chilled.", veg: true },
    { name: "Kala Khatta Mojito", price: 89, description: "Tangy and sweet desi kala khatta in a mojito.", veg: true, tag: "Desi" },
    { name: "Watermelon Mojito", price: 89, description: "Fresh watermelon juice cooler with mint.", veg: true },
    { name: "Green Apple Mojito", price: 89, description: "Tangy green apple zing in a cooler.", veg: true },
  ],
  Extras: [
    { name: "Cheese Dip", price: 30, description: "A side of warm melted cheese sauce.", veg: true },
    { name: "Jalapeño Cheese Dip", price: 30, description: "Cheese dip with a spicy jalapeño kick.", veg: true },
    { name: "Garlic Cheese Dip", price: 35, description: "Garlic infused cheese sauce, rich and savoury.", veg: true },
    { name: "Extra Cheese on Items", price: 20, description: "Add an extra layer of cheese to any item.", veg: true },
  ],
};

// Flatten variants into individual orderable items (for admin grid).
export type FlatItem = { name: string; price: number; tag?: string };

export function flattenMenu(): Record<string, FlatItem[]> {
  const out: Record<string, FlatItem[]> = {};
  for (const [cat, items] of Object.entries(menuData)) {
    out[cat] = [];
    for (const item of items) {
      if (item.variants) {
        for (const v of item.variants) {
          out[cat].push({
            name: `${item.name} (${v.label})`,
            price: v.price,
            tag: item.tag,
          });
        }
      } else if (item.price !== undefined) {
        out[cat].push({ name: item.name, price: item.price, tag: item.tag });
      }
    }
  }
  return out;
}
