import rawArticles from "@/data/milesPointsExplained.json";
import type {
  MilesPointsArticle,
  MilesPointsArticleSummary,
} from "@/app/travel-with-points/miles-and-points-explained/types";

const articles = rawArticles as MilesPointsArticle[];
const articleIndex = new Map(articles.map((article) => [article.slug, article]));

function mapArticles<T>(selector: (article: MilesPointsArticle) => T): T[] {
  return articles.map(selector);
}

export function getAllMilesPointsArticles(): MilesPointsArticle[] {
  return articles;
}

export function getMilesPointsArticleSummaries(): MilesPointsArticleSummary[] {
  return mapArticles(({ sections, ...summary }) => {
    void sections;

    return summary;
  });
}

export function getMilesPointsArticleBySlug(
  slug: string,
): MilesPointsArticle | undefined {
  return articleIndex.get(slug);
}

export function getMilesPointsArticleSlugs(): string[] {
  return mapArticles((article) => article.slug);
}
