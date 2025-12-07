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
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  sections: MilesPointsSection[];
};

type ArticleSummary = Pick<
  MilesPointsArticle,
  "slug" | "title" | "excerpt" | "category" | "readTime" | "publishedOn" | "tags"
>;

const loadArticles = cache(async () => {
  const data = await import("@/data/milesPointsExplained.json");
  return data.default as MilesPointsArticle[];
});

export async function getArticleSummaries(): Promise<ArticleSummary[]> {
  const articles = await loadArticles();
  return [...articles]
    .sort((a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime())
    .map(({ slug, title, excerpt, category, readTime, publishedOn, tags }) => ({
      slug,
      title,
      excerpt,
      category,
      readTime,
      publishedOn,
      tags,
    }));
}

export async function getArticleBySlug(slug: string): Promise<MilesPointsArticle | null> {
  const articles = await loadArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getArticleSlugs(): Promise<string[]> {
  const articles = await loadArticles();
  return articles.map((article) => article.slug);
}
