import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  if (!params.tag) return {};
  const tagName = params.tag.replace(/-/g, " ");
  return {
    title: `${tagName} | Tags | Blog | Miles Go Round`,
    description: `Browse all articles tagged with ${tagName}`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  if (!params.tag) notFound();

  const posts = await getPostsByTag(params.tag);
  if (!posts.length) notFound();

  const tagName = params.tag.replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-slate-900">
            Blog
          </Link>
          <span>/</span>
          <span className="text-slate-900">Tags</span>
          <span>/</span>
          <span className="text-slate-900">{tagName}</span>
        </nav>

        <header className="mb-10">
          <h1 className="mb-2 text-4xl font-bold capitalize text-slate-900">{tagName}</h1>
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
