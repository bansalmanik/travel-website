export type MilesPointsArticleSection = {
  heading?: string;
  body: string[];
};

export type MilesPointsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedOn: string;
  updatedOn?: string;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  sections: MilesPointsArticleSection[];
};
