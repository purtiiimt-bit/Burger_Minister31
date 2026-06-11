"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/catering", label: "Catering" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50 border-b border-outline-variant/10">
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
              {/* Cart Icon */}
              <Link href="/cart" className="relative p-2 text-on-surface/70 hover:text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121 0 2.09-.773 2.34-1.867l1.613-7.05a.75.75 0 00-.72-.975H5.625l-.383-1.437A1.125 1.125 0 004.136 2.25H2.25M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link
                href="/menu"
                className="btn-honeyed hidden rounded-full px-5 py-2 text-sm font-semibold text-on-primary transition-all hover:scale-105 sm:inline-block"
              >
                Order Now
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative z-50 inline-flex items-center justify-center rounded-lg p-2 text-on-surface/70 hover:text-on-surface md:hidden"
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
      </nav>

      {/* Mobile Menu — Full screen overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          />
          {/* Menu content */}
          <div className="relative flex h-full flex-col items-center justify-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-6 py-3 text-2xl font-semibold font-[var(--font-heading)] transition-colors ${
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
              className="btn-honeyed mt-6 rounded-full px-8 py-3 text-base font-semibold text-on-primary"
            >
              Order Now
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
