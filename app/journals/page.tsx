import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getJournalEntries } from "@/lib/contentData";

const pageTitle = "Travel Journal Library | Miles Go Round";
const pageDescription =
  "Browse Ana's reflective travel journals to uncover remote-work routines, lightweight packing tips, and community-focused stories.";
const siteUrl = "https://www.milesgoround.com";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/journals",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: `${siteUrl}/journals`,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const shortcutLinks = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/travel-with-points", label: "Points Hub" },
];

export default async function JournalsPage() {
  const journals = await getJournalEntries();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Travel Journal Library",
    description: pageDescription,
    url: `${siteUrl}/journals`,
    hasPart: journals.map((entry) => ({
      "@type": "Article",
      headline: entry.title,
      datePublished: entry.publishedOn,
      url: `${siteUrl}/journals/${entry.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-5 py-20 sm:px-6 lg:py-28">
        <header className="flex flex-col items-center gap-10 text-center">
          <div className="space-y-6">
            <span className="inline-flex items-center justify-center rounded-full border border-amber-400/30 bg-amber-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">
              Field Notes
            </span>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Travel Journal Library</h1>
            <p className="mx-auto max-w-2xl text-base text-slate-200/80">
              Every entry is a postcard from the road—honest reflections, mindful rituals, and practical tips to make slow travel feel sustainable.
            </p>
          </div>
          <nav aria-label="Navigate to other sections" className="w-full max-w-md">
            <ul className="grid grid-cols-3 gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200/80">
              {shortcutLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex h-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-3 py-2 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div className="grid gap-10 md:grid-cols-2" role="list" aria-label="Journal entries">
          {journals.map((entry) => (
            <article
              key={entry.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition hover:-translate-y-1 hover:border-amber-300/40"
              role="listitem"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={entry.heroImage.src}
                  alt={entry.heroImage.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-8">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">
                  <span>{entry.displayDate}</span>
                  <span>{entry.readTime}</span>
                </div>
                <h2 className="text-2xl font-semibold text-white">{entry.title}</h2>
                <p className="text-sm leading-6 text-slate-200/80">{entry.summary}</p>
                <div className="mt-auto pt-4">
                  <Link href={`/journals/${entry.slug}`} className="inline-flex items-center text-sm font-semibold text-amber-300">
                    Read the journal
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
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
