"use client";

import { useMemo, useState } from "react";
import { BlogPost } from "@/lib/blogTypes";
import { BlogPostCard } from "./BlogPostCard";

interface BlogSearchProps {
  posts: BlogPost[];
}

export function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return posts.slice(0, 9);
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term)),
    );
  }, [posts, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="w-full text-sm text-slate-700 sm:max-w-md">
          <span className="sr-only">Search blog posts</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles, tags, or topics"
            className="w-full rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </label>
        <p className="text-sm text-slate-600">{filtered.length} results</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
