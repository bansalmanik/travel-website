import fs from "fs/promises";
import path from "path";

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

export interface BlogHeading {
  id: string;
  text: string;
  level: number;
}

const VALID_CATEGORIES = [
  "credit-cards",
  "hotels",
  "airlines",
  "travel-tips",
  "destinations",
];

const BLOG_ROOT = path.join(process.cwd(), "content", "blog");

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function parseFrontmatter(fileContent: string) {
  const frontmatterMatch = fileContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!frontmatterMatch) {
    return { frontmatter: null, content: fileContent.trim() };
  }

  const frontmatterText = frontmatterMatch[1].trim();
  let frontmatter: Record<string, unknown> | null = null;
  try {
    frontmatter = JSON.parse(frontmatterText);
  } catch (error) {
    console.warn("Unable to parse frontmatter; ensure it is valid JSON", error);
  }

  const content = fileContent.slice(frontmatterMatch[0].length).trim();
  return { frontmatter, content };
}

function getReadingStats(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return {
    words,
    text: `${minutes} min read`,
  };
}

function ensurePostUrl(slug: string) {
  return `/${slug}/`;
}

export function extractHeadings(content: string): BlogHeading[] {
  const lines = content.split(/\n/);
  const headings: BlogHeading[] = [];

  lines.forEach((line) => {
    const headingMatch = line.match(/^(#{2,3})\s+(.*)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      headings.push({
        id: slugifyHeading(text),
        text,
        level,
      });
    }
  });

  return headings;
}

async function readPostFromFile(filePath: string, category: string): Promise<BlogPost | null> {
  const fileContent = await fs.readFile(filePath, "utf-8");
  const { frontmatter, content } = parseFrontmatter(fileContent);

  if (!frontmatter || typeof frontmatter !== "object") {
    console.warn(`Skipping ${filePath}: missing frontmatter`);
    return null;
  }

  const requiredFields = [
    "slug",
    "title",
    "excerpt",
    "author",
    "publishedOn",
    "category",
    "tags",
    "featured",
    "heroImage",
    "seoTitle",
    "seoDescription",
  ];

  const missingField = requiredFields.find((field) => !(field in frontmatter));
  if (missingField) {
    console.warn(`Skipping ${filePath}: missing required field ${missingField}`);
    return null;
  }

  const stats = getReadingStats(content);
  const slug = String(frontmatter.slug);

  return {
    ...(frontmatter as Record<string, unknown>),
    slug,
    category,
    content,
    wordCount: stats.words,
    readTime: stats.text,
    url: ensurePostUrl(slug),
  } as BlogPost;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];

  for (const category of VALID_CATEGORIES) {
    const categoryPath = path.join(BLOG_ROOT, category);
    try {
      const files = await fs.readdir(categoryPath);
      await Promise.all(
        files
          .filter((file) => file.endsWith(".mdx"))
          .map(async (file) => {
            const filePath = path.join(categoryPath, file);
            const post = await readPostFromFile(filePath, category);
            if (post) {
              posts.push(post);
            }
          }),
      );
    } catch (error) {
      console.warn(`Category ${category} not found, skipping`, error);
    }
  }

  return posts.sort(
    (a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime(),
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.category === category);
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

export function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], maxResults = 4): BlogPost[] {
  const otherPosts = allPosts.filter((post) => post.slug !== currentPost.slug);

  const scored = otherPosts.map((post) => {
    let score = 0;
    if (post.category === currentPost.category) score += 10;
    const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
    score += sharedTags.length;
    return { post, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map((item) => item.post);
}

export async function getAllTags(): Promise<Record<string, number>> {
  const posts = await getAllBlogPosts();
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return tagCounts;
}

export function renderMarkdownToHtml(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const htmlParts: string[] = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      htmlParts.push("</ul>");
      inList = false;
    }
  };

  const formatInline = (text: string) =>
    text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      closeList();
      continue;
    }

    const headingMatch = line.match(/^(#{2,3})\s+(.*)/);
    if (headingMatch) {
      closeList();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const id = slugifyHeading(text);
      htmlParts.push(`<h${level} id="${id}">${formatInline(text)}</h${level}>`);
      continue;
    }

    const listMatch = line.match(/^[-*]\s+(.*)/);
    if (listMatch) {
      if (!inList) {
        inList = true;
        htmlParts.push("<ul>");
      }
      htmlParts.push(`<li>${formatInline(listMatch[1].trim())}</li>`);
      continue;
    }

    closeList();
    htmlParts.push(`<p>${formatInline(line.trim())}</p>`);
  }

  closeList();
  return htmlParts.join("\n");
}
