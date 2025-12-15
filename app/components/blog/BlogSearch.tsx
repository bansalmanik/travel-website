"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";

type SearchablePost = Pick<BlogPost, "slug" | "title" | "excerpt" | "tags" | "url">;

export function BlogSearch({ posts }: { posts: SearchablePost[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return posts.slice(0, 6);
    const term = query.toLowerCase();
    return posts
      .filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.tags.some((tag) => tag.toLowerCase().includes(term)) ||
          post.excerpt.toLowerCase().includes(term),
      )
      .slice(0, 10);
  }, [posts, query]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4">
        <label htmlFor="blog-search" className="text-sm font-semibold text-slate-800">
          Search articles
        </label>
        <input
          id="blog-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or tag..."
          className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:bg-white"
        />
      </div>
      <ul className="space-y-3">
        {results.map((post) => (
          <li key={post.slug}>
            <Link href={post.url} className="group block rounded-lg px-3 py-2 transition hover:bg-slate-50">
              <p className="font-semibold text-slate-900 group-hover:text-amber-700">{post.title}</p>
              <p className="text-xs text-slate-500 line-clamp-2">{post.excerpt}</p>
            </Link>
          </li>
        ))}
        {!results.length && <li className="text-sm text-slate-500">No articles found.</li>}
      </ul>
    </div>
  );
}
