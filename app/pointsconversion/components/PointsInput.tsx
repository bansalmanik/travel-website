"use client";

type PointsInputProps = {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export function PointsInput({
  id,
  label,
  placeholder,
  value,
  onChange,
}: PointsInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-slate-800 sm:text-base"
      >
        {label}
      </label>
      <input
        id={id}
        type="number"
        min={0}
        inputMode="numeric"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
        aria-label={label}
      />
    </div>
  );
}

