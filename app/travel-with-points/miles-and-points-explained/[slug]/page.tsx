import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleLayout } from "../article-layout";
import { getMilesPointsArticleBySlug, getMilesPointsArticleSlugs } from "@/lib/milesPointsExplained";

interface MilesPointsArticlePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getMilesPointsArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: MilesPointsArticlePageProps): Metadata {
  const article = getMilesPointsArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article not found | Miles Go Round",
      description: "The requested article could not be found.",
    };
  }

  const title = article.seoTitle || article.title;
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
      type: "article",
      url: `https://example.com/travel-with-points/miles-and-points-explained/${article.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function MilesPointsArticlePage({ params }: MilesPointsArticlePageProps) {
  const article = getMilesPointsArticleBySlug(params.slug);

  if (!article) {
    return notFound();
  }

  return <ArticleLayout article={article} />;
}
