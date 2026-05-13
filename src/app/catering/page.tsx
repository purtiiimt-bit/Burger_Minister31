import Image from "next/image";
import { images } from "@/lib/images";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/Schema";
import CateringForm from "./CateringForm";

export const metadata: Metadata = {
  title: "Catering and Events. Bulk Veg Food Orders in Noida",
  description:
    "Burger Minister catering for corporate events, birthdays, and parties in Noida. Bulk veg orders with special pricing. 100% vegetarian food.",
  alternates: { canonical: "/catering" },
};

const services = [
  {
    title: "Corporate Events",
    description:
      "Impress your team with premium veg burgers for office parties, team lunches, and corporate meetups. Custom menus available.",
    image: images.corporateEvent,
  },
  {
    title: "Birthday Parties",
    description:
      "Make birthdays special with our party packages. Burgers, fries, shakes, and a whole lot of fun for all ages!",
    image: images.birthdayParty,
  },
  {
    title: "Bulk Orders",
    description:
      "Planning a gathering? Order 50+ burgers with special bulk pricing and free delivery anywhere in Noida.",
    image: images.bulkOrder,
  },
];

const steps = [
  { step: "01", title: "Tell Us Your Event", text: "Share event details and guest count" },
  { step: "02", title: "Choose Your Menu", text: "Pick from our packages or customize" },
  { step: "03", title: "We Prepare Fresh", text: "Everything made fresh on the day" },
  { step: "04", title: "We Deliver & Serve", text: "Hot delivery or on-site service" },
];

type PackageItem = { qty: number; label: string; menuPrice: number };
type PackageData = {
  name: string;
  price: number;
  retail: number;
  people: number;
  perHead: number;
  note: string;
  badge: string;
  popular: boolean;
  items: PackageItem[];
  perks: string[];
};

const packages: PackageData[] = [
  {
    name: "Office Crew Pack",
    price: 2499,
    retail: 2770,
    people: 10,
    perHead: 250,
    note: "For 10 people · ₹250/head",
    badge: "Best for Small Gatherings",
    popular: false,
    items: [
      { qty: 5, label: "Cheese Loaded Burger", menuPrice: 120 },
      { qty: 5, label: "Double Tikki Burger", menuPrice: 100 },
      { qty: 5, label: "Kurkure Veg Momos (Half)", menuPrice: 70 },
      { qty: 5, label: "Cheese Loaded Fries (Half)", menuPrice: 110 },
      { qty: 10, label: "Cold Coffee / Cooler (M)", menuPrice: 60 },
      { qty: 1, label: "BM Special Fries (complimentary)", menuPrice: 170 },
    ],
    perks: [
      "Free pickup or local delivery",
      "Disposable plates + napkins",
      "Swap items at no extra cost",
    ],
  },
  {
    name: "Party Pack",
    price: 5999,
    retail: 6950,
    people: 25,
    perHead: 240,
    note: "For 25 people · ₹240/head",
    badge: "Most Popular",
    popular: true,
    items: [
      { qty: 25, label: "Cheese Loaded Burger", menuPrice: 120 },
      { qty: 12, label: "Kurkure Veg Momos (Half)", menuPrice: 70 },
      { qty: 8, label: "Kurkure Paneer Momos (Half)", menuPrice: 80 },
      { qty: 10, label: "Peri Peri Fries (Half)", menuPrice: 80 },
      { qty: 25, label: "Shakes / Coolers (pick 3 flavours)", menuPrice: 60 },
      { qty: 1, label: "BM Special Fries (complimentary)", menuPrice: 170 },
    ],
    perks: [
      "FREE delivery within 5 km",
      "Decorated catering boxes",
      "Customisable: swap any item",
    ],
  },
  {
    name: "Grand Feast",
    price: 14999,
    retail: 15890,
    people: 50,
    perHead: 300,
    note: "For 50 people · ₹300/head",
    badge: "For Big Events",
    popular: false,
    items: [
      { qty: 30, label: "Cheese Loaded Burger", menuPrice: 120 },
      { qty: 20, label: "Peri Peri Cheese Burger", menuPrice: 90 },
      { qty: 15, label: "Kurkure Veg Momos (Full)", menuPrice: 130 },
      { qty: 10, label: "Kurkure Paneer Momos (Full)", menuPrice: 150 },
      { qty: 8, label: "BM Special Fries", menuPrice: 170 },
      { qty: 8, label: "Cheese Loaded Pizza (8″)", menuPrice: 210 },
      { qty: 50, label: "Shakes / Cold Coffee (L)", menuPrice: 80 },
    ],
    perks: [
      "FREE delivery + on-site setup",
      "Live counter helper (60 mins)",
      "Eco-friendly cutlery & branded boxes",
    ],
  },
];

export default function CateringPage() {
  return (
    <div className="pt-16">
      <BreadcrumbSchema
        trail={[
          { name: "Home", url: "/" },
          { name: "Catering & Events", url: "/catering" },
        ]}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-surface-container-low via-surface to-tertiary-container/20 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-[var(--font-heading)] text-4xl font-bold sm:text-5xl">
            Catering & <span className="text-primary">Events</span>
          </h1>
          <p className="mt-3 text-lg text-on-surface/60">
            Bring the Burger Minister experience to your parties, offices, and celebrations!
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold">
            What We <span className="text-primary">Offer</span>
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group overflow-hidden rounded-2xl bg-surface-container transition-all hover:bg-surface-container-high"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                <h3 className="font-[var(--font-heading)] text-lg font-bold">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface/60">
                  {s.description}
                </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-surface-container-low py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold">
            How It <span className="text-primary">Works</span>
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary font-[var(--font-heading)] text-lg font-bold text-on-primary">
                  {s.step}
                </div>
                <h3 className="mt-4 font-[var(--font-heading)] text-base font-bold">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-on-surface/60">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold">
            Catering <span className="text-primary">Packages</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-on-surface/60">
            Transparent pricing. See exactly what you get and how much you save vs. à la carte menu rates.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {packages.map((pkg) => {
              const savings = pkg.retail - pkg.price;
              const savingsPct = Math.round((savings / pkg.retail) * 100);
              return (
                <div
                  key={pkg.name}
                  className={`relative overflow-hidden rounded-2xl p-7 transition-all ${
                    pkg.popular
                      ? "border-2 border-primary bg-surface-container-high lg:-translate-y-2"
                      : "bg-surface-container hover:bg-surface-container-high"
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-primary">
                      Most Popular
                    </span>
                  )}

                  {/* Header */}
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface/50">
                    {pkg.badge}
                  </p>
                  <h3 className="mt-1 font-[var(--font-heading)] text-2xl font-bold">
                    {pkg.name}
                  </h3>
                  <p className="mt-1 text-xs text-on-surface/60">{pkg.note}</p>

                  {/* Price block */}
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-[var(--font-heading)] text-4xl font-bold text-primary">
                      ₹{pkg.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-on-surface/40 line-through">
                      ₹{pkg.retail.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="mt-1 inline-block rounded-full bg-secondary/10 px-2.5 py-0.5 text-[11px] font-semibold text-secondary">
                    Save ₹{savings.toLocaleString("en-IN")} · {savingsPct}% off
                  </p>

                  {/* Items breakdown */}
                  <div className="mt-5 rounded-xl bg-surface-container-low/60 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-on-surface/40">
                      What&apos;s Included
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {pkg.items.map((item) => (
                        <li
                          key={item.label}
                          className="flex items-baseline justify-between gap-2 text-xs"
                        >
                          <span className="min-w-0 flex-1 text-on-surface/80">
                            <span className="font-semibold text-primary">{item.qty}×</span>{" "}
                            {item.label}
                          </span>
                          <span className="shrink-0 text-on-surface/40">
                            ₹{(item.qty * item.menuPrice).toLocaleString("en-IN")}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex items-center justify-between border-t border-outline-variant/10 pt-2 text-xs">
                      <span className="text-on-surface/50">Menu value</span>
                      <span className="font-semibold text-on-surface/70">
                        ₹{pkg.retail.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span className="text-on-surface/50">Catering price</span>
                      <span className="font-[var(--font-heading)] font-bold text-primary">
                        ₹{pkg.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs text-secondary">
                      <span>You save</span>
                      <span className="font-semibold">
                        ₹{savings.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Perks */}
                  <ul className="mt-4 space-y-2">
                    {pkg.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-xs text-on-surface/70">
                        <svg
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        {p}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#inquiry"
                    className={`mt-6 block rounded-full py-3 text-center text-sm font-semibold transition-all ${
                      pkg.popular
                        ? "btn-honeyed text-on-primary hover:scale-105"
                        : "bg-surface-variant text-primary hover:bg-primary hover:text-on-primary"
                    }`}
                  >
                    Get This Package
                  </a>
                </div>
              );
            })}
          </div>

          {/* Add-ons */}
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-outline-variant/10 bg-surface-container-low/40 p-6">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface/50">
              Optional Add-ons
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                { label: "Upgrade all shakes to Large", price: "+₹500" },
                { label: "Add 5 Cheese Loaded Pizzas", price: "+₹999" },
                { label: "Extra 10 Kurkure Momo plates", price: "+₹999" },
                { label: "Live counter / on-site cooking", price: "+₹2,499" },
                { label: "Same-day rush order (<6 hrs)", price: "+₹500" },
                { label: "Custom branded boxes", price: "+₹699" },
              ].map((a) => (
                <div
                  key={a.label}
                  className="flex items-center justify-between rounded-xl bg-surface-container px-4 py-2.5 text-xs"
                >
                  <span className="text-on-surface/70">{a.label}</span>
                  <span className="font-semibold text-primary">{a.price}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-[10px] text-on-surface/40">
              All packages: 100% pure veg · FSSAI certified · Made fresh on the day
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-surface-container-low py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <svg className="mx-auto h-8 w-8 text-primary/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
          </svg>
          <p className="mt-4 font-[var(--font-heading)] text-lg font-semibold leading-relaxed text-on-surface/90 sm:text-xl">
            &ldquo;Burger Minister catered our office party and everyone loved it! Fresh, tasty, and super professional.&rdquo;
          </p>
          <p className="mt-3 text-sm text-primary">Rahul S., Noida</p>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold">
            Submit an <span className="text-primary">Inquiry</span>
          </h2>
          <p className="mt-2 text-center text-sm text-on-surface/60">
            Tell us about your event and we&apos;ll get back to you within 24 hours.
          </p>
          <CateringForm />
        </div>
      </section>
    </div>
  );
}
