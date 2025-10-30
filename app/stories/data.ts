import path from "path";
import { promises as fs } from "fs";

export type StoryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type StorySummary = {
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

export type Story = StorySummary & {
  content: string[];
  highlights: string[];
  gallery?: StoryImage[];
  videoUrl?: string;
};

const storiesPath = path.join(process.cwd(), "app", "stories", "stories.json");

async function readJsonFile<T>(filePath: string): Promise<T> {
  const fileContents = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContents) as T;
}

async function getAllStories(): Promise<Story[]> {
  return readJsonFile<Story[]>(storiesPath);
}

export async function getAllStorySummaries(): Promise<StorySummary[]> {
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

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const stories = await getAllStories();
  return stories.find((story) => story.slug === slug) ?? null;
}
