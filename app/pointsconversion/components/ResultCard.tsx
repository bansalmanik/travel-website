"use client";

type ResultCardProps = {
  fromProgram: string;
  toProgram: string;
  rate?: string;
  projectedPoints?: string | null;
  insight?: string;
  status: "incomplete" | "error" | "ready";
  helperMessage?: string;
};

export function ResultCard({
  fromProgram,
  toProgram,
  rate,
  projectedPoints,
  insight,
  status,
  helperMessage,
}: ResultCardProps) {
  const showHelper = status === "incomplete";
  const showError = status === "error";

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/80 p-6 shadow-xl shadow-slate-950/40 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300/15 text-amber-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
            aria-hidden
          >
            <path d="M12 2.25c.414 0 .75.336.75.75v17.79l4.72-4.72a.75.75 0 1 1 1.06 1.06l-6 6a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 1.06-1.06l4.72 4.72V3a.75.75 0 0 1 .75-.75Z" />
          </svg>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Result</p>
          <h2 className="text-xl font-semibold text-white">Projected partner points</h2>
        </div>
      </div>

      {showHelper ? (
        <p className="mt-6 text-sm text-slate-300">
          {helperMessage ?? "Select a card, partner, and amount to preview the transfer."}
        </p>
      ) : null}

      {showError ? (
        <div className="mt-6 rounded-2xl border border-rose-400/30 bg-rose-950/40 px-4 py-3 text-sm text-rose-100">
          {`We couldn’t find a transfer path between ${fromProgram || "your card"} and ${toProgram || "the selected partner"}.`}
        </div>
      ) : null}

      {status === "ready" ? (
        <div className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Partner points</p>
            <p className="mt-2 text-4xl font-bold text-white">{projectedPoints ?? "—"}</p>
            <p className="mt-2 text-sm text-slate-300">Estimated after conversion</p>
          </div>
          <div className="space-y-3 rounded-2xl bg-slate-900/60 p-3 shadow-inner shadow-black/10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Conversion ratio</p>
              <p className="mt-1 text-base font-semibold text-white">
                {rate}
              </p>
              <p className="text-sm text-slate-300">
                From <span className="font-semibold text-amber-100">{fromProgram}</span> to <span className="font-semibold text-amber-100">{toProgram}</span>
              </p>
            </div>
            {insight ? (
              <div className="rounded-xl border border-amber-300/20 bg-amber-200/10 px-3 py-2 text-sm text-amber-50">
                {insight}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
