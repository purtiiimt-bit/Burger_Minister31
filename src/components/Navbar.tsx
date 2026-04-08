"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/catering", label: "Catering" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-40 border-b border-outline-variant/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="font-[var(--font-heading)] text-lg font-bold text-on-primary">
                B
              </span>
            </div>
            <span className="font-[var(--font-heading)] text-lg font-bold tracking-tight text-on-surface">
              BURGER <span className="text-primary">MINISTER</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-on-surface/70 hover:text-on-surface"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/menu"
              className="btn-honeyed hidden rounded-full px-5 py-2 text-sm font-semibold text-on-primary transition-all hover:scale-105 sm:inline-block"
            >
              Order Now
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-on-surface/70 hover:text-on-surface md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-outline-variant/10 md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-2 text-base font-medium ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-on-surface/70 hover:text-on-surface"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/menu"
              onClick={() => setMobileOpen(false)}
              className="btn-honeyed mt-2 block rounded-full px-5 py-2 text-center text-sm font-semibold text-on-primary"
            >
              Order Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
