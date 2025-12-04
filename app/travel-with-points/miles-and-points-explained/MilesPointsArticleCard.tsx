import Link from "next/link";

import type { MilesPointsArticle } from "./types";

type Props = {
    article: MilesPointsArticle;
};

export default function MilesPointsArticleCard({ article }: Props) {
    return (
        <article className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-within:-translate-y-1 focus-within:shadow-md">
            <Link
                href={`/travel-with-points/miles-and-points-explained/${article.slug}`}
                className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600 focus-visible:outline-offset-4"
                aria-label={`Read ${article.title}`}
            >
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
                    <span>{article.category}</span>
                    <span className="hidden h-1 w-1 rounded-full bg-amber-200 sm:inline-block" aria-hidden />
                    <span className="text-[0.7rem] font-semibold text-slate-500 sm:inline">{article.readTime}</span>
                </div>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900 transition-colors group-hover:text-amber-700">
                    {article.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{article.excerpt}</p>
                <div className="mt-6 inline-flex items-center text-sm font-semibold text-amber-700">
                    <span>Read the guide</span>
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
                </div>
            </Link>
        </article>
    );
}
