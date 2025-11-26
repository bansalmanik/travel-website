import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getResourceEntries } from "@/lib/contentData";

const pageTitle = "Travel Resource Library | Miles Go Round";
const pageDescription =
  "Actionable transportation tips, scam alerts, and review-style guides for navigating destinations with confidence.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: "https://example.com/resources",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default async function ResourcesPage() {
  const resources = await getResourceEntries();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Travel Resource Library",
    description: pageDescription,
    url: "https://example.com/resources",
    hasPart: resources.map((entry) => ({
      "@type": "Article",
      headline: entry.title,
      datePublished: entry.publishedOn,
      url: `https://example.com/resources/${entry.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-20 lg:py-28">
        <header className="space-y-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">
            Resources
          </p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">
            Resource Library
          </h1>
          <p className="mx-auto max-w-3xl text-base text-slate-200/80">
            Practical guides, safety notes, and first-hand reviews to help you move through each city with clarity and calm.
          </p>
        </header>

        <ul className="flex flex-col gap-6">
          {resources.map((entry) => (
            <li key={entry.slug}>
              <article className="group grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-amber-200/30 hover:shadow-2xl hover:shadow-amber-200/10 sm:grid-cols-[220px,1fr] sm:gap-8">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={entry.heroImage.src}
                    alt={entry.heroImage.alt}
                    fill
                    sizes="(min-width: 1024px) 220px, (min-width: 640px) 200px, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-200/80">
                    <span>{entry.displayDate}</span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-100">
                      {entry.topic}
                    </span>
                    <span className="text-[10px] tracking-[0.28em] text-amber-200/70">{entry.location}</span>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">
                      <Link
                        href={`/resources/${entry.slug}`}
                        className="group inline-flex items-center gap-2 text-white"
                      >
                        {entry.title}
                        <svg
                          aria-hidden
                          className="h-4 w-4 opacity-0 transition duration-200 group-hover:translate-x-1 group-hover:opacity-100"
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
                    </h2>
                    <p className="text-sm leading-6 text-slate-200/80">{entry.summary}</p>
                  </div>
                  <div className="pt-1">
                    <Link
                      href={`/resources/${entry.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200"
                      aria-label={`Read resource: ${entry.title}`}
                    >
                      Read the resource
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
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
