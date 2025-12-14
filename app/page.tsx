import Image from "next/image";
import Link from "next/link";

import { getTravelResourceEntries } from "@/lib/contentData";

const travelWithPointsHighlights = [
  {
    title: "Start with the right card",
    description: "Build a starter wallet, unlock welcome bonuses, and set up autopay habits that earn quietly.",
    href: "/travel-with-points/credit-cards",
    accent: "from-amber-500/80 via-amber-400/60 to-amber-300/50",
  },
  {
    title: "Lock in luxe stays",
    description:
      "Pick the best hotel partners for your style, stack elite perks, and stretch points for longer getaways.",
    href: "/travel-with-points/hotel-programs",
    accent: "from-sky-500/80 via-sky-400/60 to-cyan-300/50",
  },
  {
    title: "Fly further for less",
    description: "Route-shop like a pro, pair alliances with transferrable points, and turn miles into better cabins.",
    href: "/travel-with-points/flight-programs",
    accent: "from-emerald-500/80 via-emerald-400/60 to-lime-300/50",
  },
  {
    title: "Move points with intent",
    description: "Translate currencies, compare partner ratios, and transfer only when the sweet spot is ready.",
    href: "/pointsconversion",
    accent: "from-purple-500/80 via-fuchsia-400/60 to-violet-300/50",
  },
];

const travelTools = [
  {
    title: "Trip blueprints",
    description: "Weekend hops, honeymoons, and annual family trips—mix cash and points with confidence.",
    icon: "🧭",
  },
  {
    title: "Status ladder",
    description: "See which elite tiers are worth chasing, and how to shortcut with perks and partners.",
    icon: "📈",
  },
  {
    title: "Stacking recipes",
    description: "Combine airline promos, hotel promos, and card offers into one smooth booking flow.",
    icon: "🧪",
  },
  {
    title: "Conversion radar",
    description: "Real-time transfer tips that highlight bonuses so you move points only when it matters.",
    icon: "📡",
  },
];

const quickLinks = [
  { label: "Credit Cards", href: "/travel-with-points/credit-cards", icon: "💳" },
  { label: "Hotels", href: "/travel-with-points/hotel-programs", icon: "🏨" },
  { label: "Flights", href: "/travel-with-points/flight-programs", icon: "✈️" },
  { label: "Convert Points", href: "/pointsconversion", icon: "🔄" },
];

export default async function Home() {
  const travelResourceEntries = await getTravelResourceEntries();
  const journalHighlights = travelResourceEntries.slice(0, 3).map((entry) => ({
    title: entry.title,
    date: entry.displayDate,
    url: `/travel-resources/${entry.slug}`,
  }));
  const heroImageSrc = "/images/content/cover_1.jpg";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/40 to-sky-50 text-slate-900">
      {/* Hero Section - Exact viewport height */}
      <header className="relative isolate flex h-[100svh] flex-col overflow-hidden">
        {/* Background Image with Ken Burns effect */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImageSrc}
            alt="Beautiful travel destination"
            fill
            className="object-cover scale-105 animate-[kenburns_20s_ease-in-out_infinite_alternate]"
            priority
            sizes="100vw"
          />
          {/* Professional gradient overlay - deeper with subtle warmth */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/50 to-slate-950/90" />
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/30 via-transparent to-amber-950/20" />
        </div>

        {/* Subtle decorative accents */}
        <div className="absolute top-1/4 left-0 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />

        {/* Main Hero Content - All content centered */}
        <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6">
          <div className="mx-auto w-full max-w-5xl text-center">
            {/* Main headline */}
            <h1 className="mb-3 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:mb-5 sm:text-5xl md:text-6xl">
              Make Every Mile
              <span className="mt-1 block bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 bg-clip-text text-transparent sm:mt-2">
                Meaningful
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mb-5 max-w-2xl text-sm leading-relaxed text-slate-100 sm:mb-7 sm:text-lg md:text-xl">
              Blending soulful journeys with smart use of miles and points, so every trip becomes richer and more rewarding.
            </p>

            {/* CTA Buttons */}
            <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:mb-8 sm:flex-row sm:gap-4">
              {/* Primary CTA */}
              <Link
                href="/travel-with-points"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Start Exploring</span>
                <svg className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              {/* Secondary CTA */}
              <Link
                href="/stories"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Read Stories</span>
              </Link>
            </div>

            {/* Quick Links - Integrated below CTAs */}
            <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-slate-900/40 p-2.5 backdrop-blur-sm sm:max-w-2xl sm:p-3">
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group flex min-h-[68px] flex-col items-center justify-center gap-1.5 rounded-xl p-2.5 text-center transition-all duration-200 hover:bg-white/10 sm:min-h-0 sm:flex-row sm:gap-2 sm:p-3"
                  >
                    <span className="text-xl sm:text-xl">{link.icon}</span>
                    <span className="text-[11px] font-medium leading-tight text-white/70 transition-colors group-hover:text-white sm:text-xs">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator at bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6">
          <div className="flex flex-col items-center gap-1 text-white/40">
            <div className="h-6 w-4 rounded-full border border-white/30 p-0.5">
              <div className="h-1.5 w-1 animate-bounce rounded-full bg-white/50" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-slate-50">
        {/* Travel With Points Section */}
        <section aria-labelledby="travel-with-points-heading" className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* Section Header */}
            <div className="mb-12 flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 px-6 py-8 text-center text-white shadow-xl ring-1 ring-white/10 sm:px-10 sm:text-left lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-amber-200/90">
                  Travel With Points
                </p>
                <h2 id="travel-with-points-heading" className="mb-3 text-2xl font-semibold sm:text-3xl md:text-4xl">
                  Build a sleek travel stack
                </h2>
                <p className="max-w-2xl text-sm text-slate-100 sm:text-base">
                  Skip the redundancy and jump straight into the systems that make modern trips feel effortless—earn, transfer, and redeem without the clutter.
                </p>
              </div>
              <div className="grid w-full max-w-xl grid-cols-2 gap-3 text-left sm:grid-cols-2 lg:max-w-lg">
                {travelTools.map((tool) => (
                  <div key={tool.title} className="flex gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/15">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl">{tool.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{tool.title}</p>
                      <p className="text-xs text-slate-200/80">{tool.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cards Grid */}
            <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-100 sm:p-8">
                <p className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
                  Modern journey design
                </p>
                <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">From the first card swipe to the cabin seat</h3>
                <p className="text-sm text-slate-600 sm:text-base">
                  Curated flows show you the sequence that actually works: earn with the right card, funnel rewards into the most generous partners, and redeem only when the sweet spot is live. No duplicate links—just the steps that matter.
                </p>
                <div className="mt-2 space-y-3">
                  {travelWithPointsHighlights.map((item, index) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white">
                        0{index + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900">{item.title}</span>
                          <span
                            className={`flex h-6 items-center rounded-full bg-gradient-to-r px-2 text-[11px] font-semibold uppercase tracking-wide text-slate-900 ${item.accent}`}
                          >
                            Step {index + 1}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">{item.description}</p>
                        <span className="mt-1 inline-flex items-center text-xs font-semibold text-amber-600 transition-colors group-hover:text-amber-700">
                          View the play
                          <svg className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-3xl bg-slate-900 p-6 text-white shadow-lg ring-1 ring-slate-800/60 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">Signals</p>
                    <h3 className="text-xl font-semibold sm:text-2xl">Live-ready moves</h3>
                  </div>
                  <Link
                    href="/travel-with-points/miles-and-points-explained"
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/15"
                  >
                    Miles & Points 101
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {travelWithPointsHighlights.map((item) => (
                    <Link
                      key={`${item.title}-badge`}
                      href={item.href}
                      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br p-4 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-amber-200/10 ${item.accent}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                          {item.title.split(" ")[0]}
                        </span>
                        <svg className="h-4 w-4 text-white/80 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <p className="mt-3 text-sm text-white/90">{item.description}</p>
                    </Link>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">Plan once, reuse forever</p>
                    <p className="text-xs text-slate-200/80">Save your favorite routes and transfer partners so every booking takes fewer taps.</p>
                  </div>
                  <Link
                    href="/pointsconversion"
                    className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Open converter
                    <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        {/* Travel Resources Section */}
        <section id="travel-resources" className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* Section Header */}
            <div className="mb-10 flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
              <div className="text-center sm:text-left">
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-amber-600">
                  Resources
                </p>
                <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                  Latest guides & tips
                </h2>
              </div>
              <Link
                href="/travel-resources"
                className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                View all
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Resources List */}
            <div className="space-y-3">
              {journalHighlights.map((entry, index) => (
                <a
                  key={entry.title}
                  href={entry.url}
                  className="group flex items-center justify-between rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span className="text-xs font-medium text-amber-600">{entry.date}</span>
                      <h3 className="text-sm font-medium text-slate-900 transition-colors group-hover:text-amber-600 sm:text-base">
                        {entry.title}
                      </h3>
                    </div>
                  </div>
                  <svg className="h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <Image
                src="/Logo/MilesGoRound-Logo-Blue.png"
                alt="Miles Go Round"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-slate-900">Miles Go Round</p>
                <p className="text-xs text-slate-500">Stories from a life in motion</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/milesgoround/"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@milesGoRound"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://x.com/milesGoRound"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
                aria-label="X (Twitter)"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 border-t border-slate-100 pt-8 text-center">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Miles Go Round. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
