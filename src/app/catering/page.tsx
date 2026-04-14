import Image from "next/image";
import { images } from "@/lib/images";
import type { Metadata } from "next";
import CateringForm from "./CateringForm";

export const metadata: Metadata = {
  title: "Catering & Events — Bulk Veg Food Orders in Noida",
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

const packages = [
  {
    name: "Starter Pack",
    price: "₹2,999",
    features: ["25 Burgers", "10 Fries", "25 Drinks"],
    note: "Best for small gatherings",
    popular: false,
  },
  {
    name: "Party Pack",
    price: "₹5,499",
    features: ["50 Burgers", "25 Fries", "50 Drinks", "Free Delivery"],
    note: "Most Popular",
    popular: true,
  },
  {
    name: "Grand Feast",
    price: "₹9,999",
    features: ["100 Burgers", "50 Fries", "100 Drinks", "On-site Service"],
    note: "For big events",
    popular: false,
  },
];

export default function CateringPage() {
  return (
    <div className="pt-16">
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
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative overflow-hidden rounded-2xl p-8 transition-all ${
                  pkg.popular
                    ? "border-2 border-primary bg-surface-container-high scale-105"
                    : "bg-surface-container hover:bg-surface-container-high"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-on-primary">
                    Most Popular
                  </span>
                )}
                <p className="text-xs font-medium uppercase tracking-wider text-on-surface/50">
                  {pkg.note}
                </p>
                <h3 className="mt-2 font-[var(--font-heading)] text-xl font-bold">
                  {pkg.name}
                </h3>
                <p className="mt-2 font-[var(--font-heading)] text-3xl font-bold text-primary">
                  {pkg.price}
                </p>
                <ul className="mt-6 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-on-surface/70">
                      <svg className="h-4 w-4 shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
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
            ))}
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
          <p className="mt-3 text-sm text-primary">— Rahul S., Noida</p>
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
