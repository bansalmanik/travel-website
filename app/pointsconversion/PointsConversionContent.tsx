"use client";

import type { ChangeEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import type { Conversion } from "@/app/pointsconversion/types";

const ALL_PROGRAMS_OPTION = "All Programs";

type ConversionByFrom = Record<string, Conversion>;

type PartnerRow = {
  to: string;
  rate: string;
  insight: string;
};

type PointsConversionContentProps = {
  conversions: Conversion[];
};

type SearchableSelectProps = {
  id: string;
  label: string;
  placeholder?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  disabled?: boolean;
  allowEmptyLabel?: string;
};

type PointsInputProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

type ResultCardProps = {
  selectedFrom: string;
  selectedTo: string;
  points: number;
  partner: PartnerRow | null;
  formattedPoints: string | null;
};

const getProgramName = (conversion: Conversion) => conversion.program ?? "Other";

const parseRatio = (rate: string) => {
  const numericParts = rate.match(/[\d.]+/g);

  if (!numericParts || numericParts.length < 2) {
    return null;
  }

  const [fromAmount, toAmount] = numericParts;

  const fromValue = Number(fromAmount);
  const toValue = Number(toAmount);

  if (!Number.isFinite(fromValue) || !Number.isFinite(toValue) || fromValue <= 0) {
    return null;
  }

  return { fromValue, toValue };
};

const calculateProjectedPoints = (rate: string, transferPoints: number) => {
  if (!transferPoints) {
    return null;
  }

  const ratio = parseRatio(rate);

  if (!ratio) {
    return null;
  }

  return (transferPoints * ratio.toValue) / ratio.fromValue;
};

const formatProjectedPoints = (value: number | null) => {
  if (!value || Number.isNaN(value)) {
    return null;
  }

  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }

  return value.toFixed(0);
};

function SearchableSelect({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
  helperText,
  disabled,
  allowEmptyLabel,
}: SearchableSelectProps) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase().trim())
      ),
    [options, query]
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);

    const exactMatch = options.find(
      (option) => option.toLowerCase() === nextQuery.toLowerCase()
    );

    if (exactMatch) {
      onChange(exactMatch);
    }
  };

  const handleSelectOption = (option: string) => {
    setQuery(option);
    onChange(option);
    setOpen(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setOpen(false);
      setQuery(value);
    }, 100);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-slate-100">
          {label}
        </label>
        {allowEmptyLabel ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs font-semibold text-amber-200 transition hover:text-amber-100 disabled:opacity-60"
            disabled={disabled || !value}
          >
            {allowEmptyLabel}
          </button>
        ) : null}
      </div>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 shadow-inner outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/40 disabled:cursor-not-allowed disabled:opacity-60"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={`${id}-options`}
          aria-haspopup="listbox"
          role="combobox"
        />
        {open && filteredOptions.length > 0 && !disabled ? (
          <ul
            id={`${id}-options`}
            role="listbox"
            className="absolute z-10 mt-2 max-h-56 w-full overflow-y-auto rounded-xl border border-white/10 bg-slate-950/95 shadow-lg shadow-slate-950/40"
          >
            {filteredOptions.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleSelectOption(option)}
                  className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-slate-100 transition hover:bg-amber-500/10"
                  role="option"
                  aria-selected={value === option}
                >
                  <span className="truncate">{option}</span>
                  {value === option ? (
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200">
                      Selected
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {helperText ? (
        <p className="text-xs text-slate-300/80">{helperText}</p>
      ) : null}
    </div>
  );
}

function PointsInput({ value, onChange }: PointsInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="transfer-points" className="text-sm font-semibold text-slate-100">
        Points to transfer
      </label>
      <input
        id="transfer-points"
        type="number"
        min={0}
        inputMode="numeric"
        value={value}
        onChange={onChange}
        placeholder="e.g. 25,000"
        className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 shadow-inner outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/40"
        aria-describedby="transfer-points-helper"
      />
      <p id="transfer-points-helper" className="text-xs text-slate-300/80">
        Enter the number of points you want to move to the partner program.
      </p>
    </div>
  );
}

function ResultCard({ selectedFrom, selectedTo, points, partner, formattedPoints }: ResultCardProps) {
  const hasCompleteSelection = Boolean(selectedFrom && selectedTo && partner && points);

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-800/60 p-6 shadow-lg shadow-slate-950/30">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/80">
            Projection
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Points Transfer Calculator
          </h2>
          <p className="mt-1 text-sm text-slate-200/80">
            See how many partner points you&apos;ll get based on the current transfer ratio.
          </p>
        </div>
        {hasCompleteSelection ? (
          <div className="rounded-2xl bg-emerald-200/10 px-3 py-2 text-right text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
            Live estimate
          </div>
        ) : null}
      </div>

      <div className="mt-6 rounded-2xl border border-white/5 bg-slate-950/50 px-4 py-5 text-sm text-slate-100">
        {hasCompleteSelection && partner ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                {selectedFrom}
              </div>
              <span className="text-sm text-slate-300">→</span>
              <div className="rounded-xl bg-amber-200/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
                {selectedTo}
              </div>
              <span className="rounded-full bg-amber-200/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-50">
                {partner.rate}
              </span>
            </div>

            <div className="flex flex-wrap items-end gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300/80">Partner points</p>
                <p className="text-4xl font-semibold text-white sm:text-5xl">
                  {formattedPoints ?? "—"}
                </p>
              </div>
              <div className="rounded-xl bg-white/5 px-3 py-2 text-xs text-slate-200/90">
                Ratio: {partner.rate}
              </div>
            </div>

            <div className="rounded-xl bg-white/5 px-4 py-3 text-sm text-slate-200/90">
              <p className="font-semibold text-white">Insight</p>
              <p className="mt-1 leading-relaxed text-slate-200/80">{partner.insight || "No additional notes."}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 text-slate-200/80">
            <p className="text-base font-semibold text-white">
              Select a card and partner to see the conversion.
            </p>
            <p className="text-sm">
              Choose your transfer source, destination partner, and points amount to preview the converted balance and any notes that might impact your transfer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PointsConversionContent({ conversions }: PointsConversionContentProps) {
  const [selectedProgramName, setSelectedProgramName] = useState<string>(
    ALL_PROGRAMS_OPTION
  );
  const [selectedFrom, setSelectedFrom] = useState(conversions[0]?.from ?? "");
  const [selectedTo, setSelectedTo] = useState<string>("");
  const [transferPoints, setTransferPoints] = useState<string>("");

  const conversionsByFrom = useMemo(() => {
    return conversions.reduce((acc, conversion) => {
      acc[conversion.from] = conversion;

      return acc;
    }, {} as ConversionByFrom);
  }, [conversions]);

  const programOptions = useMemo(() => {
    const uniquePrograms = Array.from(
      new Set(conversions.map((conversion) => getProgramName(conversion)))
    ).sort((a, b) => a.localeCompare(b));

    return [ALL_PROGRAMS_OPTION, ...uniquePrograms];
  }, [conversions]);

  const filteredConversions = useMemo(() => {
    if (!selectedProgramName || selectedProgramName === ALL_PROGRAMS_OPTION) {
      return conversions;
    }

    return conversions.filter(
      (conversion) => getProgramName(conversion) === selectedProgramName
    );
  }, [selectedProgramName, conversions]);

  const fromOptions = useMemo(
    () =>
      filteredConversions
        .map((conversion) => conversion.from)
        .sort((a, b) => a.localeCompare(b)),
    [filteredConversions]
  );

  const normalizedSelectedFrom = useMemo(() => {
    if (fromOptions.length === 0) {
      return "";
    }

    if (selectedFrom && fromOptions.includes(selectedFrom)) {
      return selectedFrom;
    }

    return fromOptions[0];
  }, [fromOptions, selectedFrom]);

  const selectedConversion = useMemo(() => {
    if (!normalizedSelectedFrom) {
      return null;
    }

    return conversionsByFrom[normalizedSelectedFrom] ?? null;
  }, [normalizedSelectedFrom, conversionsByFrom]);

  const partnerRows = useMemo<PartnerRow[]>(() => {
    if (!selectedConversion) {
      return [];
    }

    return selectedConversion.rates.flatMap((rate) =>
      rate.partners.map((partner) => ({
        to: partner.to,
        rate: rate.rate,
        insight: partner.insight,
      }))
    );
  }, [selectedConversion]);

  const toOptions = useMemo(
    () =>
      Array.from(new Set(partnerRows.map((partner) => partner.to))).sort((a, b) =>
        a.localeCompare(b)
      ),
    [partnerRows]
  );

  const normalizedSelectedTo = useMemo(() => {
    if (!selectedTo || !toOptions.includes(selectedTo)) {
      return "";
    }

    return selectedTo;
  }, [selectedTo, toOptions]);

  const filteredPartnerRows = useMemo(() => {
    if (!normalizedSelectedTo) {
      return partnerRows;
    }

    return partnerRows.filter((partner) => partner.to === normalizedSelectedTo);
  }, [partnerRows, normalizedSelectedTo]);

  const parsedTransferPoints = useMemo(() => {
    const numericValue = Number(transferPoints);

    return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : 0;
  }, [transferPoints]);

  const selectedPartnerRow = useMemo(() => {
    if (!normalizedSelectedTo) {
      return null;
    }

    return (
      partnerRows.find((partner) => partner.to === normalizedSelectedTo) ?? null
    );
  }, [normalizedSelectedTo, partnerRows]);

  const projectedPoints = useMemo(
    () =>
      selectedPartnerRow
        ? calculateProjectedPoints(selectedPartnerRow.rate, parsedTransferPoints)
        : null,
    [parsedTransferPoints, selectedPartnerRow]
  );

  const formattedProjectedPoints = useMemo(
    () => formatProjectedPoints(projectedPoints),
    [projectedPoints]
  );

  const handleProgramChange = (value: string) => {
    setSelectedProgramName(value);
    setSelectedTo("");

    const nextConversions =
      !value || value === ALL_PROGRAMS_OPTION
        ? conversions
        : conversions.filter((conversion) => getProgramName(conversion) === value);

    const nextFromOption = nextConversions
      .map((conversion) => conversion.from)
      .sort((a, b) => a.localeCompare(b))[0];

    setSelectedFrom(nextFromOption ?? "");
  };

  const handleFromChange = (value: string) => {
    setSelectedFrom(value);
    setSelectedTo("");
  };

  const handleToChange = (value: string) => {
    setSelectedTo(value);
  };

  const handleTransferPointsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTransferPoints(event.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <header className="space-y-3 text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/80">
            Transfer toolkit
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Points Transfer Calculator
          </h1>
          <p className="max-w-3xl text-base text-slate-200/80">
            Pick your program, select the card you&apos;re transferring from, and instantly see every partner ratio with projected points and helpful notes.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1.1fr]">
          <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/30">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">
                  Build your transfer
                </p>
                <h2 className="text-xl font-semibold text-white">Inputs</h2>
              </div>
              <div className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                Guided mode
              </div>
            </div>

            <div className="mt-5 space-y-5">
              <SearchableSelect
                id="program"
                label="Program"
                placeholder="Filter programs"
                options={programOptions}
                value={selectedProgramName}
                onChange={handleProgramChange}
                helperText="Narrow down the cards by their program or view all available options."
              />

              <SearchableSelect
                id="transfer-from"
                label="Transfer from"
                placeholder="Type or pick a card"
                options={fromOptions}
                value={normalizedSelectedFrom}
                onChange={handleFromChange}
                helperText={fromOptions.length === 0 ? "No cards available for this program." : "Choose the card that holds your points."}
                disabled={fromOptions.length === 0}
              />

              <SearchableSelect
                id="transfer-to"
                label="Transfer to"
                placeholder="Search for a partner"
                options={toOptions}
                value={normalizedSelectedTo}
                onChange={handleToChange}
                helperText={
                  toOptions.length === 0
                    ? "Select a card to load its partners."
                    : "Start typing to jump to a specific airline or hotel partner."
                }
                disabled={toOptions.length === 0}
                allowEmptyLabel="Show all"
              />

              <PointsInput
                value={transferPoints}
                onChange={handleTransferPointsChange}
              />
            </div>
          </section>

          <section className="space-y-5">
            <ResultCard
              selectedFrom={normalizedSelectedFrom}
              selectedTo={normalizedSelectedTo}
              points={parsedTransferPoints}
              partner={selectedPartnerRow}
              formattedPoints={formattedProjectedPoints}
            />

            <div className="rounded-3xl border border-white/10 bg-slate-900/60 shadow-xl shadow-slate-950/30">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-4 py-4 sm:px-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">
                    Partners
                  </p>
                  <h3 className="text-lg font-semibold text-white">Available transfer options</h3>
                  <p className="text-sm text-slate-200/80">
                    Browse all partners for this card. Filter above to jump straight to one destination.
                  </p>
                </div>
                <div className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                  {filteredPartnerRows.length} options
                </div>
              </div>

              {filteredPartnerRows.length === 0 ? (
                <div className="px-6 py-10 text-center">
                  <p className="text-base font-semibold text-white">No partners to show yet</p>
                  <p className="mt-2 text-sm text-slate-200/80">
                    Pick a program and card to instantly see available transfer partners and ratios.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  <div className="grid grid-cols-2 gap-3 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300/70 sm:grid-cols-[1fr_1fr_0.9fr] sm:px-6">
                    <span>Partner</span>
                    <span>Transfer ratio</span>
                    <span className="hidden sm:block">Notes</span>
                  </div>

                  {filteredPartnerRows.map((partner) => {
                    const projected = formatProjectedPoints(
                      calculateProjectedPoints(partner.rate, parsedTransferPoints)
                    );

                    return (
                      <div
                        key={`${partner.to}-${partner.rate}`}
                        className="grid grid-cols-2 gap-3 px-4 py-4 text-sm text-slate-100 sm:grid-cols-[1fr_1fr_0.9fr] sm:px-6"
                      >
                        <div className="space-y-1">
                          <p className="font-semibold text-white">{partner.to}</p>
                          <p className="text-xs uppercase tracking-[0.25em] text-slate-300/70 sm:hidden">Notes</p>
                          <p className="text-xs text-slate-200/80 sm:hidden">{partner.insight}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-amber-100">
                          <span className="w-fit rounded-lg bg-amber-200/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-50">
                            {partner.rate}
                          </span>
                          {projected ? (
                            <span className="w-fit rounded-full bg-emerald-200/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-100">
                              ≈ {projected} points
                            </span>
                          ) : null}
                        </div>
                        <p className="hidden text-sm leading-6 text-slate-200/80 sm:block">{partner.insight}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
