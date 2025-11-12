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

  const renderLink = (href: string, label: string) => {
    const isActive = pathname === href || pathname?.startsWith(`${href}/`);

    return (
      <Link
        key={label}
        className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 md:px-0 md:py-0 md:text-sm ${
          isActive
            ? "text-amber-300 md:text-white"
            : "text-white/80 hover:text-white"
        }`}
        href={href}
        onClick={closeMenu}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav
      aria-label="Primary navigation"
      className="safe-area-top sticky top-0 z-50 border-b border-slate-900/10 bg-slate-900/85 text-white shadow-lg shadow-slate-900/5 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 pb-4 pt-3 md:flex-row md:items-center md:justify-between md:px-6 md:pb-5 md:pt-5">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Miles Go Round home"
            className="flex items-center gap-2 text-lg font-semibold tracking-tight transition hover:opacity-80 md:text-xl"
            onClick={closeMenu}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/90 font-semibold text-slate-900 shadow-sm shadow-amber-300/60">
              MG
            </span>
            <span className="sr-only md:not-sr-only md:inline">Miles Go Round</span>
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/20 p-2 text-white transition hover:border-white/35 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
              {isMenuOpen ? (
                <path d="M6 6l12 12M6 18 18 6" strokeWidth={1.5} strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeWidth={1.5} strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => renderLink(link.href, link.label))}
        </div>

        {isMenuOpen ? (
          <div
            id={menuId}
            className="rounded-3xl border border-white/10 bg-slate-900/95 p-5 text-white shadow-2xl md:hidden"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
              Navigate the journey
            </p>
            <div className="flex flex-col gap-2">
              {navigationLinks.map((link) => (
                <div key={link.label} className="flex flex-col rounded-2xl bg-white/5 p-3">
                  {renderLink(link.href, link.label)}
                  <span className="mt-1 text-[0.7rem] uppercase tracking-[0.28em] text-white/50">
                    {link.label === "Stories"
                      ? "Field notes & long reads"
                      : link.label === "Travel on points"
                        ? "Guides & program breakdowns"
                        : "Daily reflections & playlists"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
