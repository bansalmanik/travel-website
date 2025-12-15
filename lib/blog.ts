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

export interface TableOfContentsItem {
  id: string;
  text: string;
  depth: number;
}

const VALID_CATEGORIES = [
  "credit-cards",
  "hotels",
  "airlines",
  "travel-tips",
  "destinations",
];

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

interface ParsedFrontmatter {
  data: Record<string, any>;
  content: string;
}

function parseFrontmatter(source: string): ParsedFrontmatter {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: source };
  }

  const [, rawFrontmatter, markdown] = match;
  const lines = rawFrontmatter.split(/\r?\n/);
  const root: Record<string, any> = {};
  const stack: { indent: number; obj: Record<string, any> }[] = [
    { indent: 0, obj: root },
  ];

  const parseValue = (value: string) => {
    const trimmed = value.trim();
    if (trimmed === "true" || trimmed === "false") return trimmed === "true";
    if (trimmed === "null") return null;
    if ((trimmed.startsWith("[") && trimmed.endsWith("]")) || (trimmed.startsWith("{") && trimmed.endsWith("}"))) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return trimmed;
      }
    }
    if (/^[-+]?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
    return trimmed.replace(/^"|"$/g, "");
  };

  lines.forEach((line) => {
    if (!line.trim()) return;

    const indent = line.match(/^\s*/)?.[0].length ?? 0;
    while (stack.length > 1 && indent < stack[stack.length - 1].indent) {
      stack.pop();
    }

    const [rawKey, ...rest] = line.trim().split(":");
    const key = rawKey.trim();
    const valueString = rest.join(":").trim();

    if (!valueString) {
      const container: Record<string, any> = {};
      stack[stack.length - 1].obj[key] = container;
      stack.push({ indent: indent + 2, obj: container });
      return;
    }

    stack[stack.length - 1].obj[key] = parseValue(valueString);
  });

  return { data: root, content: markdown.trim() };
}

function calculateReadingStats(markdown: string) {
  const words = markdown.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return { wordCount, readTime: `${minutes} min read` };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];

  for (const category of VALID_CATEGORIES) {
    const categoryPath = path.join(CONTENT_DIR, category);
    try {
      const files = await fs.readdir(categoryPath);
      for (const file of files) {
        if (!file.endsWith(".mdx")) continue;
        const filePath = path.join(categoryPath, file);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { data: frontmatter, content } = parseFrontmatter(fileContent);

        if (!frontmatter.slug || !frontmatter.title || !frontmatter.category) {
          console.warn(`Skipping ${file}: missing required fields`);
          continue;
        }

        const { wordCount, readTime } = calculateReadingStats(content);

        posts.push({
          slug: frontmatter.slug,
          title: frontmatter.title,
          excerpt: frontmatter.excerpt ?? "",
          content,
          author: frontmatter.author ?? "",
          publishedOn: frontmatter.publishedOn ?? frontmatter.date ?? "",
          updatedOn: frontmatter.updatedOn ?? frontmatter.publishedOn ?? "",
          category: frontmatter.category ?? category,
          tags: frontmatter.tags ?? [],
          featured: Boolean(frontmatter.featured),
          heroImage: frontmatter.heroImage ?? { src: "", alt: "" },
          seoTitle: frontmatter.seoTitle ?? frontmatter.title ?? "",
          seoDescription: frontmatter.seoDescription ?? frontmatter.excerpt ?? "",
          readTime,
          wordCount,
          url: `/${frontmatter.slug}`,
        });
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
  return posts.filter((post) => post.tags?.includes(tag));
}

export function getRelatedPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  maxResults = 4,
): BlogPost[] {
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
  const counts: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags?.forEach((tag: string) => {
      counts[tag] = (counts[tag] ?? 0) + 1;
    });
  });

  return counts;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getTableOfContents(markdown: string): TableOfContentsItem[] {
  const lines = markdown.split(/\r?\n/);
  const headings: TableOfContentsItem[] = [];

  lines.forEach((line) => {
    const match = line.match(/^(#{2,3})\s+(.*)$/);
    if (match) {
      const depth = match[1].length;
      const text = match[2].trim();
      headings.push({ id: slugify(text), text, depth });
    }
  });

  return headings;
}

export function renderMarkdown(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const html: string[] = [];
  let inList = false;

  const inline = (text: string) =>
    text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-amber-700">$1</a>');

  lines.forEach((line) => {
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (/^\s*-\s+/.test(line)) {
      if (!inList) {
        inList = true;
        html.push("<ul>");
      }
      html.push(`<li>${inline(line.replace(/^\s*-\s+/, ""))}</li>`);
      return;
    }

    if (inList) {
      html.push("</ul>");
      inList = false;
    }

    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const id = slugify(text);
      html.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      return;
    }

    if (line.startsWith("> ")) {
      html.push(`<blockquote>${inline(line.replace(/^>\s*/, ""))}</blockquote>`);
      return;
    }

    if (!line.trim()) {
      return;
    }

    html.push(`<p>${inline(line)}</p>`);
  });

  if (inList) {
    html.push("</ul>");
  }

  return html.join("\n");
}

export { VALID_CATEGORIES };
