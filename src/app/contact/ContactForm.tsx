"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center rounded-2xl bg-surface-container p-10">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
            <svg className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="mt-4 font-[var(--font-heading)] text-xl font-bold">
            Message Sent!
          </h3>
          <p className="mt-2 text-sm text-on-surface/60">
            Thanks for reaching out. We&apos;ll get back to you soon.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-surface-container p-6 sm:p-8"
    >
      <h3 className="font-[var(--font-heading)] text-xl font-bold">
        Send Us a Message
      </h3>
      <p className="mt-1 text-sm text-on-surface/50">
        We&apos;ll get back to you as soon as possible.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-on-surface/70">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/30 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-on-surface/70">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            required
            className="ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/30 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-on-surface/70">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/30 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-on-surface/70">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={4}
            className="ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/30 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
            placeholder="How can we help you?"
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn-honeyed mt-6 w-full rounded-full py-3 text-base font-semibold text-on-primary transition-all hover:scale-[1.02]"
      >
        Send Message
      </button>
    </form>
  );
}
