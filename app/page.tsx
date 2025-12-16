import Image from "next/image";
import Link from "next/link";

import { getAllTravelResources } from "@/lib/travel-resources";
import { getAllStorySummaries } from "@/lib/stories";

const quickLinks = [
  { label: "Credit Cards", href: "/travel-with-points/credit-cards", icon: "💳" },
  { label: "Hotels", href: "/travel-with-points/hotel-programs", icon: "🏨" },
  { label: "Flights", href: "/travel-with-points/flight-programs", icon: "✈️" },
  { label: "Convert Points", href: "/pointsconversion", icon: "🔄" },
];

export default async function Home() {
  const travelResourceEntries = await getAllTravelResources();
  const journalHighlights = travelResourceEntries.slice(0, 3).map((entry) => ({
    title: entry.title,
    date: entry.displayDate,
    url: `/${entry.slug}`,
    heroImage: entry.heroImage,
  }));
  
  const allStories = await getAllStorySummaries();
  const latestStories = allStories.slice(0, 2);
  
  const heroImageSrc = "/images/content/cover_1.jpg";

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section - Exact viewport height */}
      <header className="relative isolate flex h-[100svh] flex-col overflow-hidden">
        {/* Background Image with Ken Burns effect */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImageSrc}
            alt="Beautiful travel destination"
            fill
            className="object-cover scale-105 animate-[kenburns_20s_ease-in-out_infinite_alternate]"
            priority
            sizes="100vw"
          />
          {/* Professional gradient overlay - deeper with subtle warmth */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/50 to-slate-950/90" />
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/30 via-transparent to-amber-950/20" />
        </div>

        {/* Subtle decorative accents */}
        <div className="absolute top-1/4 left-0 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />

        {/* Main Hero Content - All content centered */}
        <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6">
          <div className="mx-auto w-full max-w-5xl text-center">
            {/* Main headline */}
            <h1 className="mb-3 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:mb-5 sm:text-5xl md:text-6xl">
              Make Every Mile
              <span className="mt-1 block text-white sm:mt-2">
                Meaningful
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mb-5 max-w-2xl text-sm leading-relaxed text-slate-100 sm:mb-7 sm:text-lg md:text-xl">
              Blending soulful journeys with smart use of miles and points, so every trip becomes richer and more rewarding.
            </p>

            {/* CTA Buttons */}
            <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:mb-8 sm:flex-row sm:gap-4">
              {/* Primary CTA */}
              <Link
                href="/travel-with-points"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-xl hover:shadow-black/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                <span className="relative">Start Exploring</span>
                <svg className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              {/* Secondary CTA */}
              <Link
                href="/stories"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Read Stories</span>
              </Link>
            </div>

            {/* Quick Links - Integrated below CTAs */}
            <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-slate-900/40 p-2.5 backdrop-blur-sm sm:max-w-2xl sm:p-3">
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group flex min-h-[68px] flex-col items-center justify-center gap-1.5 rounded-xl p-2.5 text-center transition-all duration-200 hover:bg-white/10 sm:min-h-0 sm:flex-row sm:gap-2 sm:p-3"
                  >
                    <span className="text-xl sm:text-xl">{link.icon}</span>
                    <span className="text-[11px] font-medium leading-tight text-white/70 transition-colors group-hover:text-white sm:text-xs">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-white">
        {/* Getting Started Section */}
        <section className="border-b border-slate-100 py-8 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="mb-6 text-center">
              <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                Start Your Journey
              </h2>
            </div>

            <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
              {/* Miles & Points Explained */}
              <Link
                href="/travel-with-points/miles-and-points-explained"
                className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all active:scale-[0.98] sm:flex-col sm:items-start sm:p-6 sm:hover:border-slate-900 sm:hover:shadow-lg"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-900 sm:h-12 sm:w-12">
                  <svg className="h-5 w-5 text-white sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1 sm:mt-3">
                  <h3 className="mb-1 text-base font-semibold text-slate-900 sm:text-lg">
                    Miles & Points Explained
                  </h3>
                  <p className="text-sm text-slate-600 sm:mb-2">
                    Learn the basics
                  </p>
                </div>
                <svg className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Travel With Points */}
              <Link
                href="/travel-with-points"
                className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all active:scale-[0.98] sm:flex-col sm:items-start sm:p-6 sm:hover:border-sky-300 sm:hover:shadow-lg"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sky-500 sm:h-12 sm:w-12">
                  <svg className="h-5 w-5 text-white sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 sm:mt-3">
                  <h3 className="mb-1 text-base font-semibold text-slate-900 sm:text-lg">
                    Travel With Points
                  </h3>
                  <p className="text-sm text-slate-600 sm:mb-2">
                    Explore programs
                  </p>
                </div>
                <svg className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Resources Section */}
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-6 text-center sm:mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                Latest Resources
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {journalHighlights.map((entry) => (
                <Link
                  key={entry.title}
                  href={entry.url}
                  className="group relative overflow-hidden rounded-lg bg-slate-100 transition-transform hover:scale-[1.02]"
                  style={{ aspectRatio: '4/3' }}
                >
                  {entry.heroImage?.src && (
                    <Image
                      src={entry.heroImage.src}
                      alt={entry.heroImage.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                    <p className="mb-1 text-xs font-medium text-white/70">{entry.date}</p>
                    <h3 className="text-sm font-semibold leading-snug text-white transition-colors group-hover:text-white/90 sm:text-base">
                      {entry.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center sm:mt-8">
              <Link
                href="/travel-resources"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white"
              >
                View all resources
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="border-t border-slate-100 py-10 sm:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-6 text-center sm:mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                Latest from the Blog
              </h2>
              <p className="mt-2 text-slate-600">Expert guides on maximizing your travel rewards</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              <Link
                href="/best-travel-credit-cards-2025"
                className="group relative overflow-hidden rounded-lg bg-slate-100 transition-transform hover:scale-[1.02]"
                style={{ aspectRatio: '4/3' }}
              >
                <Image
                  src="/images/content/cover_1.jpg"
                  alt="Best travel credit cards"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                  <span className="mb-2 inline-block w-fit rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-900">
                    💳 Credit Cards
                  </span>
                  <h3 className="text-sm font-semibold leading-snug text-white transition-colors group-hover:text-white/90 sm:text-base">
                    Best Travel Credit Cards for 2025
                  </h3>
                </div>
              </Link>

              <Link
                href="/marriott-bonvoy-guide"
                className="group relative overflow-hidden rounded-lg bg-slate-100 transition-transform hover:scale-[1.02]"
                style={{ aspectRatio: '4/3' }}
              >
                <Image
                  src="/images/content/cover_1.jpg"
                  alt="Marriott Bonvoy guide"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                  <span className="mb-2 inline-block w-fit rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-900">
                    🏨 Hotels
                  </span>
                  <h3 className="text-sm font-semibold leading-snug text-white transition-colors group-hover:text-white/90 sm:text-base">
                    Complete Guide to Marriott Bonvoy
                  </h3>
                </div>
              </Link>

              <Link
                href="/avoid-tourist-scams"
                className="group relative overflow-hidden rounded-lg bg-slate-100 transition-transform hover:scale-[1.02]"
                style={{ aspectRatio: '4/3' }}
              >
                <Image
                  src="/images/content/cover_1.jpg"
                  alt="Avoid tourist scams"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                  <span className="mb-2 inline-block w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                    💡 Travel Tips
                  </span>
                  <h3 className="text-sm font-semibold leading-snug text-white transition-colors group-hover:text-white/90 sm:text-base">
                    10 Common Tourist Scams to Avoid
                  </h3>
                </div>
              </Link>
            </div>

            <div className="mt-6 text-center sm:mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white"
              >
                View all articles
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Stories Section */}
        <section className="border-t border-slate-100 py-10 sm:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-6 text-center sm:mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                Latest Stories
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {latestStories.map((story) => (
                <Link
                  key={story.slug}
                  href={`/${story.slug}`}
                  className="group relative overflow-hidden rounded-lg bg-slate-100 transition-transform hover:scale-[1.02]"
                  style={{ aspectRatio: '16/9' }}
                >
                  {story.coverImage?.src && (
                    <Image
                      src={story.coverImage.src}
                      alt={story.coverImage.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                    <div className="mb-2 flex items-center gap-2 text-xs text-white/70">
                      <span className="font-medium">{story.city}, {story.country}</span>
                      <span className="text-white/50">•</span>
                      <span className="text-white/70">{story.date}</span>
                    </div>
                    <h3 className="mb-2 text-base font-semibold leading-snug text-white transition-colors group-hover:text-white/90 sm:text-lg">
                      {story.title}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-2 sm:text-sm">{story.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center sm:mt-8">
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white"
              >
                View all stories
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <Image
                src="/Logo/MilesGoRound-Logo-Blue.png"
                alt="Miles Go Round"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-slate-900">Miles Go Round</p>
                <p className="text-xs text-slate-500">Stories from a life in motion</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/milesgoround/"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@milesGoRound"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://x.com/milesGoRound"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
                aria-label="X (Twitter)"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright and Links */}
          <div className="mt-6 border-t border-slate-100 pt-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} Miles Go Round. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
                <Link href="/about" className="transition-colors hover:text-slate-900">
                  About
                </Link>
                <Link href="/contact" className="transition-colors hover:text-slate-900">
                  Contact
                </Link>
                <Link href="/privacy" className="transition-colors hover:text-slate-900">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="transition-colors hover:text-slate-900">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
