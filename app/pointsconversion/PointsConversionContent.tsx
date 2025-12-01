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

  const calculateProjectedPoints = (rate: string) => {
    if (!parsedTransferPoints) {
      return null;
    }

    const ratio = parseRatio(rate);

    if (!ratio) {
      return null;
    }

    const converted = (parsedTransferPoints * ratio.toValue) / ratio.fromValue;

    return converted;
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

  const handleProgramChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newProgram = event.target.value;
    setSelectedProgramName(newProgram);
    setSelectedTo("");

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
    setSelectedTo("");
  };

  const handleToChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTo(event.target.value);
  };

  const handleTransferPointsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTransferPoints(event.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <header className="space-y-3 text-center sm:text-left">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Points Transfer Calculator
          </h1>
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

          <div className="mt-4 grid gap-4 sm:grid-cols-3 sm:items-end">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                Transfer to
              </span>
              <select
                value={normalizedSelectedTo}
                onChange={handleToChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                aria-label="Select the partner you are transferring to"
                disabled={toOptions.length === 0}
              >
                <option value="">All partners</option>
                {toOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 sm:col-span-2">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                <span>Transfer points</span>
              </div>
              <input
                type="number"
                min={0}
                inputMode="numeric"
                value={transferPoints}
                onChange={handleTransferPointsChange}
                placeholder="Enter points to transfer"
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                aria-label="Enter the number of points you want to transfer"
              />
            </label>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/40 shadow-lg shadow-slate-950/30">

          {filteredPartnerRows.length === 0 ? (
            <div className="px-4 py-10 text-center sm:px-6">
              <p className="text-base font-semibold text-white">No partners to show yet</p>
              <p className="mt-2 text-sm text-slate-200/80">
                Pick a program and card to instantly see available transfer partners and ratios.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              <div className="grid grid-cols-2 gap-3 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300/70 sm:grid-cols-[1.2fr_0.8fr_1fr] sm:px-6">
                <span>Partner</span>
                <span>Transfer ratio</span>
                <span className="hidden sm:block">Notes</span>
              </div>

              {filteredPartnerRows.map((partner) => {
                const projectedPoints = formatProjectedPoints(
                  calculateProjectedPoints(partner.rate)
                );

                return (
                  <div
                    key={`${partner.to}-${partner.rate}`}
                    className="grid grid-cols-2 gap-3 px-4 py-3 text-sm text-slate-100 sm:grid-cols-[1.2fr_0.8fr_1fr] sm:px-6"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-white">{partner.to}</p>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-300/70 sm:hidden">Notes</p>
                      <p className="text-xs text-slate-200/80 sm:hidden">{partner.insight}</p>
                    </div>
                    <div className="flex flex-col gap-1 text-amber-100 sm:flex-row sm:items-center">
                      <span className="w-fit rounded-lg bg-amber-200/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-50">
                        {partner.rate}
                      </span>
                      {projectedPoints ? (
                        <span className="w-fit rounded-full bg-emerald-200/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-100">
                          ≈ {projectedPoints} points
                        </span>
                      ) : null}
                    </div>
                    <p className="hidden text-sm leading-6 text-slate-200/80 sm:block">{partner.insight}</p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
