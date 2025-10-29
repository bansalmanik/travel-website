"use client";

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";
import conversions from "@/data/points-conversion.json";

type Conversion = (typeof conversions)[number];

type ConversionByFrom = Record<string, Conversion[]>;

type PartnerType = Conversion["toType"] | "All Partners";

const conversionsByFrom: ConversionByFrom = conversions.reduce((acc, conversion) => {
  if (!acc[conversion.from]) {
    acc[conversion.from] = [];
  }

  acc[conversion.from].push(conversion);

  return acc;
}, {} as ConversionByFrom);

const partnerTypeOptions = [
  "All Partners",
  ...Array.from(new Set(conversions.map((conversion) => conversion.toType))).sort((a, b) =>
    a.localeCompare(b)
  ),
] as PartnerType[];

export default function PointsConversionContent() {
  const [selectedFrom, setSelectedFrom] = useState(conversions[0]?.from ?? "");
  const [selectedTo, setSelectedTo] = useState("");
  const [selectedPartnerType, setSelectedPartnerType] = useState<PartnerType>("All Partners");

  const fromOptions = useMemo(() => Object.keys(conversionsByFrom).sort((a, b) => a.localeCompare(b)), []);

  const filteredToOptions = useMemo(() => {
    if (!selectedFrom) {
      return [] as Conversion[];
    }

    const partners = conversionsByFrom[selectedFrom] ?? [];

    if (selectedPartnerType === "All Partners") {
      return partners;
    }

    return partners.filter((partner) => partner.toType === selectedPartnerType);
  }, [selectedFrom, selectedPartnerType]);

  const normalizedSelectedTo = useMemo(() => {
    if (filteredToOptions.length === 0) {
      return "";
    }

    const currentSelectionExists = filteredToOptions.some((option) => option.to === selectedTo);

    if (currentSelectionExists) {
      return selectedTo;
    }

    return filteredToOptions[0].to;
  }, [filteredToOptions, selectedTo]);

  const selectedConversion = useMemo(() => {
    if (!selectedFrom || !normalizedSelectedTo) {
      return null;
    }

    return conversions.find(
      (conversion) => conversion.from === selectedFrom && conversion.to === normalizedSelectedTo
    );
  }, [selectedFrom, normalizedSelectedTo]);

  const handleFromChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFrom(event.target.value);
  };

  const handlePartnerTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as PartnerType;
    setSelectedPartnerType(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16 lg:py-24">
        <header className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">
            Points Conversion
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">
            Optimize every transfer between loyalty ecosystems
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-200/80">
            Compare flexible currencies with airline and hotel partners without mixing in unrelated loyalty offers.
            Choose your source points, filter by partner type, and review the fine print before you move a single point.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="grid gap-6 lg:grid-cols-3">
            <label className="space-y-2">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">
                Transfer from
              </span>
              <select
                value={selectedFrom}
                onChange={handleFromChange}
                className="w-full rounded-2xl border border-white/20 bg-slate-900/80 px-4 py-3 text-base text-slate-100 shadow focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                aria-label="Select the points program you are transferring from"
              >
                {fromOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">
                Partner type
              </span>
              <select
                value={selectedPartnerType}
                onChange={handlePartnerTypeChange}
                className="w-full rounded-2xl border border-white/20 bg-slate-900/80 px-4 py-3 text-base text-slate-100 shadow focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                aria-label="Filter transfer partners by loyalty program type"
              >
                {partnerTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">
                Transfer to
              </span>
              <select
                value={normalizedSelectedTo}
                onChange={(event) => setSelectedTo(event.target.value)}
                className="w-full rounded-2xl border border-white/20 bg-slate-900/80 px-4 py-3 text-base text-slate-100 shadow focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                aria-label="Select the loyalty partner you are transferring to"
                disabled={filteredToOptions.length === 0}
              >
                {filteredToOptions.length === 0 ? (
                  <option value="" disabled>
                    No partners available
                  </option>
                ) : (
                  filteredToOptions.map((option) => (
                    <option key={option.to} value={option.to}>
                      {option.to}
                    </option>
                  ))
                )}
              </select>
            </label>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900/60 p-8 text-center">
            {selectedConversion ? (
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">
                  Conversion Rate
                </p>
                <p className="text-5xl font-semibold text-white">{selectedConversion.rate}</p>
                <div className="flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.25em] text-amber-200">
                  <span className="rounded-full border border-amber-200/40 px-3 py-1 text-amber-200/90">
                    {selectedFrom}
                  </span>
                  <span className="rounded-full border border-amber-200/40 px-3 py-1 text-amber-200/90">
                    {selectedConversion.to}
                  </span>
                  <span className="rounded-full border border-amber-200/40 px-3 py-1 text-amber-200/90">
                    {selectedConversion.toType}
                  </span>
                </div>
                <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-100/80">
                  {selectedConversion.insight}
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-slate-200/70">
                <p className="text-lg font-semibold text-white">Choose a partner pairing</p>
                <p className="text-sm leading-6">
                  Pick a source program, narrow results by loyalty type, and then choose a transfer partner to surface its conversion ratio.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Terms &amp; Conditions</h2>
            <p className="text-sm leading-6 text-slate-100/70">
              Review the partner-specific rules before you transfer points. These details help ensure your rewards do not get stranded in the wrong account.
            </p>
          </div>

          {selectedConversion ? (
            <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-slate-100/80">
              {selectedConversion.terms.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/20 bg-slate-900/40 p-6 text-sm leading-6 text-slate-100/70">
              Select a transfer partner above to see the exact conditions that apply to that conversion.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
