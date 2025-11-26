import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getResourceEntries } from "@/lib/contentData";

export const runtime = "edge";

export type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const resources = await getResourceEntries();
  const resource = resources.find((entry) => entry.slug === decodedSlug);

  if (!resource) {
    return {
      title: "Resource not found | Miles Go Round",
    };
  }

  const pageUrl = `https://example.com/resources/${resource.slug}`;

  return {
    title: `${resource.title} | Miles Go Round`,
    description: resource.seoDescription,
    alternates: {
      canonical: `/resources/${resource.slug}`,
    },
    openGraph: {
      title: resource.title,
      description: resource.seoDescription,
      type: "article",
      url: pageUrl,
      images: [
        {
          url: resource.heroImage.src,
          alt: resource.heroImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resource.title,
      description: resource.seoDescription,
      images: [resource.heroImage.src],
    },
  };
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const resources = await getResourceEntries();
  const resource = resources.find((entry) => entry.slug === decodedSlug);

  if (!resource) {
    notFound();
  }

  const pageUrl = `https://example.com/resources/${resource.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resource.title,
    description: resource.seoDescription,
    datePublished: resource.publishedOn,
    image: resource.heroImage.src,
    url: pageUrl,
    inLanguage: "en",
  };

  return (
    <main
      id="top"
      className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-20 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,1fr] lg:items-start lg:gap-12">
          <header className="space-y-6 text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">Resource</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">{resource.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80 lg:justify-start">
              <span>{resource.displayDate}</span>
              <span>•</span>
              <span>{resource.readTime}</span>
              <span>•</span>
              <span>{resource.location}</span>
            </div>
            <p className="text-base leading-7 text-slate-200/80">{resource.summary}</p>
          </header>

          <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 lg:h-full">
            <div className="relative aspect-[4/3] w-full lg:h-full lg:min-h-[320px]">
              <Image
                src={resource.heroImage.src}
                alt={resource.heroImage.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 45vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>

        <div className="space-y-12 text-base leading-relaxed text-slate-200/90">
          {resource.sections.map((section) => (
            <section
              key={section.heading}
              className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
            >
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">{resource.topic}</p>
                <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
              </div>
              {section.paragraphs ? (
                <div className="space-y-4 text-sm leading-7 text-slate-100/80">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
              {section.images?.length ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {section.images.map((image) => (
                    <figure key={image.src} className="space-y-3">
                      <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-slate-800/40">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 90vw"
                        />
                      </div>
                      {image.caption ? (
                        <figcaption className="text-xs uppercase tracking-[0.2em] text-slate-200/70">
                          {image.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  ))}
                </div>
              ) : null}
              {section.video ? (
                <div className="space-y-3">
                  <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 pb-[56.25%] shadow-lg">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={section.video.url}
                      title={section.video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-200/70">{section.video.title}</p>
                </div>
              ) : null}
            </section>
          ))}
        </div>

        <footer className="flex flex-col gap-3 text-sm text-slate-200/80 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/resources" className="inline-flex items-center font-semibold text-amber-300">
            <svg
              aria-hidden
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 12H5" />
              <path d="m12 5-7 7 7 7" />
            </svg>
            Back to resources
          </Link>
          <a
            href="#top"
            className="inline-flex items-center font-semibold text-amber-300"
          >
            Back to top
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
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
          </a>
        </footer>
      </article>
    </main>
  );
}
