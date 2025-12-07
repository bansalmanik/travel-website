import type { Metadata } from "next";

import { MilesPointsArticleCard } from "@/app/travel-with-points/miles-and-points-explained/miles-points-article-card";
import { getMilesPointsArticleSummaries } from "@/lib/milesPointsArticles";

export const metadata: Metadata = {
  title: "Miles & Points Explained | Miles Go Round",
  description:
    "Beginner-friendly guides explaining how travel points and miles work, how to earn them, and how to redeem them wisely.",
  alternates: {
    canonical: "/travel-with-points/miles-and-points-explained",
  },
  openGraph: {
    title: "Miles & Points Explained | Miles Go Round",
    description:
      "Beginner-friendly guides explaining how travel points and miles work, how to earn them, and how to redeem them wisely.",
  },
  twitter: {
    title: "Miles & Points Explained | Miles Go Round",
    description:
      "Beginner-friendly guides explaining how travel points and miles work, how to earn them, and how to redeem them wisely.",
    card: "summary_large_image",
  },
};

export const dynamic = "force-dynamic";

export default async function MilesPointsExplainedPage() {
  const articles = await getMilesPointsArticleSummaries();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 pb-20 pt-16 sm:px-6 lg:gap-16 lg:pb-24 lg:pt-24">
        <header className="space-y-5 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-800">Travel with Points</p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Miles &amp; Points Explained</h1>
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
