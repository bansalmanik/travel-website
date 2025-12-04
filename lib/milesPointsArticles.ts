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

export function getMilesPointsArticleNeighbors(slug: string): {
  previous?: MilesPointsArticle;
  next?: MilesPointsArticle;
} {
  const currentIndex = articles.findIndex((article) => article.slug === slug);

  if (currentIndex === -1) {
    return {};
  }

  const previous = currentIndex > 0 ? articles[currentIndex - 1] : undefined;
  const next = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : undefined;

  return { previous, next };
}
