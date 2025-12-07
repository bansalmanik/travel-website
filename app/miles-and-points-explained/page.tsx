import Link from "next/link";

import { getAllArticleSummaries } from "./data";

export const metadata = {
  title: "Miles & Points Explained",
  description: "Beginner-friendly guides to help you understand, earn, and redeem travel rewards with confidence.",
};

export default async function MilesPointsExplainedPage() {
  const articles = await getAllArticleSummaries();

  return (
    <main className="bg-gradient-to-b from-white via-slate-50 to-slate-100 py-20 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6">
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-700">Travel with Points</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">Miles &amp; Points Explained</h1>
          <p className="mt-6 text-lg text-slate-600">
            A clear set of primers that mirror our stories experience—scrollable, lightweight, and ready for quick reading on any device.
          </p>
        </section>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex flex-1 flex-col gap-4 p-6">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition-colors group-hover:bg-slate-900 group-hover:text-slate-50">
                  {article.category}
                </span>
                <h2 className="text-2xl font-semibold leading-snug transition-colors group-hover:text-blue-700">
                  <Link href={`/miles-and-points-explained/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className="text-sm text-slate-600">{article.excerpt}</p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-slate-500">
                  <span>{article.readTime}</span>
                  <span>{new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(article.publishedOn))}</span>
                </div>
                {article.tags?.length ? (
                  <div className="flex flex-wrap gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-blue-700">
                    {article.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-blue-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="flex items-center justify-end border-t border-slate-100 px-6 py-4 text-sm font-semibold text-blue-700">
                <Link href={`/miles-and-points-explained/${article.slug}`} className="inline-flex items-center gap-2">
                  Read more
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
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
