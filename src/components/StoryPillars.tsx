import SectionEyebrow from "./SectionEyebrow";

const pillars = [
  {
    num: "01",
    title: "The Pledge",
    body:
      "100% pure vegetarian, always. No eggs, no compromises. FSSAI compliant, hygiene-first kitchen. Sealed for safety.",
  },
  {
    num: "02",
    title: "The Kitchen",
    body:
      "Buns toasted to order. Patties hand-shaped each morning. Momos folded fresh. Shakes blended with full-cream milk. Nothing is pre-cooked in advance.",
  },
  {
    num: "03",
    title: "The Promise",
    body:
      "Pocket-friendly prices, generous portions, and a warm welcome at the counter. Dine-in service across Sector 58, 59, 62 and 63, every single day from 11 AM to 11 PM.",
  },
];

export default function StoryPillars() {
  return (
    <section className="py-20" id="story">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left — Story copy */}
          <div>
            <SectionEyebrow>Our Story</SectionEyebrow>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[3rem]">
              From a small kitchen
              <br />
              to a{" "}
              <em className="font-normal italic text-primary">
                neighbourhood ritual
              </em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-on-surface/60">
              Burger Minister was born in Sector 58 with one simple promise. Make
              honest, hand-crafted vegetarian food that tastes like home but excites
              like the street. No frozen patties. No shortcuts. Just fresh ingredients,
              prepped daily, cooked the moment you order.
            </p>
            <blockquote className="mt-8 border-l-2 border-primary/40 pl-5 text-base italic leading-relaxed text-on-surface/70">
              &ldquo;The owner is very nice, food is great too. Must try
              everything.&rdquo;
              <footer className="mt-3 text-sm not-italic text-on-surface/40">
                Sarwagy Singh Virat. Local Guide.
              </footer>
            </blockquote>
          </div>

          {/* Right — Pillars stack */}
          <div className="flex flex-col gap-4">
            {pillars.map((p) => (
              <div
                key={p.num}
                className="flex gap-5 rounded-2xl border border-outline-variant/10 bg-surface-container p-6 transition-all hover:border-primary/30 hover:bg-surface-container-high"
              >
                <div className="font-[var(--font-heading)] text-3xl font-bold text-primary/40">
                  {p.num}
                </div>
                <div>
                  <h4 className="font-[var(--font-heading)] text-lg font-bold">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface/60">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
