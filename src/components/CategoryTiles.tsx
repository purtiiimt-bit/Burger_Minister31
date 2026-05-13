import Link from "next/link";
import SectionEyebrow from "./SectionEyebrow";

const categories = [
  {
    num: "N°01",
    name: "Burgers",
    meta: "From ₹59",
    href: "/menu#Burgers",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14c0-5 5.4-8 12-8s12 3 12 8H4z" />
        <path d="M5 18h22M5 22h22" />
        <path d="M4 22c0 3 2 5 6 5h12c4 0 6-2 6-5" />
      </svg>
    ),
  },
  {
    num: "N°02",
    name: "Sandwiches",
    meta: "Crisp and gooey",
    href: "/menu#Sandwiches",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 10l11-5 11 5v3H5z" />
        <path d="M5 16h22M5 19h22M5 22h22M5 25h22" />
      </svg>
    ),
  },
  {
    num: "N°03",
    name: "Pizza",
    meta: "8 inch, fresh",
    href: "/menu#Pizza",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4l12 22H4z" />
        <circle cx="13" cy="18" r="1.5" fill="currentColor" />
        <circle cx="19" cy="20" r="1.5" fill="currentColor" />
        <circle cx="16" cy="13" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: "N°04",
    name: "Momos",
    meta: "13+ types",
    href: "/menu#Momos",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 6c-5 0-9 3-9 9 0 6 4 9 9 9s9-3 9-9c0-6-4-9-9-9z" />
        <path d="M16 8v14M11 9.5l1.5 12M21 9.5l-1.5 12M9 13l14 4M9 17l14-2" />
      </svg>
    ),
  },
  {
    num: "N°05",
    name: "Fries",
    meta: "BM Special",
    href: "/menu#Fries",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 26h14l-1.5-12H10.5z" />
        <path d="M11 14l1-8M16 14V5M21 14l-1-8" />
      </svg>
    ),
  },
  {
    num: "N°06",
    name: "Snacks",
    meta: "Quick bites",
    href: "/menu#Snacks",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="10" />
        <circle cx="12" cy="14" r="1" fill="currentColor" />
        <circle cx="20" cy="14" r="1" fill="currentColor" />
        <circle cx="14" cy="20" r="1" fill="currentColor" />
        <circle cx="18" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: "N°07",
    name: "Royal Combos",
    meta: "Save up to ₹68",
    href: "/menu#Royal%20Combos",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 7l4 4-4 4 4 4-4 4M26 7l-4 4 4 4-4 4 4 4" />
        <rect x="10" y="11" width="12" height="10" rx="1" />
      </svg>
    ),
  },
  {
    num: "N°08",
    name: "Beverages",
    meta: "Coffee, Shakes, Coolers",
    href: "/menu#Cold%20Coffee",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 8h16l-2 18H10z" />
        <path d="M9 13h14M16 4v4" />
      </svg>
    ),
  },
];

export default function CategoryTiles() {
  return (
    <section
      className="border-y border-outline-variant/10 bg-surface-container-low py-20"
      id="categories"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <SectionEyebrow>Browse By Category</SectionEyebrow>
          <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-bold tracking-tight sm:text-4xl">
            Eight <em className="font-normal italic text-primary">delicious</em> chapters
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-surface-container-high"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {c.icon}
              </div>
              <div className="font-[var(--font-heading)] text-[11px] font-semibold tracking-[0.18em] text-on-surface/40">
                {c.num}
              </div>
              <div className="font-[var(--font-heading)] text-xl font-bold leading-tight">
                {c.name}
              </div>
              <div className="text-xs text-on-surface/50">{c.meta}</div>
              <svg
                className="absolute right-5 top-5 h-4 w-4 text-on-surface/30 transition-all group-hover:translate-x-1 group-hover:text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
