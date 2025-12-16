import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import GallerySlider from "@/app/components/gallery-slider";
import ScrollDownButton from "@/app/components/scroll-down-button";
import Callout from "@/app/components/mdx/Callout";
import ImageGallery from "@/app/components/mdx/ImageGallery";
import YouTube from "@/app/components/mdx/YouTube";
import MDXImage from "@/app/components/mdx/MDXImage";
import ImageRow from "@/app/components/mdx/ImageRow";
import type { Story } from "@/lib/stories";

const mdxComponents = {
  Callout,
  ImageGallery,
  YouTube,
  MDXImage,
  ImageRow,
  img: MDXImage,
};

export default function StoryMdxContent({ story }: { story: Story }) {
  const instagramHandle = story.instagramHandle?.replace(/^@/, "");
  const instagramUrl = instagramHandle
    ? `https://www.instagram.com/${instagramHandle}/`
    : null;

  return (
    <article className="bg-white text-slate-900">
      {/* Hero Section - Mobile Optimized */}
      <div className="relative isolate overflow-hidden">
        <div className="relative h-[28rem] w-full sm:h-[32rem] lg:h-[36rem]">
          <Image
            src={story.coverImage.src}
            alt={story.coverImage.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            aria-hidden
          />
        </div>

        {/* Hero Content - Mobile First */}
        <div className="absolute inset-0 flex items-end justify-center pb-12 sm:pb-16 lg:pb-24">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 text-center text-white sm:gap-6 sm:px-6">
            {/* Meta Tags - Mobile Friendly */}
            <div className="flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 sm:gap-3 sm:tracking-[0.3em]">
              <span className="rounded-full bg-white/10 px-3 py-1 text-white sm:px-4">
                {story.city}, {story.country}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="rounded-full bg-white/10 px-3 py-1 sm:bg-transparent sm:px-0">
                {story.category}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="rounded-full bg-white/10 px-3 py-1 sm:bg-transparent sm:px-0">
                {story.readTime}
              </span>
            </div>

            {/* Title - Responsive Typography */}
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              {story.title}
            </h1>

            {/* Author Info - Mobile Optimized */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/80 sm:gap-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-base font-semibold sm:h-12 sm:w-12 sm:text-lg">
                {story.author.charAt(0)}
              </span>
              <div className="text-left">
                <p className="text-white">{story.author}</p>
                <p className="text-xs sm:text-sm">{story.date}</p>
              </div>
              {instagramUrl ? (
                <Link
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-white/60 hover:bg-white/20 sm:px-4 sm:py-2"
                >
                  <span className="sr-only">Visit {story.author}'s Instagram</span>
                  <Image
                    src="/icons/instagram.svg"
                    alt="Instagram icon"
                    width={18}
                    height={18}
                    className="h-4 w-4 transition group-hover:scale-105 sm:h-5 sm:w-5"
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

      {/* Main Content - Mobile First Layout */}
      <div
        id="story-content"
        className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16"
      >
        {/* MDX Content - Optimized Typography */}
        <div className="space-y-6 text-base leading-relaxed text-slate-700 sm:text-lg [&_h2]:mt-10 [&_h2]:mb-5 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-slate-900 sm:[&_h2]:text-3xl [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-slate-900 sm:[&_h3]:text-2xl [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:space-y-2 [&_ol]:mb-4 [&_ol]:space-y-2 [&_li]:ml-6 [&_img]:my-6 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-2xl [&_img]:shadow-md [&_strong]:font-semibold [&_strong]:text-slate-900 [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-700">
          <MDXRemote source={story.content} components={mdxComponents} />
        </div>

        {/* Video Section - Responsive */}
        {story.videoUrl ? (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Travel Moments
            </h2>
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 shadow-md">
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

        {/* Gallery Section - Mobile Optimized */}
        {story.gallery?.length ? (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Photo Highlights
            </h2>
            <GallerySlider images={story.gallery} />
          </section>
        ) : null}

        {/* Highlights Section - Mobile Friendly */}
        {story.highlights?.length ? (
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 sm:rounded-3xl sm:p-8">
            <h2 className="text-lg font-semibold text-blue-600 sm:text-xl">
              Traveler Highlights
            </h2>
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

        {/* Footer CTA - Mobile Optimized */}
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-100 p-5 text-sm text-slate-600 sm:flex-row sm:p-6">
          <p className="text-center sm:text-left">
            Looking for more inspiration? Explore our latest destinations and guides.
          </p>
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-blue-600 px-5 py-2.5 font-medium text-white shadow-md transition hover:bg-blue-500 active:scale-95"
          >
            ← Back to all stories
          </Link>
        </div>
      </div>
    </article>
  );
}
