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

type MenuItemData = {
  name: string;
  price: string;
  description: string;
  veg: boolean;
  tag?: string;
};

const menuData: Record<string, MenuItemData[]> = {
  Burgers: [
    { name: "Crisp Tikki Burger", price: "₹60", description: "Crispy aloo tikki patty with fresh veggies and house sauce", veg: true },
    { name: "Double Tikki Burger", price: "₹100", description: "Double stacked tikki, double the crunch, double the taste", veg: true },
    { name: "Cheese Burger", price: "₹80", description: "Melted cheese, crispy patty, lettuce, and tangy mayo", veg: true },
    { name: "Peri Peri Cheese Burger", price: "₹90", description: "Fiery peri peri seasoning with loaded melted cheese", veg: true, tag: "Popular" },
    { name: "Cheese Loaded Burger", price: "₹120", description: "Extra cheese overload — for the real cheese lovers", veg: true, tag: "Bestseller" },
    { name: "Corn Cheese Blast Burger", price: "₹150", description: "Sweet corn & triple cheese blast with signature sauce", veg: true, tag: "Premium" },
  ],
  Sandwiches: [
    { name: "Classic Sandwich", price: "₹90", description: "Fresh veggies, butter, chutney — simple aur tasty", veg: true },
    { name: "Double Tikki Sandwich", price: "₹110", description: "Double tikki loaded sandwich with crunchy veggies", veg: true },
    { name: "Cheese Sandwich", price: "₹100", description: "Melted cheese grilled sandwich with herbs", veg: true },
    { name: "Cheese Loaded Sandwich", price: "₹130", description: "Extra cheese dripping loaded sandwich", veg: true, tag: "Popular" },
    { name: "Peri Peri Cheese Sandwich", price: "₹130", description: "Spicy peri peri with gooey cheese in toasted bread", veg: true },
    { name: "Corn Cheese Blast Sandwich", price: "₹150", description: "Sweet corn and cheese blast — sandwich edition", veg: true, tag: "Premium" },
  ],
  Momos: [
    { name: "Steam Momos (Veg Half)", price: "₹45", description: "Soft steamed veg dumplings with spicy chutney", veg: true },
    { name: "Steam Momos (Veg Full)", price: "₹80", description: "Full plate steamed veg momos", veg: true },
    { name: "Steam Momos (Paneer Half)", price: "₹55", description: "Steamed paneer filled momos", veg: true },
    { name: "Steam Momos (Paneer Full)", price: "₹100", description: "Full plate paneer steamed momos", veg: true },
    { name: "Fried Momos (Veg Half)", price: "₹50", description: "Crispy golden fried veg momos", veg: true },
    { name: "Fried Momos (Veg Full)", price: "₹90", description: "Full plate crispy fried veg momos", veg: true },
    { name: "Fried Momos (Paneer Half)", price: "₹60", description: "Golden fried paneer momos", veg: true },
    { name: "Fried Momos (Paneer Full)", price: "₹110", description: "Full plate fried paneer momos", veg: true },
    { name: "Gravy Momos (Veg Half)", price: "₹65", description: "Momos tossed in spicy gravy", veg: true, tag: "Popular" },
    { name: "Gravy Momos (Veg Full)", price: "₹120", description: "Full plate gravy veg momos", veg: true },
    { name: "Gravy Momos (Paneer Half)", price: "₹75", description: "Paneer momos in rich spicy gravy", veg: true },
    { name: "Gravy Momos (Paneer Full)", price: "₹140", description: "Full plate paneer gravy momos", veg: true },
    { name: "Malai Momos (Veg Half)", price: "₹70", description: "Creamy malai sauce veg momos", veg: true },
    { name: "Malai Momos (Veg Full)", price: "₹130", description: "Full plate malai veg momos", veg: true },
    { name: "Malai Momos (Paneer Half)", price: "₹80", description: "Creamy malai paneer momos", veg: true },
    { name: "Malai Momos (Paneer Full)", price: "₹150", description: "Full plate malai paneer momos", veg: true },
    { name: "Kurkure Momos (Veg Half)", price: "₹70", description: "Extra crunchy kurkure coated momos", veg: true, tag: "Bestseller" },
    { name: "Kurkure Momos (Veg Full)", price: "₹130", description: "Full plate kurkure veg momos", veg: true },
    { name: "Kurkure Momos (Paneer Half)", price: "₹80", description: "Kurkure coated paneer momos", veg: true },
    { name: "Kurkure Momos (Paneer Full)", price: "₹150", description: "Full plate kurkure paneer momos", veg: true },
    { name: "Peri Peri Kurkure (Veg Half)", price: "₹85", description: "Fiery peri peri kurkure veg momos", veg: true, tag: "Spicy" },
    { name: "Peri Peri Kurkure (Veg Full)", price: "₹160", description: "Full plate peri peri kurkure momos", veg: true },
    { name: "Peri Peri Kurkure (Paneer Half)", price: "₹95", description: "Peri peri kurkure paneer momos", veg: true },
    { name: "Peri Peri Kurkure (Paneer Full)", price: "₹180", description: "Full plate peri peri kurkure paneer momos", veg: true },
    { name: "Pizza Momo", price: "₹90", description: "Fusion pizza-style momos — cheesy & tangy", veg: true, tag: "Fusion" },
  ],
  Fries: [
    { name: "Classic Salted Fries (Half)", price: "₹70", description: "Golden crispy fries with rock salt", veg: true },
    { name: "Classic Salted Fries (Full)", price: "₹90", description: "Large portion golden salted fries", veg: true },
    { name: "Peri Peri Fries (Half)", price: "₹80", description: "Tossed in fiery peri peri seasoning", veg: true },
    { name: "Peri Peri Fries (Full)", price: "₹110", description: "Large plate peri peri loaded fries", veg: true },
    { name: "Chilli Garlic Fries (Half)", price: "₹80", description: "Spicy chilli garlic tossed fries", veg: true },
    { name: "Chilli Garlic Fries (Full)", price: "₹110", description: "Large portion chilli garlic fries", veg: true },
    { name: "Cheese Loaded Fries (Half)", price: "₹110", description: "Drizzled with melted cheese sauce", veg: true, tag: "Bestseller" },
    { name: "Cheese Loaded Fries (Full)", price: "₹150", description: "Large plate loaded with cheese", veg: true },
    { name: "BM Special Fries", price: "₹170", description: "Our signature loaded fries — cheese, sauces, toppings!", veg: true, tag: "Chef's Special" },
  ],
  Pizza: [
    { name: "Margherita Pizza", price: "₹130", description: "Classic tomato sauce & mozzarella — 8 inch handcrafted", veg: true },
    { name: "Corn Cheese Blast Pizza", price: "₹140", description: "Sweet corn & gooey cheese on fresh dough", veg: true },
    { name: "Onion Capsicum Pizza", price: "₹170", description: "Crisp veggies with tangy sauce — loaded", veg: true, tag: "Popular" },
    { name: "All Veggies Pizza", price: "₹190", description: "Garden loaded with all fresh veggies — hearty", veg: true },
    { name: "Cheese Loaded Pizza", price: "₹210", description: "Extra cheese overloaded pizza — cheese lovers only", veg: true, tag: "Premium" },
  ],
  Shakes: [
    { name: "Strawberry Shake (M)", price: "₹60", description: "Fresh strawberry milkshake — medium", veg: true },
    { name: "Strawberry Shake (L)", price: "₹80", description: "Fresh strawberry milkshake — large", veg: true },
    { name: "Butterscotch Shake (M)", price: "₹60", description: "Rich butterscotch flavoured shake — medium", veg: true },
    { name: "Butterscotch Shake (L)", price: "₹80", description: "Rich butterscotch flavoured shake — large", veg: true },
    { name: "Oreo Shake (M)", price: "₹60", description: "Creamy shake loaded with Oreo crumbles — medium", veg: true, tag: "Favourite" },
    { name: "Oreo Shake (L)", price: "₹80", description: "Creamy shake loaded with Oreo crumbles — large", veg: true },
    { name: "Kitkat Shake (M)", price: "₹60", description: "Chocolatey Kitkat blended shake — medium", veg: true },
    { name: "Kitkat Shake (L)", price: "₹80", description: "Chocolatey Kitkat blended shake — large", veg: true },
    { name: "Chocolate Shake (M)", price: "₹60", description: "Rich chocolate milkshake — medium", veg: true },
    { name: "Chocolate Shake (L)", price: "₹80", description: "Rich chocolate milkshake — large", veg: true },
  ],
  Coffee: [
    { name: "Cold Coffee (M)", price: "₹60", description: "Rich creamy cold coffee — medium", veg: true },
    { name: "Cold Coffee (L)", price: "₹80", description: "Rich creamy cold coffee — large", veg: true },
    { name: "Hazelnut Coffee (M)", price: "₹70", description: "Hazelnut flavoured iced coffee — medium", veg: true },
    { name: "Hazelnut Coffee (L)", price: "₹90", description: "Hazelnut flavoured iced coffee — large", veg: true },
    { name: "Caramel Coffee (M)", price: "₹70", description: "Sweet caramel drizzle cold coffee — medium", veg: true, tag: "Popular" },
    { name: "Caramel Coffee (L)", price: "₹90", description: "Sweet caramel drizzle cold coffee — large", veg: true },
  ],
  Coolers: [
    { name: "Virgin Mojito (M)", price: "₹60", description: "Refreshing mint lime cooler — medium", veg: true },
    { name: "Virgin Mojito (L)", price: "₹80", description: "Refreshing mint lime cooler — large", veg: true },
    { name: "Green Apple Cooler (M)", price: "₹60", description: "Tangy green apple refresher — medium", veg: true },
    { name: "Green Apple Cooler (L)", price: "₹80", description: "Tangy green apple refresher — large", veg: true },
    { name: "Watermelon Cooler (M)", price: "₹60", description: "Fresh watermelon juice cooler — medium", veg: true },
    { name: "Watermelon Cooler (L)", price: "₹80", description: "Fresh watermelon juice cooler — large", veg: true },
    { name: "Kala Khatta (M)", price: "₹60", description: "Tangy sweet desi kala khatta — medium", veg: true, tag: "Desi" },
    { name: "Kala Khatta (L)", price: "₹80", description: "Tangy sweet desi kala khatta — large", veg: true },
  ],
};

export default function MenuPage() {
  return <MenuClient menuData={menuData} categoryBanners={categoryBanners} />;
}
