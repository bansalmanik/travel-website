import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import type { TravelResource } from '@/lib/travel-resources'
import ImageGallery from '@/app/components/mdx/ImageGallery'
import Callout from '@/app/components/mdx/Callout'
import YouTube from '@/app/components/mdx/YouTube'
import MDXImage from '@/app/components/mdx/MDXImage'
import ImageRow from '@/app/components/mdx/ImageRow'

const mdxComponents = {
  ImageGallery,
  Callout,
  YouTube,
  MDXImage,
  ImageRow,
  img: MDXImage,
}

export default function TravelResourceMDXContent({ resource }: { resource: TravelResource }) {
  return (
    <main id="top" className="bg-white text-zinc-900">
      <article className="bg-white text-zinc-900">
        {/* Hero Section */}
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
                <span className="hidden sm:inline">•</span>
                <span>{resource.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-16">
          {resource.excerpt && (
            <p className="text-lg leading-relaxed text-zinc-700">{resource.excerpt}</p>
          )}

          <div className="space-y-6 text-lg leading-relaxed text-zinc-700 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-zinc-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-zinc-900 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:space-y-2 [&_ul]:mb-4 [&_ol]:space-y-2 [&_ol]:mb-4 [&_li]:ml-6 [&_img]:rounded-lg [&_img]:shadow-md [&_img]:my-6 [&_img]:max-w-2xl [&_img]:w-full [&_img]:h-auto [&_strong]:font-semibold [&_strong]:text-zinc-900 [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-700">
            <MDXRemote source={resource.content} components={mdxComponents} />
          </div>

          {/* Back to Resources */}
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
  )
}
