import Link from "next/link";

const navigationLinks = [
  { href: "/blogs", label: "Stories" },
  { href: "/travel-with-points", label: "Travel on points" },
  { href: "/journals", label: "Journal" },
  { href: "/#connect", label: "Connect" },
];

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 text-white backdrop-blur"> 
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <Link href="/" className="text-xl font-semibold tracking-wide transition-opacity hover:opacity-80">
          Away With Ana
        </Link>
        <div className="flex w-full flex-col items-start gap-4 text-sm uppercase tracking-[0.2em] md:w-auto md:flex-row md:items-center md:gap-8">
          {navigationLinks.map((link) => (
            <Link key={link.label} className="transition-opacity hover:opacity-80" href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
