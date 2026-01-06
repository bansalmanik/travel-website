import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getAllTravelGuides } from "@/lib/travel-guides";

const pageTitle = "Travel Guides | Destination Stories & Experiences";
const pageDescription =
  "Explore reflective travel guides with destination insights, local experiences, and practical tips for meaningful journeys around the world.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/travel-guides",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: "https://www.milesgoround.com/travel-guides",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default async function TravelGuidesPage() {
  const travelGuides = await getAllTravelGuides();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Travel Guides Library",
    description: pageDescription,
    url: "https://www.milesgoround.com/travel-guides",
    hasPart: travelGuides.map((entry) => ({
      "@type": "Article",
      headline: entry.title,
      datePublished: entry.publishedOn,
      url: `https://www.milesgoround.com/${entry.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-20 lg:py-28">
        <header className="space-y-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-600">
            Field Notes
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
            Travel Guides Library
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-600">
            Every entry is a postcard from the road—honest reflections, mindful rituals, and practical tips to make slow travel
            feel sustainable.
          </p>
        </header>

        <div className="grid gap-10 md:grid-cols-2">
          {travelGuides.map((entry) => (
            <article
              key={entry.slug}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus-within:-translate-y-1 focus-within:shadow-xl"
            >
              <Link
                href={`/${entry.slug}`}
                className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-4"
                aria-label={`Read ${entry.title}`}
              />
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
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
                  <span>{entry.displayDate}</span>
                  <span>{entry.readTime}</span>
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">{entry.title}</h2>
                <p className="text-sm leading-6 text-slate-600">{entry.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
