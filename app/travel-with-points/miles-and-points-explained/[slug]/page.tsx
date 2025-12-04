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
  return sections.map((section, index) => (
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
