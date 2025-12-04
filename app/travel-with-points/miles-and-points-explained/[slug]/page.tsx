import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleLayout } from "../components/ArticleLayout";
import {
  getMilesPointsArticleBySlug,
  getMilesPointsArticleSlugs,
} from "@/lib/milesPointsExplained";

export function generateStaticParams() {
  return getMilesPointsArticleSlugs().map((slug) => ({ slug }));
}

type PageProps = {
  params: { slug: string };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const article = getMilesPointsArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article not found | Miles Go Round",
    };
  }

  const title = article.seoTitle ?? article.title;
  const description = article.seoDescription ?? article.excerpt;
  const url = `https://example.com/travel-with-points/miles-and-points-explained/${article.slug}`;

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
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function MilesPointsArticlePage({ params }: PageProps) {
  const article = getMilesPointsArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return <ArticleLayout article={article} />;
}
