import Image from "next/image";
import Link from "next/link";

import { getAllStorySummaries } from "@/lib/stories";
import ShareStoryCTA from "./ShareStoryCTA";

export const metadata = {
  title: "Travel Stories | Miles Go Round",
  description: "Discover travel inspiration, itineraries, and stories from around the globe. Real experiences, honest insights, and beautiful destinations.",
  keywords: ["travel stories", "travel blog", "travel inspiration", "destination guides", "travel experiences"],
};

export default async function StoriesPage() {
  const stories = await getAllStorySummaries();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 py-12 text-slate-900 sm:py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:gap-14 sm:px-6">
        {/* Header - Mobile Optimized */}
        <section className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Stories to Inspire Your Next Getaway
          </h1>
          <p className="mt-4 text-base text-slate-600 sm:mt-6 sm:text-lg">
            A collection of our journeys, told in moments and memories, the places we saw, the paths we followed, and the little surprises along the way.
          </p>
        </section>

        <ShareStoryCTA />

        {/* Stories Grid - Mobile First */}
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {stories.map((post, index) => (
            <article
              key={post.slug}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl"
            >
              <Link href={`/${post.slug}`} className="flex h-full flex-col">
                {/* Image - Mobile Optimized */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-slate-100 sm:rounded-t-3xl">
                  <Image
                    src={post.coverImage.src}
                    alt={post.coverImage.alt}
                    fill
                    className="object-cover object-center transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden />
                  
                  {/* Location Badge - Mobile Friendly */}
                  <div className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-sm backdrop-blur-sm sm:bottom-3 sm:left-3 sm:px-3 sm:tracking-[0.3em]">
                    {post.city}, {post.country}
                  </div>
                </div>

                {/* Content - Mobile First */}
                <div className="flex flex-1 flex-col gap-3 p-4 sm:gap-4 sm:p-6">
                  {/* Category Badge */}
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition-colors group-hover:bg-slate-900 group-hover:text-slate-50">
                    {post.category}
                  </span>

                  {/* Title - Responsive Typography */}
                  <h2 className="text-xl font-semibold leading-snug transition-colors group-hover:text-blue-600 sm:text-2xl">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm leading-relaxed text-slate-600">{post.excerpt}</p>

                  {/* Meta Info - Mobile Optimized */}
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-medium text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                        {post.author.charAt(0)}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-700">{post.author}</span>
                        <span className="text-xs">{post.date}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end text-right">
                      <span className="text-xs">{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
