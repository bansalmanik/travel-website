import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { RelatedPosts } from "@/app/components/blog/RelatedPosts";
import { TableOfContents } from "@/app/components/blog/TableOfContents";
import { getAllBlogPosts, getBlogPost, getRelatedPosts, slugifyTag } from "@/lib/blog";

interface BlogPostPageProps {
  params: { slug: string };
}

interface HeadingItem {
  id: string;
  title: string;
  level: number;
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractHeadings(markdown: string): HeadingItem[] {
  const lines = markdown.split(/\r?\n/);
  const headings: HeadingItem[] = [];

  lines.forEach((line) => {
    if (line.startsWith("### ")) {
      const title = line.replace(/^###\s+/, "").trim();
      headings.push({ id: slugifyHeading(title), title, level: 3 });
    } else if (line.startsWith("## ")) {
      const title = line.replace(/^##\s+/, "").trim();
      headings.push({ id: slugifyHeading(title), title, level: 2 });
    }
  });

  return headings;
}

function renderInlineMarkdown(text: string, keyPrefix: string) {
  const segments = text.split(/(\*\*.+?\*\*)/g);

  return segments.map((segment, index) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return (
        <strong key={`${keyPrefix}-bold-${index}`} className="font-semibold text-slate-900">
          {segment.slice(2, -2)}
        </strong>
      );
    }

    return <React.Fragment key={`${keyPrefix}-text-${index}`}>{segment}</React.Fragment>;
  });
}

function renderMarkdown(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (keyIndex: number) => {
    if (!listItems.length) return;
    elements.push(
      <ul key={`list-${keyIndex}`} className="ml-4 list-disc space-y-2 text-slate-700">
        {listItems.map((item, idx) => (
          <li key={`list-${keyIndex}-item-${idx}`}>{renderInlineMarkdown(item, `list-${keyIndex}-${idx}`)}</li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  lines.forEach((line, index) => {
    if (!line.trim()) {
      flushList(index);
      return;
    }

    if (line.startsWith("### ")) {
      flushList(index);
      const title = line.replace(/^###\s+/, "").trim();
      const id = slugifyHeading(title);
      elements.push(
        <h3 key={`h3-${index}`} id={id} className="mt-10 text-xl font-semibold text-slate-900">
          {title}
        </h3>,
      );
      return;
    }

    if (line.startsWith("## ")) {
      flushList(index);
      const title = line.replace(/^##\s+/, "").trim();
      const id = slugifyHeading(title);
      elements.push(
        <h2 key={`h2-${index}`} id={id} className="mt-12 text-2xl font-bold text-slate-900">
          {title}
        </h2>,
      );
      return;
    }

    if (line.startsWith("- ")) {
      listItems.push(line.replace(/^-\s*/, ""));
      return;
    }

    flushList(index);
    elements.push(
      <p key={`p-${index}`} className="text-slate-700">
        {renderInlineMarkdown(line, `p-${index}`)}
      </p>,
    );
  });

  flushList(lines.length + 1);
  return elements;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return {};

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.tags.join(", "),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      publishedTime: post.publishedOn,
      modifiedTime: post.updatedOn,
      authors: [post.author],
      images: [{ url: post.heroImage.src, alt: post.heroImage.alt }],
      url: `https://milesgoround.com${post.url}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [post.heroImage.src],
    },
    alternates: {
      canonical: `https://milesgoround.com${post.url}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  const allPosts = await getAllBlogPosts();
  const relatedPosts = getRelatedPosts(post, allPosts);
  const headings = extractHeadings(post.content);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage.src,
    datePublished: post.publishedOn,
    dateModified: post.updatedOn || post.publishedOn,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Miles Go Round",
      logo: { "@type": "ImageObject", url: "https://milesgoround.com/Logo/MilesGoRound-Logo-Blue.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://milesgoround.com${post.url}` },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-5xl px-6 py-6">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-slate-900">
            Blog
          </Link>
          <span>/</span>
          <Link href={`/blog/${post.category}`} className="hover:text-slate-900 capitalize">
            {post.category.replace(/-/g, " ")}
          </Link>
          <span>/</span>
          <span className="text-slate-900">{post.title}</span>
        </nav>
      </div>

      <article className="mx-auto max-w-6xl px-6 pb-12">
        <header className="mx-auto mb-12 max-w-4xl text-left">
          <div className="mb-4">
            <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-900">
              {post.category.replace(/-/g, " ").toUpperCase()}
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-slate-900 sm:text-5xl">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.publishedOn}>
              {new Date(post.publishedOn).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.updatedOn ? (
              <>
                <span>•</span>
                <span>Updated {new Date(post.updatedOn).toLocaleDateString("en-US")}</span>
              </>
            ) : null}
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="relative mb-12 aspect-video overflow-hidden rounded-2xl">
          <Image
            src={post.heroImage.src}
            alt={post.heroImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        <div className="grid gap-12 lg:grid-cols-[3fr_1fr]">
          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline">
            {renderMarkdown(post.content)}

            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tags/${slugifyTag(tag)}`}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          <TableOfContents headings={headings} />
        </div>
      </article>

      <RelatedPosts posts={relatedPosts} />
    </div>
  );
}
