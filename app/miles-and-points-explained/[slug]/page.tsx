import { notFound } from "next/navigation";

import Link from "next/link";

import { getArticleBySlug, getArticleSlugs } from "../data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatInlineHtml(value: string) {
  return value.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

function renderSectionText(content: string[]) {
  return content.map((paragraph) => (
    <p key={paragraph.slice(0, 24)} className="leading-relaxed text-slate-700">
      {paragraph}
    </p>
  ));
}

function renderSectionBulletPoints(points: string[]) {
  return (
    <ul className="space-y-2 text-slate-700">
      {points.map((point) => (
        <li key={point.slice(0, 24)} className="flex gap-2">
          <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" aria-hidden />
          <span dangerouslySetInnerHTML={{ __html: formatInlineHtml(point) }} />
        </li>
      ))}
    </ul>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Guide not found" };
  }

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
    },
    twitter: {
      card: "summary",
      title: article.seoTitle,
      description: article.seoDescription,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function MilesPointsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="bg-white text-slate-900">
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 py-16 text-white">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
            <span className="rounded-full bg-white/10 px-4 py-1 text-white">{article.category}</span>
            <span className="hidden sm:inline">•</span>
            <span>{article.readTime}</span>
            <span className="hidden sm:inline">•</span>
            <span>{article.publishedOn}</span>
          </div>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{article.title}</h1>
          <p className="max-w-3xl text-base text-white/80">{article.excerpt}</p>
          <div className="flex flex-wrap gap-2 text-xs text-white/80">
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/20 px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-14">
        {article.sections.map((section, index) => (
          <section key={`${section.heading ?? "section"}-${index}`} className="space-y-4">
            {section.heading ? (
              <h2 className="text-2xl font-semibold text-slate-900">{section.heading}</h2>
            ) : null}
            {section.body ? renderSectionText(section.body) : null}
            {section.bulletPoints ? renderSectionBulletPoints(section.bulletPoints) : null}
          </section>
        ))}

        <div className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <span>Continue exploring award travel with more guides.</span>
          <Link
            href="/miles-and-points-explained"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-blue-500"
          >
            ← Back to all guides
          </Link>
        </div>
      </div>
    </article>
  );
}
