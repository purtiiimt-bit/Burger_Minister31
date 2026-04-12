import type { Metadata } from "next";
import { images } from "@/lib/images";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore Burger Minister's full menu — 100% vegetarian burgers, fries, momos, beverages, and combo deals. Fresh, delicious, and affordable.",
};

const menuData = {
  Burgers: [
    { name: "Aloo Tikki Burger", price: "₹59", description: "Crispy aloo tikki with fresh veggies and signature sauce", veg: true, image: images.alooTikki },
    { name: "Classic Cheese Burger", price: "₹69", description: "Melted cheese, crispy patty, lettuce, and tangy mayo", veg: true, image: images.cheeseBurger },
    { name: "Paneer Burger", price: "₹89", description: "Grilled paneer patty with spiced seasoning", veg: true, image: images.paneerRoyale },
    { name: "Paneer Tikka Burger", price: "₹99", description: "Tandoori-spiced paneer with mint chutney", veg: true, image: images.paneerTikka },
    { name: "Veg Whopper", price: "₹109", description: "Double patty, extra cheese, loaded veggies", veg: true, image: images.vegWhopper },
    { name: "The Minister Special", price: "₹129", description: "Our signature — loaded with special minister sauce and premium toppings", veg: true, tag: "Bestseller", image: images.ministerSpecial },
  ],
  Fries: [
    { name: "Classic Salted Fries", price: "₹70 / ₹110", description: "Golden crispy fries with rock salt — Regular or Large", veg: true, image: images.classicFries },
    { name: "Peri Peri Fries", price: "₹80 / ₹140", description: "Tossed in fiery peri peri seasoning — Regular or Large", veg: true, image: images.periPeriFries },
    { name: "Cheese Loaded Fries", price: "₹120 / ₹160", description: "Drizzled with melted cheese sauce — Regular or Large", veg: true, image: images.cheeseFries },
  ],
  Momos: [
    { name: "Steamed Veg Momos", price: "₹80", description: "Soft steamed dumplings with spicy chutney", veg: true, image: images.steamedMomos },
    { name: "Fried Veg Momos", price: "₹90", description: "Crispy golden fried momos with schezwan dip", veg: true, image: images.friedMomos },
    { name: "Tandoori Momos", price: "₹110", description: "Charred tandoori-spiced momos with mint mayo", veg: true, tag: "Popular", image: images.tandooriMomos },
  ],
  Beverages: [
    { name: "Lemonade", price: "₹40", description: "Fresh lemon, mint, and a hint of sweetness", veg: true, image: images.lemonade },
    { name: "Cold Coffee", price: "₹60", description: "Rich, creamy cold coffee with ice", veg: true, image: images.coldCoffee },
    { name: "Mango Shake", price: "₹70", description: "Thick mango milkshake made with real mangoes", veg: true, image: images.mangoShake },
    { name: "Oreo Shake", price: "₹80", description: "Creamy vanilla shake loaded with Oreo crumbles", veg: true, tag: "Favourite", image: images.oreoShake },
  ],
  Combos: [
    { name: "Minister's Value Combo", price: "₹119", description: "Any Burger + Classic Fries + Lemonade", veg: true, tag: "Best Value", image: images.valuCombo },
    { name: "Minister's Premium Combo", price: "₹169", description: "Premium Burger + Loaded Fries + Any Shake", veg: true, tag: "Popular", image: images.premiumCombo },
    { name: "Family Feast", price: "₹449", description: "4 Burgers + 2 Fries + 4 Drinks — perfect for sharing", veg: true, tag: "Family", image: images.familyFeast },
  ],
};

export default function MenuPage() {
  return <MenuClient menuData={menuData} />;
}
