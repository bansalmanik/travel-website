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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50/30">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Points Transfer Calculator
          </h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Calculate transfer ratios instantly
          </p>
        </div>

        {/* Filters Card */}
        <div className="mb-4 rounded-xl bg-white p-4 shadow-sm sm:mb-6 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-slate-600 sm:text-xs">
                Program
              </label>
              <select
                value={selectedProgramName}
                onChange={handleProgramChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition hover:border-slate-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              >
                {programOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-slate-600 sm:text-xs">
                Card
              </label>
              <select
                value={normalizedSelectedFrom}
                onChange={handleFromChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition hover:border-slate-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
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
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-slate-600 sm:text-xs">
                Partner (optional)
              </label>
              <select
                value={normalizedSelectedTo}
                onChange={handleToChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition hover:border-slate-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                disabled={toOptions.length === 0}
              >
                <option value="">All partners</option>
                {toOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-slate-600 sm:text-xs">
                Points to transfer
              </label>
              <input
                type="number"
                min={0}
                inputMode="numeric"
                value={transferPoints}
                onChange={handleTransferPointsChange}
                placeholder="e.g. 50000"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition hover:border-slate-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredPartnerRows.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto max-w-sm">
              <p className="text-sm font-medium text-slate-900">No partners available</p>
              <p className="mt-1 text-xs text-slate-500">
                Select a program and card to see transfer options
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredPartnerRows.map((partner) => {
              const projectedPoints = formatProjectedPoints(
                calculateProjectedPoints(partner.rate)
              );

              return (
                <div
                  key={`${partner.to}-${partner.rate}`}
                  className="rounded-lg bg-white p-3 shadow-sm transition hover:shadow-md sm:p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                        {partner.to}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-500 sm:hidden">
                        {partner.insight}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-900 ring-1 ring-inset ring-amber-600/20">
                        {partner.rate}
                      </span>
                      {projectedPoints && (
                        <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-900 ring-1 ring-inset ring-emerald-600/20">
                          → {projectedPoints}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="mt-2 hidden text-xs leading-relaxed text-slate-500 sm:block">
                    {partner.insight}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
