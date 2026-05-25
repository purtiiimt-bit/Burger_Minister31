// Display-name → URL slug conversion.
// Used to derive /menu/[slug] from the displayName stored in menuData.

const SLUG_OVERRIDES: Record<string, string> = {
  // Puff card in menuData = "BM Puff (3 pcs)" but detail page slug stays "veg-puff" for SEO continuity
  "BM Puff": "veg-puff",
  "Mc Puff": "veg-puff", // legacy alias
};

export function nameToSlug(name: string): string {
  // Strip trailing "(3 pcs)" type qualifiers first, check override
  const stripped = name.replace(/\s*\([^)]*\)/g, "").trim();
  if (SLUG_OVERRIDES[stripped]) return SLUG_OVERRIDES[stripped];
  return stripped
    .toLowerCase()
    .replace(/^the\s+/i, "")
    .replace(/'s\b/g, "s")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
