import { promises as fs } from "fs";

export type BlogSummary = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  heroGradient: string;
};

export type BlogPost = BlogSummary & {
  content: string[];
  highlights: string[];
};

const blogListPath = new URL("./blogs.json", import.meta.url);
const blogPostsDirectory = new URL("./posts/", import.meta.url);

async function readJsonFile<T>(filePath: URL): Promise<T> {
  const fileContents = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContents) as T;
}

export async function getAllBlogSummaries(): Promise<BlogSummary[]> {
  return readJsonFile<BlogSummary[]>(blogListPath);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = new URL(`./${slug}.json`, blogPostsDirectory);

  try {
    return await readJsonFile<BlogPost>(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }

    throw error;
  }
}
