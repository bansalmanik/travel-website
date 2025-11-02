import Link from "next/link";

const navigationLinks = [
  { href: "/stories", label: "Stories" },
  { href: "/travel-with-points", label: "Travel on points" },
  { href: "/journals", label: "Journal" },
];

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 text-white backdrop-blur"> 
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <Link href="/" className="text-xl font-semibold tracking-wide transition-opacity hover:opacity-80">
          Miles Go Round
        </Link>
        <div className="hidden gap-8 text-sm uppercase tracking-[0.2em] md:flex">
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
