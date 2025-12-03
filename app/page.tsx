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
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/40 to-sky-50 text-slate-900">
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
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/55 to-slate-900/30" />
        </div>
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-14 text-white sm:px-6 sm:pb-24 sm:pt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-100/90 sm:text-base">Travel differently</p>
          <h1 className="text-pretty text-center text-3xl font-bold leading-tight sm:text-left sm:text-5xl sm:leading-tight">
            Travel with points and miles without losing the wonder of the journey.
          </h1>
          <p className="text-pretty text-center text-base text-amber-50/90 sm:text-left sm:text-lg">
            Earn smarter, redeem better, and savor every stop along the way. From flexible points strategies to curated
            itineraries, Miles Go Round shows you how to turn loyalty into unforgettable moments.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              className="inline-flex w-full items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-900 shadow-md shadow-amber-300/40 transition hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-100 sm:w-auto sm:text-base"
              href="/travel-with-points"
            >
              Travel on Points
            </Link>
            <Link
              className="inline-flex w-full items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-md shadow-slate-900/20 ring-1 ring-inset ring-white/30 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-100 sm:w-auto sm:text-base"
              href="/travel-resources"
            >
              Travel Resources
            </Link>
            <Link
              className="inline-flex w-full items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-md shadow-slate-900/20 ring-1 ring-inset ring-white/30 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-100 sm:w-auto sm:text-base"
              href="/stories"
            >
              Dive into Stories
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-16 px-4 py-16 sm:space-y-24 sm:px-6 lg:max-w-6xl">
        <section
          aria-labelledby="travel-with-points-heading"
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 px-5 py-9 shadow-sm backdrop-blur sm:px-8 sm:py-12"
        >
          <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div className="space-y-4 text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 sm:text-sm sm:tracking-[0.3em]">
                Travel With Points
              </p>
              <h2 id="travel-with-points-heading" className="text-2xl font-semibold sm:text-4xl">
                Travel with points and turn loyalty into long weekends
              </h2>
              <p className="text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
                Earn smarter. Redeem better. Fly further. Miles and points that take you places.
              </p>
            </div>
            <ul className="mt-2 grid gap-4 sm:mt-0 sm:grid-cols-2">
              {travelWithPointsHighlights.map((item) => (
                <li key={item.title} className="h-full">
                  <Link
                    href={item.href}
                    aria-label={`Learn more about ${item.title}`}
                    className="group flex h-full flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50/80 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                  >
                    <span
                      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] shadow-sm ${item.accent}`}
                    >
                      {item.title}
                    </span>
                    <p className="text-pretty text-sm leading-relaxed text-slate-700">{item.description}</p>
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
          <div className="flex flex-col gap-5 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 sm:text-sm sm:tracking-[0.3em]">
                Latest Travel Resources
              </p>
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-4xl">
                Behind-the-scenes notes & resources
              </h2>
            </div>
            <p className="mx-auto max-w-2xl text-pretty text-sm text-slate-600 sm:mx-0 sm:max-w-xl sm:text-base">
              Travel smarter with bite-sized guides, practical tips, and insider ways to stretch every mile and point.
            </p>
          </div>

          <ul className="space-y-4 sm:space-y-5">
            {journalHighlights.map((entry) => (
              <li key={entry.title}>
                <a
                  className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 sm:p-6"
                  href={entry.url}
                  aria-label={`View travel resource ${entry.title}`}
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">{entry.date}</span>
                  <span className="text-pretty text-lg font-semibold text-slate-900">{entry.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

      </main>

      <footer className="border-t border-slate-200 bg-white/80 py-10 text-sm text-slate-600">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:text-left">
          <p className="text-sm text-slate-700">© {new Date().getFullYear()} Miles Go Round. Stories from a life in motion.</p>
          <div className="flex flex-wrap items-center justify-center gap-5 sm:justify-start">
            <a className="font-semibold text-slate-700 transition hover:text-slate-900" href="https://www.instagram.com/milesgoround/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="font-semibold text-slate-700 transition hover:text-slate-900" href="https://www.youtube.com/@milesGoRound" target="_blank" rel="noreferrer">
              YouTube
            </a>
            <a className="font-semibold text-slate-700 transition hover:text-slate-900" href="https://www.instagram.com/milesgoround/" target="_blank" rel="noreferrer">
              X/twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
