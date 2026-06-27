import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/menuContent";
import { getAllLocationSlugs } from "@/lib/locationContent";
import { blogPosts } from "@/lib/blogContent";

const SITE_URL = "https://burger-minister.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date("2026-06-22"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/menu`,
      lastModified: new Date("2026-06-20"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: new Date("2026-06-15"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date("2026-06-22"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/catering`,
      lastModified: new Date("2026-05-10"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date("2026-04-01"),
      changeFrequency: "monthly",
      priority: 0.65,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const itemPages: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${SITE_URL}/menu/${slug}`,
    lastModified: new Date("2026-06-01"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const locationPages: MetadataRoute.Sitemap = getAllLocationSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/near/${slug}`,
      lastModified: new Date("2026-05-15"),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })
  );

  return [...corePages, ...blogPages, ...itemPages, ...locationPages];
}
