const reviews = [
  {
    name: "Shorya Sagar",
    meta: "2 reviews · a month ago",
    rating: 5,
    quote:
      "I recently visited Burger Minister in Noida and I lovee his burgers and momos. His kurkure momo was soo delicious and yummy, and the service was so good. Bhaiya is very polite. Definitely coming back!",
    initial: "S",
    color: "bg-rose-600",
  },
  {
    name: "Madhukar Yadav",
    meta: "Local review · 3 months ago",
    rating: 5,
    quote:
      "If you're a snack lover, this place is an absolute gem! The peri peri fries are perfectly crispy with the right amount of spice. Veg momos are a total delight — soft, juicy, and packed with flavor. Highly recommended!",
    initial: "M",
    color: "bg-amber-600",
  },
  {
    name: "Abhishek Choudhary",
    meta: "Local Guide · 30 reviews",
    rating: 5,
    quote:
      "Food was delightful. I tried fried Momos and the chocolate shake. Do try their authentic burger. The portion and prices are also great. The guy was really polite and friendly. Undoubtedly I am returning back.",
    initial: "A",
    color: "bg-blue-600",
  },
  {
    name: "Sarwagy Singh Virat",
    meta: "Local Guide · 39 reviews",
    rating: 5,
    quote:
      "Bhaiya bohot ache hai, khaana bhi acha hai, must try everything. All night delivery available.",
    initial: "S",
    color: "bg-green-600",
  },
  {
    name: "Kartik",
    meta: "3 months ago",
    rating: 5,
    quote:
      "Such a tasty burger with perfectly crispy fries and kurkure momo. Loved every bite. Must try — also pocket friendly!",
    initial: "K",
    color: "bg-teal-600",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${i < count ? "text-amber-400" : "text-on-surface/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-surface-container-low/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5">
            <Stars count={5} />
            <span className="text-sm font-semibold text-amber-400">
              4.8 / 5 on Google Reviews
            </span>
          </div>
          <h2 className="font-[var(--font-heading)] text-3xl font-bold sm:text-4xl">
            What Our <span className="text-primary">Customers</span> Say
          </h2>
          <p className="mt-3 text-on-surface/60">
            Real reviews from real Burger Minister lovers
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="flex flex-col rounded-2xl bg-surface-container p-6 transition-all hover:bg-surface-container-high"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold text-white ${r.color}`}
                >
                  {r.initial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-on-surface">
                    {r.name}
                  </p>
                  <p className="truncate text-xs text-on-surface/50">{r.meta}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="mt-3">
                <Stars count={r.rating} />
              </div>

              {/* Quote */}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-on-surface/70">
                &ldquo;{r.quote}&rdquo;
              </p>

              {/* Google Badge */}
              <div className="mt-4 flex items-center gap-2 border-t border-outline-variant/10 pt-3">
                <svg className="h-4 w-4" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                  <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                  <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                </svg>
                <span className="text-xs text-on-surface/40">
                  Verified Google Review
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to see all */}
        <div className="mt-10 text-center">
          <a
            href="https://maps.app.goo.gl/JGiLiytokNhZE2Da9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Read all reviews on Google
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
