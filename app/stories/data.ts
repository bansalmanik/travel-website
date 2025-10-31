import path from "path";
import { promises as fs } from "fs";
import { cache } from "react";

import { getPrivateImageSrc } from "@/lib/privateAssets";

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

type ImageLike = { src: string };

async function resolveImage<T extends ImageLike>(image: T): Promise<T> {
  const resolvedSrc = await getPrivateImageSrc(image.src);

  return {
    ...image,
    src: resolvedSrc,
  };
}

async function resolveOptionalImages<T extends ImageLike>(images?: T[]): Promise<T[] | undefined> {
  if (!images || images.length === 0) {
    return images;
  }

  return Promise.all(images.map((image) => resolveImage(image)));
}

const loadStories = cache(async () => {
  const stories = await readJsonFile<Story[]>(storiesPath);

  return Promise.all(
    stories.map(async (story) => ({
      ...story,
      coverImage: await resolveImage(story.coverImage),
      gallery: await resolveOptionalImages(story.gallery),
    })),
  );
});

export async function getAllStorySummaries(): Promise<StorySummary[]> {
  const stories = await loadStories();
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
  const stories = await loadStories();
  return stories.find((story) => story.slug === slug) ?? null;
}
