"use client";

import { useMemo, useState } from "react";

import { PointsInput } from "./components/PointsInput";
import { ResultCard } from "./components/ResultCard";
import type { SearchableOption } from "./components/SearchableSelect";
import { SearchableSelect } from "./components/SearchableSelect";
import type { Conversion } from "@/app/pointsconversion/types";

const ALL_PROGRAMS_OPTION = "All Programs";
const ALL_PARTNERS_OPTION = "";

type ConversionByFrom = Record<string, Conversion>;

type PartnerRow = {
  to: string;
  rate: string;
  insight: string;
};

type PointsConversionContentProps = {
  conversions: Conversion[];
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

  const converted = (transferPoints * ratio.toValue) / ratio.fromValue;
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

export default function PointsConversionContent({ conversions }: PointsConversionContentProps) {
  const [selectedProgramName, setSelectedProgramName] = useState<string>(
    ALL_PROGRAMS_OPTION
  );
  const [selectedFrom, setSelectedFrom] = useState(conversions[0]?.from ?? "");
  const [selectedTo, setSelectedTo] = useState<string>(ALL_PARTNERS_OPTION);
  const [transferPoints, setTransferPoints] = useState<string>("");

  const conversionsByFrom = useMemo(() => {
    return conversions.reduce((acc, conversion) => {
      acc[conversion.from] = conversion;

      return acc;
    }, {} as ConversionByFrom);
  }, [conversions]);

  const programOptions: SearchableOption[] = useMemo(() => {
    const uniquePrograms = Array.from(
      new Set(conversions.map((conversion) => getProgramName(conversion)))
    ).sort((a, b) => a.localeCompare(b));

    return [{ value: ALL_PROGRAMS_OPTION, label: ALL_PROGRAMS_OPTION }, ...uniquePrograms.map((program) => ({ value: program, label: program }))];
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
      [ALL_PARTNERS_OPTION, ...Array.from(new Set(partnerRows.map((partner) => partner.to))).sort((a, b) =>
        a.localeCompare(b)
      )],
    [partnerRows]
  );

  const normalizedSelectedTo = useMemo(() => {
    if (!selectedTo || toOptions.includes(selectedTo)) {
      return selectedTo;
    }

    return ALL_PARTNERS_OPTION;
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

  const selectedPartner = useMemo(() => {
    if (!normalizedSelectedTo) {
      return null;
    }

    return partnerRows.find((partner) => partner.to === normalizedSelectedTo) ?? null;
  }, [partnerRows, normalizedSelectedTo]);

  const projectedPoints = useMemo(() => {
    if (!selectedPartner) {
      return null;
    }

    return calculateProjectedPoints(selectedPartner.rate, parsedTransferPoints);
  }, [parsedTransferPoints, selectedPartner]);

  const formattedProjectedPoints = useMemo(
    () => formatProjectedPoints(projectedPoints),
    [projectedPoints]
  );

  const resultStatus: "incomplete" | "error" | "ready" = useMemo(() => {
    if (!normalizedSelectedFrom || !normalizedSelectedTo || parsedTransferPoints <= 0) {
      return "incomplete";
    }

    if (!selectedPartner) {
      return "error";
    }

    return "ready";
  }, [parsedTransferPoints, normalizedSelectedFrom, normalizedSelectedTo, selectedPartner]);

  const programHelper = selectedProgramName === ALL_PROGRAMS_OPTION ? "All issuers" : selectedProgramName;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
        <header className="mx-auto max-w-3xl text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/80">Calculator</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Points Transfer Calculator</h1>
          <p className="text-lg text-slate-300">
            Compare transfer partners instantly. Choose your card, partner, and point amount to see projected partner balances and important notes.
          </p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/40 backdrop-blur">
            <div className="grid gap-4 md:grid-cols-2">
              <SearchableSelect
                id="program-select"
                label="Program"
                helperText="Filter by issuer"
                value={selectedProgramName}
                options={programOptions}
                onChange={(newProgram) => {
                  setSelectedProgramName(newProgram || ALL_PROGRAMS_OPTION);
                  setSelectedTo(ALL_PARTNERS_OPTION);

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
                }}
                placeholder={`Showing ${programHelper}`}
                ariaLabel="Select the card program"
              />

              <SearchableSelect
                id="from-select"
                label="Transfer from"
                value={normalizedSelectedFrom}
                options={fromOptions.map((option) => ({ value: option, label: option }))}
                onChange={(value) => {
                  setSelectedFrom(value);
                  setSelectedTo(ALL_PARTNERS_OPTION);
                }}
                placeholder="Choose a card"
                disabled={fromOptions.length === 0}
                helperText={fromOptions.length === 0 ? "No cards available" : undefined}
                ariaLabel="Select the points program you are transferring from"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <SearchableSelect
                id="to-select"
                label="Transfer to"
                value={normalizedSelectedTo}
                options={toOptions.map((option) => ({
                  value: option,
                  label: option || "All partners",
                }))}
                onChange={(value) => setSelectedTo(value)}
                placeholder="Filter by airline or hotel"
                disabled={toOptions.length === 0}
                helperText={toOptions.length === 0 ? "No partners" : "Searchable list"}
                ariaLabel="Select the partner you are transferring to"
              />

              <PointsInput
                id="points-input"
                label="Points to transfer"
                value={transferPoints}
                onChange={(event) => setTransferPoints(event.target.value)}
                placeholder="Enter points to transfer"
              />
            </div>

            <p className="text-xs text-slate-400">
              Searchable dropdowns help you quickly locate cards and partners. Ratios and insights below update instantly as you type.
            </p>
          </section>

          <ResultCard
            fromProgram={normalizedSelectedFrom}
            toProgram={selectedPartner?.to ?? normalizedSelectedTo}
            rate={selectedPartner?.rate}
            insight={selectedPartner?.insight}
            projectedPoints={formattedProjectedPoints}
            status={resultStatus}
            helperMessage="Select a card and partner to see the conversion and projected partner balance."
          />
        </div>

        <section className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 shadow-xl shadow-slate-950/40 backdrop-blur">
          <div className="flex flex-col gap-3 border-b border-white/5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Partners</p>
              <h2 className="text-xl font-semibold text-white">Available transfer partners & ratios</h2>
              <p className="text-sm text-slate-300">Filtered for {normalizedSelectedFrom || "your card"}{normalizedSelectedTo ? ` → ${normalizedSelectedTo}` : ""}</p>
            </div>
            <div className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-amber-100 shadow-inner shadow-black/10">
              {filteredPartnerRows.length} {filteredPartnerRows.length === 1 ? "partner" : "partners"}
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
              {filteredPartnerRows.map((partner) => {
                const projected = formatProjectedPoints(
                  calculateProjectedPoints(partner.rate, parsedTransferPoints)
                );

                return (
                  <div
                    key={`${partner.to}-${partner.rate}`}
                    className="grid gap-4 px-6 py-4 sm:grid-cols-[1.2fr_1fr_1.2fr] sm:items-center"
                  >
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-white">{partner.to}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Notes</p>
                      <p className="text-sm text-slate-200/80">{partner.insight}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-amber-200/10 px-3 py-1 text-sm font-semibold text-amber-50">
                        {partner.rate}
                      </span>
                      {projected ? (
                        <span className="rounded-full bg-emerald-200/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                          ≈ {projected} points
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-2 rounded-2xl border border-white/5 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 shadow-inner shadow-black/10">
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        <span>Ratio</span>
                        <span>Projected</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-white">{partner.rate}</span>
                        <span className="text-sm text-emerald-100">{projected ?? "—"}</span>
                      </div>
                    </div>
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
