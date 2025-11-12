"use client";

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";

import type { Conversion } from "@/app/pointsconversion/types";

type ConversionByFrom = Record<string, Conversion>;

const ALL_PROGRAMS_OPTION = "All Programs";

const getProgramName = (conversion: Conversion) =>
  conversion.program ?? "Other";

type PartnerOption = {
  id: string;
  to: string;
  rate: string;
  insight: string;
};

type ParsedRate = {
  fromValue: string;
  fromUnit: string;
  toValue: string;
  toUnit: string;
};

const parseRate = (rate: string): ParsedRate => {
  const [rawFrom = "", rawTo = ""] = rate.split(":");
  const [fromValue = "", ...fromUnitParts] = rawFrom.trim().split(" ");
  const [toValue = "", ...toUnitParts] = rawTo.trim().split(" ");

  const fromUnit = fromUnitParts.join(" ");
  const toUnit = toUnitParts.join(" ");

  return {
    fromValue: fromValue || rawFrom.trim(),
    fromUnit: fromUnit || (fromValue ? "" : rawFrom.trim()),
    toValue: toValue || rawTo.trim(),
    toUnit: toUnit || (toValue ? "" : rawTo.trim()),
  };
};

type PointsConversionContentProps = {
  conversions: Conversion[];
};

export default function PointsConversionContent({ conversions }: PointsConversionContentProps) {
  const [selectedProgramName, setSelectedProgramName] = useState<string>(
    ALL_PROGRAMS_OPTION
  );
  const [selectedFrom, setSelectedFrom] = useState(conversions[0]?.from ?? "");
  const [selectedPartnerId, setSelectedPartnerId] = useState("");

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

  const partnerOptions = useMemo(() => {
    if (!selectedConversion) {
      return [] as PartnerOption[];
    }

    return selectedConversion.rates.flatMap((rate) =>
      rate.partners.map((partner) => ({
        id: `${rate.rate}__${partner.to}`,
        to: partner.to,
        rate: rate.rate,
        insight: partner.insight,
      }))
    );
  }, [selectedConversion]);

  const normalizedSelectedPartnerId = useMemo(() => {
    if (partnerOptions.length === 0) {
      return "";
    }

    const currentSelectionExists = partnerOptions.some(
      (option) => option.id === selectedPartnerId
    );

    if (currentSelectionExists) {
      return selectedPartnerId;
    }

    return partnerOptions[0].id;
  }, [partnerOptions, selectedPartnerId]);

  const selectedPartner = useMemo(() => {
    if (!normalizedSelectedPartnerId) {
      return null;
    }

    return (
      partnerOptions.find((option) => option.id === normalizedSelectedPartnerId) ??
      null
    );
  }, [normalizedSelectedPartnerId, partnerOptions]);

  const parsedRate = useMemo(() => {
    if (!selectedPartner) {
      return null;
    }

    return parseRate(selectedPartner.rate);
  }, [selectedPartner]);

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
    setSelectedPartnerId("");
  };

  const handleFromChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFrom(event.target.value);
    setSelectedPartnerId("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16 lg:gap-14 lg:py-24">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Track how your points convert
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-200/75">
            Choose a card program and a partner to see a clear, side-by-side breakdown of the transfer ratio with
            helpful guidance for planning your move.
          </p>
        </header>

        <section className="grid gap-8 lg:grid-cols-[300px_1fr] lg:items-start">
          <div className="rounded-3xl border border-white/5 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
            <div className="space-y-5">
              <label className="block space-y-2">
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
              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                  Transfer from
                </span>
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
              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                  Transfer to
                </span>
                <select
                  value={normalizedSelectedPartnerId}
                  onChange={(event) => setSelectedPartnerId(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                  aria-label="Select the loyalty partner you are transferring to"
                  disabled={partnerOptions.length === 0}
                >
                  {partnerOptions.length === 0 ? (
                    <option value="" disabled>
                      No partners available
                    </option>
                  ) : (
                    partnerOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.to}
                      </option>
                    ))
                  )}
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-8 lg:p-10">
            {selectedPartner ? (
              <div className="flex h-full flex-col gap-8">
                <div className="rounded-2xl border border-amber-300/20 bg-slate-950/70 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/80">
                    Conversion rate
                  </p>
                  {parsedRate ? (
                    <div className="mt-5 flex items-end justify-center gap-10 sm:gap-16">
                      <div className="space-y-1 text-center">
                        <p className="text-4xl font-semibold text-white sm:text-5xl">{parsedRate.fromValue}</p>
                        {parsedRate.fromUnit ? (
                          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-200/70">
                            {parsedRate.fromUnit}
                          </p>
                        ) : null}
                      </div>
                      <div className="text-center text-amber-200/80">
                        <p className="text-sm font-medium uppercase tracking-[0.4em]">to</p>
                        <p className="text-2xl font-semibold">→</p>
                      </div>
                      <div className="space-y-1 text-center">
                        <p className="text-4xl font-semibold text-white sm:text-5xl">{parsedRate.toValue}</p>
                        {parsedRate.toUnit ? (
                          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-200/70">
                            {parsedRate.toUnit}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                      From program
                    </p>
                    <p className="mt-3 text-sm text-slate-100/90">{normalizedSelectedFrom}</p>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                      To partner
                    </p>
                    <p className="mt-3 text-sm text-slate-100/90">{selectedPartner.to}</p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                      Snapshot
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-100/80">
                      Review how the numbers translate before you move your balance. Confirm current partner promos and
                      make sure you are ready—most transfers are final.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                      Partner insight
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-100/80">{selectedPartner.insight}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-slate-200/80">
                <p className="text-lg font-semibold text-white">Choose a partner pairing</p>
                <p className="max-w-md text-sm leading-6">
                  Select a source program and destination partner to see the transfer breakdown with tips tailored to the
                  combination.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
