import Link from "next/link";

import type { MilesPointsArticle } from "@/app/travel-with-points/miles-and-points-explained/types";

export function MilesPointsArticleCard({ article }: { article: MilesPointsArticle }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-800">
          <span className="rounded-full bg-amber-50 px-3 py-1 text-[0.68rem]">{article.category}</span>
          <span className="text-slate-500">{article.readTime}</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-900">
          <Link
            href={`/travel-with-points/miles-and-points-explained/${article.slug}`}
            className="underline-offset-4 transition hover:text-amber-800 hover:underline"
          >
            {article.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-slate-700">{article.excerpt}</p>
      </div>
      <div className="mt-6 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
        <span>{new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(article.updatedOn ?? article.publishedOn))}</span>
        <Link
          href={`/travel-with-points/miles-and-points-explained/${article.slug}`}
          className="inline-flex items-center text-sm font-semibold text-amber-800"
        >
          Read more
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
    </article>
  );
}
