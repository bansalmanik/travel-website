import { cache } from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import Callout from "@/app/components/mdx/Callout";
import ImageGallery from "@/app/components/mdx/ImageGallery";
import YouTube from "@/app/components/mdx/YouTube";

const STORIES_DIR = path.join(process.cwd(), "content", "stories");

// MDX components available in stories
const mdxComponents = {
  Callout,
  ImageGallery,
  YouTube,
};

// ---------- Types ---------- //

export type StoryImage = {
  src: string;
  alt: string;
  caption?: string;
  layout?: "landscape" | "portrait" | "square";
};

export type StoryFrontmatter = {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  instagramHandle?: string;
  publishedOn: string;
  readTime: string;
  category: string;
  city: string;
  country: string;
  coverImage: {
    src: string;
    alt: string;
  };
  videoUrl?: string;
  gallery?: StoryImage[];
  highlights?: string[];
  seoTitle?: string;
  seoDescription?: string;
};

export type StorySummary = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  instagramHandle?: string;
  date: string;
  readTime: string;
  category: string;
  city: string;
  country: string;
  coverImage: {
    src: string;
    alt: string;
  };
};

export type Story = StoryFrontmatter & {
  content: string;
  date: string;
};

// ---------- Helper Functions ---------- //

async function getStoryFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(STORIES_DIR);
    return files.filter((file) => file.endsWith(".mdx"));
  } catch (error) {
    console.error("Error reading stories directory:", error);
    return [];
  }
}

async function readStoryFile(filename: string): Promise<string> {
  const filePath = path.join(STORIES_DIR, filename);
  return fs.readFile(filePath, "utf-8");
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ---------- Main Loaders ---------- //

export const getAllStories = cache(async (): Promise<Story[]> => {
  const files = await getStoryFiles();

  const stories = await Promise.all(
    files.map(async (filename) => {
      const source = await readStoryFile(filename);
      const { data, content } = matter(source);
      const frontmatter = data as StoryFrontmatter;

      return {
        ...frontmatter,
        content,
        date: formatDate(frontmatter.publishedOn),
      };
    })
  );

  // Sort by publishedOn date, newest first
  return stories.sort(
    (a, b) =>
      new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime()
  );
});

export const getAllStorySummaries = cache(
  async (): Promise<StorySummary[]> => {
    const stories = await getAllStories();

    return stories.map((story) => ({
      slug: story.slug,
      title: story.title,
      excerpt: story.excerpt,
      author: story.author,
      instagramHandle: story.instagramHandle,
      date: story.date,
      readTime: story.readTime,
      category: story.category,
      city: story.city,
      country: story.country,
      coverImage: story.coverImage,
    }));
  }
);

export const getStoryBySlug = cache(
  async (slug: string): Promise<Story | null> => {
    const stories = await getAllStories();
    return stories.find((story) => story.slug === slug) ?? null;
  }
);

// ---------- Utility Functions ---------- //

export async function getStoryMetadata(slug: string) {
  const story = await getStoryBySlug(slug);

  if (!story) {
    return null;
  }

  return {
    title: story.seoTitle || `${story.title} | Miles Go Round`,
    description:
      story.seoDescription ||
      story.excerpt ||
      `Read about ${story.title} - a travel story from ${story.city}, ${story.country}`,
    keywords: [
      story.category,
      story.city,
      story.country,
      "travel story",
      "travel blog",
      "travel inspiration",
    ],
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: [
        {
          url: story.coverImage.src,
          alt: story.coverImage.alt,
        },
      ],
      type: "article",
      publishedTime: story.publishedOn,
      authors: [story.author],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.excerpt,
      images: [story.coverImage.src],
    },
  };
}
