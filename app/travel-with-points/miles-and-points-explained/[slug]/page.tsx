import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ArticleLayout from "../ArticleLayout";
import {
    getMilesPointsArticleBySlug,
    getMilesPointsArticleSlugs,
} from "../data";

export function generateStaticParams() {
    return getMilesPointsArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Metadata {
    const article = getMilesPointsArticleBySlug(params.slug);

    if (!article) {
        return {};
    }

    const title = article.seoTitle ?? article.title;
    const description = article.seoDescription ?? article.excerpt;

    return {
        title,
        description,
        alternates: {
            canonical: `/travel-with-points/miles-and-points-explained/${article.slug}`,
        },
        openGraph: {
            title,
            description,
        },
        twitter: {
            card: "summary",
            title,
            description,
        },
    };
}

export default function MilesPointsArticlePage({
    params,
}: {
    params: { slug: string };
}) {
    const article = getMilesPointsArticleBySlug(params.slug);

    if (!article) {
        notFound();
    }

    return <ArticleLayout article={article} />;
}
