import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";
import { CategoryBadge } from "./CategoryBadge";

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={post.url} className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        {post.heroImage?.src && (
          <Image
            src={post.heroImage.src}
            alt={post.heroImage.alt}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="space-y-2 p-4 sm:p-5">
        <CategoryBadge category={post.category} />
        <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-amber-700">
          {post.title}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>{post.author}</span>
          <span>•</span>
          <span>{new Date(post.publishedOn).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
