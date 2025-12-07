import type { Metadata } from "next";
import Link from "next/link";

import { getAllMilesPointsArticles } from "./data";

export const metadata: Metadata = {
  title: "Miles & Points Explained | Stories-style Guides",
  description:
    "Browse beginner-friendly, story-style explainers that walk through the fundamentals of miles, points, and smart redemption habits.",
  alternates: {
    canonical: "/travel-with-points/miles-and-points-explained",
  },
};

export default async function MilesPointsExplainedPage() {
  const articles = await getAllMilesPointsArticles();

  return (
    <main className="bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 pb-20 pt-16 sm:pb-24 sm:pt-24">
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">Miles &amp; Points</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            Miles &amp; Points Explained
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            A story-like series of guides that mirror our travel stories layout: skim-friendly, organized, and ready to help you
            earn and redeem smarter.
          </p>
        </section>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link href={`/travel-with-points/miles-and-points-explained/${article.slug}`} className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
                  <span>{article.category}</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold leading-snug transition-colors group-hover:text-blue-600">
                  {article.title}
                </h2>
                <p className="mt-3 text-sm text-slate-600">{article.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">{article.publishedOn}</span>
                  {article.tags?.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-blue-600">
                  Read the guide
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
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
