import articles from "@/data/milesPointsExplained.json";
import type { MilesPointsArticle } from "@/app/travel-with-points/miles-and-points-explained/types";

export function getAllMilesPointsArticles(): MilesPointsArticle[] {
  return articles as MilesPointsArticle[];
}

export function getMilesPointsArticleBySlug(slug: string): MilesPointsArticle | undefined {
  return getAllMilesPointsArticles().find((article) => article.slug === slug);
}

export function getMilesPointsArticleSlugs(): string[] {
  return getAllMilesPointsArticles().map((article) => article.slug);
}
