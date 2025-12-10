"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navigationLinks = [
  { href: "/travel-with-points", label: "Travel with points" },
  { href: "/travel-resources", label: "Travel Resources" },
  { href: "/stories", label: "Stories" },
];

export function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = "primary-navigation";
  const pathname = usePathname();

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
      className="safe-area-top sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 text-slate-900 backdrop-blur supports-[backdrop-filter]:bg-white/90"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-3 pt-3 md:flex-row md:items-center md:justify-between md:px-6 md:pb-4 md:pt-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-lg font-semibold tracking-tight transition-colors hover:text-slate-600 md:text-xl"
            onClick={closeMenu}
          >
            <Image
              src="/Logo/MilesGoRound-Logo-Blue.png"
              alt="Miles Go Round logo"
              width={1024}
              height={1024}
              className="h-12 w-12 rounded-full object-contain shadow-sm"
              priority
            />
            <span>Miles Go Round</span>
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800 md:hidden"
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

        <div className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-[0.18em] md:flex">
          {navigationLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                className={`rounded-full px-3 py-2 transition-colors ${
                  isActive ? "bg-slate-900 text-white" : "hover:bg-slate-100"
                }`}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {isMenuOpen ? (
          <div
            id={menuId}
            className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white/95 p-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-800 shadow-lg md:hidden"
          >
            {navigationLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  className={`rounded-lg px-3 py-2 text-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
                    isActive ? "bg-slate-900 text-white" : "hover:bg-slate-100"
                  }`}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    </nav>
  );
}
