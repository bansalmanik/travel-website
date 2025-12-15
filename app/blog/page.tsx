import Image from "next/image";
import Link from "next/link";
import { BlogSearch } from "@/app/components/blog/BlogSearch";
import { BlogPostCard } from "@/app/components/blog/BlogPostCard";
import { CategoryBadge } from "@/app/components/blog/CategoryBadge";
import { getAllBlogPosts, VALID_CATEGORIES } from "@/lib/blog";

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
  const latestPosts = posts.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-16 text-center">
          <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-amber-100 text-2xl leading-[3rem] text-amber-800">🧭</div>
          <h1 className="mb-4 text-4xl font-bold text-slate-900 sm:text-5xl">Blog</h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Expert guides on maximizing travel rewards, credit card strategies, and insider tips for your next adventure.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Browse by Category</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/${category.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-3 text-4xl">{category.icon}</div>
                <h3 className="font-semibold text-slate-900 group-hover:text-amber-700">{category.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Featured</h2>
              <Link href="/blog" className="text-sm font-semibold text-amber-700 hover:underline">
                View all articles
              </Link>
            </div>
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
                  <div className="mt-4 space-y-2">
                    <CategoryBadge
                      category={(VALID_CATEGORIES.includes(post.category as any)
                        ? (post.category as (typeof VALID_CATEGORIES)[number])
                        : "travel-tips")}
                    />
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-700">{post.title}</h3>
                    <p className="text-sm text-slate-600">{post.excerpt}</p>
                    <p className="text-xs text-slate-500">{post.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Latest Articles</h2>
            <Link href="/blog" className="text-sm font-semibold text-amber-700 hover:underline">
              View all
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Search the archive</h2>
            <span className="text-sm text-slate-600">{posts.length} total articles</span>
          </div>
          <BlogSearch posts={posts} />
        </section>
      </div>
    </div>
  );
}
