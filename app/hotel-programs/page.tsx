import type { Metadata } from "next";
import Link from "next/link";

import { getHotelProgramContent } from "@/lib/contentData";
import { getPostsByCategory } from "@/lib/blog";
import Image from "next/image";

const siteUrl = "https://www.milesgoround.com";

export const metadata: Metadata = {
  title: "Hotel Loyalty Programs | Book Smarter Stays",
  description:
    "Explore hotel loyalty programs to enhance your stays. Learn about elite perks, free nights, and strategies to get more from your hotel bookings.",
  keywords: [
    "hotel loyalty programs",
    "hotel stays",
    "elite status",
    "hotel perks",
    "free hotel nights",
    "hotel booking tips",
    "travel accommodation",
  ],
  alternates: {
    canonical: `${siteUrl}/hotel-programs`,
  },
  openGraph: {
    title: "Hotel Loyalty Programs | Miles Go Round",
    description:
      "Explore hotel loyalty programs to enhance your stays. Learn about elite perks and strategies for better bookings.",
    url: `${siteUrl}/hotel-programs`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Loyalty Programs | Miles Go Round",
    description:
      "Explore hotel loyalty programs to enhance your stays. Learn about elite perks and booking strategies.",
  },
};

export default async function HotelProgramsPage() {
  const { programs, elitePaths, bookingTips } =
    await getHotelProgramContent();
  const blogPosts = await getPostsByCategory('hotels');

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 py-8 sm:gap-16 sm:px-6 sm:py-12 lg:py-16">
        <header className="space-y-4 sm:space-y-5">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-sky-700 sm:text-xs">Travel with Points</p>
          <h1 className="text-3xl font-semibold sm:text-5xl">Hotel loyalty programs</h1>
        </header>

        <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Featured hotel programs</h2>
          <div className="grid gap-6 sm:gap-7 md:grid-cols-2">
            {programs.map((program) => {
              const topTier =
                program.statusLevels && program.statusLevels.tiers.length > 0
                  ? program.statusLevels.tiers[program.statusLevels.tiers.length - 1]
                  : undefined;

              return (
                <article
                  key={program.slug}
                  className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-sky-300/60 hover:bg-white hover:shadow-md sm:p-6"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                        <Link
                          href={`/${program.slug}`}
                          className="text-slate-900 underline-offset-4 transition hover:text-sky-800 hover:underline"
                        >
                          {program.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-slate-700 sm:text-base">{program.summary}</p>
                    </div>
                    {topTier ? (
                      <p className="text-[0.65rem] uppercase tracking-[0.25em] text-sky-700 sm:text-xs">Top tier • {topTier}</p>
                    ) : null}
                  </div>
                  <Link
                    href={`/${program.slug}`}
                    className="mt-6 inline-flex items-center text-sm font-semibold text-sky-800 sm:text-base"
                  >
                    View program guide
                    <svg
                      aria-hidden
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        {blogPosts.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">Related Articles</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {blogPosts.slice(0, 4).map((post) => (
                <Link
                  key={post.slug}
                  href={post.url}
                  className="group relative overflow-hidden rounded-xl bg-slate-100 transition-transform hover:scale-[1.02]"
                  style={{ aspectRatio: '16/9' }}
                >
                  {post.heroImage?.src && (
                    <Image
                      src={post.heroImage.src}
                      alt={post.heroImage.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <h3 className="mb-1 text-base font-semibold leading-snug text-white">
                      {post.title}
                    </h3>
                    <p className="text-xs text-white/80">{post.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
