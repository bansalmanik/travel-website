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
  const pathname = usePathname();
  const menuId = "primary-navigation";

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
      aria-label="Primary"
      className="safe-area-top sticky top-0 z-50 border-b border-white/15 bg-slate-950/80 text-white backdrop-blur supports-[backdrop-filter]:bg-slate-950/70"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 pb-3 pt-3 sm:px-5 md:flex-row md:items-center md:justify-between md:pb-4 md:pt-4">
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
            className="inline-flex items-center justify-center rounded-md border border-white/15 p-2 text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={1.5} strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <ul className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.18em] md:flex">
          {navigationLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.label}>
                <Link
                  className={`inline-flex items-center rounded-full px-3 py-2 transition ${
                    isActive ? "bg-white/15 text-white" : "hover:bg-white/10 hover:text-white/90"
                  }`}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {isMenuOpen ? (
          <>
            <div className="fixed inset-0 z-40 bg-black/50 md:hidden" aria-hidden onClick={closeMenu} />
            <div
              id={menuId}
              className="relative z-50 flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/95 p-4 text-sm uppercase tracking-[0.14em] text-white/90 shadow-xl md:hidden"
            >
              {navigationLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.label}
                    className={`rounded-lg px-3 py-2 text-center font-semibold transition ${
                      isActive ? "bg-white/15 text-white" : "hover:bg-white/10"
                    }`}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    </nav>
  );
}
