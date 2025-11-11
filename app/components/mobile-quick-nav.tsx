"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
  sectionId: string;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  {
    href: "/#stories",
    label: "Stories",
    sectionId: "stories",
    icon: (
      <svg
        aria-hidden
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
        viewBox="0 0 24 24"
      >
        <path d="M4 19.5V5.75c0-.966.784-1.75 1.75-1.75h12.5" />
        <path d="M6.5 5.5h12.5V19a.5.5 0 0 1-.76.43l-2.98-1.79a1 1 0 0 0-1.04.02l-3.47 2.16a1 1 0 0 1-1.04.01L6.5 18.27" />
      </svg>
    ),
  },
  {
    href: "/#travel-with-points",
    label: "Points",
    sectionId: "travel-with-points",
    icon: (
      <svg
        aria-hidden
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
        viewBox="0 0 24 24"
      >
        <path d="M12 3.5v17" />
        <path d="M19.5 7.25a3.75 3.75 0 0 0-7.5 0v9.5a3.75 3.75 0 0 1-7.5 0" />
      </svg>
    ),
  },
  {
    href: "/#journal",
    label: "Journal",
    sectionId: "journal",
    icon: (
      <svg
        aria-hidden
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
        viewBox="0 0 24 24"
      >
        <path d="m5 5.5 5.25-.88a4 4 0 0 1 1.3 0L17.75 5.5a2 2 0 0 1 1.75 2v10a2 2 0 0 1-1.75 2l-6.2 1.03a4 4 0 0 1-1.3 0L5 19.5" />
        <path d="M9.5 4.7V20" />
      </svg>
    ),
  },
];

export function MobileQuickNav() {
  const pathname = usePathname();
  const [isElevated, setIsElevated] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsElevated(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.sectionId);
    const elements = sectionIds
      .map((id) => (typeof window !== "undefined" ? document.getElementById(id) : null))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1))[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-50% 0px -35%",
        threshold: [0.25, 0.5, 0.75],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const currentPath = pathname?.split("#")[0] ?? pathname;

  if (currentPath !== "/") {
    return null;
  }

  return (
    <nav
      aria-label="Quick section navigation"
      className="safe-area-bottom fixed inset-x-0 bottom-0 z-[60] block bg-gradient-to-t from-slate-900/95 via-slate-900/90 to-transparent pb-4 pt-3 md:hidden"
    >
      <div
        className={`mx-auto flex max-w-md items-stretch gap-2 rounded-full border border-white/10 bg-slate-900/90 px-2 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white shadow-2xl transition-shadow ${
          isElevated ? "shadow-slate-900/60" : "shadow-slate-900/40"
        }`}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.sectionId || (!activeSection && item.sectionId === navItems[0].sectionId);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex-1 rounded-full px-3 py-1.5 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 ${
                isActive ? "bg-white text-slate-900 shadow-inner" : "hover:bg-white/10"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="flex flex-col items-center gap-1">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white transition group-hover:border-white/40 ${
                    isActive ? "border-slate-200 text-slate-900" : ""
                  }`}
                >
                  {item.icon}
                </span>
                <span className="leading-none">{item.label}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

