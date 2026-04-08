import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Find Burger Minister at Sector 58, Noida. Get directions, call us, or send a message. Open daily 4 PM – 10 PM.",
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-surface-container-low py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-[var(--font-heading)] text-4xl font-bold sm:text-5xl">
            Find <span className="text-primary">Us</span>
          </h1>
          <p className="mt-3 text-on-surface/60">
            Visit us or get in touch — we&apos;d love to hear from you!
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {/* Location */}
              <div className="rounded-2xl bg-surface-container p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[var(--font-heading)] text-lg font-bold">
                      Our Location
                    </h3>
                    <p className="mt-1 text-sm text-on-surface/60">
                      C-44, C Block, Sector 58, Noida, Uttar Pradesh 201301
                    </p>
                    <a
                      href="https://maps.google.com/?q=C-44,+C+Block,+Sector+58,+Noida"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-honeyed mt-3 inline-block rounded-full px-5 py-2 text-sm font-semibold text-on-primary"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="rounded-2xl bg-surface-container p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[var(--font-heading)] text-lg font-bold">
                      Opening Hours
                    </h3>
                    <p className="mt-1 text-sm text-on-surface/60">
                      Monday to Sunday:{" "}
                      <span className="font-medium text-secondary">
                        4:00 PM – 10:00 PM
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-secondary">Open all 7 days!</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="rounded-2xl bg-surface-container p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[var(--font-heading)] text-lg font-bold">
                      Call Us
                    </h3>
                    <a
                      href="tel:+919643100501"
                      className="mt-1 inline-block text-lg font-medium text-primary hover:underline"
                    >
                      +91 9643100501
                    </a>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="rounded-2xl bg-surface-container p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[var(--font-heading)] text-lg font-bold">
                      Follow Us
                    </h3>
                    <div className="mt-2 flex gap-3">
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg bg-surface-variant px-3 py-1.5 text-sm text-on-surface/70 transition-colors hover:text-primary"
                      >
                        Instagram
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg bg-surface-variant px-3 py-1.5 text-sm text-on-surface/70 transition-colors hover:text-primary"
                      >
                        Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-surface-container">
          <div className="flex h-72 items-center justify-center text-on-surface/20 sm:h-96">
            <div className="text-center">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
              <p className="mt-3 font-[var(--font-heading)] text-lg font-semibold">
                Sector 58, Noida
              </p>
              <p className="mt-1 text-sm">
                Near C Block Market
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
