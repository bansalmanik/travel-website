import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleLayout } from "@/app/travel-with-points/miles-and-points-explained/article-layout";
import type { MilesPointsArticle } from "@/app/travel-with-points/miles-and-points-explained/types";
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
      title: "Miles & Points Explained | Miles Go Round",
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
        <strong key={`bold-${index}`} className="font-semibold">
          {segment.bold}
        </strong>
      );
    });
  }

  return sections.map((section, index) => (
    <section key={`${section.heading ?? "section"}-${index}`} className="space-y-3">
      {section.heading ? (
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">{section.heading}</h2>
      ) : null}
      <div className="space-y-3 text-base leading-7 text-slate-700">
        {section.body?.map((paragraph, bodyIndex) => (
          <p key={`paragraph-${bodyIndex}`}>{renderFormattedText(paragraph)}</p>
        ))}
        {section.bulletPoints ? (
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            {section.bulletPoints.map((item, bulletIndex) => (
              <li key={`bullet-${bulletIndex}`}>{renderFormattedText(item)}</li>
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
