import Image from "next/image";
import Link from "next/link";

import { getTravelResourceEntries } from "@/lib/contentData";

const travelWithPointsHighlights = [
  {
    title: "Credit Cards",
<<<<<<< HEAD
    description: "Build a simple earning plan that fits your everyday spend without spreadsheets.",
=======
    description: "Choose the right welcome bonus and start earning flexible points fast.",
>>>>>>> c841214afd981b1c37733af16c1572ac02423a2b
    href: "/travel-with-points/credit-cards",
    accent: "from-amber-200/60 via-amber-100/80 to-white/70 text-amber-900",
  },
  {
    title: "Hotel Programs",
<<<<<<< HEAD
    description: "Decode elite tiers, perks, and free night tricks in minutes, not hours of research.",
=======
    description:
      "Unlock free nights, late checkout, and perks that make every stay feel special.",
>>>>>>> c841214afd981b1c37733af16c1572ac02423a2b
    href: "/travel-with-points/hotel-programs",
    accent: "from-sky-200/70 via-sky-100/80 to-white/70 text-sky-900",
  },
  {
    title: "Flight Programs",
<<<<<<< HEAD
    description: "Map flexible points to airline partners so you can spot sweet spots fast.",
=======
    description: "Earn miles on every trip and redeem them for the cabins and routes you actually want.",
>>>>>>> c841214afd981b1c37733af16c1572ac02423a2b
    href: "/travel-with-points/flight-programs",
    accent: "from-emerald-200/70 via-emerald-100/80 to-white/70 text-emerald-900",
  },
  {
    title: "Points Conversion",
<<<<<<< HEAD
    description: "Quickly compare transfer ratios and see where your flexible points stretch the farthest.",
=======
    description: "Know which partners to transfer to, current ratios, and the best use-cases at a glance.",
>>>>>>> c841214afd981b1c37733af16c1572ac02423a2b
    href: "/pointsconversion",
    accent: "from-purple-200/70 via-purple-100/80 to-white/70 text-purple-900",
  },
];

const quickWins = [
  {
    title: "Pick your starter card",
    detail: "Match bonuses to your airport and favorite airlines so every swipe builds toward a trip.",
  },
  {
    title: "Redeem with confidence",
    detail: "Follow step-by-step booking flows to move points and lock in award space without guesswork.",
  },
  {
    title: "Stretch every stay",
    detail: "Stack elite nights, free-night certs, and promo calendars to cover long weekends for less.",
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-sky-50 text-slate-900">
      <header className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImageSrc}
            alt="Sunset over mountains and fjords"
            fill
            className="object-cover brightness-75"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-sky-900/40" />
        </div>
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 pb-16 pt-14 text-white sm:px-6 sm:pb-24 sm:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80 sm:text-sm">Travel differently</p>
          <h1 className="text-pretty text-center text-3xl font-semibold leading-tight sm:text-left sm:text-5xl sm:leading-tight">
            Miles Go Round is your compass for soulful journeys and slow travel adventures.
          </h1>
          <p className="text-pretty text-center text-base text-amber-100/90 sm:text-left sm:text-lg">
            Explore immersive guides, heartfelt field notes, and practical tips for transforming every mile into a memorable
            story. From sunrise hikes to late-night street food, discover the moments that make travel feel alive.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              className="inline-flex w-full items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 shadow-lg shadow-amber-400/40 transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 sm:w-auto sm:text-base"
              href="/stories"
            >
              Dive into Stories
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:space-y-24 sm:px-6">
        <section
          aria-labelledby="travel-with-points-heading"
<<<<<<< HEAD
          className="overflow-hidden rounded-3xl bg-slate-950/95 px-6 py-10 text-white shadow-xl sm:px-8 sm:py-12"
        >
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div className="space-y-6 text-center lg:text-left">
              <p className="inline-flex items-center justify-center rounded-full border border-amber-300/50 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-amber-200 sm:text-xs sm:tracking-[0.32em]">
                Travel on points, simplified
              </p>
              <div className="space-y-3">
                <h2 id="travel-with-points-heading" className="text-pretty text-2xl font-semibold sm:text-4xl">
                  Skip the overwhelm. See exactly where your points can take you next.
                </h2>
                <p className="text-pretty text-sm leading-6 text-slate-100/85 sm:text-base">
                  A calm hub for earning, transferring, and booking—so you can plan your next long weekend without tab overload.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                <Link
                  className="inline-flex w-full items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-900 shadow-lg shadow-amber-400/30 transition hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 sm:w-auto"
                  href="/travel-with-points"
                >
                  Open the hub
                </Link>
                <Link
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-amber-200 underline-offset-4 transition hover:text-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                  href="/travel-with-points/credit-cards"
                >
                  Start with cards
                  <svg aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-3 sm:gap-4">
                {["10-minute starter guides", "Transfer charts without jargon", "Booking checklists you can save"]
                  .map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-[2px] inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/20 text-amber-200">
                        <svg aria-hidden className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <p className="text-left text-sm font-medium leading-6 text-slate-100/90">{item}</p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-inner sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200/80">Jump in fast</p>
                  <h3 className="text-lg font-semibold text-white sm:text-xl">Pick a track and explore</h3>
                </div>
                <span className="rounded-full bg-amber-400/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-200">
                  4 paths
                </span>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {travelWithPointsHighlights.map((item) => (
                  <li key={item.title} className="h-full">
                    <Link
                      href={item.href}
                      aria-label={`Learn more about ${item.title}`}
                      className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:border-amber-200/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                    >
                      <span
                        className={`inline-flex items-center rounded-full bg-gradient-to-br px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] shadow-sm ${item.accent}`}
                      >
                        {item.title}
                      </span>
                      <p className="text-sm leading-6 text-slate-100/85">{item.description}</p>
                      <span className="inline-flex items-center text-sm font-semibold text-amber-200">
                        Explore
                        <svg
                          aria-hidden
                          className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
=======
          className="overflow-hidden rounded-3xl bg-slate-900/95 px-5 py-10 text-white shadow-xl sm:px-8 sm:py-12"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 sm:text-sm">Travel with points</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-100">
                  Built for small screens
                </span>
              </div>
              <div className="space-y-2">
                <h2 id="travel-with-points-heading" className="text-2xl font-semibold sm:text-4xl">
                  Turn loyalty points into long weekends—without the clutter
                </h2>
                <p className="text-pretty text-sm leading-6 text-slate-100/80 sm:text-base">
                  Scan the essentials at a glance, then tap into focused guides. Everything is grouped so you can decide fast
                  and get back to planning the fun parts of your trip.
                </p>
              </div>
              <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-2">
                {quickWins.map((item) => (
                  <div key={item.title} className="flex gap-3 rounded-xl bg-white/5 p-3">
                    <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/90 text-slate-900 shadow-sm">
                      <svg
                        aria-hidden
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="m5 12 4 4 10-10" />
                      </svg>
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-sm leading-5 text-slate-100/80">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 shadow-lg shadow-amber-400/40 transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                  href="/travel-with-points"
                >
                  Explore the hub
                </Link>
                <p className="text-sm text-amber-100/90">Three-minute skim, then dive deeper by topic.</p>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-200">Quick guide cards</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {travelWithPointsHighlights.map((item) => (
                  <li key={item.title} className="h-full">
                    <Link
                      href={item.href}
                      aria-label={`Learn more about ${item.title}`}
                      className="group flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4 transition hover:-translate-y-1 hover:border-amber-200/60 hover:bg-slate-900/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                    >
                      <span
                        className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] shadow-sm ${item.accent}`}
                      >
                        {item.title}
                      </span>
                      <p className="text-sm leading-6 text-slate-100/90">{item.description}</p>
                      <span className="inline-flex items-center text-sm font-semibold text-amber-200">
                        Open guide
                        <svg
                          aria-hidden
                          className="ml-2 h-4 w-4 transition group-hover:translate-x-1"
>>>>>>> c841214afd981b1c37733af16c1572ac02423a2b
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
                  </li>
                ))}
              </ul>
<<<<<<< HEAD
              <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-100/85 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-white">Only the essentials</p>
                  <p className="text-slate-100/75">Short reads, mobile-friendly layouts, and quick wins you can save for later.</p>
                </div>
                <Link
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                  href="/travel-with-points"
                >
                  View all resources
                  <svg aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
=======
>>>>>>> c841214afd981b1c37733af16c1572ac02423a2b
            </div>
          </div>
        </section>

        <section id="travel-resources" className="space-y-10">
          <div className="flex flex-col gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div className="space-y-2 sm:space-y-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-500 sm:text-sm sm:tracking-[0.35em]">
                Latest Travel Resources
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:mt-4 sm:text-4xl">
                Behind-the-scenes notes & resources
              </h2>
            </div>
            <p className="mx-auto max-w-2xl text-balance text-sm text-slate-600 sm:mx-0 sm:max-w-xl sm:text-base">
              Travel smarter with bite-sized guides, practical tips, and insider ways to stretch every mile and point.
            </p>
          </div>

          <ul className="space-y-4 sm:space-y-6">
            {journalHighlights.map((entry) => (
              <li key={entry.title}>
                <a
                  className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 sm:p-6"
                  href={entry.url}
                  aria-label={`View travel resource ${entry.title}`}
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">{entry.date}</span>
                  <span className="text-pretty text-lg font-semibold text-slate-900">{entry.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

      </main>

      <footer className="border-t border-slate-200 bg-white/70 py-8 text-sm text-slate-600">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:text-left">
          <p>© {new Date().getFullYear()} Miles Go Round. Stories from a life in motion.</p>
          <div className="flex justify-center gap-6 sm:justify-start">
                      <a className="transition hover:text-slate-900" href="https://www.instagram.com/milesgoround/" target="_blank" rel="noreferrer">
              Instagram
            </a>
                      <a className="transition hover:text-slate-900" href="https://www.youtube.com/@milesGoRound" target="_blank" rel="noreferrer">
              YouTube
            </a>
          </div>
                  <a className="transition hover:text-slate-900" href="https://www.instagram.com/milesgoround/" target="_blank" rel="noreferrer">
                      X/twitter
          </a>
        </div>
      </footer>
    </div>
  );
}
