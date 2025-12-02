"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

export type SearchableOption = {
  value: string;
  label: string;
  description?: string;
  iconUrl?: string;
};

type SearchableSelectProps = {
  id: string;
  label: string;
  value: string;
  options: SearchableOption[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  helperText?: string;
  ariaLabel?: string;
};

export function SearchableSelect({
  id,
  label,
  value,
  options,
  placeholder,
  disabled,
  onChange,
  helperText,
  ariaLabel,
}: SearchableSelectProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return options;
    }

    return options.filter((option) =>
      option.label.toLowerCase().includes(normalizedQuery)
    );
  }, [options, query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (newValue: string) => {
    onChange(newValue);
    setOpen(false);
    setQuery("");
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && open && filteredOptions.length > 0) {
      handleSelect(filteredOptions[0].value);
      event.preventDefault();
    }

    if (event.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  };

  const inputDisplayValue = open ? query : selectedOption?.label ?? "";

  return (
    <div ref={containerRef} className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-sm font-semibold text-slate-100"
        >
          {label}
        </label>
        {helperText ? (
          <span className="text-xs font-medium text-slate-400">{helperText}</span>
        ) : null}
      </div>

      <div className="relative">
        <div
          className={`flex items-center gap-2 rounded-2xl border px-3 py-2 transition focus-within:ring-2 focus-within:ring-amber-400/60 ${
            disabled
              ? "cursor-not-allowed border-white/10 bg-slate-900/40 text-slate-500"
              : "border-white/10 bg-slate-900/80 text-slate-100 shadow-sm shadow-slate-900/40"
          }`}
        >
          <input
            id={id}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={`${id}-listbox`}
            aria-label={ariaLabel ?? label}
            aria-autocomplete="list"
            className="w-full bg-transparent text-sm font-medium placeholder:text-slate-500 focus:outline-none"
            placeholder={placeholder}
            value={inputDisplayValue}
            disabled={disabled}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleInputKeyDown}
          />
          {selectedOption?.label ? (
            <button
              type="button"
              className="rounded-xl px-2 text-xs font-semibold text-slate-300 transition hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
              onClick={() => handleSelect("")}
              aria-label="Clear selection"
            >
              Clear
            </button>
          ) : null}
          <span
            className={`text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 transition ${
              open ? "text-amber-300" : ""
            }`}
            aria-hidden
          >
            {open ? "▲" : "▼"}
          </span>
        </div>

        {open ? (
          <div
            id={`${id}-listbox`}
            role="listbox"
            className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl border border-white/10 bg-slate-900/95 p-1 shadow-2xl shadow-slate-950/40 backdrop-blur"
          >
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-slate-300">
                No matches found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value || option.label}
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition hover:bg-slate-800/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${
                    option.value === value ? "bg-slate-800/70" : ""
                  }`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.iconUrl ? (
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={option.iconUrl}
                        alt=""
                        className="h-6 w-6 object-contain"
                      />
                    </span>
                  ) : null}
                  <span className="flex-1 text-slate-50">{option.label}</span>
                  {option.description ? (
                    <span className="text-xs font-medium text-slate-400">
                      {option.description}
                    </span>
                  ) : null}
                </button>
              ))
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
