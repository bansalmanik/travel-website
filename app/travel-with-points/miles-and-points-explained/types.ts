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
