import Link from "next/link";
import Image from "next/image";
import { images } from "@/lib/images";
import FeaturedMenu from "@/components/FeaturedMenu";
import TrustBadges from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import { FAQSchema } from "@/components/Schema";

const whyUs = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "100% Vegetarian",
    description: "Proudly and completely vegetarian. No compromises, ever.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    title: "Fresh Daily",
    description: "Ingredients sourced fresh every day. No frozen patties, no shortcuts.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "Hygiene First",
    description: "Our kitchen follows the highest standards of cleanliness and food safety.",
    color: "text-tertiary",
    bg: "bg-tertiary-container/20",
  },
];

export default function HomePage() {
  return (
    <>
      <FAQSchema />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        <Image
          src={images.heroBg}
          alt="Delicious burger background"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/95 to-surface/70" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left — Text */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-container/20 px-4 py-1.5 text-sm font-medium text-secondary">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                100% Pure Vegetarian
              </div>
              <h1 className="font-[var(--font-heading)] text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                The Minister
                <br />
                <span className="text-primary">of Taste</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-surface/60">
                Premium vegetarian burgers crafted with love in the heart of Noida.
                Fresh ingredients, bold flavours, and a commitment to quality in every bite.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/menu"
                  className="btn-honeyed inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold text-on-primary transition-all hover:scale-105"
                >
                  Order Now
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 px-8 py-3.5 text-base font-semibold text-on-surface transition-all hover:border-primary hover:text-primary"
                >
                  View Menu
                </Link>
              </div>
            </div>

            {/* Right — Burger Image */}
            <div className="relative mx-auto hidden lg:block">
              <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative h-[420px] w-[420px] overflow-hidden rounded-3xl border border-outline-variant/10">
                <Image
                  src={images.ministerSpecial}
                  alt="Minister Special Burger"
                  fill
                  className="animate-float object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Strip */}
      <section className="border-y border-outline-variant/10 bg-surface-container-low/50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </section>

      {/* Testimonials — Real Google Reviews */}
      <Testimonials />

      {/* Featured Menu */}
      <FeaturedMenu />

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold sm:text-4xl">
            Why <span className="text-primary">Choose</span> Us
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-surface-container p-8 text-center transition-all hover:bg-surface-container-high"
              >
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}
                >
                  {item.icon}
                </div>
                <h3 className="mt-5 font-[var(--font-heading)] text-lg font-bold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Combo Deals Banner */}
      <section className="relative mx-4 overflow-hidden rounded-3xl sm:mx-6 lg:mx-auto lg:max-w-7xl">
        <Image
          src={images.familyFeast}
          alt="Combo deals"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container/90 via-tertiary-container/80 to-surface-container/90" />
        <div className="relative px-8 py-14 text-center sm:px-16">
          <h2 className="font-[var(--font-heading)] text-3xl font-bold sm:text-4xl">
            Minister&apos;s Combo Deals
          </h2>
          <p className="mt-3 text-lg text-on-surface/70">
            Starting from just{" "}
            <span className="font-bold text-primary">₹119</span> — Burger + Fries + Drink
          </p>
          <Link
            href="/menu"
            className="btn-honeyed mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold text-on-primary transition-all hover:scale-105"
          >
            Explore Combos
          </Link>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919643100501?text=Hi%20Burger%20Minister!%20I%20want%20to%20place%20an%20order"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="hidden sm:inline">WhatsApp Order</span>
      </a>

      {/* FAQ */}
      <FAQ />

      {/* Location Teaser */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-surface-container p-8 sm:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <h2 className="font-[var(--font-heading)] text-3xl font-bold">
                  Visit <span className="text-primary">Us</span>
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <p className="text-on-surface/70">
                      C-44, C Block, Sector 58, Noida, Uttar Pradesh 201301
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <a href="tel:+919643100501" className="font-bold text-primary hover:underline">
                      +91 9643100501
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-on-surface/70">
                      Daily 4:00 PM – 3:00 AM
                      <span className="ml-2 text-sm text-secondary">(Open all 7 days)</span>
                    </p>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/JGiLiytokNhZE2Da9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-honeyed mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-on-primary transition-all hover:scale-105"
                >
                  Get Directions
                </a>
              </div>
              {/* Map embed */}
              <div className="h-64 overflow-hidden rounded-xl lg:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.7!2d77.36!3d28.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSector%2058%2C%20Noida!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Burger Minister Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
