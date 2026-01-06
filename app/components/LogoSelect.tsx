"use client";

import { useState, useRef, useEffect } from "react";

type Option = {
  value: string;
  label: string;
  logo?: string;
};

type LogoSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export default function LogoSelect({
  value,
  onChange,
  options,
  placeholder = "Select...",
  disabled = false,
  className = "",
}: LogoSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Filter options based on search query
  const filteredOptions = searchQuery
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Only auto-focus search input on desktop (not touch devices) to prevent keyboard popup on mobile
      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
      if (!isTouchDevice) {
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Selected Value Display */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full rounded-lg bg-slate-50 py-3 text-base font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          disabled
            ? "cursor-not-allowed text-slate-400"
            : "cursor-pointer text-slate-700 hover:bg-indigo-50"
        } ${selectedOption?.logo ? "pl-12 pr-10" : "px-4 pr-10"} text-left`}
      >
        {selectedOption?.logo && (
          <div className="pointer-events-none absolute left-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white">
            <img
              src={selectedOption.logo}
              alt={selectedOption.label}
              className="h-6 w-6 rounded-full object-cover"
            />
          </div>
        )}
        <span className={!selectedOption ? "text-slate-400" : ""}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transition-transform ${
            isOpen ? "rotate-180" : ""
          } ${disabled ? "text-slate-300" : "text-slate-500"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div className="absolute z-50 mt-2 w-full rounded-lg bg-white shadow-lg ring-1 ring-slate-200">
          {/* Search Input */}
          <div className="p-2 border-b border-slate-200">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-2 text-sm rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-slate-400 text-center">
                No results found
              </div>
            ) : (
              filteredOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full px-4 py-3 text-left text-base transition hover:bg-indigo-50 ${
                option.value === value ? "bg-indigo-50 font-semibold text-indigo-700" : "text-slate-700"
              } ${option.logo ? "pl-12" : ""} flex items-center relative`}
            >
              {option.logo && (
                <div className="absolute left-3 flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                  <img
                    src={option.logo}
                    alt={option.label}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                </div>
              )}
              {option.label}
            </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
