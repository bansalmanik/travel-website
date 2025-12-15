import { BlogPost } from "@/lib/blogTypes";
import { BlogPostCard } from "./BlogPostCard";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;

  return (
    <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Related Articles</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} showExcerpt={false} />
        ))}
      </div>
    </section>
  );
}
