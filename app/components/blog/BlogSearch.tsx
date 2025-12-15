"use client";

import { useMemo, useState } from "react";

import { BlogPost } from "@/lib/blog";
import BlogPostCard from "./BlogPostCard";

type SearchablePost = Omit<BlogPost, "content">;

interface BlogSearchProps {
  posts: SearchablePost[];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    if (!term) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term)),
    );
  }, [posts, query]);

  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Search articles</h2>
          <p className="text-sm text-slate-600">Find guides by keyword or tag.</p>
        </div>
        <label className="relative w-full sm:w-80">
          <span className="sr-only">Search blog posts</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for credit cards, hotels, airlines..."
            className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
          />
          <svg
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.64 5.64a7.5 7.5 0 0011 11z" />
          </svg>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-600">No articles found. Try another keyword.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
