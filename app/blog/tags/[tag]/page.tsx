import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { BlogPostCard } from "@/app/components/blog/BlogPostCard";
import { getAllBlogPosts, getAllTags, getPostsByTag, getTagDisplayName } from "@/lib/blog";

interface TagPageProps {
  params: { tag: string };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return Object.keys(tags).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  if (!params?.tag) return {};

  const allPosts = await getAllBlogPosts();
  const displayName = getTagDisplayName(params.tag, allPosts);
  const description = `Browse all articles tagged with ${displayName}`;

  return {
    title: `${displayName} | Blog Tags | Miles Go Round`,
    description,
    openGraph: {
      title: `${displayName} | Blog Tags | Miles Go Round`,
      description,
      url: `https://milesgoround.com/blog/tags/${params.tag}`,
    },
    alternates: {
      canonical: `https://milesgoround.com/blog/tags/${params.tag}`,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  if (!params?.tag) notFound();

  const posts = await getPostsByTag(params.tag);
  if (!posts.length) notFound();

  const tagLabel = getTagDisplayName(params.tag, posts);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
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
          <span className="text-slate-900">{tagLabel}</span>
        </nav>

        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">Articles tagged “{tagLabel}”</h1>
          <p className="text-lg text-slate-600">{posts.length} article{posts.length === 1 ? "" : "s"}</p>
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
