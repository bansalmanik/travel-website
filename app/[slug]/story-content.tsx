import Image from "next/image";
import Link from "next/link";
import GallerySlider from "@/app/components/gallery-slider";
import ScrollDownButton from "@/app/components/scroll-down-button";
import type { Story, StorySectionMedia } from "@/app/stories/data";

export default function StoryContent({ story }: { story: Story }) {
  const instagramHandle = story.instagramHandle?.replace(/^@/, "");
  const instagramUrl = instagramHandle ? `https://www.instagram.com/${instagramHandle}/` : null;

  const getMediaAspectClass = (layout?: StorySectionMedia["layout"]) => {
    switch (layout) {
      case "portrait":
        return "aspect-[3/4]";
      case "square":
        return "aspect-square";
      default:
        return "aspect-video";
    }
  };

  return (
    <article className="bg-white text-zinc-900">
      <div className="relative isolate overflow-hidden">
        <div className="relative h-[32rem] w-full lg:h-[36rem]">
          <Image
            src={story.coverImage.src}
            alt={story.coverImage.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" aria-hidden />
        </div>
        <div className="absolute inset-0 flex items-end justify-center pb-16 lg:pb-24">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 text-center text-white">
            <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
              <span className="rounded-full bg-white/10 px-4 py-1 text-white">{story.city}, {story.country}</span>
              <span className="hidden sm:inline">•</span>
              <span>{story.category}</span>
              <span className="hidden sm:inline">•</span>
              <span>{story.readTime}</span>
            </div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{story.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-semibold">
                {story.author.charAt(0)}
              </span>
              <div className="text-left">
                <p className="text-white">{story.author}</p>
                <p>{story.date}</p>
              </div>
              {instagramUrl ? (
                <Link
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 font-semibold text-white transition hover:border-white/60 hover:bg-white/20"
                >
                  <span className="sr-only">Visit {story.author}'s Instagram</span>
                  <Image
                    src="/icons/instagram.svg"
                    alt="Instagram icon"
                    width={20}
                    height={20}
                    className="h-5 w-5 transition group-hover:scale-105"
                    priority={false}
                  />
                  <span className="text-xs font-semibold">@{instagramHandle}</span>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
        <ScrollDownButton />
      </div>

      <div id="story-content" className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-16">
        {story.content?.length ? (
          <div className="space-y-6 text-lg leading-relaxed text-zinc-700">
            {story.content.map((paragraph) => (
              <p key={paragraph.slice(0, 16)}>{paragraph}</p>
            ))}
          </div>
        ) : null}

        {story.sections?.length ? (
          <div className="space-y-14">
            {story.sections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-6">
                {section.title ? (
                  <header className="space-y-2">
                    <h2 className="text-2xl font-semibold text-zinc-900">
                      {section.title}
                    </h2>
                    {section.subtitle ? (
                      <p className="text-base text-zinc-600">{section.subtitle}</p>
                    ) : null}
                  </header>
                ) : null}

                {section.paragraphs?.length ? (
                  <div className="space-y-4 text-lg leading-relaxed text-zinc-700">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}

                {section.callout ? (
                  <blockquote className="rounded-2xl border-l-4 border-blue-400 bg-blue-50/60 p-6 text-lg italic text-blue-900">
                    {section.callout}
                  </blockquote>
                ) : null}

                {section.media?.length ? (
                  <div
                    className={`grid gap-5 ${section.media.length > 1 ? "sm:grid-cols-2" : ""}`}
                  >
                    {section.media.map((media) => (
                        <figure
                            key={`${media.src}-${media.caption ?? media.alt}`}
                            className={`group overflow-hidden rounded-3xl bg-zinc-100 ${getMediaAspectClass(media.layout)} relative`}
                        >
                            <Image
                                src={media.src}
                                alt={media.alt}
                                fill
                                sizes="(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw"
                                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                loading="lazy"
                            />
                        </figure>
                    ))}
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        ) : null}

        {story.videoUrl ? (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900">Travel Moments</h2>
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-zinc-100">
              <iframe
                src={story.videoUrl}
                title={`${story.title} travel video`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </section>
        ) : null}

        {story.gallery?.length ? (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900">Photo Highlights</h2>
            <GallerySlider images={story.gallery} />
          </section>
        ) : null}

        {story.highlights?.length ? (
          <div className="rounded-3xl border border-blue-100 bg-blue-50/60 p-8">
            <h2 className="text-xl font-semibold text-blue-600">Traveler Highlights</h2>
            <ul className="mt-4 grid gap-3 text-sm text-blue-900 sm:grid-cols-2">
              {story.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-zinc-100 p-6 text-sm text-zinc-600 sm:flex-row">
          <p>Looking for more inspiration? Explore our latest destinations and guides.</p>
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 font-medium text-white shadow-md transition hover:bg-blue-500"
          >
            ← Back to all stories
          </Link>
        </div>
      </div>
    </article>
  );
}
