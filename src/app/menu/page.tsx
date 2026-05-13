import type { Metadata } from "next";
import { images } from "@/lib/images";
import { menuData } from "@/lib/menuData";
import { MenuSchema, BreadcrumbSchema } from "@/components/Schema";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  title: "Menu. Veg Burgers, Momos, Fries and More",
  description:
    "Explore Burger Minister's full menu. 100% vegetarian burgers, sandwiches, fries, momos, pizza, shakes and coolers. Made fresh daily in Sector 58, Noida.",
  alternates: { canonical: "/menu" },
};

const categoryBanners: Record<string, string> = {
  Burgers: images.catBurgers,
  Sandwiches: images.catSandwiches,
  Pizza: images.catPizza,
  Momos: images.catMomos,
  Fries: images.catFries,
  Snacks: images.catFries,
  "Royal Combos": images.catBurgers,
  "Cold Coffee": images.catCoffee,
  "Milk Shakes": images.catShakes,
  Coolers: images.catCoolers,
  Extras: images.catSandwiches,
};

export default function MenuPage() {
  return (
    <>
      <MenuSchema />
      <BreadcrumbSchema
        trail={[
          { name: "Home", url: "/" },
          { name: "Menu", url: "/menu" },
        ]}
      />
      <MenuClient menuData={menuData} categoryBanners={categoryBanners} />
    </>
  );
}
