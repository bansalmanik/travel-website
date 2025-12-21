'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageGalleryProps {
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (images.length === 0) return null

  return (
    <div className="my-8 -mx-4 sm:mx-0">
      <div className="relative flex items-center justify-center gap-2 sm:gap-4">
        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={goToPrevious}
            className="flex-shrink-0 rounded-full bg-white p-2 sm:p-3 shadow-lg transition-all hover:bg-slate-50 hover:scale-110 z-10"
            aria-label="Previous image"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Image Container */}
        <div className="relative w-full max-w-2xl rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 shadow-lg">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={goToNext}
            className="flex-shrink-0 rounded-full bg-white p-2 sm:p-3 shadow-lg transition-all hover:bg-slate-50 hover:scale-110 z-10"
            aria-label="Next image"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Caption */}
      {images[currentIndex].caption && (
        <p className="mt-3 text-center text-sm text-slate-600 px-4 sm:px-0">
          {images[currentIndex].caption}
        </p>
      )}
    </div>
  )
}
