import type { Metadata } from "next";

import { MilesPointsArticleCard } from "@/app/travel-with-points/points-and-miles-explained/miles-points-article-card";
import { getAllMilesPointsArticles } from "@/lib/milesPointsArticles";

const siteUrl = "https://www.milesgoround.com";

export const metadata: Metadata = {
  title: "Travel Rewards 101 | Beginner's Guide",
  description:
    "New to travel rewards? Learn the basics of points and miles, how loyalty programs work, and simple strategies to book better trips.",
  keywords: [
    "travel rewards guide",
    "beginner travel tips",
    "loyalty programs explained",
    "how to book travel",
    "travel for less",
    "points basics",
    "miles basics",
  ],
  alternates: {
    canonical: `${siteUrl}/travel-with-points/points-and-miles-explained`,
  },
  openGraph: {
    title: "Travel Rewards 101 | Miles Go Round",
    description:
      "New to travel rewards? Learn the basics and simple strategies to book better trips.",
    url: `${siteUrl}/travel-with-points/points-and-miles-explained`,
    type: "website",
  },
  twitter: {
    title: "Travel Rewards 101 | Miles Go Round",
    description:
      "New to travel rewards? Learn the basics and simple strategies to book better trips.",
    card: "summary_large_image",
  },
};

export default function MilesPointsExplainedPage() {
  const articles = getAllMilesPointsArticles();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 pb-20 pt-16 sm:px-6 lg:gap-16 lg:pb-24 lg:pt-24">
        <header className="space-y-5 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-800">Travel with Points</p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Points &amp; Miles Explained</h1>
          <p className="mx-auto max-w-3xl text-sm text-slate-600 sm:mx-0 sm:text-base">
            Learn the fundamentals of points, miles, and transfer partners with concise guides you can skim on your phone. Each
            article keeps the jargon light so you can start earning and redeeming with confidence.
          </p>
        </header>

        <section className="grid gap-5 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur sm:gap-6 sm:p-8 lg:grid-cols-2">
          {articles.map((article) => (
            <MilesPointsArticleCard key={article.slug} article={article} />
          ))}
        </section>
      </div>
    </main>
  );
}
