import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getLocation,
  getAllLocationSlugs,
  type Location,
} from "@/lib/locationContent";

const SITE_URL = "https://burger-minister.com";

type RouteParams = Promise<{ sector: string }>;

export function generateStaticParams() {
  return getAllLocationSlugs().map((sector) => ({ sector }));
}

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const { sector } = await params;
  const loc = getLocation(sector);
  if (!loc) return { title: "Location not found" };
  const url = `${SITE_URL}/near/${loc.slug}`;
  return {
    title: loc.title,
    description: loc.metaDescription,
    alternates: { canonical: `/near/${loc.slug}` },
    openGraph: {
      type: "website",
      url,
      siteName: "Burger Minister",
      title: loc.title,
      description: loc.metaDescription,
      locale: "en_IN",
      images: [
        {
          url: "https://images.unsplash.com/photo-1660715683691-d1614d1dd361?w=1200&h=630&q=80&auto=format&fit=crop",
          width: 1200,
          height: 630,
          alt: `Burger Minister near ${loc.sectorLabel}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: loc.title,
      description: loc.metaDescription,
      images: [
        "https://images.unsplash.com/photo-1660715683691-d1614d1dd361?w=1200&h=630&q=80&auto=format&fit=crop",
      ],
    },
  };
}

function Schemas({ loc }: { loc: Location }) {
  const url = `${SITE_URL}/near/${loc.slug}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: `${SITE_URL}/#locations`,
      },
      { "@type": "ListItem", position: 3, name: loc.sectorLabel, item: url },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: loc.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  // Place reference so search engines can connect the page to the geographic entity
  const place = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: loc.sectorLabel,
    containedInPlace: { "@type": "City", name: "Noida" },
    nearbyAttraction: {
      "@type": "Restaurant",
      "@id": `${SITE_URL}/#restaurant`,
      name: "Burger Minister",
      url: SITE_URL,
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(place) }}
      />
    </>
  );
}

export default async function LocationPage({
  params,
}: {
  params: RouteParams;
}) {
  const { sector } = await params;
  const loc = getLocation(sector);
  if (!loc) notFound();

  return (
    <article className="pt-16">
      <Schemas loc={loc} />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-outline-variant/10 bg-surface-container-low/40"
      >
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-3 text-xs text-on-surface/50 sm:px-6 lg:px-8">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li className="opacity-40">/</li>
          <li className="font-semibold text-on-surface/70">
            Near {loc.sectorShort}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-surface-container-low/40 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            100% Pure Vegetarian, Sector 58 Noida
          </span>
          <h1 className="mt-5 font-[var(--font-heading)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            {loc.h1}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-on-surface/70">
            {loc.intro}
          </p>

          {/* Distance + time pill */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-md">
            <div className="rounded-xl bg-surface-container p-4">
              <div className="text-[10px] uppercase tracking-wider text-on-surface/40">
                Distance
              </div>
              <div className="mt-1 font-[var(--font-heading)] text-base font-bold">
                {loc.distanceKm}
              </div>
            </div>
            <div className="rounded-xl bg-surface-container p-4">
              <div className="text-[10px] uppercase tracking-wider text-on-surface/40">
                Travel time
              </div>
              <div className="mt-1 font-[var(--font-heading)] text-base font-bold">
                {loc.travelTime}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/menu"
              className="btn-honeyed inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-on-primary transition-all hover:scale-105"
            >
              View Full Menu
            </Link>
            <a
              href="https://maps.app.goo.gl/JGiLiytokNhZE2Da9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 px-6 py-3 text-sm font-semibold text-on-surface/80 transition-all hover:border-primary hover:text-primary"
            >
              Get Directions
            </a>
            <a
              href="tel:+919643100501"
              className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 px-6 py-3 text-sm font-semibold text-on-surface/80 transition-all hover:border-primary hover:text-primary"
            >
              Call +91 9643100501
            </a>
          </div>
        </div>
      </section>

      {/* Why visit + landmarks */}
      <section className="py-14">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold sm:text-3xl">
              Why visitors from{" "}
              <em className="font-normal italic text-primary">
                {loc.sectorShort}
              </em>{" "}
              choose us
            </h2>
            <p className="mt-4 text-base leading-relaxed text-on-surface/70">
              {loc.whyVisit}
            </p>

            <h2 className="mt-10 font-[var(--font-heading)] text-2xl font-bold sm:text-3xl">
              How to find us from{" "}
              <em className="font-normal italic text-primary">
                {loc.sectorShort}
              </em>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-on-surface/70">
              {loc.directions}
            </p>
          </div>

          <aside className="rounded-2xl border border-outline-variant/10 bg-surface-container p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70">
              Landmarks nearby
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-on-surface/70">
              {loc.landmarks.map((l) => (
                <li key={l} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  {l}
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-outline-variant/10 pt-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70">
                Our Outlet
              </div>
              <ul className="mt-2 space-y-1 text-xs text-on-surface/60">
                <li>D13, Bhaiji Market</li>
                <li>Sector 58, Noida, UP 201301</li>
                <li>Daily 11 AM to 11 PM</li>
                <li>Dine-in service, all 7 days</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Popular items */}
      <section className="border-y border-outline-variant/10 bg-surface-container-low/40 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold sm:text-3xl">
            Popular orders from{" "}
            <em className="font-normal italic text-primary">
              {loc.sectorShort}
            </em>
          </h2>
          <p className="mt-2 text-sm text-on-surface/50">
            The three items {loc.sectorShort} regulars reorder most often.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {loc.popular.map((p) => (
              <Link
                key={p.slug}
                href={`/menu/${p.slug}`}
                className="group flex flex-col gap-2 rounded-2xl bg-surface-container p-5 transition-all hover:bg-surface-container-high hover:-translate-y-1"
              >
                <div className="font-[var(--font-heading)] text-lg font-bold leading-tight">
                  {p.name}
                </div>
                <div className="font-[var(--font-heading)] text-xl font-bold text-primary">
                  ₹{p.price}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-on-surface/60">
                  {p.tagline}
                </p>
                <span className="mt-2 text-xs font-semibold text-primary/70 group-hover:text-primary">
                  View details →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-[var(--font-heading)] text-2xl font-bold sm:text-3xl">
            Common{" "}
            <em className="font-normal italic text-primary">questions</em> from{" "}
            {loc.sectorShort}
          </h2>
          <div className="mt-7 space-y-3">
            {loc.faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-surface-container p-5 transition-all hover:bg-surface-container-high"
              >
                <summary className="cursor-pointer list-none font-[var(--font-heading)] text-base font-bold">
                  <span className="mr-2 text-primary group-open:rotate-45 inline-block transition-transform">
                    +
                  </span>
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-on-surface/70">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Map + CTA */}
      <section className="border-t border-outline-variant/10 bg-surface-container-low/40 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-surface-container p-7">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold">
                Visit us from{" "}
                <em className="font-normal italic text-primary">
                  {loc.sectorShort}
                </em>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-on-surface/70">
                {loc.distanceKm}, {loc.travelTime}. Walk in any day between 11
                AM and 11 PM. We are pure vegetarian, dine-in, all 7 days.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://maps.app.goo.gl/JGiLiytokNhZE2Da9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-honeyed inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-on-primary"
                >
                  Open in Google Maps
                </a>
                <a
                  href="tel:+919643100501"
                  className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 px-6 py-3 text-sm font-semibold text-on-surface/80 transition-all hover:border-primary hover:text-primary"
                >
                  Call Us
                </a>
              </div>
            </div>
            <div className="h-72 overflow-hidden rounded-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.7!2d77.36!3d28.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSector%2058%2C%20Noida!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Burger Minister near ${loc.sectorLabel}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related locations */}
      <section className="py-12 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.18em] text-on-surface/40">
          Also serving
        </p>
        <div className="flex flex-wrap justify-center gap-2 px-4">
          {getAllLocationSlugs()
            .filter((s) => s !== loc.slug)
            .map((s) => {
              const o = getLocation(s)!;
              return (
                <Link
                  key={s}
                  href={`/near/${s}`}
                  className="rounded-full bg-surface-container px-4 py-2 text-xs font-semibold text-on-surface/70 transition-colors hover:bg-primary hover:text-on-primary"
                >
                  {o.sectorShort}
                </Link>
              );
            })}
        </div>
      </section>
    </article>
  );
}
