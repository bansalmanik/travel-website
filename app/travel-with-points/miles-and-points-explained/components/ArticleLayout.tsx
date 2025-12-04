import Link from "next/link";

import type { MilesPointsArticle } from "../types";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(date),
  );
}

type ArticleLayoutProps = {
  article: MilesPointsArticle;
};

export function ArticleLayout({ article }: ArticleLayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <div className="mx-auto flex max-w-3xl flex-col gap-12 px-5 py-16 sm:px-6 lg:py-24">
        <div className="flex items-center gap-3 text-sm text-amber-700">
          <Link
            href="/travel-with-points/miles-and-points-explained"
            className="inline-flex items-center gap-2 font-semibold transition hover:text-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
          >
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
              <path d="m15 18-6-6 6-6" />
            </svg>
            Miles & Points Explained
          </Link>
          <span className="text-slate-400">/</span>
          <span className="font-semibold text-slate-700">{article.title}</span>
        </div>

        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">{article.category}</p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{article.title}</h1>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">{article.excerpt}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
            <span>{formatDate(article.publishedOn)}</span>
            {article.updatedOn ? (
              <span className="flex items-center gap-2 text-slate-500">
                <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden />
                Updated {formatDate(article.updatedOn)}
              </span>
            ) : null}
            <span className="flex items-center gap-2 text-slate-500">
              <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden />
              {article.readTime}
            </span>
          </div>
        </header>

        <article className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-700">
          {article.sections.map((section, index) => (
            <section key={section.heading ?? index} className="space-y-3">
              {section.heading ? <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">{section.heading}</h2> : null}
              {section.body.map((paragraph, idx) => (
                <p key={idx} className="text-base leading-relaxed text-slate-700 sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
