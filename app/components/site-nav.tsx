"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navigationLinks = [
  { href: "/stories", label: "Stories" },
  { href: "/travel-with-points", label: "Travel on points" },
  { href: "/journals", label: "Journal" },
];

export function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:py-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xl font-semibold tracking-wide transition-opacity hover:opacity-80"
            onClick={closeMenu}
          >
            Miles Go Round
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-white/15 p-2 text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={1.5} strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="hidden gap-8 text-sm uppercase tracking-[0.2em] md:flex">
          {navigationLinks.map((link) => (
            <Link key={link.label} className="transition-opacity hover:opacity-80" href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        {isMenuOpen ? (
          <div className="flex flex-col gap-3 border-t border-white/10 pt-3 text-xs uppercase tracking-[0.3em] text-white/90 md:hidden">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                className="rounded-md px-1 py-2 transition-colors hover:bg-white/10"
                href={link.href}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </nav>
  );
}
