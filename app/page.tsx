import Image from "next/image";
import Link from "next/link";

import journalsData from "@/data/journals.json";

const featuredStories = [
  {
    title: "Chasing Midnight Sun in Lofoten",
    excerpt:
      "A week of pastel skies, wild campfires, and the quiet magic of Norwegian fishing villages.",
    location: "Lofoten Islands, Norway",
    imageUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Tea Trails Through Sri Lanka",
    excerpt:
      "Riding misty mountain trains, sipping cardamom tea, and listening to stories of the pickers who know the hills best.",
    location: "Ella, Sri Lanka",
    imageUrl:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Slow Evenings in Oaxaca",
    excerpt:
      "Cooking with local maestras, mezcal tastings under courtyard lanterns, and finding art in everyday rituals.",
    location: "Oaxaca, Mexico",
    imageUrl:
      "https://images.unsplash.com/photo-1529927066849-66e8e0b30c4b?auto=format&fit=crop&w=1200&q=80",
  },
];

type JournalHighlight = {
  slug: string;
  title: string;
  displayDate: string;
};

const journals = (journalsData as { journals: JournalHighlight[] }).journals;

const journalHighlights = journals.slice(0, 3).map((entry) => ({
  title: entry.title,
  date: entry.displayDate,
  url: `/journals/${entry.slug}`,
}));

const travelWithPointsHighlights = [
  {
    title: "Credit Cards",
    description: "Compare welcome bonuses, annual fees, and sweet spots for travel statement credits.",
    href: "/travel-with-points/credit-cards",
    accent: "bg-amber-100 text-amber-900",
  },
  {
    title: "Hotel Programs",
    description: "Understand elite tiers, free night certificates, and when to transfer points for maximum value.",
    href: "/travel-with-points/hotel-programs",
    accent: "bg-sky-100 text-sky-900",
  },
  {
    title: "Flight Programs",
    description: "Decode award charts, routing rules, and how to stack alliances for long-haul redemptions.",
    href: "/travel-with-points/flight-programs",
    accent: "bg-emerald-100 text-emerald-900",
  },
];

const photoDiary = [
  {
    caption: "Golden hour over alpine lakes in the Dolomites.",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    caption: "Collecting spices in Marrakech’s buzzing souks.",
    imageUrl:
      "https://images.unsplash.com/photo-1505744386214-fa16e387eec8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    caption: "Cycling sunrise streets in Hoi An.",
    imageUrl:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-sky-50 text-slate-900">
      <header className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=1600&q=80"
            alt="Sunset over mountains and fjords"
            fill
            className="object-cover brightness-75"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-sky-900/40" />
        </div>
        <div className="mx-auto max-w-3xl px-6 pb-24 pt-12 text-white sm:pb-32 sm:pt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-200">Travel journal & visual stories</p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            Hey, I’m Ana—writer, photographer, and seeker of slow, soulful journeys.
          </h1>
          <p className="mt-6 text-lg text-amber-100/90 sm:text-xl">
            I share honest notes from the road, from alpine hikes to neon-drenched backstreets. No sponsored itineraries,
            no sales pitches—just the lessons, joys, and surprises that keep me wandering.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-amber-300"
              href="/blogs"
            >
              Dive into Stories
            </Link>
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white hover:text-white"
              href="#connect"
            >
              Say Hello
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-24 px-6 py-16 sm:py-24">
        <section id="stories" className="space-y-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-sky-500">Featured Stories</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
                Recent chapters from life on the road
              </h2>
            </div>
            <p className="max-w-xl text-base text-slate-600">
              Long-form travelogues with practical notes, playlists, and the quieter moments that rarely make it into guidebooks.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {featuredStories.map((story) => (
              <article
                key={story.title}
                className="group overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={story.imageUrl}
                    alt={story.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className="space-y-3 px-6 py-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">{story.location}</p>
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
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="travel-with-points-heading"
          className="overflow-hidden rounded-3xl bg-slate-900/95 px-8 py-12 text-white shadow-xl"
        >
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-300">New Resource Hub</p>
              <h2 id="travel-with-points-heading" className="text-3xl font-semibold sm:text-4xl">
                Travel with points and turn loyalty into long weekends
              </h2>
              <p className="text-base text-slate-100/80">
                Learn the playbook I use to stretch miles and points for boutique hotels, business-class upgrades, and family visits.
                Start with an overview or jump straight to the guides below.
              </p>
              <Link
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-amber-300"
                href="/travel-with-points"
              >
                Explore the hub
              </Link>
            </div>
            <div className="space-y-4">
              {travelWithPointsHighlights.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group block overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${item.accent}`}
                  >
                    {item.title}
                  </span>
                  <p className="mt-4 text-sm leading-6 text-slate-100/90">{item.description}</p>
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
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-12 rounded-3xl bg-slate-900 px-8 py-12 text-white md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-300">Photo Diary</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Postcards from the archives</h2>
            <p className="text-base text-slate-200">
              Small scenes that stuck with me long after the flights home—the laughter of new friends, the quiet between storms,
              the colors that never leave.
            </p>
          </div>
          <div className="grid gap-6">
            {photoDiary.map((photo, index) => (
              <figure
                key={photo.caption}
                className={`overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-xl backdrop-blur ${index === 1 ? "md:ml-12" : ""}`}
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.caption}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                </div>
                <figcaption className="px-6 py-4 text-sm text-slate-100">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="journal" className="space-y-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-sky-500">Latest Journal</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">Behind-the-scenes notes & resources</h2>
            </div>
            <p className="max-w-xl text-base text-slate-600">
              Gear guides, travel playlists, and reflections from years of slow wandering. Updated whenever I find a quiet café
              with decent Wi-Fi.
            </p>
          </div>

          <div className="space-y-6">
            {journalHighlights.map((entry) => (
              <a
                key={entry.title}
                className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                href={entry.url}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500">{entry.date}</span>
                <span className="text-lg font-semibold text-slate-900">{entry.title}</span>
              </a>
            ))}
          </div>
        </section>

        <section id="connect" className="overflow-hidden rounded-3xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-8 py-16 text-slate-900">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-800/80">Stay in the loop</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">Monthly postcards from wherever I’m roaming</h2>
              <p className="text-base text-slate-900/80">
                Subscribe for thoughtful essays, photo stories, and playlists from the road. No spam—just honest travel notes and the occasional digital postcard.
              </p>
            </div>
            <form className="flex w-full max-w-sm flex-col gap-3 rounded-3xl bg-white/80 p-6 shadow-xl md:min-w-[280px]" action="#" method="post">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-700" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="hello@you.com"
                className="w-full rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                suppressHydrationWarning
              />
              <button
                className="flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-slate-800"
                type="submit"
                suppressHydrationWarning
              >
                Join the list
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/70 py-10 text-sm text-slate-600">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Away With Ana. Stories from a life in motion.</p>
          <div className="flex gap-6">
            <a className="transition hover:text-slate-900" href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="transition hover:text-slate-900" href="https://youtube.com" target="_blank" rel="noreferrer">
              YouTube
            </a>
            <a className="transition hover:text-slate-900" href="mailto:hello@awaywithana.com">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
