import type { Metadata } from "next";
import Link from "next/link";

import { getAllGuides } from "./data";

export const metadata: Metadata = {
    title: "Miles & Points Explained | Miles Go Round",
    description:
        "Beginner-friendly guides explaining how travel points and miles work, how to earn them, and how to redeem them wisely.",
};

function formatDate(date: string) {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));
}

export default async function MilesPointsExplainedPage() {
    const guides = await getAllGuides();

    return (
        <div className="bg-gradient-to-b from-white via-slate-50 to-slate-100 py-20 text-zinc-900">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6">
                <section className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-600">Travel with Points</p>
                    <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">Miles &amp; Points Explained</h1>
                    <p className="mt-6 text-lg text-zinc-600">
                        Clear, lightweight explainers that mirror our stories experience so you can skim, learn, and save memory while you plan
                        your next award trip.
                    </p>
                </section>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {guides.map((guide) => (
                        <article
                            key={guide.slug}
                            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <Link href={`/miles-and-points-explained/${guide.slug}`} className="flex h-full flex-col p-6">
                                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-700">{guide.category}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span>{guide.readTime}</span>
                                </div>
                                <h2 className="mt-4 text-2xl font-semibold leading-snug transition-colors group-hover:text-blue-600">
                                    {guide.title}
                                </h2>
                                <p className="mt-3 text-sm text-zinc-600">{guide.excerpt}</p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {guide.tags?.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-auto flex items-center justify-between pt-6 text-sm font-medium text-zinc-500">
                                    <span>{formatDate(guide.publishedOn)}</span>
                                    <span className="inline-flex items-center text-blue-600">
                                        Read guide
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
                                    </span>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
