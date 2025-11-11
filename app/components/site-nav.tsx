"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationLinks = [
  { href: "/stories", label: "Stories" },
  { href: "/travel-with-points", label: "Travel on points" },
  { href: "/journals", label: "Journal" },
];

export function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = "primary-navigation";
  const pathname = usePathname();
  const normalizedPath = pathname?.split("#")[0];

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.removeProperty("overflow");
    };
  }, [isMenuOpen]);

  return (
    <nav
      aria-label="Primary navigation"
      className="safe-area-top sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 text-white backdrop-blur supports-[backdrop-filter]:bg-slate-900/70"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 pb-4 pt-3 md:flex-row md:items-center md:justify-between md:px-6 md:pb-6 md:pt-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight transition-opacity hover:opacity-80 md:text-xl"
            onClick={closeMenu}
          >
            Miles Go Round
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/15 p-2 text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
                <path d="M6 6l12 12M18 6 6 18" strokeWidth={1.75} strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={1.5} strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        <div className="hidden gap-8 text-sm uppercase tracking-[0.18em] md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.label}
              className={`relative pb-1 transition-opacity hover:opacity-80 ${normalizedPath === link.href ? "opacity-100" : "opacity-70"}`}
              href={link.href}
              aria-current={normalizedPath === link.href ? "page" : undefined}
            >
              {link.label}
              {normalizedPath === link.href ? (
                <span className="pointer-events-none absolute inset-x-0 -bottom-2 h-1 rounded-full bg-amber-300" aria-hidden />
              ) : null}
            </Link>
          ))}
        </div>

        {isMenuOpen ? (
          <div
            id={menuId}
            className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-900/95 p-4 text-sm uppercase tracking-[0.12em] text-white/90 shadow-lg md:hidden"
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                className={`rounded-lg px-3 py-2 text-center font-semibold transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  normalizedPath === link.href ? "bg-white/10 text-white" : "text-white/90"
                }`}
                href={link.href}
                onClick={closeMenu}
                aria-current={normalizedPath === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}

        {isMenuOpen ? (
          <button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={closeMenu}
          />
        ) : null}
      </div>
    </nav>
  );
}
