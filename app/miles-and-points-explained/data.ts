import { cache } from "react";

export type MilesPointsSection = {
  heading?: string;
  body?: string[];
  bulletPoints?: string[];
};

export type MilesPointsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedOn: string;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  sections: MilesPointsSection[];
};

async function loadJsonArticles(): Promise<MilesPointsArticle[]> {
  const data = await import("./articles.json");
  return data.default as MilesPointsArticle[];
}

const loadArticles = cache(async () => {
  const articles = await loadJsonArticles();
  return articles;
});

export async function getAllArticleSummaries(): Promise<MilesPointsArticle[]> {
  return loadArticles();
}

export async function getArticleBySlug(slug: string): Promise<MilesPointsArticle | null> {
  const articles = await loadArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}
