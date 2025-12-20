import Link from "next/link";
import type { ReactNode } from "react";

import type { MilesPointsArticle } from "@/app/travel-with-points/points-and-miles-explained/types";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function ArticleLayout({
  article,
  previousArticle,
  nextArticle,
  children,
}: {
  article: MilesPointsArticle;
  previousArticle?: MilesPointsArticle;
  nextArticle?: MilesPointsArticle;
  children: ReactNode;
}) {
  const published = formatDate(article.publishedOn);
  const updated = article.updatedOn ? formatDate(article.updatedOn) : undefined;
  const categoryLabel = article.category?.trim();
  const showCategory = categoryLabel && categoryLabel.toLowerCase() !== "points & miles explained";

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 pb-16 pt-12 sm:px-6 lg:gap-12 lg:pb-24 lg:pt-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-800">
          <Link
            href="/travel-with-points/points-and-miles-explained"
            className="rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-[0.68rem] transition hover:-translate-y-[1px] hover:shadow-sm"
          >
            Points &amp; Miles Explained
          </Link>
          {showCategory ? (
            <>
              <span className="text-slate-400">/</span>
              <span className="text-slate-600">{categoryLabel}</span>
            </>
          ) : null}
        </div>

        {/* Header */}
        <header className="space-y-5">
          <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="text-lg leading-relaxed text-slate-600">{article.excerpt}</p>
          <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {published}
            </span>
            {updated ? (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900">
                Updated {updated}
              </span>
            ) : null}
            <span className="text-slate-400">•</span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readTime}
            </span>
          </div>
        </header>

        {/* Main Content */}
        <article className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:space-y-10 sm:p-10">
          {children}
        </article>

        {/* Navigation */}
        {(previousArticle || nextArticle) && (
          <nav className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Continue Learning
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {previousArticle ? (
                <Link
                  href={`/learning/${previousArticle.slug}`}
                  className="group flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-amber-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </div>
                  <span className="text-base font-semibold leading-snug text-slate-900 group-hover:text-amber-900">
                    {previousArticle.title}
                  </span>
                </Link>
              ) : (
                <div className="hidden sm:block" aria-hidden />
              )}

              {nextArticle ? (
                <Link
                  href={`/learning/${nextArticle.slug}`}
                  className="group flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 text-right transition hover:border-amber-300 hover:shadow-md sm:items-end"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
                    Next
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <span className="text-base font-semibold leading-snug text-slate-900 group-hover:text-amber-900">
                    {nextArticle.title}
                  </span>
                </Link>
              ) : null}
            </div>
          </nav>
        )}

        {/* Back to Overview */}
        <div className="flex justify-center border-t border-slate-200 pt-8">
          <Link
            href="/travel-with-points/points-and-miles-explained"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            View All Articles
          </Link>
        </div>
      </div>
    </main>
  );
}
