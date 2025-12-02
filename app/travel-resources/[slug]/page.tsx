import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import GallerySlider from "@/app/components/gallery-slider";
import { getTravelResourceEntries } from "@/lib/contentData";

export const runtime = "edge";

export type PageProps = {
  params: Promise<{ slug: string }>;
};


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const travelResources = await getTravelResourceEntries();
  const travelResource = travelResources.find(
    (entry) => entry.slug === decodedSlug
  );

  if (!travelResource) {
    return {
      title: "Resource not found | Miles Go Round",
    };
  }

  const pageUrl = `https://example.com/travel-resources/${travelResource.slug}`;
  const ogImages = [travelResource.heroImage, ...(travelResource.gallery ?? [])];

  return {
    title: `${travelResource.title} | Miles Go Round`,
    description: travelResource.seoDescription,
    alternates: {
      canonical: `/travel-resources/${travelResource.slug}`,
    },
    openGraph: {
      title: travelResource.title,
      description: travelResource.seoDescription,
      type: "article",
      url: pageUrl,
      images: ogImages.map((image) => ({
        url: image.src,
        alt: image.alt,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: travelResource.title,
      description: travelResource.seoDescription,
      images: ogImages.map((image) => image.src),
    },
  };
}

export default async function TravelResourceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const travelResources = await getTravelResourceEntries();
  const travelResource = travelResources.find(
    (entry) => entry.slug === decodedSlug
  );

  if (!travelResource) {
    notFound();
  }

  const pageUrl = `https://example.com/travel-resources/${travelResource.slug}`;

  const imageList = [travelResource.heroImage, ...(travelResource.gallery ?? [])];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: travelResource.title,
    description: travelResource.seoDescription,
    datePublished: travelResource.publishedOn,
    author: {
      "@type": "Person",
      name: travelResource.author,
    },
    image: imageList.map((image) => image.src),
    url: pageUrl,
    video: travelResource.videoUrl
      ? {
          "@type": "VideoObject",
          name: `${travelResource.title} travel resource video`,
          embedUrl: travelResource.videoUrl,
          thumbnailUrl: imageList[0]?.src,
        }
      : undefined,
  };

  return (
    <main id="top" className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
        <div className="relative isolate overflow-hidden">
          <div className="relative h-[24rem] w-full">
            <Image
              src={travelResource.heroImage.src}
              alt={travelResource.heroImage.alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" aria-hidden />
          </div>
          <div className="absolute inset-0 flex items-end justify-center pb-14">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 text-center text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">Travel Resource</p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{travelResource.title}</h1>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                <span>{travelResource.displayDate}</span>
                <span className="hidden sm:inline">•</span>
                <span>{travelResource.readTime}</span>
                <span className="hidden sm:inline">•</span>
                <span>{travelResource.author}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-16">
          {travelResource.summary ? (
            <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-200">{travelResource.summary}</p>
          ) : null}

          <div className="space-y-12 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {travelResource.sections.map((section) => {
              const mediaItems = section.images?.length
                ? section.images
                : section.image
                  ? [section.image]
                  : [];

              return (
                <section key={section.heading} className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{section.heading}</h2>
                  </div>
                  <div className="space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                    {section.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                    ))}
                  </div>

                  {mediaItems.length ? (
                    <div className={`grid gap-4 ${mediaItems.length > 1 ? "sm:grid-cols-2" : ""}`}>
                      {mediaItems.map((image) => (
                        <figure
                          key={`${image.src}-${image.caption ?? image.alt}`}
                          className="overflow-hidden rounded-2xl bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                        >
                          <div className="relative aspect-[4/3] w-full">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover"
                              sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                            />
                          </div>
                          {image.caption ? (
                            <figcaption className="px-4 py-3 text-sm">{image.caption}</figcaption>
                          ) : null}
                        </figure>
                      ))}
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>

          {travelResource.videoUrl ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Watch the journey</h2>
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900">
                <iframe
                  src={travelResource.videoUrl}
                  title={`${travelResource.title} travel video`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </section>
          ) : null}

          {travelResource.gallery?.length ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Photo highlights</h2>
              <GallerySlider images={travelResource.gallery} />
            </section>
          ) : null}

          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-zinc-100 p-6 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 sm:flex-row">
            <p>Looking for more ways to explore? Browse the full resource library.</p>
            <Link
              href="/travel-resources"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 font-medium text-white shadow-md transition hover:bg-blue-500"
            >
              ← Back to all resources
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
