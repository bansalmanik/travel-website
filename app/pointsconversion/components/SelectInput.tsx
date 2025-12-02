import { useId, useMemo } from "react";

type SelectInputProps = {
  label: string;
  options: string[];
  value: string;
  placeholder?: string;
  helperText?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function SelectInput({
  label,
  options,
  value,
  placeholder,
  helperText,
  onChange,
  disabled,
}: SelectInputProps) {
  const inputId = useId();
  const datalistId = `${inputId}-options`;

  const filteredOptions = useMemo(() => {
    if (!value) return options;

    const normalizedValue = value.toLowerCase();

    return options.filter((option) => option.toLowerCase().includes(normalizedValue));
  }, [options, value]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-800" htmlFor={inputId}>
        {label}
      </label>
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm shadow-slate-200 focus-within:ring-2 focus-within:ring-amber-400">
        <input
          id={inputId}
          type="text"
          list={datalistId}
          autoComplete="off"
          disabled={disabled}
          className="w-full bg-transparent text-base text-slate-900 placeholder-slate-400 outline-none"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      </div>
      {helperText ? <p className="text-sm text-slate-500">{helperText}</p> : null}

      <datalist id={datalistId}>
        {filteredOptions.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </div>
  );
}
