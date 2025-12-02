type ResultCardProps = {
  fromProgram: string;
  toProgram: string;
  rate: string;
  projectedPoints: string | null;
  note?: string;
};

export function ResultCard({
  fromProgram,
  toProgram,
  rate,
  projectedPoints,
  note,
}: ResultCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-500">Transfer Path</p>
          <h3 className="text-2xl font-semibold text-slate-900">
            {fromProgram} → {toProgram}
          </h3>
          <p className="text-sm text-slate-600">Conversion rate: {rate}</p>
        </div>
        {projectedPoints ? (
          <div className="rounded-2xl bg-indigo-50 px-4 py-3 text-center text-sm font-semibold text-indigo-600">
            ≈ {projectedPoints} points after transfer
          </div>
        ) : null}
      </div>

      {note ? (
        <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
          {note}
        </div>
      ) : null}
    </div>
  );
}

