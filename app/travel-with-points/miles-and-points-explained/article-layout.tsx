import Link from "next/link";

import type { MilesPointsArticle } from "./types";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type ArticleLayoutProps = {
  article: MilesPointsArticle;
};

export function ArticleLayout({ article }: ArticleLayoutProps) {
  const published = formatDate(article.publishedOn);
  const updated = article.updatedOn ? formatDate(article.updatedOn) : undefined;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-5 pb-16 pt-20 sm:px-6 lg:px-0 lg:pb-24 lg:pt-24">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-800">
          <Link
            href="/travel-with-points/miles-and-points-explained"
            className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-900"
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
            Miles & Points Explained
          </Link>
          <span aria-hidden>•</span>
          <span className="text-amber-900">{article.category}</span>
        </div>

        <header className="space-y-4">
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-800">
            <span className="rounded-full bg-amber-50 px-3 py-1 text-[0.7rem] text-amber-900">{article.readTime}</span>
            <span className="text-amber-700">Published {published}</span>
            {updated ? <span className="text-amber-700">Updated {updated}</span> : null}
          </div>
          {article.tags?.length ? (
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-800">
              {article.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-[0.7rem] text-amber-900">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <article className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-800 prose-a:text-amber-800 sm:prose-lg">
          {article.sections.map((section, index) => (
            <section key={`${section.heading ?? "section"}-${index}`} className="space-y-3">
              {section.heading ? (
                <h2 className="text-xl font-semibold sm:text-2xl">{section.heading}</h2>
              ) : null}
              {section.body.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="leading-relaxed text-slate-800">
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
