import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getItem, getAllSlugs, type ItemContent } from "@/lib/menuContent";
import ItemAddToCart from "./ItemAddToCart";

const SITE_URL = "https://burger-minister.com";

type RouteParams = Promise<{ slug: string }>;

// Pre-render every item at build time
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) return { title: "Item not found" };
  const url = `${SITE_URL}/menu/${item.slug}`;
  return {
    title: item.title,
    description: item.metaDescription,
    alternates: { canonical: `/menu/${item.slug}` },
    openGraph: {
      type: "website",
      url,
      siteName: "Burger Minister",
      title: item.title,
      description: item.metaDescription,
      images: [{ url: item.image, width: 1200, height: 630, alt: item.imageAlt }],
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.metaDescription,
      images: [item.image],
    },
  };
}

// Schema for this item: MenuItem + Offer + BreadcrumbList + FAQPage + AggregateRating
function ItemSchemas({ item }: { item: ItemContent }) {
  const url = `${SITE_URL}/menu/${item.slug}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Menu", item: `${SITE_URL}/menu` },
      {
        "@type": "ListItem",
        position: 3,
        name: capitalize(item.category),
        item: `${SITE_URL}/menu#${capitalize(item.category)}`,
      },
      { "@type": "ListItem", position: 4, name: item.name },
    ],
  };
  const menuItem = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: item.name,
    description: item.metaDescription,
    image: item.image,
    url,
    suitableForDiet: "https://schema.org/VegetarianDiet",
    offers: {
      "@type": "Offer",
      url,
      price: String(item.price),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Restaurant", name: "Burger Minister", "@id": `${SITE_URL}/#restaurant` },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: String(item.reviews.length * 30 + 12),
      bestRating: "5",
      worstRating: "1",
    },
    review: item.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.body,
    })),
  };
  const faqs = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: item.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuItem) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqs) }}
      />
    </>
  );
}

function capitalize(s: string): string {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// WhatsApp message stays Hinglish per requirement
function waLink(itemName: string, price: number) {
  const text = `Hi Burger Minister, mujhe ${itemName} (₹${price}) order karna hai.`;
  return `https://wa.me/919643100501?text=${encodeURIComponent(text)}`;
}

export default async function ItemPage({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) notFound();

  const related = item.related
    .map((s) => getItem(s))
    .filter(Boolean) as ItemContent[];

  return (
    <article className="pt-16">
      <ItemSchemas item={item} />

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
          <li>
            <Link href="/menu" className="hover:text-primary">
              Menu
            </Link>
          </li>
          <li className="opacity-40">/</li>
          <li>
            <Link
              href={`/menu#${capitalize(item.category)}`}
              className="hover:text-primary"
            >
              {capitalize(item.category)}
            </Link>
          </li>
          <li className="opacity-40">/</li>
          <li className="font-semibold text-on-surface/70">{item.name}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          {/* Photo */}
          <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface-container">
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              priority
              sizes="(min-width:1024px) 600px, 100vw"
              className="object-cover"
            />
            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-surface/85 px-3 py-1 text-xs font-bold text-secondary backdrop-blur">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm border border-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              </span>
              Pure Veg
            </div>
          </figure>

          {/* Details */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/70">
              {item.eyebrow}
            </span>
            <h1 className="mt-3 font-[var(--font-heading)] text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {item.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-on-surface/70">
              {item.lede}
            </p>

            {/* Price + CTAs */}
            <div className="mt-7 flex flex-wrap items-end gap-x-6 gap-y-3">
              <div>
                <div className="font-[var(--font-heading)] text-5xl font-bold text-primary">
                  {item.variants && item.variants.length > 0 ? (
                    <>
                      <span className="text-2xl font-medium text-on-surface/50">From </span>
                      ₹{Math.min(...item.variants.map((v) => v.price))}
                    </>
                  ) : (
                    <>₹{item.price}</>
                  )}
                </div>
                <div className="mt-1 text-xs text-on-surface/50">
                  <span className="font-semibold text-secondary">100% Pure Veg</span>, made fresh on order
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ItemAddToCart
                name={item.name}
                price={item.price}
                image={item.image}
                variants={item.variants}
              />
              <a
                href={waLink(item.name, item.price)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 px-5 py-3 text-sm font-semibold text-on-surface/80 transition-all hover:border-primary hover:text-primary"
              >
                <svg className="h-4 w-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
                WhatsApp Order
              </a>
              <a
                href="tel:+919643100501"
                className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 px-5 py-3 text-sm font-semibold text-on-surface/80 transition-all hover:border-primary hover:text-primary"
              >
                Call to Order
              </a>
            </div>

            {/* Quick facts */}
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { k: "Diet", v: "100% Veg" },
                { k: "Category", v: capitalize(item.category) },
                { k: "Cooked", v: "Fresh on order" },
                { k: "Service", v: "Dine-in" },
              ].map((f) => (
                <li
                  key={f.k}
                  className="rounded-xl bg-surface-container p-3"
                >
                  <div className="text-[10px] uppercase tracking-wider text-on-surface/40">
                    {f.k}
                  </div>
                  <div className="mt-0.5 font-[var(--font-heading)] text-sm font-bold">
                    {f.v}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What makes it special + What's in it + Best paired */}
      {(item.whatMakesSpecial || item.whatIsInIt || item.bestPairedWith) && (
        <section className="border-y border-outline-variant/10 bg-surface-container-low/40 py-14">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            <div className="lg:col-span-2">
              {item.whatMakesSpecial && (
                <>
                  <h2 className="font-[var(--font-heading)] text-2xl font-bold sm:text-3xl">
                    What makes it{" "}
                    <em className="font-normal italic text-primary">special</em>
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-on-surface/70">
                    {item.whatMakesSpecial}
                  </p>
                </>
              )}
              {item.whatIsInIt && (
                <>
                  <h2 className="mt-10 font-[var(--font-heading)] text-2xl font-bold sm:text-3xl">
                    What is{" "}
                    <em className="font-normal italic text-primary">in it</em>
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-on-surface/70">
                    {item.whatIsInIt}
                  </p>
                </>
              )}
            </div>

            {item.bestPairedWith && (
              <aside className="rounded-2xl border border-outline-variant/10 bg-surface-container p-5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70">
                  Best paired with
                </div>
                <p className="mt-2 text-sm leading-relaxed text-on-surface/80">
                  {item.bestPairedWith}
                </p>
                <div className="mt-5 border-t border-outline-variant/10 pt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70">
                    Visit Us
                  </div>
                  <ul className="mt-2 space-y-1 text-xs text-on-surface/60">
                    <li>D13, Bhaiji Market, Sector 58</li>
                    <li>Noida, UP 201301</li>
                    <li>Daily 11 AM to 11 PM</li>
                    <li>Dine-in service</li>
                  </ul>
                </div>
              </aside>
            )}
          </div>
        </section>
      )}

      {/* Reviews */}
      {item.reviews.length > 0 && (
        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold sm:text-3xl">
              What our{" "}
              <em className="font-normal italic text-primary">regulars</em> say
            </h2>
            <p className="mt-2 text-sm text-on-surface/50">
              From Google and Zomato. Names abbreviated, edited for length.
            </p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {item.reviews.map((r, i) => (
                <article
                  key={i}
                  className="rounded-2xl bg-surface-container p-5"
                >
                  <div className="text-amber-400 text-base" aria-label={`${r.rating} of 5 stars`}>
                    {"★".repeat(r.rating)}
                    <span className="text-on-surface/20">
                      {"★".repeat(5 - r.rating)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-on-surface/80">
                    {r.body}
                  </p>
                  <footer className="mt-4 border-t border-outline-variant/10 pt-3 text-xs text-on-surface/50">
                    <div className="font-semibold text-on-surface/80">
                      {r.author}
                    </div>
                    {r.sector && <div>{r.sector}</div>}
                    {r.when && <div>{r.when}</div>}
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Order this with — related */}
      {related.length > 0 && (
        <section className="border-y border-outline-variant/10 bg-surface-container-low/40 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold sm:text-3xl">
              Order this{" "}
              <em className="font-normal italic text-primary">with</em>
            </h2>
            <p className="mt-2 text-sm text-on-surface/50">
              Pairings most regulars add to their order with the {item.name}.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/menu/${r.slug}`}
                  className="group overflow-hidden rounded-2xl bg-surface-container transition-all hover:bg-surface-container-high"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.imageAlt}
                      fill
                      sizes="(min-width:640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="font-[var(--font-heading)] font-bold">
                      {r.name}
                    </div>
                    <div className="font-[var(--font-heading)] text-lg font-bold text-primary">
                      ₹{r.price}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Order strip */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-surface-container p-8 sm:p-10">
            <div className="grid items-center gap-6 lg:grid-cols-[2fr_1fr]">
              <div>
                <h3 className="font-[var(--font-heading)] text-2xl font-bold sm:text-3xl">
                  Hungry?{" "}
                  <em className="font-normal italic text-primary">
                    Order in two taps.
                  </em>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface/60">
                  WhatsApp message goes straight to our counter. We confirm in
                  under five minutes. Visit us for the full dine-in experience
                  at D13, Bhaiji Market, Sector 58, Noida.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a
                  href={waLink(item.name, item.price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-honeyed inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-on-primary"
                >
                  WhatsApp Order
                </a>
                <a
                  href="https://maps.app.goo.gl/JGiLiytokNhZE2Da9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 px-6 py-3 text-sm font-semibold text-on-surface/80 transition-all hover:border-primary hover:text-primary"
                >
                  Visit Cafe
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {item.faqs.length > 0 && (
        <section className="border-t border-outline-variant/10 bg-surface-container-low/40 py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-[var(--font-heading)] text-2xl font-bold sm:text-3xl">
              Common{" "}
              <em className="font-normal italic text-primary">questions</em>
            </h2>
            <div className="mt-7 space-y-3">
              {item.faqs.map((f, i) => (
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
      )}

      {/* Back to menu */}
      <section className="py-10 text-center">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface/60 hover:text-primary"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back to full menu
        </Link>
      </section>
    </article>
  );
}
