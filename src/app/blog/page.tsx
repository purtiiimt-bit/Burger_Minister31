import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blogContent";

const SITE_URL = "https://burger-minister.com";

export const metadata: Metadata = {
  title: "Blog. Food Guides from Sector 58, Noida",
  description:
    "Honest food guides from the Burger Minister kitchen in Sector 58, Noida. Where to eat, what to order, and how to spot a burger worth your money.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: "Burger Minister",
    title: "Burger Minister Blog. Food Guides from Sector 58, Noida",
    description:
      "Honest food guides from the Burger Minister kitchen in Sector 58, Noida.",
    locale: "en_IN",
  },
};

function BlogListSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    name: "Burger Minister Blog",
    description:
      "Food guides and honest eating advice from Burger Minister, Sector 58, Noida.",
    url: `${SITE_URL}/blog`,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${p.slug}#article`,
      headline: p.h1,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.datePublished,
      dateModified: p.dateModified,
      image: `${SITE_URL}${p.ogImage}`,
    })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="pt-16">
      <BlogListSchema />

      {/* Header */}
      <section className="bg-surface-container-low/40 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            From our kitchen in Sector 58
          </span>
          <h1 className="mt-5 font-[var(--font-heading)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            The Burger Minister{" "}
            <em className="font-normal italic text-primary">Blog</em>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-on-surface/70">
            Honest food guides from the people who run the fryer. Where to eat
            in Noida, what to order, and how to spot food worth your money.
          </p>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid items-stretch gap-0 overflow-hidden rounded-3xl bg-surface-container transition-all hover:bg-surface-container-high lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[20rem]">
                <Image
                  src={featured.hero.src}
                  alt={featured.hero.alt}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface/50">
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                    {featured.category}
                  </span>
                  <time dateTime={featured.datePublished}>
                    {new Date(featured.datePublished).toLocaleDateString(
                      "en-IN",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}
                  </time>
                  <span className="opacity-40">·</span>
                  <span>{featured.readMins} min read</span>
                </div>
                <h2 className="mt-4 font-[var(--font-heading)] text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  {featured.h1}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-on-surface/65 sm:text-base">
                  {featured.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  Read the guide
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Other posts */}
      {rest.length > 0 && (
        <section className="pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-surface-container transition-all hover:-translate-y-1 hover:bg-surface-container-high"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.hero.src}
                      alt={post.hero.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2.5 text-[11px] text-on-surface/50">
                      <span className="font-semibold uppercase tracking-wider text-primary/70">
                        {post.category}
                      </span>
                      <span className="opacity-40">·</span>
                      <span>{post.readMins} min read</span>
                    </div>
                    <h2 className="mt-2.5 font-[var(--font-heading)] text-lg font-bold leading-snug">
                      {post.h1}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-on-surface/60">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 text-xs font-semibold text-primary/70 group-hover:text-primary">
                      Read post →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Soft CTA strip */}
      <section className="border-t border-outline-variant/10 bg-surface-container-low/40 py-12 text-center">
        <p className="text-sm text-on-surface/55">
          Reading about food only gets you so far.
        </p>
        <Link
          href="/menu"
          className="btn-honeyed mt-4 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-on-primary transition-all hover:scale-105"
        >
          See the Full Menu
        </Link>
      </section>
    </div>
  );
}
