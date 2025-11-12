import Link from "next/link";

import { JsonLd } from "../components/json-ld";
import { SectionHeader } from "../components/section-header";

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

export default function TravelWithPointsPage() {
  const baseUrl = "https://example.com";
  const pageUrl = `${baseUrl}/travel-with-points`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Travel with Points Hub",
    description:
      "Compare airline, hotel, and bank loyalty programs to turn everyday spending into extraordinary travel experiences.",
    url: pageUrl,
    about: "Travel rewards strategies and guides",
    hasPart: sections.map((section) => ({
      "@type": "WebPage",
      name: section.title,
      url: `${baseUrl}${section.href}`,
      description: section.description,
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <JsonLd data={structuredData} />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-5 py-16 sm:px-6 sm:py-24">
        <header className="space-y-6 text-center sm:space-y-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Travel with Points</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Turn everyday spending into your next adventure</h1>
          <p className="mx-auto max-w-2xl text-base text-slate-200/80 sm:text-lg">
            A structured look at how travel rewards fit together. Compare airline and hotel programs, understand bank partnerships,
            pick the right cards, and use point-conversion paths to unlock real value on flights and stays—all from the comfort of your phone.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-200/70">
            {sections.map((section) => (
              <a
                key={section.title}
                href={section.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition hover:border-white/40 hover:bg-white/10"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                {section.title}
              </a>
            ))}
          </div>
        </header>

        <section className="grid gap-6 rounded-3xl bg-slate-900/60 p-8 shadow-2xl backdrop-blur sm:p-10 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
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

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur sm:p-10 lg:grid-cols-3">
          <SectionHeader
            eyebrow="Quick win playbook"
            title="Build momentum in minutes"
            description="Use these bite-sized prompts to keep your strategy cohesive even when you only have a few spare moments to plan."
            align="center"
          />
          {quickTips.map((tip) => (
            <div key={tip.title} className="space-y-3">
              <h2 className="text-lg font-semibold text-white">{tip.title}</h2>
              <p className="text-sm leading-6 text-slate-100/80">{tip.detail}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
