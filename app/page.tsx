import Image from "next/image";
import Link from "next/link";

import { getAllStorySummaries } from "@/app/stories/data";
import { getJournalEntries } from "@/lib/contentData";
import { SectionHeader } from "./components/section-header";
import { JsonLd } from "./components/json-ld";

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

const primaryNavLinks = [
  { href: "/stories", label: "Stories" },
  { href: "/travel-with-points", label: "Travel on points" },
  { href: "/journals", label: "Journal" },
];

const quickNavLinks = [
  { href: "stories", label: "Stories" },
  { href: "points", label: "Points hub" },
  { href: "journal", label: "Journal" },
];

const siteUrl = "https://example.com";

const toAbsoluteUrl = (path?: string) => {
  if (!path) return undefined;
  return path.startsWith("http") ? path : `${siteUrl}${path}`;
};

const removeUndefined = <T extends Record<string, unknown>>(entity: T) =>
  Object.fromEntries(
    Object.entries(entity).filter(([, value]) => value !== undefined && value !== null),
  );

export default async function Home() {
  const storySummaries = await getAllStorySummaries();
  const featuredStories = storySummaries.slice(0, 3);
  const journalEntries = await getJournalEntries();
  const journalHighlights = journalEntries.slice(0, 3).map((entry) => ({
    title: entry.title,
    displayDate: entry.displayDate,
    publishedOn: entry.publishedOn,
    url: `/journals/${entry.slug}`,
  }));
  const heroImageSrc = "/images/content/cover_1.jpg";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Miles Go Round",
    url: siteUrl,
    inLanguage: "en-US",
    description:
      "Miles Go Round shares immersive travel stories, practical guides, and tips for turning points into unforgettable journeys.",
    potentialAction: [
      {
        "@type": "SearchAction",
        target: `${siteUrl}/stories?query={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    ],
    mainEntity: [
      ...featuredStories.map((story) =>
        removeUndefined({
          "@type": "Article",
          headline: story.title,
          url: `${siteUrl}/stories/${story.slug}`,
          image: toAbsoluteUrl(story.coverImage?.src),
          description: story.excerpt,
        }),
      ),
      ...journalHighlights.map((entry) =>
        removeUndefined({
          "@type": "BlogPosting",
          headline: entry.title,
          url: `${siteUrl}${entry.url}`,
          datePublished: entry.publishedOn,
        }),
      ),
    ],
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-50 via-white to-sky-50 text-slate-900">
      <JsonLd data={structuredData} />

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
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/70 to-sky-900/40" />
        </div>

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-5 pb-24 pt-16 text-center text-white sm:px-6 sm:pb-32 sm:pt-24 md:items-start md:text-left">
          <div className="space-y-5 md:max-w-3xl">
            <p className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
              Slow travel, smart rewards
            </p>
            <h1 className="text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
              Miles Go Round is your compass for soulful journeys and purposeful travel planning.
            </h1>
            <p className="text-base text-amber-100/90 sm:text-lg">
              Explore immersive guides, heartfelt field notes, and practical tips for transforming every mile into a memorable story.
              From sunrise hikes to late-night street food, discover the moments that make travel feel alive.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-start">
            <Link
              className="inline-flex w-full items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 shadow-lg shadow-amber-400/40 transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 sm:w-auto sm:text-base"
              href="/stories"
            >
              Dive into Stories
            </Link>
            <Link
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:text-base"
              href="/travel-with-points"
            >
              Plan with Points
            </Link>
          </div>

          <nav aria-label="On-page navigation" className="w-full">
            <ul className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.18em] text-amber-200/80 md:justify-start">
              {quickNavLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={`#${item.href}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-white transition hover:border-white/40 hover:bg-white/10"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl space-y-20 px-5 py-16 sm:space-y-28 sm:px-6">
        <section id="stories" aria-labelledby="stories-heading" className="space-y-8 sm:space-y-10">
          <SectionHeader
            eyebrow="Featured Stories"
            title="Recent chapters from life on the road"
            description="Long-form travelogues with practical notes, playlists, and the quieter moments that rarely make it into guidebooks."
            id="stories-heading"
          />

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {featuredStories.map((story) => (
              <Link
                key={story.slug}
                href={`/stories/${story.slug}`}
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
                <div className="flex flex-1 flex-col justify-between space-y-4 px-6 py-6">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-500">
                      {story.city}, {story.country}
                    </p>
                    <h3 className="text-xl font-semibold text-slate-900">{story.title}</h3>
                    <p className="text-sm leading-6 text-slate-600">{story.excerpt}</p>
                  </div>
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
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              Browse all stories
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
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        <section
          id="points"
          aria-labelledby="travel-with-points-heading"
          className="space-y-10 overflow-hidden rounded-3xl bg-slate-900/95 px-6 py-12 text-white shadow-xl sm:px-10"
        >
          <SectionHeader
            eyebrow="New Resource Hub"
            title="Travel with points and turn loyalty into long weekends"
            description="Earn smarter, redeem better, and fly further. Explore frameworks that help you unlock premium experiences without overspending."
            align="center"
            id="travel-with-points-heading"
          />

          <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-start">
            <div className="flex flex-col gap-6">
              <p className="text-sm leading-6 text-slate-100/80">
                Start with a guided overview, then dive into detailed playbooks for the exact loyalty programs you use most often.
                Every section is optimized for quick scanning on the go, so you can plan your next redemption from your phone.
              </p>
              <Link
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 shadow-lg shadow-amber-400/40 transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 sm:self-start"
                href="/travel-with-points"
              >
                Explore the hub
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {travelWithPointsHighlights.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex flex-col justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                >
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] shadow-sm ${item.accent}`}
                  >
                    {item.title}
                  </span>
                  <p className="text-sm leading-6 text-slate-100/85">{item.description}</p>
                  <span className="inline-flex items-center text-sm font-semibold text-amber-300">
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
              ))}
            </div>
          </div>
        </section>

        <section id="journal" aria-labelledby="journal-heading" className="space-y-8 sm:space-y-10">
          <SectionHeader
            eyebrow="Latest Journal"
            title="Behind-the-scenes notes & resources"
            description="Travel smarter with bite-sized guides, practical tips, and insider ways to stretch every mile and point."
            id="journal-heading"
          />

          <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
            {journalHighlights.map((entry) => (
              <Link
                key={entry.title}
                className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 sm:p-6"
                href={entry.url}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">{entry.displayDate}</span>
                <span className="text-lg font-semibold text-slate-900">{entry.title}</span>
              </Link>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/journals"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              View all journal entries
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
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/80 py-10 text-sm text-slate-600">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="space-y-1 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Miles Go Round. Stories from a life in motion.</p>
            <p className="text-xs text-slate-400">Designed for travelers who plan on their phones and explore with intention.</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            {primaryNavLinks.map((item) => (
              <Link key={item.href} className="transition hover:text-slate-900" href={item.href}>
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-4">
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
          </nav>
        </div>
      </footer>
    </div>
  );
}
