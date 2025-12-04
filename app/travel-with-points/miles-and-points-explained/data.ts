import articles from "@/data/milesPointsExplained.json";

import type { MilesPointsArticle } from "./types";

const milesPointsArticles = articles as MilesPointsArticle[];

export function getAllMilesPointsArticles(): MilesPointsArticle[] {
    return milesPointsArticles;
}

export function getMilesPointsArticleBySlug(
    slug: string
): MilesPointsArticle | undefined {
    return milesPointsArticles.find((article) => article.slug === slug);
}

export function getMilesPointsArticleSlugs(): string[] {
    return milesPointsArticles.map((article) => article.slug);
}
