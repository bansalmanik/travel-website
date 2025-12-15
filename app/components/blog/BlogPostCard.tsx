import Image from "next/image";
import Link from "next/link";
import { BlogPost, VALID_CATEGORIES } from "@/lib/blogTypes";
import { CategoryBadge } from "./CategoryBadge";

interface BlogPostCardProps {
  post: BlogPost;
  showExcerpt?: boolean;
}

export function BlogPostCard({ post, showExcerpt = true }: BlogPostCardProps) {
  return (
    <Link href={post.url} className="group block h-full rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-slate-100">
        <Image
          src={post.heroImage.src}
          alt={post.heroImage.alt}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <CategoryBadge
          category={(VALID_CATEGORIES.includes(post.category as any)
            ? (post.category as (typeof VALID_CATEGORIES)[number])
            : "travel-tips")}
        />
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700">{post.title}</h3>
        {showExcerpt && <p className="line-clamp-2 text-sm text-slate-600">{post.excerpt}</p>}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>{post.readTime}</span>
          <span>•</span>
          <time dateTime={post.publishedOn}>
            {new Date(post.publishedOn).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        </div>
      </div>
    </Link>
  );
}
