import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getBlogPost,
  getAllBlogSlugs,
  blogPosts,
  type BlogPost,
  type BlogBlock,
} from "@/lib/blogContent";

const SITE_URL = "https://burger-minister.com";

type RouteParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post not found" };
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      siteName: "Burger Minister",
      title: post.title,
      description: post.metaDescription,
      locale: "en_IN",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      images: [
        {
          url: `${SITE_URL}${post.ogImage}`,
          width: 1200,
          height: 630,
          alt: post.hero.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [`${SITE_URL}${post.ogImage}`],
    },
  };
}

// ─── JSON-LD: BlogPosting + FAQPage + Breadcrumb (AI-citation ready) ─────
function Schemas({ post }: { post: BlogPost }) {
  const url = `${SITE_URL}/blog/${post.slug}`;

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.h1,
    description: post.metaDescription,
    image: [`${SITE_URL}${post.ogImage}`, `${SITE_URL}${post.hero.src}`],
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Burger Minister",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Burger Minister",
      url: SITE_URL,
    },
    about: {
      "@type": "FoodEstablishment",
      "@id": `${SITE_URL}/#restaurant`,
      name: "Burger Minister",
    },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".answer-first", ".key-takeaways"],
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
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
      { "@type": "ListItem", position: 3, name: post.h1, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}

// ─── Block renderer ──────────────────────────────────────────────────────
function Block({ block, isFirst }: { block: BlogBlock; isFirst: boolean }) {
  switch (block.type) {
    case "p":
      return (
        <p
          className={`mt-5 text-base leading-relaxed text-on-surface/75 [&_a]:font-semibold [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline ${
            isFirst ? "answer-first text-lg text-on-surface/85" : ""
          }`}
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "h2":
      return (
        <h2
          id={block.id}
          className="mt-12 scroll-mt-24 font-[var(--font-heading)] text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-8 font-[var(--font-heading)] text-lg font-bold sm:text-xl">
          {block.text}
        </h3>
      );
    case "image":
      return (
        <figure className="mt-8">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={block.src}
              alt={block.alt}
              width={block.width}
              height={block.height}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-center text-xs text-on-surface/45">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "ul":
      return (
        <ul className="mt-5 space-y-2 text-base leading-relaxed text-on-surface/75">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
              {item}
            </li>
          ))}
        </ul>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: RouteParams;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const toc = post.blocks.filter(
    (b): b is Extract<BlogBlock, { type: "h2" }> => b.type === "h2"
  );
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const dateLabel = new Date(post.datePublished).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="pt-16">
      <Schemas post={post} />

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
            <Link href="/blog" className="hover:text-primary">
              Blog
            </Link>
          </li>
          <li className="opacity-40">/</li>
          <li className="font-semibold text-on-surface/70">{post.category}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="bg-surface-container-low/40 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface/50">
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1.5 font-semibold tracking-wide text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              {post.category}
            </span>
            <time dateTime={post.datePublished}>{dateLabel}</time>
            <span className="opacity-40">·</span>
            <span>{post.readMins} min read</span>
          </div>
          <h1 className="mt-5 font-[var(--font-heading)] text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {post.h1}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-on-surface/60">
            {post.metaDescription}
          </p>
        </div>
      </header>

      {/* Hero image */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-2 overflow-hidden rounded-2xl ambient-shadow">
          <Image
            src={post.hero.src}
            alt={post.hero.alt}
            width={post.hero.width}
            height={post.hero.height}
            priority
            className="h-auto w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Key takeaways — extractable summary for readers + AI engines */}
        <aside className="key-takeaways rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
            Key takeaways
          </div>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-on-surface/80">
            {post.takeaways.map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {t}
              </li>
            ))}
          </ul>
        </aside>

        {/* Table of contents */}
        {toc.length >= 3 && (
          <nav
            aria-label="Table of contents"
            className="mt-6 rounded-2xl bg-surface-container p-5"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface/40">
              In this guide
            </div>
            <ol className="mt-3 space-y-1.5 text-sm">
              {toc.map((h, i) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className="text-on-surface/65 transition-colors hover:text-primary"
                  >
                    <span className="mr-2 font-[var(--font-heading)] font-bold text-primary/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {post.blocks.map((block, i) => (
          <Block key={i} block={block} isFirst={i === 0} />
        ))}

        {/* FAQs */}
        <section className="mt-14">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold sm:text-3xl">
            Frequently asked{" "}
            <em className="font-normal italic text-primary">questions</em>
          </h2>
          <div className="mt-6 space-y-3">
            {post.faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-surface-container p-5 transition-all hover:bg-surface-container-high"
              >
                <summary className="cursor-pointer list-none font-[var(--font-heading)] text-base font-bold">
                  <span className="mr-2 inline-block text-primary transition-transform group-open:rotate-45">
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
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-2xl border border-outline-variant/10 bg-surface-container p-7 text-center sm:p-9">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold">
            Hungry <em className="font-normal italic text-primary">already?</em>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-on-surface/65">
            D13, Bhaiji Market, Sector 58, Noida. Open daily 11 AM to 11 PM.
            100% pure vegetarian, made fresh to order.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/menu"
              className="btn-honeyed inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-on-primary transition-all hover:scale-105"
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
        </section>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="font-[var(--font-heading)] text-xl font-bold">
              More from the{" "}
              <em className="font-normal italic text-primary">blog</em>
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl bg-surface-container p-5 transition-all hover:-translate-y-1 hover:bg-surface-container-high"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-primary/70">
                    {p.category}
                  </div>
                  <div className="mt-2 font-[var(--font-heading)] text-base font-bold leading-snug">
                    {p.h1}
                  </div>
                  <span className="mt-3 inline-block text-xs font-semibold text-primary/70 group-hover:text-primary">
                    Read post →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
