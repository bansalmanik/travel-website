import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { BlogPostCard } from "@/app/components/blog/BlogPostCard";
import { getAllTags, getPostsByTag } from "@/lib/blog";

interface TagPageProps {
  params: { tag: string };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return Object.keys(tags).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  if (!params?.tag) return {};

  const tagName = params.tag.replace("-", " ");
  return {
    title: `${tagName} | Tags | Miles Go Round`,
    description: `Articles tagged with ${tagName}`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const tagName = params.tag;
  const posts = await getPostsByTag(tagName);

  if (!posts.length) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-slate-900">
            Blog
          </Link>
          <span>/</span>
          <Link href="/blog#tags" className="hover:text-slate-900">
            Tags
          </Link>
          <span>/</span>
          <span className="text-slate-900">{tagName}</span>
        </nav>

        <header className="mb-12">
          <h1 className="mb-2 text-4xl font-bold text-slate-900">#{tagName}</h1>
          <p className="text-lg text-slate-600">{posts.length} articles</p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
