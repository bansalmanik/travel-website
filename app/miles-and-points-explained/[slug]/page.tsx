import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { getGuideBySlug, getGuideSlugs } from "../data";

function formatDate(date: string) {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));
}

type GuidePageProps = {
    params: Promise<{ slug: string }>;
};

function renderInline(text: string): ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

    return parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return (
                <strong key={`${part}-${index}`} className="text-zinc-900">
                    {part.slice(2, -2)}
                </strong>
            );
        }

        return <span key={`${part}-${index}`}>{part}</span>;
    });
}

export async function generateStaticParams() {
    const slugs = await getGuideSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
    const { slug } = await params;
    const guide = await getGuideBySlug(slug);

    if (!guide) {
        return {
            title: "Miles & Points Explained | Miles Go Round",
            description:
                "Beginner-friendly guides explaining how travel points and miles work, how to earn them, and how to redeem them wisely.",
        };
    }

    return {
        title: guide.seoTitle || guide.title,
        description: guide.seoDescription || guide.excerpt,
        openGraph: {
            title: guide.seoTitle || guide.title,
            description: guide.seoDescription || guide.excerpt,
        },
        twitter: {
            card: "summary_large_image",
            title: guide.seoTitle || guide.title,
            description: guide.seoDescription || guide.excerpt,
        },
    };
}

export default async function MilesPointsGuidePage({ params }: GuidePageProps) {
    const { slug } = await params;
    const guide = await getGuideBySlug(slug);

    if (!guide) {
        notFound();
    }

    const published = formatDate(guide.publishedOn);

    return (
        <article className="bg-white text-zinc-900">
            <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 pb-12 pt-20 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#ffffff22,_transparent_35%)]" aria-hidden />
                <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                        <Link
                            href="/miles-and-points-explained"
                            className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-white transition hover:border-white/60 hover:bg-white/20"
                        >
                            Miles &amp; Points Explained
                        </Link>
                        <span className="hidden sm:inline">•</span>
                        <span>{guide.category}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{guide.readTime}</span>
                    </div>
                    <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{guide.title}</h1>
                    <p className="max-w-3xl text-base text-white/85 sm:text-lg">{guide.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
                        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                            Published {published}
                        </span>
                        {guide.tags?.length ? (
                            <div className="flex flex-wrap gap-2">
                                {guide.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-16">
                {guide.sections.map((section, index) => (
                    <section key={`${section.heading ?? "section"}-${index}`} className="space-y-4">
                        {section.heading ? (
                            <h2 className="text-2xl font-semibold text-zinc-900">{section.heading}</h2>
                        ) : null}
                        {section.body?.length ? (
                            <div className="space-y-4 text-lg leading-relaxed text-zinc-700">
                                {section.body.map((paragraph, paragraphIndex) => (
                                    <p key={`${paragraph.slice(0, 18)}-${paragraphIndex}`}>{renderInline(paragraph)}</p>
                                ))}
                            </div>
                        ) : null}
                        {section.bulletPoints?.length ? (
                            <ul className="space-y-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 text-zinc-800">
                                {section.bulletPoints.map((point, bulletIndex) => (
                                    <li key={`${point.slice(0, 18)}-${bulletIndex}`} className="flex items-start gap-3">
                                        <span className="mt-2 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                                        <span className="text-base leading-relaxed">{renderInline(point)}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </section>
                ))}

                <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-zinc-100 p-6 text-sm text-zinc-600 sm:flex-row">
                    <p className="text-center sm:text-left">Want more? Browse the full collection of Miles &amp; Points Explained guides.</p>
                    <Link
                        href="/miles-and-points-explained"
                        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 font-medium text-white shadow-md transition hover:bg-blue-500"
                    >
                        ← Back to all guides
                    </Link>
                </div>
            </div>
        </article>
    );
}
