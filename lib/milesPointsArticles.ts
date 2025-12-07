import { cache } from "react";

import type { MilesPointsArticle } from "@/app/travel-with-points/miles-and-points-explained/types";

async function loadJsonArticles(): Promise<MilesPointsArticle[]> {
  const data = await import("@/data/milesPointsExplained.json");
  return data.default as MilesPointsArticle[];
}

const loadArticles = cache(loadJsonArticles);

export async function getAllMilesPointsArticles(): Promise<MilesPointsArticle[]> {
  const articles = await loadArticles();
  return [...articles];
}

export async function getMilesPointsArticleBySlug(
  slug: string,
): Promise<MilesPointsArticle | undefined> {
  const articles = await loadArticles();
  return articles.find((article) => article.slug === slug);
}

export async function getMilesPointsArticleSlugs(): Promise<string[]> {
  const articles = await loadArticles();
  return articles.map((article) => article.slug);
}
