"use client";

import { useState } from "react";

export default function ShareStoryCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 text-center">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-blue-300"
      >
        Share Your Story
      </button>

      {isOpen && (
        <div className="w-full rounded-3xl border border-blue-200/70 bg-gradient-to-br from-blue-50 via-white to-blue-100 p-7 text-left text-blue-900 shadow-lg dark:border-blue-900/50 dark:from-blue-950/40 dark:via-blue-950/20 dark:to-blue-900/30 dark:text-blue-50">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700/80 dark:text-blue-200/80">Editorial submissions</p>
              <h3 className="text-xl font-semibold leading-tight sm:text-2xl">
                Email your story to <span className="underline decoration-blue-500 decoration-2 underline-offset-4">stories@travelexplorer.com</span>
              </h3>
              <p className="text-sm text-blue-800/80 dark:text-blue-100/80">
                We review each submission carefully and respond within five business days.
              </p>
            </div>
            <a
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-blue-300"
              href="mailto:stories@travelexplorer.com"
            >
              Send Email
            </a>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-blue-100/80 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-blue-900/50 dark:bg-blue-900/30">
              <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-100">What to include</h4>
              <ul className="mt-3 space-y-2 text-sm text-blue-900/90 dark:text-blue-50">
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden />
                  <span>Story content covering key moments, highlights, and takeaways from your trip.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden />
                  <span>High-quality images that capture the destination and your experience.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden />
                  <span>YouTube video link (optional but encouraged).</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden />
                  <span>Instagram handle so we can credit you properly.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-blue-100/80 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-blue-900/50 dark:bg-blue-900/30">
              <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-100">Verification & review</h4>
              <ul className="mt-3 space-y-2 text-sm text-blue-900/90 dark:text-blue-50">
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden />
                  <span>Include at least one of either your Instagram handle or YouTube link to help us verify authenticity.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden />
                  <span>Our team reviews submissions for originality, clarity, and alignment with Travel Explorer&apos;s editorial standards.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden />
                  <span>We&apos;ll reach out if we need more details and to coordinate publishing timelines.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
