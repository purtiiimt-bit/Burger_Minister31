import Link from "next/link";

const featuredItems = [
  {
    name: "The Minister Special",
    price: "₹129",
    description: "Our signature loaded burger with special minister sauce",
    tag: "Bestseller",
  },
  {
    name: "Classic Cheese Burger",
    price: "₹69",
    description: "Melted cheese, crispy patty, fresh veggies",
    tag: "Popular",
  },
  {
    name: "Paneer Royale",
    price: "₹89",
    description: "Premium paneer patty with tandoori seasoning",
    tag: "Chef's Pick",
  },
];

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
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface-container to-tertiary-container/20" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
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

          {/* Floating decorative element */}
          <div className="absolute -right-10 top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="animate-float h-80 w-80 rounded-full bg-gradient-to-br from-primary/20 to-tertiary-container/30 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="bg-surface-container-low py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-[var(--font-heading)] text-3xl font-bold sm:text-4xl">
              Our <span className="text-primary">Signature</span> Burgers
            </h2>
            <p className="mt-3 text-on-surface/60">
              Handcrafted with premium ingredients, every single day.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredItems.map((item, i) => (
              <div
                key={item.name}
                className={`ambient-shadow group relative overflow-hidden rounded-2xl bg-surface-container p-6 transition-all hover:bg-surface-container-high ${
                  i === 1 ? "sm:-translate-y-4" : ""
                }`}
              >
                {/* Image placeholder */}
                <div className="relative mb-4 h-48 overflow-hidden rounded-xl bg-surface-variant">
                  <div className="flex h-full items-center justify-center">
                    <svg className="h-16 w-16 text-on-surface/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m18-12.75H3" />
                    </svg>
                  </div>
                  <span className="absolute left-3 top-3 rounded-full bg-tertiary-container px-3 py-1 text-xs font-semibold text-tertiary">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-[var(--font-heading)] text-xl font-bold">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-on-surface/50">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-[var(--font-heading)] text-2xl font-bold text-primary">
                    {item.price}
                  </span>
                  <button className="rounded-xl bg-surface-variant px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-on-primary">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              View Full Menu
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

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
      <section className="mx-4 overflow-hidden rounded-3xl bg-gradient-to-r from-surface-container via-tertiary-container to-surface-container sm:mx-6 lg:mx-auto lg:max-w-7xl">
        <div className="px-8 py-14 text-center sm:px-16">
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
                    <a href="tel:+919643100501" className="text-on-surface/70 hover:text-primary">
                      +91 9643100501
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-on-surface/70">
                      Daily 4:00 PM – 10:00 PM
                      <span className="ml-2 text-sm text-secondary">(Open all 7 days)</span>
                    </p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="btn-honeyed mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-on-primary transition-all hover:scale-105"
                >
                  Get Directions
                </Link>
              </div>
              {/* Map placeholder */}
              <div className="h-64 overflow-hidden rounded-xl bg-surface-variant lg:h-80">
                <div className="flex h-full items-center justify-center text-on-surface/20">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>
                    <p className="mt-2 text-sm">Sector 58, Noida</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
