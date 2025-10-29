import path from "path";
import { promises as fs } from "fs";

export type StoryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type BlogSummary = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  city: string;
  country: string;
  coverImage: StoryImage;
};

export type BlogPost = BlogSummary & {
  content: string[];
  highlights: string[];
  gallery?: StoryImage[];
  videoUrl?: string;
};

const storiesPath = path.join(process.cwd(), "app", "blogs", "stories.json");

async function readJsonFile<T>(filePath: string): Promise<T> {
  const fileContents = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContents) as T;
}

async function getAllStories(): Promise<BlogPost[]> {
  return readJsonFile<BlogPost[]>(storiesPath);
}

export async function getAllBlogSummaries(): Promise<BlogSummary[]> {
  const stories = await getAllStories();
  return stories.map(
    ({ slug, title, excerpt, author, date, readTime, category, city, country, coverImage }) => ({
      slug,
      title,
      excerpt,
      author,
      date,
      readTime,
      category,
      city,
      country,
      coverImage,
    }),
  );
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const stories = await getAllStories();
  return stories.find((story) => story.slug === slug) ?? null;
}
