import Image from "next/image";
import Link from "next/link";

import { getTravelResourceEntries } from "@/lib/contentData";

const travelWithPointsHighlights = [
  {
    title: "Credit Cards",
    description: "Learn how to earn miles, redeem flights, and fly better without spending more.",
    href: "/travel-with-points/credit-cards",
    accent: "bg-amber-100 text-amber-900",
  },
  {
    title: "Hotel Programs",
    description:
      "Discover how each hotel loyalty program works—earn points, unlock elite perks, and stay in luxury for less.",
    href: "/travel-with-points/hotel-programs",
    accent: "bg-sky-100 text-sky-900",
  },
  {
    title: "Flight Programs",
    description: "Learn how to earn miles, redeem flights, and fly better without spending more.",
    href: "/travel-with-points/flight-programs",
    accent: "bg-emerald-100 text-emerald-900",
  },
  {
    title: "Points Conversion",
    description: "Compare transfer partners, conversion ratios, and send flexible points with confidence.",
    href: "/pointsconversion",
    accent: "bg-purple-100 text-purple-900",
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
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/60 to-sky-50 text-slate-900">
      <header className="relative isolate overflow-hidden rounded-b-[2.5rem] bg-white/70 shadow-sm">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImageSrc}
            alt="Sunset over mountains and fjords"
            fill
            className="object-cover brightness-90"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-900/55 to-slate-900/30" />
        </div>
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-5 pb-16 pt-14 text-white sm:px-6 sm:pb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200 sm:text-sm">Travel differently</p>
          <h1 className="text-pretty text-left text-3xl font-semibold leading-tight sm:text-4xl sm:leading-tight">
            Miles Go Round is your compass for soulful journeys and slow travel adventures.
          </h1>
          <p className="text-pretty text-base text-amber-100/90 sm:text-lg">
            Explore immersive guides, heartfelt field notes, and practical tips for transforming every mile into a memorable
            story. From sunrise hikes to late-night street food, discover the moments that make travel feel alive.
          </p>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              className="inline-flex w-full items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-900 shadow-md shadow-amber-400/30 transition hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 sm:w-auto sm:text-base"
              href="/stories"
            >
              Dive into Stories
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-14 px-5 py-14 sm:space-y-20 sm:px-6 lg:space-y-24">
        <section
          aria-labelledby="travel-with-points-heading"
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white px-5 py-10 shadow-lg shadow-slate-200/50 sm:px-7 sm:py-12"
        >
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-start">
            <div className="space-y-5 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600 sm:text-sm sm:tracking-[0.24em]">
                Travel With Points
              </p>
              <h2 id="travel-with-points-heading" className="text-2xl font-semibold sm:text-3xl">
                Travel with points and turn loyalty into long weekends
              </h2>
              <p className="text-pretty text-sm leading-6 text-slate-700 sm:text-base">
                Earn smarter. Redeem better. Fly further. Miles and points that take you places
              </p>
            </div>
            <ul className="mt-2 grid gap-3 sm:mt-0 sm:grid-cols-2">
              {travelWithPointsHighlights.map((item) => (
                <li key={item.title} className="h-full">
                  <Link
                    href={item.href}
                    aria-label={`Learn more about ${item.title}`}
                    className="group flex h-full flex-col justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-5 transition hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                  >
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] shadow-sm ${item.accent}`}
                    >
                      {item.title}
                    </span>
                    <p className="text-pretty text-sm leading-6 text-slate-700">{item.description}</p>
                    <span className="inline-flex items-center text-sm font-semibold text-amber-700">
                      Read more
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
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="travel-resources" className="space-y-8">
          <div className="flex flex-col gap-4 text-left sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 sm:text-sm">Latest Travel Resources</p>
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Behind-the-scenes notes & resources</h2>
            </div>
            <p className="mx-auto max-w-2xl text-balance text-sm text-slate-700 sm:mx-0 sm:max-w-xl sm:text-base">
              Travel smarter with bite-sized guides, practical tips, and insider ways to stretch every mile and point.
            </p>
          </div>

          <ul className="space-y-3 sm:space-y-4">
            {journalHighlights.map((entry) => (
              <li key={entry.title}>
                <a
                  className="flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 sm:p-6"
                  href={entry.url}
                  aria-label={`View travel resource ${entry.title}`}
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600">{entry.date}</span>
                  <span className="text-pretty text-lg font-semibold text-slate-900">{entry.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/80 py-8 text-sm text-slate-700">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
          <p className="leading-6">© {new Date().getFullYear()} Miles Go Round. Stories from a life in motion.</p>
          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-800">
            <a className="transition hover:text-slate-900" href="https://www.instagram.com/milesgoround/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="transition hover:text-slate-900" href="https://www.youtube.com/@milesGoRound" target="_blank" rel="noreferrer">
              YouTube
            </a>
            <a className="transition hover:text-slate-900" href="https://www.instagram.com/milesgoround/" target="_blank" rel="noreferrer">
              X/Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
