import type { Metadata } from "next";

import { MilesPointsArticleCard } from "./components/MilesPointsArticleCard";
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
  const articles = getAllMilesPointsArticles();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-5 py-16 sm:px-6 lg:gap-16 lg:py-24">
        <header className="space-y-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-700">Travel on Points</p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Miles & Points Explained</h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
            Beginner-friendly guides that demystify the currencies, partners, and strategies behind smart redemptions. Start
            here to build a foundation that makes every future transfer more intentional.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <MilesPointsArticleCard key={article.slug} article={article} />
          ))}
        </section>
      </div>
    </main>
  );
}
