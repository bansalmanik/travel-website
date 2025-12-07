import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getMilesPointsArticleBySlug, getMilesPointsArticleSlugs } from "../data";
import type { MilesPointsArticle } from "../types";

export const runtime = "edge";

export async function generateStaticParams() {
  const slugs = await getMilesPointsArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getMilesPointsArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Miles & Points Explained",
      description: "Story-style guides to help you master miles and points.",
    };
  }

  const title = article.seoTitle || `${article.title} | Miles & Points`;
  const description = article.seoDescription || article.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `/travel-with-points/miles-and-points-explained/${article.slug}`,
    },
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

function SectionContent({ section }: { section: MilesPointsArticle["sections"][number] }) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm">
      {section.heading ? (
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">{section.heading}</h2>
      ) : null}

      {section.body?.length ? (
        <div className="space-y-3 text-base leading-7 text-slate-700">
          {section.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      ) : null}

      {section.bulletPoints?.length ? (
        <ul className="space-y-2 text-base leading-7 text-slate-700">
          {section.bulletPoints.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" aria-hidden />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export default async function MilesPointsArticlePage({ params }: { params: { slug: string } }) {
  const article = await getMilesPointsArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <div className="border-b border-slate-200 bg-gradient-to-r from-amber-100 via-white to-blue-50">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-14 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            <span className="rounded-full bg-white px-4 py-1 text-amber-800 shadow-sm">{article.category}</span>
            <span className="hidden sm:inline">•</span>
            <span>{article.publishedOn}</span>
            <span className="hidden sm:inline">•</span>
            <span>{article.readTime}</span>
          </div>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{article.title}</h1>
          <p className="text-lg text-slate-600">{article.excerpt}</p>
          {article.tags?.length ? (
            <div className="flex flex-wrap justify-center gap-2 text-[11px] font-semibold text-slate-600">
              {article.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-14">
        {article.sections.map((section) => (
          <SectionContent key={(section.heading ?? "section") + section.body?.[0]} section={section} />
        ))}

        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-100 px-6 py-5 text-sm text-slate-600 sm:flex-row">
          <p>Back to all Miles &amp; Points explained guides.</p>
          <Link
            href="/travel-with-points/miles-and-points-explained"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 font-medium text-white shadow-md transition hover:bg-blue-500"
          >
            ← View all guides
          </Link>
        </div>
      </div>
    </article>
  );
}
