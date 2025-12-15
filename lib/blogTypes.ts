export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedOn: string;
  updatedOn?: string;
  category: string;
  tags: string[];
  featured: boolean;
  heroImage: {
    src: string;
    alt: string;
  };
  seoTitle: string;
  seoDescription: string;
  readTime: string;
  wordCount: number;
  url: string;
}

export interface Heading {
  id: string;
  title: string;
  level: number;
}

export const VALID_CATEGORIES = [
  "credit-cards",
  "hotels",
  "airlines",
  "travel-tips",
  "destinations",
] as const;
