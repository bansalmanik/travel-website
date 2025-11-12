import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getAllStorySummaries } from "./data";

const pageTitle = "Travel Explorer | Stories";
const pageDescription = "Discover travel inspiration, itineraries, and stories from around the globe.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/stories",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: "https://www.milesgoround.com/stories",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const sectionShortcuts = [
  { href: "/", label: "Home" },
  { href: "/travel-with-points", label: "Points Hub" },
  { href: "/journals", label: "Journal" },
];

export default async function StoriesPage() {
  const stories = await getAllStorySummaries();

  return (
    <div className="bg-gradient-to-b from-amber-50 via-white to-sky-50 py-16 text-slate-900 sm:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-5 sm:px-6">
        <header className="mx-auto flex w-full flex-col items-center gap-8 text-center">
          <div className="space-y-6">
            <span className="inline-flex items-center justify-center rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
              Explore stories
            </span>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Stories to Inspire Your Next Getaway</h1>
            <p className="mx-auto max-w-2xl text-base text-slate-600">
              A collection of our journeys, told in moments and memories—the paths we followed, the people we met, and the
              surprising lessons we gathered along the way.
            </p>
          </div>
          <nav aria-label="Key site sections" className="w-full max-w-md">
            <ul className="grid grid-cols-3 gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              {sectionShortcuts.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex h-full items-center justify-center rounded-full border border-slate-200 bg-white/70 px-3 py-2 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3" role="list" aria-label="All travel stories">
          {stories.map((post, index) => (
            <article
              key={post.slug}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              role="listitem"
            >
              <Link href={`/stories/${post.slug}`} className="flex h-full flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={post.coverImage.src}
                    alt={post.coverImage.alt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                    priority={index < 2}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition-colors group-hover:bg-slate-900 group-hover:text-slate-50">
                    {post.category}
                  </span>
                  <h2 className="text-2xl font-semibold leading-snug text-slate-900 transition-colors group-hover:text-sky-600">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-600">{post.excerpt}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-600">
                        {post.author.charAt(0)}
                      </span>
                      <div className="flex flex-col text-left text-slate-500">
                        <span className="text-sm text-slate-700">{post.author}</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end text-right">
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
