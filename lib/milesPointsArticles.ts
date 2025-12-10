import rawArticles from "@/data/milesPointsExplained.json";
import type { MilesPointsArticle } from "@/app/travel-with-points/miles-and-points-explained/types";

const articles = rawArticles as MilesPointsArticle[];

export function getAllMilesPointsArticles(): MilesPointsArticle[] {
  return [...articles];
}

export function getMilesPointsArticleBySlug(
  slug: string,
): MilesPointsArticle | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getMilesPointsArticleSlugs(): string[] {
  return articles.map((article) => article.slug);
}

export function getAdjacentMilesPointsArticles(slug: string): {
  previous?: MilesPointsArticle;
  next?: MilesPointsArticle;
} {
  const index = articles.findIndex((article) => article.slug === slug);

  if (index === -1) {
    return {};
  }

  return {
    previous: index > 0 ? articles[index - 1] : undefined,
    next: index < articles.length - 1 ? articles[index + 1] : undefined,
  };
}
