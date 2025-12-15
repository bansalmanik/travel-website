import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import MarkdownRenderer from "@/app/components/blog/MarkdownRenderer";
import RelatedPosts from "@/app/components/blog/RelatedPosts";
import TableOfContents from "@/app/components/blog/TableOfContents";
import { extractHeadings, getAllBlogPosts, getBlogPost, getRelatedPosts } from "@/lib/blog";

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-5xl px-6 py-6">
        <nav className="flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog/" className="hover:text-slate-900">
            Blog
          </Link>
          <span>/</span>
          <Link href={`/blog/${post.category}/`} className="hover:text-slate-900 capitalize">
            {post.category.replace("-", " ")}
          </Link>
          <span>/</span>
          <span className="text-slate-900">{post.title}</span>
        </nav>
      </div>

      <article className="mx-auto max-w-6xl px-6 pb-16">
        <header className="mb-10">
          <div className="mb-4">
            <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-900">
              {post.category.replace("-", " ").toUpperCase()}
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-slate-900 sm:text-5xl">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span>{post.author}</span>
            <span aria-hidden>•</span>
            <time dateTime={post.publishedOn}>
              {new Date(post.publishedOn).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span aria-hidden>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(220px,1fr)]">
          <div>
            <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl">
              <Image
                src={post.heroImage.src}
                alt={post.heroImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>

            <MarkdownRenderer content={post.content} />

            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tags/${tag}/`}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-10 lg:self-start">
            <TableOfContents headings={headings} />
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">At a glance</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>
                  <span className="font-medium">Published:</span>{" "}
                  {new Date(post.publishedOn).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </li>
                {post.updatedOn && (
                  <li>
                    <span className="font-medium">Updated:</span>{" "}
                    {new Date(post.updatedOn).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </li>
                )}
                <li>
                  <span className="font-medium">Read time:</span> {post.readTime}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>

      <RelatedPosts posts={relatedPosts} />
    </div>
  );
}
