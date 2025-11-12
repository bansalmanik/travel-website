import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 text-center text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="space-y-1">
          <p className="text-base font-semibold text-slate-900">Miles Go Round</p>
          <p className="max-w-md text-sm leading-6">
            Soulful travel stories, practical point strategies, and journaled reflections for curious explorers.
          </p>
        </div>
        <div className="space-y-3">
          <p className="font-semibold uppercase tracking-[0.18em] text-slate-500">Stay in touch</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <Link className="transition hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400" href="/stories">
              Stories
            </Link>
            <Link className="transition hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400" href="/travel-with-points">
              Travel with points
            </Link>
            <Link className="transition hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400" href="/journals">
              Journals
            </Link>
          </div>
          <p className="text-xs text-slate-400">© {year} Miles Go Round. Crafted for mindful journeys.</p>
        </div>
      </div>
    </footer>
  );
}
