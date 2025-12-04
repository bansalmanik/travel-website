import Link from "next/link";

import type { MilesPointsArticle } from "./types";

type MilesPointsArticleCardProps = {
  article: MilesPointsArticle;
};

export function MilesPointsArticleCard({ article }: MilesPointsArticleCardProps) {
  return (
    <Link
      href={`/travel-with-points/miles-and-points-explained/${article.slug}`}
      className="group flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-800">{article.category}</p>
        <h3 className="text-xl font-semibold text-slate-900 group-hover:text-amber-900">{article.title}</h3>
        <p className="text-sm leading-relaxed text-slate-700">{article.excerpt}</p>
      </div>
      <div className="mt-auto flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-800">
        <span className="rounded-full bg-amber-50 px-3 py-1 text-[0.7rem] text-amber-900">{article.readTime}</span>
        <span className="text-amber-700">{new Date(article.updatedOn ?? article.publishedOn).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
      </div>
      <span className="inline-flex items-center text-sm font-semibold text-amber-800">
        Read article
        <svg
          aria-hidden
          className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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
  );
}
