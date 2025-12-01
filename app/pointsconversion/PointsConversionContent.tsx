"use client";

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";

import type { Conversion } from "@/app/pointsconversion/types";

type ConversionByFrom = Record<string, Conversion>;

const ALL_PROGRAMS_OPTION = "All Programs";

const getProgramName = (conversion: Conversion) =>
  conversion.program ?? "Other";

type PartnerRow = {
  to: string;
  rate: string;
  insight: string;
};

type PointsConversionContentProps = {
  conversions: Conversion[];
};

export default function PointsConversionContent({ conversions }: PointsConversionContentProps) {
  const [selectedProgramName, setSelectedProgramName] = useState<string>(
    ALL_PROGRAMS_OPTION
  );
  const [selectedFrom, setSelectedFrom] = useState(conversions[0]?.from ?? "");

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
    if (
      !selectedProgramName ||
      selectedProgramName === ALL_PROGRAMS_OPTION
    ) {
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

  const handleProgramChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newProgram = event.target.value;
    setSelectedProgramName(newProgram);

    const nextConversions =
      !newProgram || newProgram === ALL_PROGRAMS_OPTION
        ? conversions
        : conversions.filter(
            (conversion) => getProgramName(conversion) === newProgram
          );

    const nextFromOption = nextConversions
      .map((conversion) => conversion.from)
      .sort((a, b) => a.localeCompare(b))[0];

    setSelectedFrom(nextFromOption ?? "");
  };

  const handleFromChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFrom(event.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <header className="space-y-3 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/80">
            Points conversion hub
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Compare transfer partners instantly
          </h1>
          <p className="text-sm leading-6 text-slate-200/80 sm:max-w-2xl">
            Pick your rewards program and originating card to surface a fast, scannable table of every transfer partner,
            conversion ratio, and insight—optimized for quick answers and search visibility.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-lg shadow-slate-950/30 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-3 sm:items-end">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                Program
              </span>
              <select
                value={selectedProgramName}
                onChange={handleProgramChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                aria-label="Select the card program"
              >
                {programOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 sm:col-span-2">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                <span>Transfer from</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-amber-100/70">
                  {fromOptions.length} options
                </span>
              </div>
              <select
                value={normalizedSelectedFrom}
                onChange={handleFromChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                aria-label="Select the points program you are transferring from"
                disabled={fromOptions.length === 0}
              >
                {fromOptions.length === 0 ? (
                  <option value="" disabled>
                    No cards available
                  </option>
                ) : (
                  fromOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))
                )}
              </select>
            </label>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="text-sm text-slate-200/80">
              <p className="font-semibold text-white">
                {normalizedSelectedFrom || "Choose a card"}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-300/70">
                Transfer partner directory
              </p>
            </div>
            <span className="inline-flex items-center justify-center rounded-full border border-amber-300/40 bg-amber-200/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-100/80">
              {partnerRows.length} partners
            </span>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/40 shadow-lg shadow-slate-950/30">
          <div className="flex items-center justify-between gap-3 border-b border-white/5 px-4 py-3 sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                Transfer partners
              </p>
              <p className="text-sm text-slate-300/80">
                Full list of destinations with live ratios and quick notes.
              </p>
            </div>
            <div className="hidden text-xs font-medium uppercase tracking-[0.3em] text-amber-100/70 sm:block">
              Mobile-first, scannable table
            </div>
          </div>

          {partnerRows.length === 0 ? (
            <div className="px-4 py-10 text-center sm:px-6">
              <p className="text-base font-semibold text-white">No partners to show yet</p>
              <p className="mt-2 text-sm text-slate-200/80">
                Pick a program and card to instantly see available transfer partners and ratios.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              <div className="grid grid-cols-2 gap-3 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300/70 sm:grid-cols-[1fr_0.7fr_1fr] sm:gap-2 sm:px-6">
                <span>Partner</span>
                <span>Transfer ratio</span>
                <span className="hidden sm:block">Notes</span>
              </div>

              {partnerRows.map((partner) => (
                <div
                  key={`${partner.to}-${partner.rate}`}
                  className="grid grid-cols-2 gap-3 px-4 py-3 text-sm text-slate-100 sm:grid-cols-[1fr_0.7fr_1fr] sm:gap-2 sm:px-6"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-white">{partner.to}</p>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-300/70 sm:hidden">Notes</p>
                    <p className="text-xs text-slate-200/80 sm:hidden">{partner.insight}</p>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-amber-100">
                    <span className="rounded-lg bg-amber-200/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-50">
                      {partner.rate}
                    </span>
                  </div>
                  <p className="hidden text-sm leading-6 text-slate-200/80 sm:block">{partner.insight}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
