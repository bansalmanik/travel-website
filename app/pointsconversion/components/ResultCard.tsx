type ResultCardProps = {
  fromProgram: string;
  toProgram: string;
  transferRate: string;
  projectedPoints: string | null;
  rawProjectedPoints: number | null;
  insight: string;
};

export default function ResultCard({
  fromProgram,
  toProgram,
  transferRate,
  projectedPoints,
  rawProjectedPoints,
  insight,
}: ResultCardProps) {
  return (
    <div className="space-y-3 rounded-xl bg-white px-4 py-4 shadow-sm shadow-slate-200 ring-1 ring-slate-200">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Conversion ready</p>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">{transferRate}</span>
      </div>

      <div className="space-y-1">
        <p className="text-lg font-semibold text-slate-900">
          {fromProgram} → {toProgram}
        </p>
        <p className="text-sm text-slate-600">Transfer ratio shown applies to your selection.</p>
      </div>

      <div className="flex flex-wrap gap-3 rounded-lg bg-slate-50 px-3 py-3 text-sm ring-1 ring-slate-200">
        <div className="flex-1 min-w-[180px]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Projected partner points</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-700">
            {projectedPoints ?? "—"}
            {rawProjectedPoints && projectedPoints ? <span className="text-base text-slate-500"> pts</span> : null}
          </p>
        </div>
        <div className="flex-1 min-w-[180px]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Transfer rate</p>
          <p className="mt-1 text-xl font-semibold text-slate-900">{transferRate}</p>
        </div>
      </div>

      <p className="text-sm text-slate-600">{insight}</p>
    </div>
  );
}
