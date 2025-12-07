import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllArticleSummaries, getArticleBySlug } from "../data";

export const runtime = "edge";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function renderRichText(content: string) {
  const html = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export async function generateStaticParams() {
  const articles = await getAllArticleSummaries();
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Miles & Points Explained",
      description: "Beginner-friendly guides to travel rewards.",
    };
  }

  const title = article.seoTitle ?? article.title;
  const description = article.seoDescription ?? article.excerpt;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function MilesPointsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="bg-white text-slate-900">
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 pb-16 pt-14 text-white">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 text-center">
          <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
            <Link
              href="/miles-and-points-explained"
              className="rounded-full border border-white/30 bg-white/10 px-4 py-2 transition hover:border-white/60 hover:bg-white/20"
            >
              Miles &amp; Points Explained
            </Link>
            <span className="hidden sm:inline">•</span>
            <span>{article.category}</span>
            <span className="hidden sm:inline">•</span>
            <span>{article.readTime}</span>
          </div>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{article.title}</h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
            <span className="rounded-full bg-white/15 px-4 py-2 font-semibold">Published {formatDate(article.publishedOn)}</span>
            {article.tags?.length ? (
              <div className="flex flex-wrap justify-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-sky-100">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-white">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-16">
        <section className="space-y-4 text-lg leading-relaxed text-slate-700">
          <p>{article.excerpt}</p>
        </section>

        {article.sections?.length ? (
          <div className="space-y-12">
            {article.sections.map((section, index) => (
              <section key={`${section.heading ?? "section"}-${index}`} className="space-y-4">
                {section.heading ? (
                  <h2 className="text-2xl font-semibold text-slate-900">{section.heading}</h2>
                ) : null}

                {section.body?.length ? (
                  <div className="space-y-4 text-lg leading-relaxed text-slate-700">
                    {section.body.map((paragraph, i) => (
                      <p key={`${paragraph.slice(0, 24)}-${i}`}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}

                {section.bulletPoints?.length ? (
                  <ul className="space-y-2 rounded-2xl bg-slate-50 p-5 text-slate-800">
                    {section.bulletPoints.map((point, i) => (
                      <li key={`${point.slice(0, 24)}-${i}`} className="flex gap-3">
                        <span className="mt-2 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                        <div className="text-base leading-relaxed">{renderRichText(point)}</div>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        ) : null}

        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-100 p-6 text-sm text-slate-700 sm:flex-row">
          <p>Looking for more primers? Explore all Miles &amp; Points guides.</p>
          <Link
            href="/miles-and-points-explained"
            className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2 font-medium text-white shadow-md transition hover:bg-blue-600"
          >
            ← Back to all guides
          </Link>
        </div>
      </div>
    </article>
  );
}
