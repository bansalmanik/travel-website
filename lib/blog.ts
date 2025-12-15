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

interface FrontmatterResult {
  data: Partial<BlogPost>;
  content: string;
}

export const VALID_CATEGORIES = [
  "credit-cards",
  "hotels",
  "airlines",
  "travel-tips",
  "destinations",
] as const;

const WORDS_PER_MINUTE = 200;

function parseFrontmatterValue(rawValue: string): unknown {
  const trimmed = rawValue.trim();

  if (trimmed === "true") return true;
  if (trimmed === "false") return false;

  if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
    try {
      return JSON.parse(trimmed.replace(/'/g, '"'));
    } catch (error) {
      console.warn("Failed to parse JSON-like value in frontmatter", error);
    }
  }

  const quotedMatch = trimmed.match(/^"(.+)"$/);
  if (quotedMatch) return quotedMatch[1];

  return trimmed;
}

function parseFrontmatter(fileContent: string): FrontmatterResult {
  if (!fileContent.startsWith("---")) {
    return { data: {}, content: fileContent.trim() };
  }

  const endIndex = fileContent.indexOf("\n---", 3);
  if (endIndex === -1) {
    return { data: {}, content: fileContent.trim() };
  }

  const frontmatterBlock = fileContent.slice(3, endIndex).trim();
  const markdownContent = fileContent.slice(endIndex + 4).trimStart();

  const root: Record<string, unknown> = {};
  const stack: Array<{ indent: number; obj: Record<string, unknown> }> = [
    { indent: -1, obj: root },
  ];

  const lines = frontmatterBlock.split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;

    const indent = line.match(/^\s*/)?.[0].length ?? 0;
    const [rawKey, ...rawRest] = line.trim().split(":");
    const key = rawKey.trim();
    const valuePortion = rawRest.join(":").trim();

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].obj;

    if (!valuePortion) {
      const child: Record<string, unknown> = {};
      parent[key] = child;
      stack.push({ indent, obj: child });
    } else {
      parent[key] = parseFrontmatterValue(valuePortion);
    }
  }

  return { data: root as Partial<BlogPost>, content: markdownContent };
}

function calculateReadStats(content: string) {
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
  return { wordCount, readTime: `${minutes} min read` };
}

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const contentDir = path.join(process.cwd(), "content/blog");
  const posts: BlogPost[] = [];

  for (const category of VALID_CATEGORIES) {
    const categoryPath = path.join(contentDir, category);

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

        const { wordCount, readTime } = calculateReadStats(content);

        posts.push({
          slug: frontmatter.slug as string,
          title: frontmatter.title as string,
          excerpt: (frontmatter.excerpt as string) ?? "",
          content,
          author: (frontmatter.author as string) ?? "Miles Go Round",
          publishedOn: frontmatter.publishedOn as string,
          updatedOn: frontmatter.updatedOn as string | undefined,
          category: frontmatter.category as string,
          tags: (frontmatter.tags as string[]) ?? [],
          featured: Boolean(frontmatter.featured),
          heroImage: (frontmatter.heroImage as BlogPost["heroImage"]) ?? {
            src: "/images/content/cover_1.jpg",
            alt: "Article hero image",
          },
          seoTitle: (frontmatter.seoTitle as string) ?? (frontmatter.title as string),
          seoDescription:
            (frontmatter.seoDescription as string) ?? (frontmatter.excerpt as string),
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
    (a, b) =>
      new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime(),
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
  const normalized = slugifyTag(tag);
  return posts.filter((post) =>
    post.tags.some((postTag) => slugifyTag(postTag) === normalized),
  );
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

    const sharedTags = post.tags.filter((tag) =>
      currentPost.tags.map(slugifyTag).includes(slugifyTag(tag)),
    );
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
      const slug = slugifyTag(tag);
      tagCounts[slug] = (tagCounts[slug] || 0) + 1;
    });
  });

  return tagCounts;
}

export function getTagDisplayName(tagSlug: string, posts: BlogPost[]): string {
  for (const post of posts) {
    const match = post.tags.find((tag) => slugifyTag(tag) === tagSlug);
    if (match) return match;
  }

  return tagSlug.replace(/-/g, " ");
}
