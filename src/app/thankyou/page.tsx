import Link from "next/link";

type Search = Promise<{ orderNumber?: string }>;

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const { orderNumber } = await searchParams;
  const cleanNumber = orderNumber?.replace(/^#/, "");

  return (
    <div className="flex min-h-[80vh] items-center justify-center pt-16">
      <div className="mx-auto max-w-md px-4 text-center">
        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10">
          <svg
            className="h-10 w-10 text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <h1 className="mt-5 font-[var(--font-heading)] text-2xl font-bold">
          Order Placed!
        </h1>

        {cleanNumber && (
          <div className="mt-6 rounded-3xl border border-primary/20 bg-primary/5 px-6 py-8">
            <p className="text-xs uppercase tracking-[0.2em] text-on-surface/50">
              Your Order Number
            </p>
            <div className="mt-2 font-[var(--font-heading)] text-7xl font-bold leading-none tracking-tight text-primary sm:text-8xl">
              #{cleanNumber}
            </div>
            <p className="mt-4 text-sm text-on-surface/70">
              Show this number at the counter to collect your order.
            </p>
          </div>
        )}

        <p className="mt-6 text-sm text-on-surface/50">
          We will call you shortly to confirm your order. For any questions
          please call us at{" "}
          <a href="tel:+919643100501" className="text-primary hover:underline">
            +91 9643100501
          </a>
          .
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/menu"
            className="btn-honeyed rounded-full px-8 py-3 text-base font-semibold text-on-primary"
          >
            Order More
          </Link>
          <Link
            href="/"
            className="rounded-full border border-outline-variant/30 px-8 py-3 text-base font-semibold text-on-surface hover:border-primary hover:text-primary"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
