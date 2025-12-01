"use client";

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";

import type { Conversion } from "@/app/pointsconversion/types";

type ConversionByFrom = Record<string, Conversion>;

const ALL_PROGRAMS_OPTION = "All Programs";

const getProgramName = (conversion: Conversion) =>
  conversion.program ?? "Other";

type PartnerRow = {
  id: string;
  partner: string;
  rate: string;
  insight: string;
};

type PointsConversionContentProps = {
  conversions: Conversion[];
};

export default function PointsConversionContent({
  conversions,
}: PointsConversionContentProps) {
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

    const rows = selectedConversion.rates.flatMap((rate) =>
      rate.partners.map((partner) => ({
        id: `${rate.rate}-${partner.to}`,
        partner: partner.to,
        rate: rate.rate,
        insight: partner.insight,
      }))
    );

    return rows.sort((a, b) => a.partner.localeCompare(b.partner));
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
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-5 py-16 lg:gap-12 lg:py-24">
        <header className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">
            Points conversion map
          </p>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Choose a program to see every transfer partner
          </h1>
          <p className="mx-auto max-w-3xl text-base text-slate-200/80">
            Pick your rewards program and originating account. We will surface all
            eligible partners with their transfer ratios and quick notes so you can
            compare without endless scrolling.
          </p>
        </header>

        <section className="rounded-3xl border border-white/5 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30 sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-100/90">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                Program
              </span>
              <select
                value={selectedProgramName}
                onChange={handleProgramChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-50 transition focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                aria-label="Select the card or bank program"
              >
                {programOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-100/90">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                Transfer from
              </span>
              <select
                value={normalizedSelectedFrom}
                onChange={handleFromChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-50 transition focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
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

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200/70">
                From program
              </p>
              <p className="mt-2 font-semibold text-white">{normalizedSelectedFrom || "Select a card"}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200/70">
                Partner count
              </p>
              <p className="mt-2 font-semibold text-white">{partnerRows.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200/70">
                Ratio bands
              </p>
              <p className="mt-2 font-semibold text-white">
                {selectedConversion?.rates.length ?? 0}
              </p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-lg shadow-slate-950/30">
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-4 sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                Transfer partners
              </p>
              <h2 className="text-lg font-semibold text-white">
                {normalizedSelectedFrom ? `Partners for ${normalizedSelectedFrom}` : "Choose a program to view partners"}
              </h2>
            </div>
            <span className="hidden rounded-full bg-amber-300/20 px-3 py-1 text-xs font-semibold text-amber-100 sm:inline-block">
              Live ratios
            </span>
          </div>

          {partnerRows.length === 0 ? (
            <div className="px-5 py-10 text-center sm:px-6">
              <p className="text-lg font-semibold text-white">No partners to display</p>
              <p className="mt-2 text-sm text-slate-200/80">
                Try selecting another program or card to see available transfer partners and their conversion ratios.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-left">
                <thead>
                  <tr className="bg-slate-950/70 text-xs uppercase tracking-[0.15em] text-slate-200/70">
                    <th className="px-5 py-3 font-semibold sm:px-6">Transfer partner</th>
                    <th className="px-5 py-3 font-semibold sm:px-6">Transfer ratio</th>
                    <th className="px-5 py-3 font-semibold sm:px-6">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {partnerRows.map((row, index) => (
                    <tr
                      key={row.id}
                      className={
                        index % 2 === 0
                          ? "bg-slate-950/50"
                          : "bg-slate-900/70"
                      }
                    >
                      <td className="px-5 py-4 text-sm font-semibold text-white sm:px-6">{row.partner}</td>
                      <td className="px-5 py-4 text-sm text-amber-100 sm:px-6">{row.rate}</td>
                      <td className="px-5 py-4 text-sm text-slate-200/80 sm:px-6">{row.insight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
