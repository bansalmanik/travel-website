import path from "path";
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

const dataDirectory = path.join(process.cwd(), "app", "blogs");
const blogListPath = path.join(dataDirectory, "blogs.json");
const blogPostsDirectory = path.join(dataDirectory, "posts");

async function readJsonFile<T>(filePath: string): Promise<T> {
  const fileContents = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContents) as T;
}

export async function getAllBlogSummaries(): Promise<BlogSummary[]> {
  return readJsonFile<BlogSummary[]>(blogListPath);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(blogPostsDirectory, `${slug}.json`);

  try {
    return await readJsonFile<BlogPost>(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }

    throw error;
  }
}
