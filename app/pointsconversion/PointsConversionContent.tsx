"use client";

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";

import type { Conversion } from "@/app/pointsconversion/types";

type ConversionByFrom = Record<string, Conversion>;

const ALL_PROGRAMS_OPTION = "All Programs";

const getProgramName = (conversion: Conversion) =>
  conversion.program ?? "Other";

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

  const tableRows = useMemo(() => {
    if (!selectedConversion) {
      return [] as { partner: string; ratio: string; insight: string }[];
    }

    return selectedConversion.rates
      .flatMap((rate) =>
        rate.partners.map((partner) => ({
          partner: partner.to,
          ratio: rate.rate,
          insight: partner.insight,
        }))
      )
      .sort((a, b) => a.partner.localeCompare(b.partner));
  }, [selectedConversion]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 sm:px-6 lg:px-10 lg:py-16">
        <header className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-200/80">
            Points conversion hub
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.6rem]">
            Compare transfer partners in one glance
          </h1>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-200/80 sm:text-base">
            Choose your rewards program and the account you are moving points from. We will surface every eligible
            partner with the exact transfer ratio so you can decide faster and avoid unnecessary clicks.
          </p>
        </header>

        <div className="rounded-3xl border border-white/5 bg-slate-900/60 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.6)]">
          <div className="border-b border-white/5 px-5 py-5 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
              <label className="flex-1 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-200/80">
                  Program
                </span>
                <select
                  value={selectedProgramName}
                  onChange={handleProgramChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200/40"
                  aria-label="Select the card program"
                >
                  {programOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex-1 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-200/80">
                  Transfer from
                </span>
                <select
                  value={normalizedSelectedFrom}
                  onChange={handleFromChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200/40"
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
            <p className="mt-4 text-xs text-slate-300/80">
              Showing transfer partners for <strong className="text-amber-100">{normalizedSelectedFrom || "your program"}</strong>. Every row includes the live
              conversion ratio and a quick insight to minimize surprises.
            </p>
          </div>

          <div className="overflow-hidden">
            {tableRows.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/5 text-left text-sm">
                  <caption className="sr-only">
                    Transfer partners, conversion ratios, and guidance
                  </caption>
                  <thead className="bg-slate-900/70 text-[13px] uppercase tracking-[0.16em] text-slate-200/80">
                    <tr>
                      <th scope="col" className="px-5 py-3 sm:px-6">
                        Partner
                      </th>
                      <th scope="col" className="px-5 py-3 sm:px-6">
                        Transfer ratio
                      </th>
                      <th scope="col" className="px-5 py-3 sm:px-6">
                        What to know
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 bg-slate-900/30">
                    {tableRows.map((row) => (
                      <tr key={`${row.partner}-${row.ratio}`} className="hover:bg-slate-800/40">
                        <th scope="row" className="whitespace-nowrap px-5 py-4 text-base font-semibold text-white sm:px-6">
                          {row.partner}
                        </th>
                        <td className="whitespace-nowrap px-5 py-4 text-amber-100 sm:px-6">
                          {row.ratio}
                        </td>
                        <td className="px-5 py-4 text-sm leading-relaxed text-slate-200/85 sm:px-6">
                          {row.insight || "Standard transfer timeline applies."}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-5 py-8 text-center sm:px-6 lg:px-8">
                <p className="text-lg font-semibold text-white">No transfer partners available</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-200/80">
                  Pick a different program or source account to see eligible partners and their conversion ratios.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
