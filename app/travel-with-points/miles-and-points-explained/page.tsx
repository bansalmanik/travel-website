import type { Metadata } from "next";

import { MilesPointsArticleCard } from "./miles-points-article-card";
import type { MilesPointsArticle } from "./types";
import { getAllMilesPointsArticles } from "@/lib/milesPointsExplained";

const pageTitle = "Miles & Points Explained | Miles Go Round";
const pageDescription =
  "Beginner-friendly guides explaining how travel points and miles work, how to earn them, and how to redeem them wisely.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/travel-with-points/miles-and-points-explained",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: "https://example.com/travel-with-points/miles-and-points-explained",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function MilesPointsExplainedPage() {
  const articles: MilesPointsArticle[] = getAllMilesPointsArticles();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-5 pb-20 pt-16 sm:px-6 lg:gap-16 lg:pb-24 lg:pt-24">
        <div className="space-y-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-800">Miles & Points Explained</p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Simple guides for getting more from every point</h1>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            Learn how points and miles actually work, the smartest ways to earn them, and the best times to redeem. These quick, focused explainers help you make confident decisions without jargon.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((article) => (
            <MilesPointsArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </main>
  );
}
