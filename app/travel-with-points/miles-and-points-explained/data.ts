import { cache } from "react";

import type { MilesPointsArticle, MilesPointsArticleSummary } from "./types";

async function loadJsonArticles(): Promise<MilesPointsArticle[]> {
  const data = await import("@/data/milesPointsExplained.json");
  return data.default as MilesPointsArticle[];
}

const loadArticles = cache(async () => {
  const articles = await loadJsonArticles();

  return articles.map((article) => ({
    ...article,
    sections: article.sections.map((section) => ({
      ...section,
      body: [...section.body],
    })),
  }));
});

export async function getAllMilesPointsArticleSummaries(): Promise<MilesPointsArticleSummary[]> {
  const articles = await loadArticles();

  return articles.map(
    ({ slug, title, excerpt, category, readTime, publishedOn, updatedOn, seoTitle, seoDescription, tags }) => ({
      slug,
      title,
      excerpt,
      category,
      readTime,
      publishedOn,
      updatedOn,
      seoTitle,
      seoDescription,
      tags,
    }),
  );
}

export async function getMilesPointsArticleBySlug(slug: string): Promise<MilesPointsArticle | null> {
  const articles = await loadArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getAllMilesPointsArticles(): Promise<MilesPointsArticle[]> {
  return loadArticles();
}
