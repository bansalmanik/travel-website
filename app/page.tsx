import Image from "next/image";
import Link from "next/link";

import { getTravelResourceEntries } from "@/lib/contentData";

const travelWithPointsHighlights = [
  {
    title: "Credit Cards",
    description: "Learn how to earn miles, redeem flights, and fly better without spending more.",
    href: "/travel-with-points/credit-cards",
    accent: "bg-amber-100 text-amber-900",
    icon: "💳",
  },
  {
    title: "Hotel Programs",
    description:
      "Discover how each hotel loyalty program works—earn points, unlock elite perks, and stay in luxury for less.",
    href: "/travel-with-points/hotel-programs",
    accent: "bg-sky-100 text-sky-900",
    icon: "🏨",
  },
  {
    title: "Flight Programs",
    description: "Learn how to earn miles, redeem flights, and fly better without spending more.",
    href: "/travel-with-points/flight-programs",
    accent: "bg-emerald-100 text-emerald-900",
    icon: "✈️",
  },
  {
    title: "Points Conversion",
    description: "Compare transfer partners, conversion ratios, and send flexible points with confidence.",
    href: "/pointsconversion",
    accent: "bg-purple-100 text-purple-900",
    icon: "🔄",
  },
];

const quickLinks = [
  { label: "Credit Cards", href: "/travel-with-points/credit-cards", icon: "💳" },
  { label: "Hotels", href: "/travel-with-points/hotel-programs", icon: "🏨" },
  { label: "Flights", href: "/travel-with-points/flight-programs", icon: "✈️" },
  { label: "Convert Points", href: "/pointsconversion", icon: "🔄" },
];

const journeySteps = [
  {
    title: "Earn with intention",
    copy: "Stack the right cards and perks for every city you visit.",
  },
  {
    title: "Redeem like a pro",
    copy: "Match routes, partners, and conversion sweet spots without guesswork.",
  },
  {
    title: "Travel beautifully",
    copy: "Blend comfort and value so every trip feels like an upgrade.",
  },
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
        {/* Curated experience Section */}
        <section aria-labelledby="curated-heading" className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 flex flex-col gap-4 sm:gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-800">
                  Fresh for your next trip
                </p>
                <h2 id="curated-heading" className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Build your journey in one flow
                </h2>
                <p className="mt-3 max-w-2xl text-slate-600">
                  Swap the repetitive menus for a curated workspace—straight paths to the hotel, flight, card, and points tools you actually need.
                </p>
              </div>
              <Link
                href="/travel-with-points/miles-and-points-explained"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Miles & Points explained
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-xl ring-1 ring-slate-900/10">
                <div className="absolute -left-16 -top-10 h-48 w-48 rounded-full bg-amber-400/20 blur-3xl" />
                <div className="absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />
                <div className="relative flex flex-col gap-5 sm:gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Your essentials</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Jump straight into the good stuff</h3>
                    <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
                      Each tile opens a focused space—no more bouncing between repeated sections.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {travelWithPointsHighlights.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group flex flex-col gap-2 rounded-2xl bg-white/5 p-4 text-white ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:ring-amber-200/60"
                      >
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <span className="text-lg">{item.icon}</span>
                          <span>{item.title}</span>
                        </div>
                        <p className="text-sm leading-relaxed text-white/70">{item.description}</p>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-amber-200 group-hover:text-amber-100">
                          Open
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-lg">✨</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Flow</p>
                      <h3 className="text-xl font-semibold text-slate-900">Smooth journeys every time</h3>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {journeySteps.map((step, index) => (
                      <div key={step.title} className="flex gap-3 rounded-2xl bg-slate-50 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-sm font-semibold text-amber-700">
                          0{index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                          <p className="text-sm text-slate-600">{step.copy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Mindset</p>
                      <h3 className="text-xl font-semibold text-slate-900">Modern, minimal, intentional</h3>
                      <p className="mt-2 text-sm text-slate-600">
                        Less clutter, more clarity—designed for quick scans and confident clicks.
                      </p>
                    </div>
                    <div className="hidden shrink-0 rounded-2xl bg-gradient-to-br from-amber-100 to-sky-100 p-4 text-3xl sm:block">🧭</div>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {["Fresh layout", "Tactile hover states", "Crisp typography", "Purposeful color"].map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"
                      >
                        {item}
                        <svg className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Travel Resources Section */}
        <section id="travel-resources" className="bg-white/70 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">Resources</p>
                <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Latest guides & tips</h2>
                <p className="mt-2 max-w-2xl text-slate-600">Three quick reads to inspire your next redemption or resort stay.</p>
              </div>
              <Link
                href="/travel-resources"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300"
              >
                View all stories
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
              <div className="grid gap-4 sm:grid-cols-2">
                {journalHighlights.map((entry, index) => (
                  <a
                    key={entry.title}
                    href={entry.url}
                    className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md"
                  >
                    <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-amber-100/50 blur-2xl transition-opacity group-hover:opacity-100" />
                    <div className="relative flex h-full flex-col gap-3">
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        <span>0{index + 1}</span>
                        <span className="text-amber-600">{entry.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-amber-600">{entry.title}</h3>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                        Read guide
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100 via-white to-sky-100 p-8 shadow-sm">
                <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-white/60 blur-2xl" />
                <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-amber-200/40 blur-3xl" />
                <div className="relative flex h-full flex-col justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">Ready when you are</p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-900">Keep the inspiration flowing</h3>
                    <p className="mt-3 max-w-md text-sm text-slate-700">
                      From airports to overwater villas—find the next idea without wading through the same sections twice.
                    </p>
                  </div>
                  <div className="space-y-3 text-sm font-medium text-slate-800">
                    <div className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-white/60">
                      <span className="text-lg">🗺️</span>
                      Curated city breaks and long-haul escapes.
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-white/60">
                      <span className="text-lg">🎟️</span>
                      Redemption plays with real-world examples.
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-white/60">
                      <span className="text-lg">🧳</span>
                      Packing, lounge hacks, and arrival tips.
                    </div>
                  </div>
                  <Link
                    href="/travel-resources"
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    Dive into resources
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
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
