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
        <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-left text-blue-900 shadow-sm dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-100">
          <p className="text-sm leading-relaxed">
            To share your story, send an email to <span className="font-semibold">stories@travelexplorer.com</span>. We will review your content and get back to you.
          </p>
          <p className="mt-4 text-sm font-semibold">Please include:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
            <li>Story content</li>
            <li>Images</li>
            <li>YouTube video link</li>
            <li>Instagram handle</li>
          </ul>
          <p className="mt-3 text-xs text-blue-800 dark:text-blue-200">
            Include at least one of your Instagram handle or YouTube video link so we can verify the authenticity of your content.
          </p>
        </div>
      )}
    </div>
  );
}
