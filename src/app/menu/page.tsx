import type { Metadata } from "next";
import { images } from "@/lib/images";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  title: "Menu — Veg Burgers, Momos, Fries & More",
  description:
    "Explore Burger Minister's full menu — 100% vegetarian burgers, sandwiches, fries, kurkure momos, pizza, shakes & coolers. Fresh daily in Sector 58, Noida.",
  alternates: { canonical: "/menu" },
};

const categoryBanners: Record<string, string> = {
  Burgers: images.catBurgers,
  Sandwiches: images.catSandwiches,
  Momos: images.catMomos,
  Fries: images.catFries,
  Pizza: images.catPizza,
  Shakes: images.catShakes,
  Coffee: images.catCoffee,
  Coolers: images.catCoolers,
};

export type Variant = { label: string; price: number };
export type MenuItemData = {
  name: string;
  description: string;
  veg: boolean;
  tag?: string;
  price?: number;
  variants?: Variant[];
};

const HF = (half: number, full: number): Variant[] => [
  { label: "Half", price: half },
  { label: "Full", price: full },
];
const ML = (m: number, l: number): Variant[] => [
  { label: "M", price: m },
  { label: "L", price: l },
];

const menuData: Record<string, MenuItemData[]> = {
  Burgers: [
    { name: "Crisp Tikki Burger", price: 60, description: "Crispy aloo tikki patty with fresh veggies and house sauce", veg: true },
    { name: "Double Tikki Burger", price: 100, description: "Double stacked tikki, double the crunch, double the taste", veg: true },
    { name: "Cheese Burger", price: 80, description: "Melted cheese, crispy patty, lettuce, and tangy mayo", veg: true },
    { name: "Peri Peri Cheese Burger", price: 90, description: "Fiery peri peri seasoning with loaded melted cheese", veg: true, tag: "Popular" },
    { name: "Cheese Loaded Burger", price: 120, description: "Extra cheese overload — for the real cheese lovers", veg: true, tag: "Bestseller" },
    { name: "Corn Cheese Blast Burger", price: 150, description: "Sweet corn & triple cheese blast with signature sauce", veg: true, tag: "Premium" },
  ],
  Sandwiches: [
    { name: "Classic Sandwich", price: 90, description: "Fresh veggies, butter, chutney — simple aur tasty", veg: true },
    { name: "Double Tikki Sandwich", price: 110, description: "Double tikki loaded sandwich with crunchy veggies", veg: true },
    { name: "Cheese Sandwich", price: 100, description: "Melted cheese grilled sandwich with herbs", veg: true },
    { name: "Cheese Loaded Sandwich", price: 130, description: "Extra cheese dripping loaded sandwich", veg: true, tag: "Popular" },
    { name: "Peri Peri Cheese Sandwich", price: 130, description: "Spicy peri peri with gooey cheese in toasted bread", veg: true },
    { name: "Corn Cheese Blast Sandwich", price: 150, description: "Sweet corn and cheese blast — sandwich edition", veg: true, tag: "Premium" },
  ],
  Momos: [
    { name: "Steam Momos (Veg)", description: "Soft steamed veg dumplings with spicy chutney", veg: true, variants: HF(45, 80) },
    { name: "Steam Momos (Paneer)", description: "Steamed paneer filled momos", veg: true, variants: HF(55, 100) },
    { name: "Fried Momos (Veg)", description: "Crispy golden fried veg momos", veg: true, variants: HF(50, 90) },
    { name: "Fried Momos (Paneer)", description: "Golden fried paneer momos", veg: true, variants: HF(60, 110) },
    { name: "Gravy Momos (Veg)", description: "Momos tossed in spicy gravy", veg: true, tag: "Popular", variants: HF(65, 120) },
    { name: "Gravy Momos (Paneer)", description: "Paneer momos in rich spicy gravy", veg: true, variants: HF(75, 140) },
    { name: "Malai Momos (Veg)", description: "Creamy malai sauce veg momos", veg: true, variants: HF(70, 130) },
    { name: "Malai Momos (Paneer)", description: "Creamy malai paneer momos", veg: true, variants: HF(80, 150) },
    { name: "Kurkure Momos (Veg)", description: "Extra crunchy kurkure coated momos", veg: true, tag: "Bestseller", variants: HF(70, 130) },
    { name: "Kurkure Momos (Paneer)", description: "Kurkure coated paneer momos", veg: true, variants: HF(80, 150) },
    { name: "Peri Peri Kurkure (Veg)", description: "Fiery peri peri kurkure veg momos", veg: true, tag: "Spicy", variants: HF(85, 160) },
    { name: "Peri Peri Kurkure (Paneer)", description: "Peri peri kurkure paneer momos", veg: true, variants: HF(95, 180) },
    { name: "Pizza Momo", price: 90, description: "Fusion pizza-style momos — cheesy & tangy", veg: true, tag: "Fusion" },
  ],
  Fries: [
    { name: "Classic Salted Fries", description: "Golden crispy fries with rock salt", veg: true, variants: HF(70, 90) },
    { name: "Peri Peri Fries", description: "Tossed in fiery peri peri seasoning", veg: true, variants: HF(80, 110) },
    { name: "Chilli Garlic Fries", description: "Spicy chilli garlic tossed fries", veg: true, variants: HF(80, 110) },
    { name: "Cheese Loaded Fries", description: "Drizzled with melted cheese sauce", veg: true, tag: "Bestseller", variants: HF(110, 150) },
    { name: "BM Special Fries", price: 170, description: "Our signature loaded fries — cheese, sauces, toppings!", veg: true, tag: "Chef's Special" },
  ],
  Pizza: [
    { name: "Margherita Pizza", price: 130, description: "Classic tomato sauce & mozzarella — 8 inch handcrafted", veg: true },
    { name: "Corn Cheese Blast Pizza", price: 140, description: "Sweet corn & gooey cheese on fresh dough", veg: true },
    { name: "Onion Capsicum Pizza", price: 170, description: "Crisp veggies with tangy sauce — loaded", veg: true, tag: "Popular" },
    { name: "All Veggies Pizza", price: 190, description: "Garden loaded with all fresh veggies — hearty", veg: true },
    { name: "Cheese Loaded Pizza", price: 210, description: "Extra cheese overloaded pizza — cheese lovers only", veg: true, tag: "Premium" },
  ],
  Shakes: [
    { name: "Strawberry Shake", description: "Fresh strawberry milkshake", veg: true, variants: ML(60, 80) },
    { name: "Butterscotch Shake", description: "Rich butterscotch flavoured shake", veg: true, variants: ML(60, 80) },
    { name: "Oreo Shake", description: "Creamy shake loaded with Oreo crumbles", veg: true, tag: "Favourite", variants: ML(60, 80) },
    { name: "Kitkat Shake", description: "Chocolatey Kitkat blended shake", veg: true, variants: ML(60, 80) },
    { name: "Chocolate Shake", description: "Rich chocolate milkshake", veg: true, variants: ML(60, 80) },
  ],
  Coffee: [
    { name: "Cold Coffee", description: "Rich creamy cold coffee", veg: true, variants: ML(60, 80) },
    { name: "Hazelnut Coffee", description: "Hazelnut flavoured iced coffee", veg: true, variants: ML(70, 90) },
    { name: "Caramel Coffee", description: "Sweet caramel drizzle cold coffee", veg: true, tag: "Popular", variants: ML(70, 90) },
  ],
  Coolers: [
    { name: "Virgin Mojito", description: "Refreshing mint lime cooler", veg: true, variants: ML(60, 80) },
    { name: "Green Apple Cooler", description: "Tangy green apple refresher", veg: true, variants: ML(60, 80) },
    { name: "Watermelon Cooler", description: "Fresh watermelon juice cooler", veg: true, variants: ML(60, 80) },
    { name: "Kala Khatta", description: "Tangy sweet desi kala khatta", veg: true, tag: "Desi", variants: ML(60, 80) },
  ],
};

export default function MenuPage() {
  return <MenuClient menuData={menuData} categoryBanners={categoryBanners} />;
}
