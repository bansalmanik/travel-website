import Link from "next/link";

import type { MilesPointsArticle } from "./types";

type Props = {
    article: MilesPointsArticle;
};

function formatDisplayDate(value: string): string {
    return new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function ArticleLayout({ article }: Props) {
    const publishedLabel = formatDisplayDate(article.publishedOn);
    const updatedLabel = article.updatedOn
        ? `Updated ${formatDisplayDate(article.updatedOn)}`
        : undefined;

    return (
        <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-5 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
                <div className="flex items-center gap-2 text-sm font-semibold text-amber-700">
                    <Link
                        href="/travel-with-points/miles-and-points-explained"
                        className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 transition hover:text-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600 focus-visible:outline-offset-4"
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
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                        Miles &amp; Points Explained
                    </Link>
                </div>

                <header className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">{article.category}</p>
                    <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{article.title}</h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
                        <span>{publishedLabel}</span>
                        {updatedLabel ? (
                            <>
                                <span aria-hidden className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />
                                <span>{updatedLabel}</span>
                            </>
                        ) : null}
                        <span aria-hidden className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />
                        <span>{article.readTime}</span>
                    </div>
                </header>

                <div className="space-y-10 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
                    {article.sections.map((section, index) => (
                        <section key={section.heading ?? index} className="space-y-3">
                            {section.heading ? (
                                <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">{section.heading}</h2>
                            ) : null}
                            {section.body.map((paragraph, idx) => (
                                <p key={idx} className="text-base leading-relaxed text-slate-700 sm:text-lg">
                                    {paragraph}
                                </p>
                            ))}
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}
