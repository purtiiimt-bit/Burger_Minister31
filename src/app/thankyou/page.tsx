import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center pt-16">
      <div className="mx-auto max-w-md px-4 text-center">
        {/* Success Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-secondary/10">
          <svg className="h-12 w-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <h1 className="mt-6 font-[var(--font-heading)] text-3xl font-bold">
          Thank You!
        </h1>
        <p className="mt-3 text-lg text-on-surface/60">
          Aapka order successfully place ho gaya hai.
        </p>
        <p className="mt-2 text-sm text-on-surface/50">
          Hum jaldi hi aapko call karenge order confirm karne ke liye.
          Koi bhi query ho toh call karein:{" "}
          <a href="tel:+919643100501" className="text-primary hover:underline">
            +91 9643100501
          </a>
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
