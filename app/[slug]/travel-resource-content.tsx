import Image from "next/image";
import Link from "next/link";

import GallerySlider from "@/app/components/gallery-slider";

type TravelResource = {
  slug: string;
  title: string;
  seoDescription: string;
  heroImage: { src: string; alt: string };
  displayDate: string;
  author: string;
  summary?: string;
  sections: Array<{
    heading: string;
    body: string[];
    images?: Array<{ src: string; alt: string; caption?: string }>;
    image?: { src: string; alt: string; caption?: string };
  }>;
  videoUrl?: string;
  gallery?: Array<{ src: string; alt: string; caption?: string }>;
  publishedOn: string;
};

export default function TravelResourceContent({ resource }: { resource: TravelResource }) {
  const imageList = [resource.heroImage, ...(resource.gallery ?? [])];

  return (
    <main id="top" className="bg-white text-zinc-900">
      <article className="bg-white text-zinc-900">
        <div className="relative isolate overflow-hidden">
          <div className="relative h-[24rem] w-full">
            <Image
              src={resource.heroImage.src}
              alt={resource.heroImage.alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" aria-hidden />
          </div>
          <div className="absolute inset-0 flex items-end justify-center pb-14">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 text-center text-white">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{resource.title}</h1>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                <span>{resource.displayDate}</span>
                <span className="hidden sm:inline">•</span>
                <span>{resource.author}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-16">
          {resource.summary ? (
            <p className="text-lg leading-relaxed text-zinc-700">{resource.summary}</p>
          ) : null}

          <div className="space-y-14 text-lg leading-relaxed text-zinc-700">
            {resource.sections.map((section) => {
              const mediaItems = section.images?.length
                ? section.images
                : section.image
                  ? [section.image]
                  : [];

              return (
                <section key={section.heading} className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-zinc-900">{section.heading}</h2>
                  </div>
                  <div className="space-y-4 text-lg leading-relaxed text-zinc-700">
                    {section.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                    ))}
                  </div>

                  {mediaItems.length ? (
                    <div className={`grid gap-4 ${mediaItems.length > 1 ? "sm:grid-cols-2" : ""}`}>
                      {mediaItems.map((image) => (
                        <figure
                          key={`${image.src}-${image.caption ?? image.alt}`}
                          className="group overflow-hidden rounded-3xl bg-zinc-100 text-zinc-700"
                        >
                          <div className="relative aspect-[4/3] w-full">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover transition duration-700 group-hover:scale-105"
                              sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                            />
                          </div>
                          {image.caption ? (
                            <figcaption className="px-4 py-3 text-sm text-zinc-600">
                              {image.caption}
                            </figcaption>
                          ) : null}
                        </figure>
                      ))}
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>

          {resource.videoUrl ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-zinc-900">Watch the journey</h2>
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-zinc-100">
                <iframe
                  src={resource.videoUrl}
                  title={`${resource.title} travel video`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </section>
          ) : null}

          {resource.gallery?.length ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-zinc-900">Photo highlights</h2>
              <GallerySlider images={resource.gallery} />
            </section>
          ) : null}

          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-zinc-100 p-6 text-sm text-zinc-700 sm:flex-row">
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
