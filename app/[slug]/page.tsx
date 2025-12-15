import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getAllBlogPosts,
  getBlogPost,
  getRelatedPosts,
  getTableOfContents,
  renderMarkdown,
} from "@/lib/blog";
import { TableOfContents } from "@/app/components/blog/TableOfContents";
import { RelatedPosts } from "@/app/components/blog/RelatedPosts";
import { CategoryBadge } from "@/app/components/blog/CategoryBadge";

interface BlogPostPageProps {
  params: { slug: string };
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
    keywords: post.tags,
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
  const tableOfContents = getTableOfContents(post.content);
  const html = renderMarkdown(post.content);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-6xl px-6 py-10 lg:py-16">
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-slate-900">
            Blog
          </Link>
          <span>/</span>
          <Link href={`/blog/${post.category}`} className="hover:text-slate-900 capitalize">
            {post.category.replace("-", " ")}
          </Link>
          <span>/</span>
          <span className="text-slate-900">{post.title}</span>
        </nav>

        <article className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <CategoryBadge category={post.category} />
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <span>{post.author}</span>
                <span>•</span>
                <time dateTime={post.publishedOn}>
                  {new Date(post.publishedOn).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="mb-4 text-4xl font-bold text-slate-900 sm:text-5xl">{post.title}</h1>
            <p className="mb-10 text-lg text-slate-600">{post.excerpt}</p>

            <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl bg-slate-100">
              {post.heroImage?.src && (
                <Image
                  src={post.heroImage.src}
                  alt={post.heroImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                  priority
                />
              )}
            </div>

            <div
              className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tags/${tag}`}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            <RelatedPosts posts={relatedPosts} />
          </div>

          <div className="mt-10 lg:mt-0">
            <TableOfContents items={tableOfContents} />
          </div>
        </article>
      </div>
    </div>
  );
}
