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
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const menuId = "primary-navigation";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
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

  const navBackground = hasScrolled
    ? "bg-slate-900/95 shadow-lg shadow-slate-900/20"
    : "bg-slate-900/80";

  const renderLink = (href: string, label: string) => {
    const isActive =
      pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

    const baseClasses =
      "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors md:text-sm";
    const desktopStates = isActive
      ? "bg-white/10 text-white"
      : "text-slate-200 hover:text-white hover:bg-white/10";

    return (
      <Link
        key={label}
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={`${baseClasses} ${desktopStates}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      {isMenuOpen ? (
        <div
          aria-hidden
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      ) : null}
      <nav
        aria-label="Primary navigation"
        className={`safe-area-top sticky top-0 z-50 border-b border-white/10 text-white transition ${navBackground}`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5">
          <div className="flex flex-1 items-center gap-3">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight transition-opacity hover:opacity-80 md:text-xl"
              onClick={() => setIsMenuOpen(false)}
            >
              Miles Go Round
            </Link>
            <span className="hidden text-sm text-slate-300 md:inline">
              Travel stories & points strategies
            </span>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {navigationLinks.map((link) => renderLink(link.href, link.label))}
            <Link
              href="/travel-with-points"
              className="rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 transition hover:bg-amber-300 md:text-sm"
            >
              Start planning
            </Link>
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
                <path d="M6 6l12 12M6 18 18 6" strokeWidth={1.5} strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={1.5} strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {isMenuOpen ? (
          <div className="md:hidden" role="dialog" aria-modal="true">
            <div className="mx-auto max-w-6xl px-5 pb-6">
              <div
                id={menuId}
                className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/95 p-6 text-sm text-white/90 shadow-xl"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Navigate
                </p>
                <div className="flex flex-col gap-2">
                  {navigationLinks.map((link) => {
                    const isActive =
                      pathname === link.href || pathname.startsWith(`${link.href}/`);
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`rounded-xl px-4 py-3 text-base font-semibold uppercase tracking-[0.18em] transition-colors ${
                          isActive
                            ? "bg-white/15 text-white"
                            : "bg-white/5 text-slate-200 hover:bg-white/10"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href="mailto:hello@milesgoround.com"
                  className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-4 py-3 text-base font-semibold uppercase tracking-[0.18em] text-slate-900 transition hover:bg-amber-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Say hello
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </nav>
    </>
  );
}
