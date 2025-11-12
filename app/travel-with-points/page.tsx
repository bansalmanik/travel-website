import type { Metadata } from "next";
import Link from "next/link";

const pageTitle = "Travel With Points | Miles Go Round";
const pageDescription =
  "Compare loyalty programs, bank transfer partners, and practical strategies to turn points into memorable trips.";
const siteUrl = "https://www.milesgoround.com";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/travel-with-points",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: `${siteUrl}/travel-with-points`,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const sections = [
  {
    title: "Points Conversion",
    description:
      "Compare transfer partners, check standard ratios, and note any timing quirks before you move your points.",
    href: "/pointsconversion",
    accent: "bg-violet-100 text-violet-900",
  },
  {
    title: "Credit Cards",
    description:
      "Earn transferable points, maximize category bonuses, and decide when a premium annual fee is worth it.",
    href: "/travel-with-points/credit-cards",
    accent: "bg-amber-100 text-amber-900",
  },
  {
    title: "Hotel Programs",
    description:
      "Unlock elite benefits, track milestone rewards, and understand when to redeem points versus paying cash.",
    href: "/travel-with-points/hotel-programs",
    accent: "bg-sky-100 text-sky-900",
  },
  {
    title: "Flight Programs",
    description:
      "Use partner awards, alliances, and transfer bonuses to sit up front without paying full fare.",
    href: "/travel-with-points/flight-programs",
    accent: "bg-emerald-100 text-emerald-900",
  },
  {
    title: "Bank Programs",
    description:
      "Tap into bank-specific travel portals and redemption tools to stretch every transferable point further.",
    href: "/travel-with-points/bank-programs",
    accent: "bg-rose-100 text-rose-900",
  },
];

const quickTips = [
  {
    title: "Set a goal",
    detail: "Decide on a dream trip before collecting points—strategy follows purpose.",
  },
  {
    title: "Diversify currencies",
    detail: "Balance transferable points and co-branded cards so you can pivot when award space disappears.",
  },
  {
    title: "Track expirations",
    detail: "Many programs reset with activity. A simple quarterly reminder protects your balance.",
  },
];

const shortcutLinks = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/journals", label: "Journal" },
];

export default function TravelWithPointsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-5 py-20 sm:px-6 lg:py-28">
        <header className="flex flex-col items-center gap-10 text-center">
          <div className="space-y-6">
            <span className="inline-flex items-center justify-center rounded-full border border-amber-400/30 bg-amber-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">
              Travel with Points
            </span>
            <h1 className="text-4xl font-semibold sm:text-5xl">Turn everyday spending into your next adventure</h1>
            <p className="mx-auto max-w-2xl text-base text-slate-200/80">
              A structured look at how travel rewards fit together. Compare airline and hotel programs, understand bank partnerships,
              pick the right cards, and use point-conversion paths to unlock real value on flights and stays.
            </p>
          </div>
          <nav aria-label="Navigate to other sections" className="w-full max-w-md">
            <ul className="grid grid-cols-3 gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200/80">
              {shortcutLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex h-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-3 py-2 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <section className="grid gap-8 rounded-3xl bg-slate-900/60 p-10 shadow-2xl backdrop-blur lg:grid-cols-3" role="list" aria-label="Points program categories">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
              role="listitem"
            >
              <div className="space-y-4">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${section.accent}`}
                >
                  {section.title}
                </span>
                <p className="text-sm leading-6 text-slate-100/80">{section.description}</p>
              </div>
              <span className="mt-6 inline-flex items-center text-sm font-semibold text-amber-300">
                Dive deeper
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
              </span>
            </Link>
          ))}
        </section>

        <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur lg:grid-cols-3" role="list" aria-label="Quick travel hacking tips">
          {quickTips.map((tip) => (
            <div key={tip.title} className="space-y-3" role="listitem">
              <h2 className="text-lg font-semibold text-white">{tip.title}</h2>
              <p className="text-sm leading-6 text-slate-100/80">{tip.detail}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
