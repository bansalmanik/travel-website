import Image from "next/image";
import Link from "next/link";

import BlogPostCard from "@/app/components/blog/BlogPostCard";
import BlogSearch from "@/app/components/blog/BlogSearch";
import { getAllBlogPosts } from "@/lib/blog";

const CATEGORIES = [
  { slug: "credit-cards", name: "Credit Cards", icon: "💳" },
  { slug: "hotels", name: "Hotels", icon: "🏨" },
  { slug: "airlines", name: "Airlines", icon: "✈️" },
  { slug: "travel-tips", name: "Travel Tips", icon: "💡" },
  { slug: "destinations", name: "Destinations", icon: "🌍" },
];

export const metadata = {
  title: "Blog | Miles Go Round",
  description:
    "Expert guides on credit cards, hotels, airlines, and travel tips to maximize your points and miles.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 3);
  const latestPosts = posts.slice(0, 9);
  const searchablePosts: Omit<typeof posts[number], "content">[] = posts.map(({ content, ...rest }) => rest);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <header className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900 sm:text-5xl">Blog</h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Expert guides on maximizing travel rewards, credit card strategies, and insider tips for your next adventure.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Browse by Category</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/${cat.slug}/`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:shadow-lg"
              >
                <div className="mb-3 text-4xl">{cat.icon}</div>
                <h3 className="font-semibold text-slate-900 group-hover:text-amber-700">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Featured</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {featuredPosts.map((post) => (
                <Link key={post.slug} href={post.url} className="group">
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={post.heroImage.src}
                      alt={post.heroImage.alt}
                      fill
                      className="object-cover transition group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="inline-block rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                      {post.category.replace("-", " ").toUpperCase()}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-amber-700">{post.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                    <p className="mt-2 text-xs text-slate-500">{post.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-16 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Latest Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <BlogSearch posts={searchablePosts} />
      </div>
    </div>
  );
}
