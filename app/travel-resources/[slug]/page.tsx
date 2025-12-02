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
  const openGraphImages = [
    travelResource.heroImage,
    ...(travelResource.gallery ?? []),
  ].map((image) => ({ url: image.src, alt: image.alt }));

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
      images: openGraphImages,
    },
    twitter: {
      card: "summary_large_image",
      title: travelResource.title,
      description: travelResource.seoDescription,
      images: openGraphImages.map((image) => image.url),
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
  const structuredImages = [
    travelResource.heroImage,
    ...(travelResource.gallery ?? []),
    ...travelResource.sections.flatMap((section) => section.images ?? []),
  ].map((image) => image.src);

  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: travelResource.title,
    description: travelResource.seoDescription,
    datePublished: travelResource.publishedOn,
    author: {
      "@type": "Person",
      name: travelResource.author,
    },
    url: pageUrl,
  };

  if (structuredImages.length) {
    structuredData.image = structuredImages;
  }

  if (travelResource.videoUrl) {
    structuredData.video = {
      "@type": "VideoObject",
      name: `${travelResource.title} overview`,
      embedUrl: travelResource.videoUrl,
      description: travelResource.seoDescription,
    };
  }

  return (
    <main
      id="top"
      className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-100"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="flex flex-col">
        <div className="relative isolate overflow-hidden">
          <div className="relative h-[24rem] w-full sm:h-[28rem]">
            <Image
              src={travelResource.heroImage.src}
              alt={travelResource.heroImage.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent"
              aria-hidden
            />
          </div>
          <div className="absolute inset-0 flex items-end justify-center pb-14 sm:pb-16">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 text-center text-white">
              <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                <span className="rounded-full bg-white/10 px-4 py-1 text-white">Travel Resource</span>
                <span className="hidden sm:inline">•</span>
                <span>{travelResource.displayDate}</span>
                <span className="hidden sm:inline">•</span>
                <span>{travelResource.readTime}</span>
              </div>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                {travelResource.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/80">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-semibold">
                  {travelResource.author.charAt(0)}
                </span>
                <div className="text-left">
                  <p className="text-white">{travelResource.author}</p>
                  <p>{travelResource.publishedOn}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 py-14 sm:py-16">
          {travelResource.summary ? (
            <div className="rounded-2xl border border-zinc-200 bg-white/90 p-6 text-lg leading-relaxed text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200">
              {travelResource.summary}
            </div>
          ) : null}

          {travelResource.sections.length ? (
            <div className="space-y-10">
              {travelResource.sections.map((section) => {
                const sectionImages = section.images ?? [];

                return (
                  <section
                    key={section.heading}
                    className="space-y-5 rounded-2xl border border-zinc-200 bg-white/90 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80"
                  >
                    <header className="space-y-2">
                      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {section.heading}
                      </h2>
                    </header>

                    {section.body?.length ? (
                      <div className="space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {section.body.map((paragraph) => (
                          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                        ))}
                      </div>
                    ) : null}

                    {sectionImages.length ? (
                      <div
                        className={`grid gap-4 ${sectionImages.length > 1 ? "sm:grid-cols-2" : ""}`}
                      >
                        {sectionImages.map((image) => (
                          <figure
                            key={`${image.src}-${image.caption ?? image.alt}`}
                            className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 text-zinc-700 shadow-sm transition hover:border-blue-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
                          >
                            <div className="relative aspect-[4/3] w-full sm:aspect-video">
                              <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
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
          ) : null}

          {travelResource.videoUrl ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                Watch the journey
              </h2>
              <div className="aspect-video w-full overflow-hidden rounded-2xl border border-zinc-200 bg-black shadow-sm dark:border-zinc-800">
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
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                Photo highlights
              </h2>
              <GallerySlider images={travelResource.gallery} />
            </section>
          ) : null}

          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 sm:flex-row">
            <p className="text-center sm:text-left">
              Looking for more planning tools? Discover every travel guide in one place.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="/travel-resources"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 font-medium text-white shadow-md transition hover:bg-blue-500"
              >
                ← Back to travel resources
              </Link>
              <a
                href="#top"
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 px-4 py-2 font-medium text-blue-700 transition hover:border-blue-200 hover:bg-blue-50 dark:border-blue-500/40 dark:text-blue-200 dark:hover:bg-blue-500/10"
              >
                Back to top
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
