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
  const [selectedProgramName, setSelectedProgramName] = useState<string>(ALL_PROGRAMS_OPTION);
  const [selectedFrom, setSelectedFrom] = useState(conversions[0]?.from ?? "");
  const [selectedTo, setSelectedTo] = useState<string>("");
  const [transferPoints, setTransferPoints] = useState<string>("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

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
    if (fromOptions.length === 0) return "";
    if (selectedFrom && fromOptions.includes(selectedFrom)) return selectedFrom;
    return fromOptions[0];
  }, [fromOptions, selectedFrom]);

  const selectedConversion = useMemo(() => {
    if (!normalizedSelectedFrom) return null;
    return conversionsByFrom[normalizedSelectedFrom] ?? null;
  }, [normalizedSelectedFrom, conversionsByFrom]);

  const partnerRows = useMemo<PartnerRow[]>(() => {
    if (!selectedConversion) return [];
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
    if (!selectedTo || !toOptions.includes(selectedTo)) return "";
    return selectedTo;
  }, [selectedTo, toOptions]);

  const filteredPartnerRows = useMemo(() => {
    if (!normalizedSelectedTo) return partnerRows;
    return partnerRows.filter((partner) => partner.to === normalizedSelectedTo);
  }, [partnerRows, normalizedSelectedTo]);

  const parsedTransferPoints = useMemo(() => {
    const numericValue = Number(transferPoints);
    return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : 0;
  }, [transferPoints]);

  const parseRatio = (rate: string) => {
    const numericParts = rate.match(/[\d.]+/g);
    if (!numericParts || numericParts.length < 2) return null;
    const [fromAmount, toAmount] = numericParts;
    const fromValue = Number(fromAmount);
    const toValue = Number(toAmount);
    if (!Number.isFinite(fromValue) || !Number.isFinite(toValue) || fromValue <= 0) return null;
    return { fromValue, toValue };
  };

  const calculateProjectedPoints = (rate: string) => {
    if (!parsedTransferPoints) return null;
    const ratio = parseRatio(rate);
    if (!ratio) return null;
    return (parsedTransferPoints * ratio.toValue) / ratio.fromValue;
  };

  const formatPoints = (value: number | null) => {
    if (!value || Number.isNaN(value)) return null;
    return value.toLocaleString("en-IN");
  };

  const handleProgramChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newProgram = event.target.value;
    setSelectedProgramName(newProgram);
    const nextConversions =
      !newProgram || newProgram === ALL_PROGRAMS_OPTION
        ? conversions
        : conversions.filter((conversion) => getProgramName(conversion) === newProgram);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      <div className="mx-auto max-w-2xl px-4 py-5">
        {/* Header */}
        <h1 className="mb-4 text-center text-lg font-bold text-slate-800">✨ Points Calculator</h1>

        {/* Filters Card */}
        <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          {/* Dropdowns Row */}
          <div className="flex gap-2">
            <div className="flex-1">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Program</p>
              <select
                value={selectedProgramName}
                onChange={handleProgramChange}
                className="w-full cursor-pointer rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {programOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Transfer From</p>
              <select
                value={normalizedSelectedFrom}
                onChange={handleFromChange}
                className="w-full cursor-pointer rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={fromOptions.length === 0}
              >
                {fromOptions.length === 0 ? (
                  <option value="" disabled>No cards</option>
                ) : (
                  fromOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Transfer To */}
          <div className="mt-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Transfer To</p>
            <select
              value={normalizedSelectedTo}
              onChange={handleToChange}
              className="w-full cursor-pointer rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={toOptions.length === 0}
            >
              <option value="">All Partners</option>
              {toOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Points Input Below */}
          <div className="mt-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Points to Transfer</p>
            <input
              type="number"
              min={0}
              inputMode="numeric"
              value={transferPoints}
              onChange={handleTransferPointsChange}
              placeholder="Enter points (e.g. 5000)"
              className="w-full rounded-lg bg-slate-50 px-3 py-2.5 text-center text-lg font-bold text-indigo-600 placeholder:text-sm placeholder:font-normal placeholder:text-slate-300 transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
            {filteredPartnerRows.length}
          </span>
          <span className="text-sm text-slate-600">transfer partners</span>
        </div>

        {/* Results List - Single Column */}
        {filteredPartnerRows.length === 0 ? (
          <div className="rounded-2xl bg-white/70 py-16 text-center backdrop-blur">
            <p className="text-slate-400">No partners available</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredPartnerRows.map((partner) => {
              const key = `${partner.to}-${partner.rate}`;
              const projected = calculateProjectedPoints(partner.rate);
              const formattedProjected = formatPoints(projected);
              const isExpanded = expandedRow === key;

              return (
                <div
                  key={key}
                  onClick={() => setExpandedRow(isExpanded ? null : key)}
                  className={`group cursor-pointer rounded-xl bg-white p-3 shadow-sm ring-1 transition-all active:scale-[0.99] ${
                    isExpanded 
                      ? "ring-emerald-300 shadow-md" 
                      : "ring-slate-100 hover:shadow-md hover:ring-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">{partner.to}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400">{partner.rate}</p>
                    </div>
                    
                    {formattedProjected ? (
                      <div className="flex-shrink-0 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1.5">
                        <p className="text-sm font-bold text-white">{formattedProjected}</p>
                      </div>
                    ) : (
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-300 group-hover:bg-slate-100">
                        <svg className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {isExpanded && (
                    <p className="mt-2 border-t border-slate-100 pt-2 text-[11px] leading-relaxed text-slate-500">
                      {partner.insight}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
