import { headers } from "next/headers";
import { cache } from "react";

export type StoryImage = {
    src: string;
    alt: string;
    caption?: string;
};

export type StorySummary = {
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    instagramHandle?: string;
    date: string;
    readTime: string;
    category: string;
    city: string;
    country: string;
    coverImage: StoryImage;
};

export type StorySectionMedia = StoryImage & {
    layout?: "landscape" | "portrait" | "square";
};

export type StorySection = {
    id: string;
    title?: string;
    subtitle?: string;
    paragraphs?: string[];
    media?: StorySectionMedia[];
    callout?: string;
};

export type Story = StorySummary & {
    content: string[];
    highlights: string[];
    gallery?: StoryImage[];
    videoUrl?: string;
    sections?: StorySection[];
};

const STORIES_PATH = "/data/stories.json";

async function getPublicDataUrl() {
    const headerList = await headers();
    const configuredBase = process.env.NEXT_PUBLIC_SITE_URL;

    if (configuredBase) {
        return new URL(STORIES_PATH, configuredBase).toString();
    }

    const host = headerList.get("host");
    const protocol = headerList.get("x-forwarded-proto") ?? "https";

    return host ? `${protocol}://${host}${STORIES_PATH}` : `http://localhost:3000${STORIES_PATH}`;
}

async function loadJsonStories(): Promise<Story[]> {
    const dataUrl = await getPublicDataUrl();
    const response = await fetch(dataUrl, {
        next: { revalidate: 60 * 60 },
    });

    if (!response.ok) {
        throw new Error(`Failed to load stories: ${response.status}`);
    }

    return (await response.json()) as Story[];
}

// ---------- image helpers ---------- //

type ImageLike = { src: string };

async function resolveImage<T extends ImageLike>(image: T): Promise<T> {
    return { ...image };
}

async function resolveOptionalImages<T extends ImageLike>(
    images?: T[]
): Promise<T[] | undefined> {
    if (!images?.length) return images;
    return Promise.all(images.map((img) => resolveImage(img)));
}

async function resolveSections(
    sections?: StorySection[]
): Promise<StorySection[] | undefined> {
    if (!sections?.length) return sections;

    return Promise.all(
        sections.map(async (section) => ({
            ...section,
            media: await resolveOptionalImages(section.media),
        }))
    );
}

// ---------- main loader ---------- //

const loadStories = cache(async () => {
    const stories = await loadJsonStories();

    return Promise.all(
        stories.map(async (story) => ({
            ...story,
            coverImage: await resolveImage(story.coverImage),
            gallery: await resolveOptionalImages(story.gallery),
            sections: await resolveSections(story.sections),
        }))
    );
});

// ---------- exposed APIs ---------- //

export async function getAllStorySummaries(): Promise<StorySummary[]> {
    const stories = await loadStories();

    return stories.map(
        ({ slug, title, excerpt, author, instagramHandle, date, readTime, category, city, country, coverImage }) => ({
            slug,
            title,
            excerpt,
            author,
            instagramHandle,
            date,
            readTime,
            category,
            city,
            country,
            coverImage,
        })
    );
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
    const stories = await loadStories();
    return stories.find((story) => story.slug === slug) ?? null;
}
