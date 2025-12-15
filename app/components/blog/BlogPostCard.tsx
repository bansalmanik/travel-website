import Image from "next/image";
import Link from "next/link";

import { BlogPost } from "@/lib/blog";
import CategoryBadge from "./CategoryBadge";

type CardPost = Omit<BlogPost, "content"> & { content?: string };

interface BlogPostCardProps {
  post: CardPost;
  showExcerpt?: boolean;
}

export default function BlogPostCard({ post, showExcerpt = true }: BlogPostCardProps) {
  return (
    <Link href={post.url} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <Image
          src={post.heroImage.src}
          alt={post.heroImage.alt}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <CategoryBadge category={post.category} />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-amber-700">
            {post.title}
          </h3>
          {showExcerpt && <p className="text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>}
        </div>
        <div className="mt-auto flex items-center gap-3 text-xs text-slate-500">
          <span>{post.readTime}</span>
          <span aria-hidden>•</span>
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
