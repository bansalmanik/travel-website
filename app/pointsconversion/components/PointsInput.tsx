"use client";

import type { ChangeEvent } from "react";

type PointsInputProps = {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function PointsInput({ id, label, value, placeholder, onChange }: PointsInputProps) {
  return (
    <label className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-100">{label}</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200/80">
          Points
        </span>
      </div>
      <input
        id={id}
        type="number"
        min={0}
        inputMode="numeric"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-base font-semibold text-slate-50 shadow-sm shadow-slate-950/30 transition focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
        aria-label={label}
      />
    </label>
  );
}
