"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SelectInputProps = {
  label: string;
  id: string;
  placeholder?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

const normalize = (value: string) => value.trim().toLowerCase();

export function SelectInput({
  label,
  id,
  placeholder,
  options,
  value,
  onChange,
  disabled,
}: SelectInputProps) {
  const [query, setQuery] = useState(value ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    if (!query) return options;

    const normalizedQuery = normalize(query);

    return options.filter((option) => normalize(option).includes(normalizedQuery));
  }, [options, query]);

  const handleSelect = (option: string) => {
    onChange(option);
    setQuery(option);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-slate-800 sm:text-base"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="search"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={`${id}-listbox`}
          aria-autocomplete="list"
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => {
            if (!disabled) {
              setIsOpen(true);
              setQuery(value ?? "");
            }
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            if (!isOpen) {
              setIsOpen(true);
            }
          }}
          value={isOpen ? query : value || query}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-slate-100"
        />
        {isOpen && !disabled ? (
          <div
            id={`${id}-listbox`}
            role="listbox"
            className="absolute left-0 right-0 z-10 mt-2 max-h-56 overflow-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-xl"
          >
            {filteredOptions.length === 0 ? (
              <p className="px-3 py-2 text-sm text-slate-500">No matches</p>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="option"
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-slate-800 transition hover:bg-indigo-50"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleSelect(option)}
                  aria-selected={value === option}
                >
                  <span>{option}</span>
                  {value === option ? (
                    <span className="text-xs font-semibold text-indigo-500">Selected</span>
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

