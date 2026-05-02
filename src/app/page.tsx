import Link from "next/link";
import Image from "next/image";
import { images } from "@/lib/images";
import FeaturedMenu from "@/components/FeaturedMenu";
import TrustBadges from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CategoryTiles from "@/components/CategoryTiles";
import StoryPillars from "@/components/StoryPillars";
import SectionEyebrow from "@/components/SectionEyebrow";
import SocialProof from "@/components/SocialProof";
import { FAQSchema } from "@/components/Schema";

const heroStats = [
  { v: "★ 4.8", l: "Google Rating" },
  { v: "13+", l: "Types of Momos" },
  { v: "15 min", l: "Prep Time" },
  { v: "From ₹60", l: "Pocket-Friendly" },
];

const floatingTags = [
  {
    label: "100% Veg",
    style: "top-6 -left-2",
    color: "text-secondary border-secondary/30 bg-secondary/10",
    icon: (
      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Fresh Daily",
    style: "top-1/2 -right-4 -translate-y-1/2",
    color: "text-primary border-primary/30 bg-primary/10",
    icon: (
      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    label: "15-20 min",
    style: "bottom-6 left-4",
    color: "text-tertiary border-tertiary/30 bg-tertiary-container/40",
    icon: (
      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <FAQSchema />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16">
        <Image
          src={images.heroBg}
          alt=""
          fill
          className="object-cover opacity-[0.12]"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/95 to-surface/70" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            {/* Left — Text */}
            <div>
              {/* Eyebrow */}
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                100% Pure Vegetarian · Sector 58, Noida
              </span>

              {/* H1 */}
              <h1 className="mt-5 font-[var(--font-heading)] text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[5rem]">
                Crowned with{" "}
                <em className="font-normal italic text-primary">Flavour</em>,
                <br />
                <span className="text-on-surface/90">Served with Pride.</span>
              </h1>

              {/* Lede */}
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-surface/60">
                Handcrafted veg burgers, kurkure momos, BM Special fries,
                sandwiches, pizza & shakes — fresh to order, daily from 4 PM
                to 3 AM. Noida&apos;s most-loved late-night kitchen.
              </p>

              {/* Live ticker */}
              <div className="mt-6 max-w-md">
                <SocialProof />
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/menu"
                  className="btn-honeyed inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-on-primary transition-all hover:scale-105"
                >
                  Order Now
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 px-7 py-3.5 text-base font-semibold text-on-surface/80 transition-all hover:border-primary hover:text-primary"
                >
                  View Full Menu
                </Link>
              </div>

              {/* Stats strip */}
              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-outline-variant/15 pt-8 sm:grid-cols-4">
                {heroStats.map((s) => (
                  <div key={s.l}>
                    <div className="font-[var(--font-heading)] text-2xl font-bold text-on-surface">
                      {s.v}
                    </div>
                    <div className="mt-1 text-xs text-on-surface/50">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Stage with crown medallion + ring text + burger photo */}
            <div className="relative mx-auto hidden h-[460px] w-[460px] lg:block">
              {/* Outer ambient glow */}
              <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" />

              {/* Ring text — sits at radius 170, leaving a clear band at the top for the crown */}
              <svg
                className="absolute inset-0 h-full w-full animate-[spin_40s_linear_infinite]"
                viewBox="0 0 460 460"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="ringPath"
                    d="M 230,230 m -170,0 a 170,170 0 1,1 340,0 a 170,170 0 1,1 -340,0"
                  />
                </defs>
                <text
                  fill="rgba(230,196,67,0.5)"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.36em",
                  }}
                >
                  <textPath href="#ringPath" startOffset="0">
                    CROWNED WITH FLAVOUR · SERVED WITH PRIDE · 100% VEGETARIAN ·
                    SECTOR 58 NOIDA ·
                  </textPath>
                </text>
              </svg>

              {/* Crown — positioned above the ring band, with a soft dark backdrop to keep it readable */}
              <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
                <div className="relative flex h-14 w-24 items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-surface/80 blur-md" />
                  <svg
                    className="relative h-9 w-16 text-primary drop-shadow-[0_2px_12px_rgba(230,196,67,0.5)]"
                    viewBox="0 0 100 60"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5 50 L18 18 L32 38 L50 8 L68 38 L82 18 L95 50 Z" />
                    <circle cx="18" cy="14" r="4" />
                    <circle cx="50" cy="4" r="4" />
                    <circle cx="82" cy="14" r="4" />
                    <rect x="3" y="48" width="94" height="9" rx="2" />
                  </svg>
                </div>
              </div>

              {/* Burger photo */}
              <div className="absolute inset-[80px] overflow-hidden rounded-full border border-outline-variant/15">
                <Image
                  src={images.ministerSpecial}
                  alt="Burger Minister signature burger"
                  fill
                  sizes="300px"
                  className="animate-float object-cover"
                />
              </div>

              {/* Floating tags */}
              {floatingTags.map((t) => (
                <div
                  key={t.label}
                  className={`absolute ${t.style} flex items-center gap-1.5 rounded-full border bg-surface-container/90 px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${t.color}`}
                >
                  {t.icon}
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────── */}
      <section className="border-y border-outline-variant/10 bg-surface-container-low/50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </section>

      {/* ── BESTSELLERS ──────────────────────────────────── */}
      <section className="py-20" id="bestsellers">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionEyebrow>Bestsellers</SectionEyebrow>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-bold tracking-tight sm:text-4xl">
              Our{" "}
              <em className="font-normal italic text-primary">Signature</em>{" "}
              Menu
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-on-surface/60">
              Handcrafted with premium ingredients, every single day. These are
              the dishes Sector 58 keeps coming back for.
            </p>
          </div>
          <div className="mt-12">
            <FeaturedMenu hideHeader />
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────── */}
      <CategoryTiles />

      {/* ── STORY ────────────────────────────────────────── */}
      <StoryPillars />

      {/* ── REVIEWS ──────────────────────────────────────── */}
      <Testimonials />

      {/* ── COMBO ────────────────────────────────────────── */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl">
          <Image
            src={images.familyFeast}
            alt=""
            fill
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container/95 via-tertiary-container/70 to-surface-container/95" />
          <div className="relative px-8 py-16 text-center sm:px-16">
            <SectionEyebrow>Limited Combos</SectionEyebrow>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-bold tracking-tight sm:text-4xl">
              Minister&apos;s{" "}
              <em className="font-normal italic text-primary">Combo Deals</em>
            </h2>
            <p className="mt-3 text-lg text-on-surface/70">
              Starting from just{" "}
              <span className="font-bold text-primary">₹119</span> — Burger +
              Fries + Drink
            </p>
            <Link
              href="/menu"
              className="btn-honeyed mt-7 inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold text-on-primary transition-all hover:scale-105"
            >
              Explore Combos
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <FAQ />

      {/* ── VISIT ────────────────────────────────────────── */}
      <section className="py-20" id="visit">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionEyebrow>Find Your Way</SectionEyebrow>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-bold tracking-tight sm:text-4xl">
              Find your way to{" "}
              <em className="font-normal italic text-primary">flavour</em>
            </h2>
          </div>
          <div className="mt-12 overflow-hidden rounded-2xl bg-surface-container p-8 sm:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <p className="text-on-surface/70">
                      C-44, C Block, Sector 58, Noida, Uttar Pradesh 201301
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <a href="tel:+919643100501" className="font-bold text-primary hover:underline">
                      +91 9643100501
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-on-surface/70">
                      Daily 4:00 PM – 3:00 AM
                      <span className="ml-2 text-sm text-secondary">
                        (Open all 7 days)
                      </span>
                    </p>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/JGiLiytokNhZE2Da9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-honeyed mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-on-primary transition-all hover:scale-105"
                >
                  Get Directions
                </a>
              </div>
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

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919643100501?text=Hi%20Burger%20Minister!%20I%20want%20to%20place%20an%20order"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="hidden sm:inline">WhatsApp Order</span>
      </a>
    </>
  );
}
