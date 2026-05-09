import Image from "next/image";
import { images } from "@/lib/images";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "About Us — Our Story & Values",
  description:
    "Learn about Burger Minister — our story, values, and commitment to 100% vegetarian, premium-quality burgers in Sector 58, Noida.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "100% Vegetarian",
    description:
      "We are proudly and completely vegetarian. No compromises, ever. Every item on our menu is pure veg.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Quality First",
    description:
      "Fresh ingredients sourced daily. No frozen patties, no shortcuts. Every patty is handcrafted with care.",
    color: "text-primary",
    bg: "bg-primary/10",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: "Hygiene Guaranteed",
    description:
      "Our kitchen follows the highest standards of cleanliness and food safety. Your health is our priority.",
    color: "text-tertiary",
    bg: "bg-tertiary-container/20",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
];

const milestones = [
  { year: "2022", text: "Started as a small takeaway counter" },
  { year: "2023", text: "Launched full menu with combos" },
  { year: "2024", text: "10,000+ happy customers served" },
  { year: "2025", text: "Expanded catering services" },
  { year: "2026", text: "Going digital — website launch" },
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
          <h1 className="font-[var(--font-heading)] text-4xl font-bold sm:text-5xl">
            Our <span className="text-primary">Story</span>
          </h1>
          <p className="mt-3 text-lg text-on-surface/60">
            From a small kitchen to Noida&apos;s favorite veg burger destination
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-[var(--font-heading)] text-3xl font-bold">
                How It All <span className="text-primary">Started</span>
              </h2>
              <div className="mt-6 space-y-4 text-on-surface/70 leading-relaxed">
                <p>
                  Burger Minister was born from a simple belief: vegetarian food
                  can be just as bold, flavorful, and satisfying as anything else.
                </p>
                <p>
                  What started as a small takeaway counter in Sector 58, Noida,
                  has grown into a beloved local spot known for its premium
                  quality, 100% vegetarian burgers.
                </p>
                <p>
                  Every patty is handcrafted daily with fresh ingredients, every
                  bun is soft and perfectly toasted, and every bite is a
                  testament to our commitment to taste and hygiene.
                </p>
              </div>
            </div>
            <div className="relative h-80 overflow-hidden rounded-2xl lg:h-96">
              <Image
                src={images.kitchen}
                alt="Burger Minister Kitchen"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-container-low py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold">
            Our <span className="text-primary">Values</span>
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

      {/* Quote */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="rounded-2xl border border-outline-variant/10 bg-surface-container p-10">
            <svg className="mx-auto h-8 w-8 text-primary/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
            </svg>
            <p className="mt-4 font-[var(--font-heading)] text-xl font-semibold leading-relaxed text-on-surface/90 sm:text-2xl">
              We don&apos;t just make burgers. We craft experiences — one bite at a time.
            </p>
            <p className="mt-4 text-sm text-primary">— Team Burger Minister</p>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="bg-surface-container-low py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold">
            Our <span className="text-primary">Journey</span>
          </h2>
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
    </div>
  );
}
