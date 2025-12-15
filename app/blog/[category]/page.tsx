import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { BlogPostCard } from "@/app/components/blog/BlogPostCard";
import { VALID_CATEGORIES, getPostsByCategory } from "@/lib/blog";

interface CategoryPageProps {
  params: { category: string };
}

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  if (!params?.category || !VALID_CATEGORIES.includes(params.category)) return {};

  const categoryName = params.category.replace("-", " ");
  return {
    title: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} | Blog | Miles Go Round`,
    description: `Browse all articles about ${categoryName}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  if (!VALID_CATEGORIES.includes(params.category)) notFound();

  const posts = await getPostsByCategory(params.category);
  const categoryName = params.category.replace("-", " ");

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
          <span className="capitalize text-slate-900">{categoryName}</span>
        </nav>

        <header className="mb-12">
          <h1 className="mb-2 text-4xl font-bold capitalize text-slate-900">{categoryName}</h1>
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
