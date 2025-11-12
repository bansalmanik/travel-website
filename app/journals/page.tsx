import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getJournalEntries } from "@/lib/contentData";
import { JsonLd } from "../components/json-ld";
import { SectionHeader } from "../components/section-header";

const pageTitle = "Travel Journal Library | Miles Go Round";
const pageDescription =
  "Browse Ana's reflective travel journals to uncover remote-work routines, lightweight packing tips, and community-focused stories.";

const baseUrl = "https://example.com";
const pageUrl = `${baseUrl}/journals`;

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
    url: pageUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default async function JournalsPage() {
  const journals = await getJournalEntries();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Travel Journal Library",
    description: pageDescription,
    url: pageUrl,
    hasPart: journals.map((entry) => ({
      "@type": "Article",
      headline: entry.title,
      datePublished: entry.publishedOn,
      url: `${baseUrl}/journals/${entry.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <JsonLd data={structuredData} />
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-5 py-16 sm:px-6 sm:py-24">
        <header className="space-y-6 text-center sm:space-y-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Field Notes</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Travel Journal Library</h1>
          <p className="mx-auto max-w-2xl text-base text-slate-200/80 sm:text-lg">
            Every entry is a postcard from the road—honest reflections, mindful rituals, and practical tips to make slow travel feel sustainable.
          </p>
        </header>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Latest reflections"
            title="Stories to bookmark for your next slow adventure"
            description="Curated, mobile-friendly reads that weave together inspiration, logistics, and lessons learned."
            align="center"
          />

          <div className="grid gap-8 md:grid-cols-2">
            {journals.map((entry) => (
              <article
                key={entry.slug}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition hover:-translate-y-1 hover:border-amber-300/40"
              >
                <div className="relative h-56 w-full sm:h-60">
                  <Image
                    src={entry.heroImage.src}
                    alt={entry.heroImage.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">
                    <span>{entry.displayDate}</span>
                    <span>{entry.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">{entry.title}</h2>
                  <p className="text-sm leading-6 text-slate-200/80">{entry.summary}</p>
                  <div className="mt-auto pt-4">
                    <Link
                      href={`/journals/${entry.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-amber-300"
                    >
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
        </section>
      </div>
    </div>
  );
}
