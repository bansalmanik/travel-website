import fs from "fs/promises";
import path from "path";
import { BlogPost, Heading, VALID_CATEGORIES } from "./blogTypes";
export { VALID_CATEGORIES } from "./blogTypes";

const BLOG_ROOT = path.join(process.cwd(), "content", "blog");

type Frontmatter = Omit<BlogPost, "content" | "readTime" | "wordCount" | "url"> & {
  readTime?: string;
  wordCount?: number;
  url?: string;
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function parseValue(raw: string): unknown {
  const value = raw.trim();
  if (value === "true") return true;
  if (value === "false") return false;
  if (value.startsWith("[") && value.endsWith("]")) {
    try {
      const normalized = value.replace(/'/g, "\"");
      return JSON.parse(normalized);
    } catch (error) {
      console.warn("Failed to parse array value", error);
    }
  }
  if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  const asNumber = Number(value);
  if (!Number.isNaN(asNumber) && value !== "") return asNumber;
  return value;
}

function parseFrontmatter(fileContent: string): { data: Partial<Frontmatter>; content: string } {
  const delimiter = "---";
  if (!fileContent.startsWith(delimiter)) {
    return { data: {}, content: fileContent };
  }

  const endIndex = fileContent.indexOf("\n" + delimiter, delimiter.length);
  if (endIndex === -1) {
    return { data: {}, content: fileContent };
  }

  const rawData = fileContent.slice(delimiter.length + 1, endIndex);
  const content = fileContent.slice(endIndex + delimiter.length + 2);

  const lines = rawData.split(/\r?\n/);
  const root: Record<string, any> = {};
  const stack: { indent: number; obj: Record<string, any> }[] = [{ indent: -1, obj: root }];

  for (const line of lines) {
    if (!line.trim()) continue;
    const indent = line.match(/^\s*/)?.[0].length ?? 0;
    const trimmed = line.trim();

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const current = stack[stack.length - 1].obj;
    const [rawKey, ...rest] = trimmed.split(":");
    const key = rawKey.trim();
    const value = rest.join(":").trim();

    if (!value) {
      const child: Record<string, any> = {};
      current[key] = child;
      stack.push({ indent, obj: child });
      continue;
    }

    current[key] = parseValue(value);
  }

  return { data: root, content: content.trim() };
}

function calculateReadingStats(content: string): { words: number; text: string } {
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return { words, text: `${minutes} min read` };
}

function ensurePostShape(frontmatter: Partial<Frontmatter>, content: string, category: string): BlogPost | null {
  const slug = (frontmatter.slug as string) || "";
  const title = (frontmatter.title as string) || "";
  const excerpt = (frontmatter.excerpt as string) || "";
  const author = (frontmatter.author as string) || "";
  const publishedOn = (frontmatter.publishedOn as string) || "";
  const tags = (frontmatter.tags as string[]) || [];
  const featured = Boolean(frontmatter.featured);
  const heroImage = frontmatter.heroImage as BlogPost["heroImage"] | undefined;
  const seoTitle = (frontmatter.seoTitle as string) || title;
  const seoDescription = (frontmatter.seoDescription as string) || excerpt;

  if (!slug || !title || !category) return null;
  if (!heroImage?.src || !heroImage?.alt) return null;

  const stats = calculateReadingStats(content);

  return {
    slug,
    title,
    excerpt,
    content,
    author,
    publishedOn,
    updatedOn: frontmatter.updatedOn,
    category,
    tags,
    featured,
    heroImage,
    seoTitle,
    seoDescription,
    readTime: stats.text,
    wordCount: stats.words,
    url: `/${slug}/`,
  };
}

async function loadPostFromFile(filePath: string, category: string): Promise<BlogPost | null> {
  const fileContent = await fs.readFile(filePath, "utf-8");
  const { data, content } = parseFrontmatter(fileContent);
  return ensurePostShape(data, content, category);
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];

  for (const category of VALID_CATEGORIES) {
    const categoryPath = path.join(BLOG_ROOT, category);
    try {
      const files = await fs.readdir(categoryPath);
      for (const file of files) {
        if (!file.endsWith(".mdx")) continue;
        const filePath = path.join(categoryPath, file);
        const post = await loadPostFromFile(filePath, category);
        if (post) {
          posts.push(post);
        } else {
          console.warn(`Skipping ${filePath}: missing required fields`);
        }
      }
    } catch (error) {
      console.warn(`Category ${category} not found, skipping`);
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
    .map((entry) => entry.post);
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

export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const lines = content.split(/\r?\n/);
  lines.forEach((line) => {
    const match = /^(#{1,6})\s+(.*)/.exec(line.trim());
    if (match) {
      const level = match[1].length;
      const title = match[2].trim();
      headings.push({ id: slugify(title), title, level });
    }
  });
  return headings;
}

function formatInline(text: string): string {
  let formatted = text;
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  formatted = formatted.replace(/\*(.+?)\*/g, "<em>$1</em>");
  formatted = formatted.replace(/`(.+?)`/g, "<code>$1</code>");
  formatted = formatted.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  return formatted;
}

export function renderMarkdown(content: string): string {
  const lines = content.split(/\r?\n/);
  const html: string[] = [];
  let inList = false;
  let inOrderedList = false;

  const closeLists = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
    if (inOrderedList) {
      html.push("</ol>");
      inOrderedList = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      closeLists();
      continue;
    }

    if (line.startsWith("### ")) {
      closeLists();
      const title = line.replace(/^###\s+/, "");
      html.push(`<h3 id="${slugify(title)}">${formatInline(title)}</h3>`);
      continue;
    }
    if (line.startsWith("## ")) {
      closeLists();
      const title = line.replace(/^##\s+/, "");
      html.push(`<h2 id="${slugify(title)}">${formatInline(title)}</h2>`);
      continue;
    }
    if (line.startsWith("# ")) {
      closeLists();
      const title = line.replace(/^#\s+/, "");
      html.push(`<h1 id="${slugify(title)}">${formatInline(title)}</h1>`);
      continue;
    }

    if (line.startsWith("- ")) {
      if (!inList) {
        closeLists();
        inList = true;
        html.push("<ul>");
      }
      const item = line.replace(/^-\s+/, "");
      html.push(`<li>${formatInline(item)}</li>`);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      if (!inOrderedList) {
        closeLists();
        inOrderedList = true;
        html.push("<ol>");
      }
      const item = line.replace(/^\d+\.\s+/, "");
      html.push(`<li>${formatInline(item)}</li>`);
      continue;
    }

    const paragraph = formatInline(line.trim());
    html.push(`<p>${paragraph}</p>`);
  }

  closeLists();
  return html.join("\n");
}
