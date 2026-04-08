"use client";

import { useState, type FormEvent } from "react";

export default function CateringForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-8 flex items-center justify-center rounded-2xl bg-surface-container p-10">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
            <svg className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="mt-4 font-[var(--font-heading)] text-xl font-bold">
            Inquiry Submitted!
          </h3>
          <p className="mt-2 text-sm text-on-surface/60">
            We&apos;ll review your request and get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            Submit another inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-2xl bg-surface-container p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cat-name" className="mb-1.5 block text-sm font-medium text-on-surface/70">
            Name
          </label>
          <input
            type="text"
            id="cat-name"
            required
            className="ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/30 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="cat-phone" className="mb-1.5 block text-sm font-medium text-on-surface/70">
            Phone
          </label>
          <input
            type="tel"
            id="cat-phone"
            required
            className="ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/30 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
        <div>
          <label htmlFor="cat-event" className="mb-1.5 block text-sm font-medium text-on-surface/70">
            Event Type
          </label>
          <select
            id="cat-event"
            required
            className="ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
          >
            <option value="">Select event type</option>
            <option value="corporate">Corporate Event</option>
            <option value="birthday">Birthday Party</option>
            <option value="wedding">Wedding / Reception</option>
            <option value="bulk">Bulk Order</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="cat-guests" className="mb-1.5 block text-sm font-medium text-on-surface/70">
            Expected Guests
          </label>
          <input
            type="number"
            id="cat-guests"
            min="10"
            required
            className="ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/30 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
            placeholder="e.g. 50"
          />
        </div>
        <div>
          <label htmlFor="cat-date" className="mb-1.5 block text-sm font-medium text-on-surface/70">
            Event Date
          </label>
          <input
            type="date"
            id="cat-date"
            required
            className="ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cat-message" className="mb-1.5 block text-sm font-medium text-on-surface/70">
            Additional Details
          </label>
          <textarea
            id="cat-message"
            rows={3}
            className="ghost-border w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface/30 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
            placeholder="Any specific requirements or questions?"
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn-honeyed mt-6 w-full rounded-full py-3 text-base font-semibold text-on-primary transition-all hover:scale-[1.02]"
      >
        Submit Inquiry
      </button>
    </form>
  );
}
