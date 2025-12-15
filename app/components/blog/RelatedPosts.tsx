import { BlogPost } from "@/lib/blog";
import BlogPostCard from "./BlogPostCard";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="mb-8 text-2xl font-bold text-slate-900">Related Articles</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} showExcerpt={false} />
        ))}
      </div>
    </section>
  );
}
