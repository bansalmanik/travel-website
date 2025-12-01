"use client";

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";

import type { Conversion } from "@/app/pointsconversion/types";

type ConversionByFrom = Record<string, Conversion>;

const ALL_PROGRAMS_OPTION = "All Programs";
const ALL_PARTNERS_OPTION = "All transfer partners";

const getProgramName = (conversion: Conversion) =>
  conversion.program ?? "Other";

const parseTransferRatio = (rate: string) => {
  const ratioMatch = rate.match(/([\d,.]+)[^:]*:\s*([\d,.]+)/);

  if (!ratioMatch) {
    return null;
  }

  const from = Number(ratioMatch[1].replace(/,/g, ""));
  const to = Number(ratioMatch[2].replace(/,/g, ""));

  if (Number.isNaN(from) || Number.isNaN(to) || from === 0) {
    return null;
  }

  return { from, to };
};

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
  const [selectedPartnerTo, setSelectedPartnerTo] = useState<string>(
    ALL_PARTNERS_OPTION
  );
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

  const partnerOptions = useMemo(() => {
    if (!partnerRows.length) {
      return [];
    }

    const uniquePartners = Array.from(
      new Set(partnerRows.map((partner) => partner.to))
    ).sort((a, b) => a.localeCompare(b));

    return [ALL_PARTNERS_OPTION, ...uniquePartners];
  }, [partnerRows]);

  const filteredPartnerRows = useMemo(() => {
    if (selectedPartnerTo === ALL_PARTNERS_OPTION) {
      return partnerRows;
    }

    return partnerRows.filter((partner) => partner.to === selectedPartnerTo);
  }, [partnerRows, selectedPartnerTo]);

  const selectedPartnerRate = useMemo(() => {
    if (!selectedConversion || selectedPartnerTo === ALL_PARTNERS_OPTION) {
      return null;
    }

    return (
      selectedConversion.rates.find((rate) =>
        rate.partners.some((partner) => partner.to === selectedPartnerTo)
      ) ?? null
    );
  }, [selectedConversion, selectedPartnerTo]);

  const calculatedPartnerPoints = useMemo(() => {
    if (!selectedPartnerRate) {
      return null;
    }

    const parsedRatio = parseTransferRatio(selectedPartnerRate.rate);
    const pointsToTransfer = Number(transferPoints);

    if (!parsedRatio || Number.isNaN(pointsToTransfer) || pointsToTransfer <= 0) {
      return null;
    }

    return (pointsToTransfer * parsedRatio.to) / parsedRatio.from;
  }, [selectedPartnerRate, transferPoints]);

  const formattedPartnerPoints = useMemo(() => {
    if (calculatedPartnerPoints === null) {
      return null;
    }

    const hasFraction = calculatedPartnerPoints % 1 !== 0;

    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: hasFraction ? 2 : 0,
      minimumFractionDigits: hasFraction ? 2 : 0,
    }).format(calculatedPartnerPoints);
  }, [calculatedPartnerPoints]);

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
    setSelectedPartnerTo(ALL_PARTNERS_OPTION);
    setTransferPoints("");
  };

  const handleFromChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFrom(event.target.value);
    setSelectedPartnerTo(ALL_PARTNERS_OPTION);
    setTransferPoints("");
  };

  const handlePartnerChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPartnerTo(event.target.value);
  };

  const handleTransferPointsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTransferPoints(event.target.value);
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
          <div className="grid gap-4 sm:grid-cols-2 sm:items-end">
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

            <label className="space-y-2">
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

            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                Transfer to
              </span>
              <select
                value={partnerOptions.length === 0 ? "" : selectedPartnerTo}
                onChange={handlePartnerChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                aria-label="Select the transfer destination"
                disabled={partnerOptions.length === 0}
              >
                {partnerOptions.length === 0 ? (
                  <option value="" disabled>
                    No partners available
                  </option>
                ) : (
                  partnerOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))
                )}
              </select>
            </label>

            <label className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                <span>Transfer points</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-amber-100/70">
                  Optional estimate
                </span>
              </div>
              <input
                type="number"
                min="0"
                inputMode="numeric"
                value={transferPoints}
                onChange={handleTransferPointsChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                placeholder="Enter points to move"
                aria-label="Enter how many points you want to transfer"
              />
            </label>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="space-y-1 text-sm text-slate-200/80">
              <p className="font-semibold text-white">
                {normalizedSelectedFrom || "Choose a card"}
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-300/70">
                {selectedPartnerTo === ALL_PARTNERS_OPTION
                  ? "All transfer ratios are visible"
                  : `Focused on ${selectedPartnerTo}`}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-end">
              {formattedPartnerPoints ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-200/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                  <span className="h-2 w-2 rounded-full bg-emerald-200" aria-hidden />
                  ≈ {formattedPartnerPoints} partner points
                </span>
              ) : (
                <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/80">
                  Enter points to preview
                </span>
              )}
              <span className="inline-flex items-center justify-center rounded-full border border-amber-300/40 bg-amber-200/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-100/80">
                {filteredPartnerRows.length} partners
              </span>
            </div>
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

              {filteredPartnerRows.map((partner) => (
                <div
                  key={`${partner.to}-${partner.rate}`}
                  className="grid grid-cols-2 gap-3 px-4 py-3 text-sm text-slate-100 sm:grid-cols-[1.2fr_0.8fr_1fr] sm:px-6"
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
