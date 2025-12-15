import Link from "next/link";

import { BlogPostCard } from "@/app/components/blog/BlogPostCard";
import { BlogSearch } from "@/app/components/blog/BlogSearch";
import { getAllBlogPosts, slugifyTag } from "@/lib/blog";

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
  openGraph: {
    title: "Blog | Miles Go Round",
    description:
      "Expert guides on credit cards, hotels, airlines, and travel tips to maximize your points and miles.",
    url: "https://milesgoround.com/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://milesgoround.com/blog",
  },
};

interface BlogPageProps {
  searchParams?: {
    q?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const posts = await getAllBlogPosts();
  const rawQuery = typeof searchParams?.q === "string" ? searchParams.q : "";
  const query = rawQuery.toLowerCase().trim();

  const featuredPosts = posts.filter((post) => post.featured).slice(0, 3);
  const filteredPosts = query
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => slugifyTag(tag).includes(slugifyTag(query))),
      )
    : posts;

  const latestPosts = filteredPosts.slice(0, 9);
  const popularTags: { label: string; slug: string }[] = [];
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const slug = slugifyTag(tag);
      if (!popularTags.find((item) => item.slug === slug)) {
        popularTags.push({ label: tag, slug });
      }
    });
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <header className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-amber-700">Miles Go Round Blog</p>
          <h1 className="mb-4 text-4xl font-bold text-slate-900 sm:text-5xl">Reward travel made simple</h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Expert guides on maximizing travel rewards, credit card strategies, and insider tips for your next adventure.
          </p>
          <div className="mt-8 flex justify-center">
            <BlogSearch defaultQuery={query} />
          </div>
        </header>

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

        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Featured</h2>
              <Link
                href="/blog?q=featured"
                className="text-sm font-semibold text-amber-700 underline-offset-4 hover:underline"
              >
                See all
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featuredPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-slate-900">Latest Articles</h2>
            {query && (
              <p className="text-sm text-slate-600">
                Showing {latestPosts.length} result{latestPosts.length === 1 ? "" : "s"} for "{query}"
              </p>
            )}
          </div>
          {latestPosts.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-600">
              No articles match your search yet. Try a different keyword.
            </div>
          )}
        </section>

        {popularTags.length ? (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Popular tags</h2>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/blog/tags/${tag.slug}`}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200"
                >
                  #{tag.label}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
