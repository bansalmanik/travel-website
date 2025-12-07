import Link from "next/link";

import { getArticleSummaries } from "./data";

export const metadata = {
  title: "Miles & Points Explained | Travel Explorer",
  description: "Beginner-friendly guides that demystify loyalty programs, credit cards, and award travel.",
};

export default async function MilesPointsExplainedPage() {
  const articles = await getArticleSummaries();

  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-slate-100 py-16 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Miles & Points Explained</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">Travel rewards, broken down simply</h1>
          <p className="mt-4 text-base text-slate-600">
            New to points and miles? These guides walk through the fundamentals, safety, and smart strategies so you can move
            from curious to confident without feeling overwhelmed.
          </p>
        </section>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{article.category}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold leading-tight text-slate-900 transition group-hover:text-blue-600">
                  {article.title}
                </h2>
                <p className="text-sm leading-relaxed text-slate-600">{article.excerpt}</p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700 transition group-hover:bg-blue-50 group-hover:text-blue-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 font-semibold text-blue-700">
                  <Link
                    href={`/miles-and-points-explained/${article.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white shadow-sm transition hover:bg-blue-500"
                  >
                    Read guide
                    <svg aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5 5 5-5-5-5" />
                    </svg>
                  </Link>
              </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
