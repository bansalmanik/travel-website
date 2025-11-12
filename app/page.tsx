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

const quickSectionLinks = [
  { label: "Featured Stories", href: "#stories" },
  { label: "Points Hub", href: "#travel-with-points" },
  { label: "Latest Journal", href: "#journal" },
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
          <div className="absolute inset-0 bg-slate-950/70" aria-hidden />
        </div>
        <div className="mx-auto flex min-h-[520px] max-w-3xl flex-col gap-8 px-4 pb-16 pt-12 text-white sm:px-6 sm:pb-24 sm:pt-20">
          <div className="space-y-4 text-balance text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/90">Travel thoughtfully</p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
              Miles Go Round is your compass for soulful journeys and slow travel adventures.
            </h1>
            <p className="text-base text-amber-100/90 sm:max-w-xl sm:text-lg">
              Explore immersive guides, heartfelt field notes, and practical tips for transforming every mile into a
              memorable story. From sunrise hikes to late-night street food, discover the moments that make travel feel alive.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              className="inline-flex w-full items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 shadow-lg shadow-amber-400/40 transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 sm:w-max sm:text-base"
              href="/stories"
            >
              Dive into Stories
            </Link>
            <nav aria-label="Section shortcuts" className="overflow-x-auto">
              <ul className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100/80">
                {quickSectionLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 transition hover:border-white/40 hover:bg-white/20"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:space-y-24 sm:px-6 sm:py-24">
        <section id="stories" aria-labelledby="stories-heading" className="space-y-10">
          <div className="space-y-4 text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-500">Featured Stories</p>
            <div className="space-y-3 sm:flex sm:items-end sm:justify-between sm:space-y-0">
              <h2 id="stories-heading" className="text-3xl font-semibold sm:text-4xl">
                Recent chapters from life on the road
              </h2>
              <p className="max-w-xl text-sm text-slate-600 sm:text-right sm:text-base">
                Long-form travelogues with practical notes, playlists, and the quieter moments that rarely make it into guidebooks.
              </p>
            </div>
          </div>

          <ol className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0">
            {featuredStories.map((story, index) => (
              <li key={story.slug} className="min-w-[80%] snap-center sm:min-w-0">
                <Link
                  href={`/stories/${story.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                >
                  <div className="relative h-56 w-full overflow-hidden sm:h-64">
                    <Image
                      src={story.coverImage.src}
                      alt={story.coverImage.alt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(min-width: 640px) 33vw, 90vw"
                      priority={index === 0}
                    />
                  </div>
                  <div className="space-y-3 px-6 py-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-500">
                      {story.city}, {story.country}
                    </p>
                    <h3 className="text-xl font-semibold text-slate-900">{story.title}</h3>
                    <p className="text-sm leading-6 text-slate-600">{story.excerpt}</p>
                    <span className="inline-flex items-center text-sm font-semibold text-sky-600">
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
          </ol>
        </section>

        <section
          id="travel-with-points"
          aria-labelledby="travel-with-points-heading"
          className="overflow-hidden rounded-3xl bg-slate-900/95 px-5 py-10 text-white shadow-xl sm:px-8 sm:py-12"
        >
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="space-y-5 text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
                New Resource Hub
              </p>
              <h2 id="travel-with-points-heading" className="text-3xl font-semibold sm:text-4xl">
                Travel with points and turn loyalty into long weekends
              </h2>
              <p className="text-sm leading-6 text-slate-100/80 sm:text-base">
                Earn smarter. Redeem better. Fly further. Miles and points that take you places
              </p>
              <Link
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 shadow-lg shadow-amber-400/40 transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                href="/travel-with-points"
              >
                Explore the hub
              </Link>
            </div>
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:pb-0">
              {travelWithPointsHighlights.map((item) => (
                <article key={item.title} className="min-w-[70%] snap-center sm:min-w-0">
                  <Link
                    href={item.href}
                    className="group block h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                  >
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] shadow-sm ${item.accent}`}
                    >
                      {item.title}
                    </span>
                    <p className="mt-3 text-sm leading-6 text-slate-100/90">{item.description}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-amber-300">
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
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="journal" aria-labelledby="journal-heading" className="space-y-8">
          <div className="space-y-4 text-center sm:flex sm:items-end sm:justify-between sm:text-left">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-500">Latest Journal</p>
              <h2 id="journal-heading" className="text-3xl font-semibold sm:text-4xl">
                Behind-the-scenes notes & resources
              </h2>
            </div>
            <p className="mx-auto max-w-xl text-sm text-slate-600 sm:mx-0 sm:text-base">
              Travel smarter with bite-sized guides, practical tips, and insider ways to stretch every mile and point.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {journalHighlights.map((entry) => (
              <a
                key={entry.title}
                className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 sm:p-6"
                href={entry.url}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">{entry.date}</span>
                <span className="text-lg font-semibold text-slate-900">{entry.title}</span>
              </a>
            ))}
          </div>
        </section>

      </main>

      <footer className="border-t border-slate-200 bg-white/70 py-8 text-sm text-slate-600">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:text-left">
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
