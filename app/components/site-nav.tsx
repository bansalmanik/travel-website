"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationLinks = [
  {
    href: "/stories",
    label: "Stories",
    description: "Field-tested itineraries and heartfelt travelogues.",
  },
  {
    href: "/travel-with-points",
    label: "Points Hub",
    description: "Guides to convert, earn, and redeem loyalty rewards.",
  },
  {
    href: "/journals",
    label: "Journal",
    description: "Weekly dispatches, packing tips, and travel rituals.",
  },
];

export function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuId = "primary-navigation";

  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

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
      className="safe-area-top sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 text-white backdrop-blur supports-[backdrop-filter]:bg-slate-950/70"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight transition-opacity hover:opacity-80 sm:text-xl"
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
            {isMenuOpen ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
                <path d="M6 6l12 12M6 18 18 6" strokeWidth={1.5} strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={1.5} strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        <div className="hidden items-center gap-6 text-sm uppercase tracking-[0.18em] md:flex" id={menuId}>
          {navigationLinks.map((link) => (
            <Link
              key={link.label}
              className={`rounded-full px-3 py-2 transition hover:bg-white/10 ${
                isActive(link.href) ? "bg-white/10 text-white" : "text-white/80"
              }`}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex">
          <Link
            href="/stories"
            className="inline-flex items-center rounded-full bg-amber-300/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-900 transition hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-100"
          >
            Latest stories
          </Link>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="md:hidden" role="dialog" aria-modal aria-labelledby="mobile-menu-heading">
          <div
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden
          />
          <div className="safe-area-top fixed inset-x-4 top-4 z-50 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl">
            <div className="flex items-center justify-between px-4 pt-4">
              <span id="mobile-menu-heading" className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                Navigate
              </span>
              <button
                type="button"
                onClick={closeMenu}
                className="inline-flex items-center justify-center rounded-full border border-white/20 p-2 text-white transition hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span className="sr-only">Close menu</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
                  <path d="M6 6l12 12M6 18 18 6" strokeWidth={1.5} strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="mt-4 space-y-2 px-4 pb-5">
              {navigationLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-2xl bg-white/5 p-4 text-left transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
                    {link.label}
                  </span>
                  <p className="mt-2 text-sm text-slate-200/80">{link.description}</p>
                </Link>
              ))}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200/80">
                <p className="font-semibold text-white">New here?</p>
                <p className="mt-1">
                  Start with our latest stories for inspiration, then head to the points hub to plan your getaway.
                </p>
                <Link
                  href="/stories"
                  onClick={closeMenu}
                  className="mt-3 inline-flex items-center text-sm font-semibold text-amber-300"
                >
                  Explore stories
                  <svg
                    aria-hidden
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
