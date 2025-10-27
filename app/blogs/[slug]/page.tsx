import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "../data";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return { title: "Blog not found" };
  }

  return {
    title: `${post.title} | Travel Explorer`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const currentPost = post;

  return (
    <article className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className={`relative overflow-hidden bg-gradient-to-br ${currentPost.heroGradient}`}>
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
        <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-24 text-center text-white">
          <div className="flex flex-wrap justify-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-white/80">
            <span>{currentPost.category}</span>
            <span className="hidden sm:inline">•</span>
            <span>{currentPost.readTime}</span>
          </div>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{currentPost.title}</h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-base font-semibold">
              {currentPost.author.charAt(0)}
            </span>
            <div className="text-left">
              <p className="text-white">{currentPost.author}</p>
              <p>{currentPost.date}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-16">
        <div className="space-y-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          {currentPost.content.map((paragraph) => (
            <p key={paragraph.slice(0, 16)}>{paragraph}</p>
          ))}
        </div>

        <div className="rounded-3xl border border-blue-100 bg-blue-50/60 p-8 dark:border-blue-500/20 dark:bg-blue-500/10">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-300">Traveler Highlights</h2>
          <ul className="mt-4 grid gap-3 text-sm text-blue-900 dark:text-blue-200 sm:grid-cols-2">
            {currentPost.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-zinc-100 p-6 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 sm:flex-row">
          <p>Looking for more inspiration? Explore our latest destinations and guides.</p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 font-medium text-white shadow-md transition hover:bg-blue-500"
          >
            ← Back to all blogs
          </Link>
        </div>
      </div>
    </article>
  );
}
