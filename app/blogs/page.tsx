import Link from "next/link";
import { blogPosts } from "./data";

export const metadata = {
  title: "Travel Explorer | Blogs",
  description: "Discover travel inspiration, itineraries, and stories from around the globe.",
};

export default function BlogsPage() {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-slate-100 py-20 text-zinc-900 dark:from-black dark:via-zinc-950 dark:to-black dark:text-zinc-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6">
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-500">Journal</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            Stories to Inspire Your Next Getaway
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            From desert sunsets to neon skylines, our travel writers bring the world to your screen. Explore curated guides,
            insider tips, and heartfelt stories from every corner of the globe.
          </p>
        </section>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className={`h-40 bg-gradient-to-br ${post.heroGradient}`} />
              <div className="flex flex-1 flex-col gap-4 p-6">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 transition-colors group-hover:bg-zinc-900 group-hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:bg-zinc-50 dark:group-hover:text-zinc-900">
                  {post.category}
                </span>
                <h2 className="text-2xl font-semibold leading-snug transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600 dark:bg-blue-500/20 dark:text-blue-300">
                      {post.author.charAt(0)}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm text-zinc-700 dark:text-zinc-200">{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
