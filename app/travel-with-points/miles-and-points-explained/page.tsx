import type { Metadata } from "next";

import MilesPointsArticleCard from "./MilesPointsArticleCard";
import { getAllMilesPointsArticles } from "./data";

const pageTitle = "Miles & Points Explained | Miles Go Round";
const pageDescription =
    "Beginner-friendly guides explaining how travel points and miles work, how to earn them, and how to redeem them wisely.";

export const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: "/travel-with-points/miles-and-points-explained" },
    openGraph: {
        title: pageTitle,
        description: pageDescription,
    },
    twitter: {
        card: "summary",
        title: pageTitle,
        description: pageDescription,
    },
};

export default function MilesPointsExplainedPage() {
    const articles = getAllMilesPointsArticles().slice().sort((a, b) => {
        const dateA = new Date(a.updatedOn ?? a.publishedOn).getTime();
        const dateB = new Date(b.updatedOn ?? b.publishedOn).getTime();
        return dateB - dateA;
    });

    return (
        <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-5 pb-20 pt-16 sm:px-6 lg:gap-20 lg:pb-24 lg:pt-24">
                <header className="space-y-5 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">Travel on Points</p>
                    <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                        Miles &amp; Points Explained
                    </h1>
                    <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
                        Beginner-friendly guides that break down how loyalty currencies work, the smartest ways to earn them, and how to redeem them when you are ready to book.
                    </p>
                </header>

                <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <MilesPointsArticleCard key={article.slug} article={article} />
                    ))}
                </section>
            </div>
        </main>
    );
}
