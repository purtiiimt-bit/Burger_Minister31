import type { Metadata } from "next";
import Link from "next/link";
import {
  extendedFaqs,
  FAQ_CATEGORIES,
  type FAQCategory,
} from "@/lib/faqsExtended";
import { BreadcrumbSchema } from "@/components/Schema";

const SITE_URL = "https://burger-minister.com";

export const metadata: Metadata = {
  title:
    "Frequently Asked Questions. Burger Minister Sector 58 Noida",
  description:
    "Answers about Burger Minister Sector 58 Noida. Hours, location at D13 Bhaiji Market, menu, prices, payment, catering, and offers. 100% pure veg dine-in.",
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "website",
    siteName: "Burger Minister",
    url: `${SITE_URL}/faq`,
    title: "FAQs. Burger Minister Sector 58 Noida",
    description:
      "Comprehensive FAQs about Burger Minister: hours, location, menu, prices, payment, catering, offers.",
    locale: "en_IN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1660715683691-d1614d1dd361?w=1200&h=630&q=80&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Burger Minister Sector 58 Noida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs. Burger Minister Sector 58 Noida",
    description:
      "Comprehensive FAQs about Burger Minister: hours, location, menu, prices, payment, catering, offers.",
    images: [
      "https://images.unsplash.com/photo-1660715683691-d1614d1dd361?w=1200&h=630&q=80&auto=format&fit=crop",
    ],
  },
};

function FAQSchemas() {
  // Full FAQPage with all entries
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/faq#all`,
    mainEntity: extendedFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Speakable section for voice / AI assistants
  const speakable = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/faq`,
    name: "FAQs. Burger Minister Sector 58 Noida",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".faq-answer"],
    },
    inLanguage: "en-IN",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#restaurant` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakable) }}
      />
    </>
  );
}

export default function FAQPage() {
  const grouped = (Object.keys(FAQ_CATEGORIES) as FAQCategory[]).map((cat) => ({
    key: cat,
    label: FAQ_CATEGORIES[cat].label,
    intro: FAQ_CATEGORIES[cat].intro,
    items: extendedFaqs.filter((f) => f.category === cat),
  }));

  return (
    <article className="pt-16">
      <FAQSchemas />
      <BreadcrumbSchema
        trail={[
          { name: "Home", url: "/" },
          { name: "FAQs", url: "/faq" },
        ]}
      />

      {/* Hero */}
      <section className="bg-surface-container-low/40 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            100% Pure Vegetarian, Sector 58 Noida
          </span>
          <h1 className="mt-5 font-[var(--font-heading)] text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Frequently Asked{" "}
            <em className="font-normal italic text-primary">Questions</em>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-on-surface/70">
            Everything you might ask before you walk in to Burger Minister at
            D13, Bhaiji Market, Sector 58, Noida. Organised by topic, written
            plainly, with prices and timings up to date.
          </p>

          {/* Quick links */}
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {grouped.map((g) => (
              <a
                key={g.key}
                href={`#${g.key}`}
                className="rounded-full bg-surface-container px-3.5 py-1.5 text-xs font-semibold text-on-surface/70 transition-colors hover:bg-primary hover:text-on-primary"
              >
                {g.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quick facts strip — AI-friendly factual snapshot */}
      <section className="border-y border-outline-variant/10 bg-surface-container py-8">
        <div className="mx-auto grid max-w-5xl gap-4 px-4 text-center sm:grid-cols-4 sm:px-6 lg:px-8">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-on-surface/40">
              Address
            </div>
            <div className="mt-1 text-sm font-semibold text-on-surface">
              D13, Bhaiji Market, Sector 58, Noida 201301
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-on-surface/40">
              Hours
            </div>
            <div className="mt-1 text-sm font-semibold text-on-surface">
              Daily 11 AM to 11 PM
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-on-surface/40">
              Phone
            </div>
            <div className="mt-1">
              <a
                href="tel:+919643100501"
                className="text-sm font-semibold text-primary hover:underline"
              >
                +91 9643100501
              </a>
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-on-surface/40">
              Diet
            </div>
            <div className="mt-1 text-sm font-semibold text-secondary">
              100% Pure Vegetarian
            </div>
          </div>
        </div>
      </section>

      {/* FAQ groups */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          {grouped.map((g) => (
            <div key={g.key} id={g.key} className="scroll-mt-24">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight sm:text-3xl">
                {g.label}
              </h2>
              <p className="mt-2 text-sm text-on-surface/50">{g.intro}</p>

              <div className="mt-5 space-y-3">
                {g.items.map((f, i) => (
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
                    <p className="faq-answer mt-3 text-sm leading-relaxed text-on-surface/80">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="border-t border-outline-variant/10 bg-surface-container-low/40 py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold sm:text-3xl">
            Still have a question?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-on-surface/70">
            Call the outlet at +91 9643100501 or walk in at D13, Bhaiji Market,
            Sector 58, Noida. We are open every day from 11 AM to 11 PM.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="tel:+919643100501"
              className="btn-honeyed inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-on-primary"
            >
              Call +91 9643100501
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 px-6 py-3 text-sm font-semibold text-on-surface/80 transition-all hover:border-primary hover:text-primary"
            >
              Contact Page
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 px-6 py-3 text-sm font-semibold text-on-surface/80 transition-all hover:border-primary hover:text-primary"
            >
              View Menu
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
