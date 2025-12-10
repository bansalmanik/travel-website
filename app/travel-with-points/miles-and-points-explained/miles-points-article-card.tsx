import Link from "next/link";

import type { MilesPointsArticle } from "@/app/travel-with-points/miles-and-points-explained/types";

export function MilesPointsArticleCard({ article }: { article: MilesPointsArticle }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-900">
          <Link
            href={`/learning/${article.slug}`}
            className="underline-offset-4 transition hover:text-amber-800 hover:underline"
          >
            {article.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-slate-700">{article.excerpt}</p>
      </div>
    </article>
  );
}
