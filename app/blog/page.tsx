import Link from "next/link";

import { BlogSearch } from "@/app/components/blog/BlogSearch";
import { BlogPostCard } from "@/app/components/blog/BlogPostCard";
import { getAllBlogPosts, getAllTags } from "@/lib/blog";

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
  const tags = await getAllTags();
  const searchPosts = posts.map(({ slug, title, excerpt, tags, url }) => ({
    slug,
    title,
    excerpt,
    tags,
    url,
  }));
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 3);
  const latestPosts = posts.slice(0, 9);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <header className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Miles Go Round</p>
          <h1 className="mb-4 text-4xl font-bold text-slate-900 sm:text-5xl">Blog</h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Expert guides on maximizing travel rewards, credit card strategies, and insider tips for your next adventure.
          </p>
        </header>

        <section className="mb-16">
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-slate-900">Featured</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {featuredPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
            <div>
              <BlogSearch posts={searchPosts} />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Browse by Category</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/${cat.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:shadow-lg"
              >
                <div className="mb-3 text-4xl">{cat.icon}</div>
                <h3 className="font-semibold text-slate-900 group-hover:text-amber-700">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section id="tags" className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Popular tags</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(tags).map(([tag, count]) => (
              <Link
                key={tag}
                href={`/blog/tags/${tag}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-amber-500 hover:text-amber-700"
              >
                #{tag} <span className="text-slate-400">({count})</span>
              </Link>
            ))}
          </div>
        </section>

        {latestPosts.length > 0 && (
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Latest Articles</h2>
              <Link
                href="/"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
              >
                Back to home
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
