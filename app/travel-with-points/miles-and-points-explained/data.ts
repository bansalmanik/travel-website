import { cache } from "react";

import type { MilesPointsArticle } from "./types";

const loadArticles = cache(async () => {
  const data = await import("@/data/milesPointsExplained.json");
  return data.default as MilesPointsArticle[];
});

export async function getAllMilesPointsArticles(): Promise<MilesPointsArticle[]> {
  return loadArticles();
}

export async function getMilesPointsArticleBySlug(slug: string): Promise<MilesPointsArticle | null> {
  const articles = await loadArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getMilesPointsArticleSlugs(): Promise<string[]> {
  const articles = await loadArticles();
  return articles.map((article) => article.slug);
}
