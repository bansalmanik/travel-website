import Image from "next/image";
import Link from "next/link";

import { BlogPost } from "@/lib/blog";
import { CategoryBadge } from "./CategoryBadge";

interface BlogPostCardProps {
  post: BlogPost;
  showExcerpt?: boolean;
}

export function BlogPostCard({ post, showExcerpt = true }: BlogPostCardProps) {
  return (
    <Link
      href={post.url}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <Image
          src={post.heroImage.src}
          alt={post.heroImage.alt}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <CategoryBadge category={post.category} />
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-amber-700 sm:text-xl">
            {post.title}
          </h3>
          {showExcerpt && (
            <p className="line-clamp-2 text-sm text-slate-600">{post.excerpt}</p>
          )}
        </div>
        <p className="text-xs font-medium text-slate-500">
          {new Date(post.publishedOn).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          {post.readTime ? ` • ${post.readTime}` : null}
        </p>
      </div>
    </Link>
  );
}
