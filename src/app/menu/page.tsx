import type { Metadata } from "next";
import { images } from "@/lib/images";
import { menuData } from "@/lib/menuData";
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

export default function MenuPage() {
  return <MenuClient menuData={menuData} categoryBanners={categoryBanners} />;
}
