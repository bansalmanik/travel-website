import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;

  return (
    <section className="mt-16 border-t border-slate-200 pt-10">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Related Articles</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((related) => (
          <Link key={related.slug} href={related.url} className="group">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-100">
              {related.heroImage?.src && (
                <Image
                  src={related.heroImage.src}
                  alt={related.heroImage.alt}
                  fill
                  className="object-cover transition group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              )}
            </div>
            <h3 className="mt-3 font-semibold text-slate-900 group-hover:text-amber-700 line-clamp-2">
              {related.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{related.readTime}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
