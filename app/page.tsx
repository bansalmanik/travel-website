import Image from "next/image";
import Link from "next/link";

import { getAllStorySummaries } from "@/app/stories/data";
import { getJournalEntries } from "@/lib/contentData";

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
  const storySummaries = await getAllStorySummaries();
  const featuredStories = storySummaries.slice(0, 3);
  const journalEntries = await getJournalEntries();
  const journalHighlights = journalEntries.slice(0, 3).map((entry) => ({
    title: entry.title,
    date: entry.displayDate,
    url: `/journals/${entry.slug}`,
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
        <section id="stories" className="space-y-12">
          <div className="flex flex-col gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div className="space-y-2 sm:space-y-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-500 sm:text-sm sm:tracking-[0.35em]">
                Featured Stories
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:mt-4 sm:text-4xl">
                Recent chapters from life on the road
              </h2>
            </div>
            <p className="mx-auto max-w-2xl text-balance text-sm text-slate-600 sm:mx-0 sm:max-w-xl sm:text-base">
              Long-form travelogues with practical notes, playlists, and the quieter moments that rarely make it into guidebooks.
            </p>
          </div>

          <ul className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 no-scrollbar sm:gap-6 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0">
            {featuredStories.map((story) => (
              <li key={story.slug} className="min-w-[85%] snap-center sm:min-w-[70%] md:min-w-0">
                <Link
                  href={`/stories/${story.slug}`}
                  aria-label={`Read ${story.title} from ${story.city}, ${story.country}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                >
                  <div className="relative h-56 w-full overflow-hidden sm:h-64">
                    <Image
                      src={story.coverImage.src}
                      alt={story.coverImage.alt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(min-width: 768px) 33vw, 100vw"
                      priority={story.slug === featuredStories[0]?.slug}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 px-6 py-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-500">
                      {story.city}, {story.country}
                    </p>
                    <h3 className="text-xl font-semibold text-slate-900">{story.title}</h3>
                    <p className="text-balance text-sm leading-6 text-slate-600">{story.excerpt}</p>
                    <span className="mt-auto inline-flex items-center text-sm font-semibold text-sky-600">
                      Read the story
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
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="travel-with-points-heading"
          className="overflow-hidden rounded-3xl bg-slate-900/95 px-4 py-10 text-white shadow-xl sm:px-8 sm:py-12"
        >
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="space-y-6 text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300 sm:text-sm sm:tracking-[0.35em]">
                New Resource Hub
              </p>
              <h2 id="travel-with-points-heading" className="text-2xl font-semibold sm:text-4xl">
                Travel with points and turn loyalty into long weekends
              </h2>
              <p className="text-pretty text-sm leading-6 text-slate-100/80 sm:text-base">
                Earn smarter. Redeem better. Fly further. Miles and points that take you places
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-start">
                <Link
                  className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 shadow-lg shadow-amber-400/40 transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                  href="/travel-with-points"
                >
                  Explore the hub
                </Link>
                <p className="max-w-xs text-center text-xs text-slate-100/70 sm:text-left">
                  Curated guides, cheat sheets, and destination primers tailored for travel hackers on the go.
                </p>
              </div>
            </div>
            <ul className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {travelWithPointsHighlights.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    aria-label={`Learn more about ${item.title}`}
                    className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                  >
                    <div className="space-y-3">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] shadow-sm ${item.accent}`}
                      >
                        {item.title}
                      </span>
                      <p className="text-pretty text-sm leading-6 text-slate-100/90">{item.description}</p>
                    </div>
                    <span className="mt-6 inline-flex items-center text-sm font-semibold text-amber-300">
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

        <section id="journal" className="space-y-10">
          <div className="flex flex-col gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div className="space-y-2 sm:space-y-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-500 sm:text-sm sm:tracking-[0.35em]">
                Latest Journal
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
                  aria-label={`Read journal entry ${entry.title}`}
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
            <a className="transition hover:text-slate-900" href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="transition hover:text-slate-900" href="https://youtube.com" target="_blank" rel="noreferrer">
              YouTube
            </a>
            <a className="transition hover:text-slate-900" href="mailto:hello@milesgoround.com">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
