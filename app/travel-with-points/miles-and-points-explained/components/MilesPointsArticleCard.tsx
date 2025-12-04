import Link from "next/link";

import type { MilesPointsArticle } from "../types";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(date),
  );
}

type MilesPointsArticleCardProps = {
  article: MilesPointsArticle;
};

export function MilesPointsArticleCard({ article }: MilesPointsArticleCardProps) {
  return (
    <article className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-[0.7rem] text-amber-900">{article.category}</span>
          <span className="text-slate-500">{formatDate(article.publishedOn)}</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">{article.title}</h3>
        <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{article.excerpt}</p>
      </div>
      <div className="mt-6 flex items-center justify-between text-sm font-semibold text-amber-700">
        <span>{article.readTime}</span>
        <Link
          href={`/travel-with-points/miles-and-points-explained/${article.slug}`}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-amber-800 transition hover:bg-amber-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
          aria-label={`Read ${article.title}`}
        >
          Read article
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
  );
}
