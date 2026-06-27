import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/Schema";

const SITE_URL = "https://burger-minister.com";

export const metadata: Metadata = {
  title: "About Burger Minister | Pure Veg Cafe Sector 58 Noida",
  description:
    "Burger Minister is a 100% pure vegetarian cafe at D13, Bhaiji Market, Sector 58, Noida. Our story, kitchen philosophy, and commitment to fresh food made to order since 2022.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    siteName: "Burger Minister",
    url: `${SITE_URL}/about`,
    title: "About Burger Minister | Pure Veg Cafe Sector 58 Noida",
    description:
      "Burger Minister is a 100% pure vegetarian cafe at D13, Bhaiji Market, Sector 58, Noida. Fresh burgers, momos, pizzas, and drinks made to order since 2022.",
    locale: "en_IN",
  },
};

const values = [
  {
    title: "100% Vegetarian",
    description:
      "The kitchen has never had meat, chicken, or egg in it. Not a separate section, not an exception. Every item on the menu is pure veg, and that is not going to change.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Made to Order",
    description:
      "Nothing sits in a tray waiting. Patties go into hot oil after your order comes in. Momos go into the steamer. Pizzas go into the oven. Every item is cooked fresh, every time.",
    color: "text-primary",
    bg: "bg-primary/10",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Honest Pricing",
    description:
      "A Classic Burger is ₹59. A combo starts at ₹169. We have kept our prices stable because the office workers, students, and families who are our regulars deserve a cafe they can come back to without budgeting for it.",
    color: "text-tertiary",
    bg: "bg-tertiary-container/20",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const milestones = [
  { year: "2022", text: "Started as a small takeaway counter in Bhaiji Market" },
  { year: "2023", text: "Launched full dine-in menu with combos and momos" },
  { year: "2024", text: "10,000+ happy customers served" },
  { year: "2025", text: "Expanded catering services for offices and events" },
  { year: "2026", text: "Launched burger-minister.com for online orders" },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      <BreadcrumbSchema
        trail={[
          { name: "Home", url: "/" },
          { name: "About Us", url: "/about" },
        ]}
      />

      {/* Hero */}
      <section className="bg-surface-container-low py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            100% Pure Vegetarian, Since 2022
          </span>
          <h1 className="mt-5 font-[var(--font-heading)] text-4xl font-bold sm:text-5xl">
            Our <span className="text-primary">Story</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-on-surface/60">
            A pure veg cafe at D13, Bhaiji Market, Sector 58, Noida. Built from a simple idea: vegetarian food can be bold, filling, and worth coming back for.
          </p>
        </div>
      </section>

      {/* How It Started */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-[var(--font-heading)] text-3xl font-bold">
                How It All <span className="text-primary">Started</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-on-surface/70">
                <p>
                  Burger Minister opened in 2022 as a small takeaway counter in Bhaiji Market, Sector 58. The first menu had six items. The idea was straightforward: make a proper vegetarian burger, price it so anyone walking past could afford it, and cook it fresh every single time.
                </p>
                <p>
                  The Sector 58 area has a mixed crowd. Families from the residential blocks, office workers from Sectors 62 and 63, students, and people passing through Bhaiji Market on weekends. What most of them had in common was a lack of a reliable pure veg dine-in option nearby. Most cafes either served non-veg alongside, had inconsistent food quality, or charged prices that made you think twice.
                </p>
                <p>
                  We decided to solve one problem well: be the place a strictly vegetarian family, a budget-conscious office worker, and a student could all rely on. No meat anywhere in the kitchen. No frozen patties pulled from a box. No pre-assembled food sitting under a lamp. Everything made after the order comes in.
                </p>
                <p>
                  By 2023 the menu had expanded to include momos, sandwiches, pizzas, shakes, and cold coffee. By 2024 we had crossed ten thousand orders. In 2025 we started taking catering requests from offices and event organisers in Noida. In 2026 we launched this website so you can order from wherever you are.
                </p>
              </div>
            </div>
            <div className="relative h-80 overflow-hidden rounded-2xl lg:h-[500px]">
              <Image
                src={images.kitchen}
                alt="Burger Minister kitchen at D13 Bhaiji Market Sector 58 Noida"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Pure Veg */}
      <section className="border-y border-outline-variant/10 bg-surface-container-low/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1 relative h-72 overflow-hidden rounded-2xl lg:h-96">
              <Image
                src={images.heroBg}
                alt="Pure vegetarian burgers and food at Burger Minister Sector 58 Noida"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-[var(--font-heading)] text-3xl font-bold">
                Why <span className="text-primary">100% Pure Veg?</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-on-surface/70">
                <p>
                  This is not a marketing position. It is how the kitchen was built from day one. When a kitchen is pure veg, there is no risk of cross-contamination. The tawa, the oil, the utensils, the prep surfaces — all of it is vegetarian. Families who are strict about this have told us this is the reason they choose us over other cafes nearby.
                </p>
                <p>
                  Pure vegetarian food in India also means a wider audience. Jain customers can order without worrying about what was cooked on the same surface before their food. Families with mixed dietary habits can bring everyone together at one table. Office lunch groups with even one strict vegetarian can order from our menu without splitting the group.
                </p>
                <p>
                  We are also FSSAI registered and compliant. The kitchen is cleaned daily, the oil is changed regularly, and the ingredients are sourced from verified vendors. What you eat here is made with the same standards we would apply if we were cooking for family.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Kitchen */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold">
            How We <span className="text-primary">Cook</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-on-surface/60">
            Made fresh, made to order. No shortcuts.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Fresh Patties, Every Order",
                body: "Our aloo tikki patties are prepped in the morning but they do not touch hot oil until your order comes in. Same for the paneer slabs. Pre-cooked patties go into a warming tray and lose their crunch. We do not do that.",
              },
              {
                title: "Dough Rested Overnight",
                body: "Pizza dough is made the night before and rested for at least twelve hours. Resting develops the gluten properly, which gives the crust a chew you cannot get from same-day dough. This is the reason the base stays thin without becoming crispy flat.",
              },
              {
                title: "House-Made Sauces",
                body: "Our cheese sauce, peri peri seasoning, green chutney, and sandwich masala are all made in-house. We batch these weekly, not daily, but they are made from scratch. Store-bought sauces taste the same everywhere. Ours taste like ours.",
              },
              {
                title: "Hand-Folded Momos",
                body: "Momo wrappers are rolled fresh in the morning. The filling is hand-chopped, not minced, which is why the texture inside stays distinct. Six or twelve to a plate, steamed to order. They arrive bouncy, not collapsed.",
              },
              {
                title: "Double-Fried Fries",
                body: "We fry our potatoes twice. The first fry cooks the inside soft. The second fry, done to order, creates the crisp exterior. Single-fry fries go soggy in five minutes. Ours hold their crunch for fifteen to twenty minutes after they leave the kitchen.",
              },
              {
                title: "Cold Coffee from Brewed Grounds",
                body: "We brew our cold coffee base from ground coffee, not instant powder. The brewed concentrate is chilled and blended with cold milk when you order. Instant-powder cold coffee tastes like brown milk. Ours has actual coffee depth.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-surface-container p-6 hover:bg-surface-container-high transition-colors"
              >
                <h3 className="font-[var(--font-heading)] text-base font-bold text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface/70">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-container-low py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold">
            What We <span className="text-primary">Stand For</span>
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-surface-container p-8 text-center transition-all hover:bg-surface-container-high"
              >
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${v.bg} ${v.color}`}
                >
                  {v.icon}
                </div>
                <h3 className="mt-5 font-[var(--font-heading)] text-lg font-bold">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface/60">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Location */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-[var(--font-heading)] text-3xl font-bold">
                Where to <span className="text-primary">Find Us</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-on-surface/70">
                <p>
                  We are at D13, Bhaiji Market, Sector 58, Noida, Uttar Pradesh 201301. Inside Bhaiji Market on the D Block side, ground floor. Look for the Burger Minister sign at the counter.
                </p>
                <p>
                  Bhaiji Market is a small commercial pocket that most Sector 58 residents and people in the surrounding sectors already know. We sit at a crossroads between residential blocks, office clusters in Sectors 62 and 63, and the Bishanpura neighbourhood, which is why our crowd is so mixed.
                </p>
                <p>
                  We are open every day from 11 AM to 11 PM. The kitchen takes last orders around 10:45 PM. There is parking outside the market for two-wheelers and some cars.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://maps.app.goo.gl/JGiLiytokNhZE2Da9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-honeyed inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-on-primary"
                >
                  Get Directions
                </a>
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 px-6 py-3 text-sm font-semibold text-on-surface/80 transition-all hover:border-primary hover:text-primary"
                >
                  View Full Menu
                </Link>
              </div>
            </div>
            <div className="rounded-2xl bg-surface-container p-6">
              <div className="space-y-4">
                {[
                  { label: "Address", value: "D13, Bhaiji Market, Sector 58, Noida, UP 201301" },
                  { label: "Hours", value: "Daily 11 AM to 11 PM, all 7 days" },
                  { label: "Phone", value: "+91 9643100501", href: "tel:+919643100501" },
                  { label: "Kitchen", value: "100% pure vegetarian, FSSAI certified" },
                  { label: "Service", value: "Dine-in, takeaway, online ordering" },
                  { label: "Nearest Sectors", value: "Sector 57, 58, 61, 62, Bishanpura" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 border-b border-outline-variant/10 pb-4 last:border-0 last:pb-0">
                    <div className="w-28 shrink-0 text-xs font-semibold uppercase tracking-wider text-on-surface/40">
                      {item.label}
                    </div>
                    <div className="text-sm text-on-surface/80">
                      {item.href ? (
                        <a href={item.href} className="text-primary hover:underline">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-surface-container-low py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="rounded-2xl border border-outline-variant/10 bg-surface-container p-10">
            <svg className="mx-auto h-8 w-8 text-primary/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
            </svg>
            <p className="mt-4 font-[var(--font-heading)] text-xl font-semibold leading-relaxed text-on-surface/90 sm:text-2xl">
              We do not want to be the most famous burger place in India. We want to be the one you come back to on a Tuesday afternoon when you are hungry and do not want to think too hard about it.
            </p>
            <p className="mt-4 text-sm text-primary">Team Burger Minister, Sector 58 Noida</p>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold">
            Our <span className="text-primary">Journey</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-on-surface/50">
            Four years from a six-item takeaway counter to a full-menu dine-in cafe with online ordering.
          </p>
          <div className="mt-12 flex flex-col items-center gap-0 sm:flex-row sm:justify-center sm:gap-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex items-center">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary font-[var(--font-heading)] text-lg font-bold text-on-primary">
                    {m.year.slice(2)}
                  </div>
                  <p className="mt-2 text-xs font-bold text-primary">{m.year}</p>
                  <p className="mt-1 max-w-[140px] text-xs text-on-surface/60">
                    {m.text}
                  </p>
                </div>
                {i < milestones.length - 1 && (
                  <div className="mx-2 hidden h-0.5 w-12 bg-primary/30 sm:block lg:w-20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-outline-variant/10 bg-surface-container-low/40 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold sm:text-3xl">
            Come say hello
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-on-surface/70">
            D13, Bhaiji Market, Sector 58, Noida. Open every day from 11 AM to 11 PM. Order online or walk in.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/menu"
              className="btn-honeyed inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-on-primary"
            >
              Order Online
            </Link>
            <a
              href="tel:+919643100501"
              className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 px-6 py-3 text-sm font-semibold text-on-surface/80 transition-all hover:border-primary hover:text-primary"
            >
              Call +91 9643100501
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
