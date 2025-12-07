import type { MilesPointsArticle } from "@/app/travel-with-points/miles-and-points-explained/types";

let cachedArticles: MilesPointsArticle[] | null = null;

async function loadMilesPointsArticles(): Promise<MilesPointsArticle[]> {
  if (!cachedArticles) {
    const dataModule = await import("@/data/milesPointsExplained.json");
    cachedArticles = dataModule.default as MilesPointsArticle[];
  }

  return cachedArticles;
}

export async function getAllMilesPointsArticles(): Promise<MilesPointsArticle[]> {
  return [...(await loadMilesPointsArticles())];
}

export async function getMilesPointsArticleBySlug(
  slug: string,
): Promise<MilesPointsArticle | undefined> {
  const articles = await loadMilesPointsArticles();
  return articles.find((article) => article.slug === slug);
}

export async function getMilesPointsArticleSlugs(): Promise<string[]> {
  const articles = await loadMilesPointsArticles();
  return articles.map((article) => article.slug);
}
