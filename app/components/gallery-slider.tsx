"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";

import type { StoryImage } from "@/app/stories/data";

type GallerySliderProps = {
  images: StoryImage[];
};

export default function GallerySlider({ images }: GallerySliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }

    const scrollAmount = container.clientWidth;
    const offset = direction === "left" ? -scrollAmount : scrollAmount;
    container.scrollBy({ left: offset, behavior: "smooth" });
  }, []);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pr-1 scroll-smooth"
        aria-label="Story photo gallery"
      >
        {images.map((image) => (
          <figure
            key={image.src}
            className="snap-start shrink-0 basis-[calc(50%-0.75rem)] overflow-hidden rounded-2xl bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          >
            <div className="relative aspect-[4/3] w-full md:aspect-[16/10]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
            {image.caption ? (
              <figcaption className="px-4 py-3 text-sm">{image.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {images.length > 2 ? (
        <>
          <button
            type="button"
            onClick={() => handleScroll("left")}
            className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-800 shadow-md transition hover:bg-white md:flex dark:bg-zinc-900/90 dark:text-zinc-100"
            aria-label="Scroll gallery left"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path
                d="M15.25 4.75 8.75 12l6.5 7.25"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-800 shadow-md transition hover:bg-white md:flex dark:bg-zinc-900/90 dark:text-zinc-100"
            aria-label="Scroll gallery right"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path
                d="m8.75 4.75 6.5 7.25-6.5 7.25"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </>
      ) : null}
    </div>
  );
}
