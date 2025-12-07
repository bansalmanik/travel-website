import Link from "next/link";
import type { ReactNode } from "react";

import type { MilesPointsArticle } from "@/app/travel-with-points/miles-and-points-explained/types";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function ArticleLayout({
  article,
  children,
}: {
  article: MilesPointsArticle;
  children: ReactNode;
}) {
  const published = formatDate(article.publishedOn);
  const updated = article.updatedOn ? formatDate(article.updatedOn) : undefined;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 pb-20 pt-16 sm:px-6 lg:pb-28 lg:pt-24">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-800">
          <Link
            href="/travel-with-points/miles-and-points-explained"
            className="rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-[0.68rem] transition hover:-translate-y-[1px] hover:shadow-sm"
          >
            Miles &amp; Points Explained
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-600">{article.category}</span>
        </div>

        <header className="space-y-4">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
            <span>{published}</span>
            {updated ? <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900">Updated {updated}</span> : null}
            <span className="text-slate-500">•</span>
            <span className="text-slate-700">{article.readTime}</span>
          </div>
        </header>

        <article className="space-y-8 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm sm:p-8">
          {children}
        </article>
      </div>
    </main>
  );
}

export function ArticleSections({
  sections,
}: {
  sections: MilesPointsArticle["sections"];
}) {
  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <section key={`${section.heading ?? "section"}-${index}`} className="space-y-3">
          {section.heading ? (
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">{section.heading}</h2>
          ) : null}
          <div className="space-y-3 text-base leading-7 text-slate-700">
            {section.body.map((paragraph, bodyIndex) => (
              <p key={bodyIndex}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
