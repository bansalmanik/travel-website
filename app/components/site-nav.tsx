"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationLinks = [
  { href: "/stories", label: "Stories" },
  { href: "/travel-with-points", label: "Travel on points" },
  { href: "/journals", label: "Journal" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = "primary-navigation";

  const closeMenu = () => setIsMenuOpen(false);

  const activePath = useMemo(() => {
    if (!pathname) return undefined;
    return navigationLinks.find((link) => pathname.startsWith(link.href))?.href;
  }, [pathname]);

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
      className="safe-area-top sticky top-0 z-50 border-b border-slate-900/5 bg-slate-900/80 text-white backdrop-blur supports-[backdrop-filter]:bg-slate-900/70"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 md:px-6">
        <div className="flex flex-1 items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center text-lg font-semibold tracking-tight transition-opacity hover:opacity-80 md:text-xl"
            onClick={closeMenu}
          >
            Miles Go Round
          </Link>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-3 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-white/80">
            {navigationLinks.map((link) => {
              const isActive = activePath === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`inline-flex items-center rounded-full px-3 py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      isActive ? "bg-white/15 text-white" : "hover:bg-white/10 hover:text-white"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-white/15 p-2 text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
              <path d="m6 6 12 12M6 18 18 6" strokeWidth={1.5} strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={1.5} strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      <div className="md:hidden">
        <div
          id={menuId}
          className={`grid gap-2 px-5 pb-4 transition-[max-height,opacity] duration-200 ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <ul className="flex flex-col gap-1 text-sm font-semibold uppercase tracking-[0.16em] text-white/90">
            {navigationLinks.map((link) => {
              const isActive = activePath === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-slate-900/90 hover:border-white/20 hover:bg-white/10"
                    }`}
                    onClick={closeMenu}
                  >
                    <span>{link.label}</span>
                    <svg
                      aria-hidden
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="m9 5 7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
