import { cache } from "react";

import type {
  MilesPointsArticle,
  MilesPointsArticleSummary,
} from "@/app/travel-with-points/miles-and-points-explained/types";

const loadArticles = cache(async (): Promise<MilesPointsArticle[]> => {
  const data = await import("@/data/milesPointsExplained.json");
  return (data.default ?? data) as MilesPointsArticle[];
});

export async function getAllMilesPointsArticleSummaries(): Promise<
  MilesPointsArticleSummary[]
> {
  const articles = await loadArticles();

  return articles.map(({ sections, ...summaryFields }) => {
    void sections;
    return summaryFields;
  });
}

export async function getMilesPointsArticleBySlug(
  slug: string,
): Promise<MilesPointsArticle | null> {
  const articles = await loadArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}
