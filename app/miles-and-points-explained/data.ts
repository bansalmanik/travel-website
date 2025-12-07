import { cache } from "react";

export type MilesPointsSection = {
    heading?: string;
    body?: string[];
    bulletPoints?: string[];
};

export type MilesPointsGuide = {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    publishedOn: string;
    seoTitle: string;
    seoDescription: string;
    tags?: string[];
    sections: MilesPointsSection[];
};

async function loadGuides(): Promise<MilesPointsGuide[]> {
    const data = await import("@/data/milesPointsExplained.json");
    return data.default as MilesPointsGuide[];
}

const getGuides = cache(async () => {
    const guides = await loadGuides();
    return guides;
});

export async function getAllGuides(): Promise<MilesPointsGuide[]> {
    return getGuides();
}

export async function getGuideBySlug(slug: string): Promise<MilesPointsGuide | null> {
    const guides = await getGuides();
    return guides.find((guide) => guide.slug === slug) ?? null;
}

export async function getGuideSlugs(): Promise<string[]> {
    const guides = await getGuides();
    return guides.map((guide) => guide.slug);
}
