import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleLayout } from "@/app/travel-with-points/points-and-miles-explained/article-layout";
import type { MilesPointsArticle } from "@/app/travel-with-points/points-and-miles-explained/types";
import {
  getAdjacentMilesPointsArticles,
  getMilesPointsArticleBySlug,
  getMilesPointsArticleSlugs,
} from "@/lib/milesPointsArticles";

export async function generateStaticParams() {
  return getMilesPointsArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getMilesPointsArticleBySlug(slug);

  if (!article) {
    return {
      title: "Points & Miles Explained | Miles Go Round",
      description:
        "Beginner-friendly guides explaining how travel points and miles work, how to earn them, and how to redeem them wisely.",
    };
  }

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function renderSections(sections: MilesPointsArticle["sections"]) {
  function renderFormattedText(text: string) {
    const boldRegex = /\*\*(.+?)\*\*/g;
    const segments: Array<string | { bold: string }> = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push(text.slice(lastIndex, match.index));
      }
      segments.push({ bold: match[1] });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      segments.push(text.slice(lastIndex));
    }

    return segments.map((segment, index) => {
      if (typeof segment === "string") {
        return <span key={`text-${index}`}>{segment}</span>;
      }

      return (
        <strong key={`bold-${index}`} className="font-semibold text-slate-900">
          {segment.bold}
        </strong>
      );
    });
  }

  return sections.map((section, index) => (
    <section 
      key={`${section.heading ?? "section"}-${index}`} 
      className="space-y-4 scroll-mt-8"
      id={section.heading ? section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined}
    >
      {section.heading ? (
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {section.heading}
        </h2>
      ) : null}
      <div className="space-y-4 text-base leading-relaxed sm:text-lg sm:leading-relaxed">
        {section.body?.map((paragraph, bodyIndex) => (
          <p key={`paragraph-${bodyIndex}`} className="text-slate-700">
            {renderFormattedText(paragraph)}
          </p>
        ))}
        {section.bulletPoints ? (
          <ul className="space-y-3 rounded-lg border border-amber-100 bg-amber-50/30 p-5 sm:p-6">
            {section.bulletPoints.map((item, bulletIndex) => (
              <li key={`bullet-${bulletIndex}`} className="flex gap-3 text-slate-700">
                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                <span className="flex-1">{renderFormattedText(item)}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  ));
}

export default async function MilesPointsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getMilesPointsArticleBySlug(slug);
  const { previous, next } = getAdjacentMilesPointsArticles(slug);

  if (!article) {
    notFound();
  }

  return (
    <ArticleLayout article={article} previousArticle={previous} nextArticle={next}>
      {renderSections(article.sections)}
    </ArticleLayout>
  );
}
