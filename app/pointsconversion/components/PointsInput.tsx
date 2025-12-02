type PointsInputProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export default function PointsInput({ label, value, placeholder, onChange }: PointsInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-800" htmlFor={label.replace(/\s+/g, "-").toLowerCase()}>
        {label}
      </label>
      <input
        id={label.replace(/\s+/g, "-").toLowerCase()}
        type="number"
        min={0}
        inputMode="numeric"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-400 shadow-sm shadow-slate-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
      <p className="text-sm text-slate-500">Enter a whole number for the cleanest projection.</p>
    </div>
  );
}
