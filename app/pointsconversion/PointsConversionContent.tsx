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
  ratio?: number | null;
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

const parseNumeric = (value: string): number | null => {
  if (!value) {
    return null;
  }

  const cleaned = value.replace(/[^0-9.,]/g, "").replace(/,/g, "");

  if (!cleaned) {
    return null;
  }

  const parsed = Number.parseFloat(cleaned);

  if (!Number.isFinite(parsed) || parsed === 0) {
    return null;
  }

  return parsed;
};

const getRateRatio = (rate: string): number | null => {
  const parsed = parseRate(rate);
  const fromNumeric = parseNumeric(parsed.fromValue);
  const toNumeric = parseNumeric(parsed.toValue);

  if (fromNumeric === null || toNumeric === null) {
    return null;
  }

  return toNumeric / fromNumeric;
};

const formatEffectiveRatio = (ratio: number): string => {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: ratio < 10 ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(ratio);
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

  const edgesByFrom = useMemo(() => {
    return conversions.reduce((acc, conversion) => {
      const edges = conversion.rates.flatMap((rate) => {
        const ratio = getRateRatio(rate.rate);

        return rate.partners.map((partner) => ({
          to: partner.to,
          rateLabel: rate.rate,
          ratio,
        }));
      });

      acc.set(conversion.from, edges);

      return acc;
    }, new Map<string, { to: string; rateLabel: string; ratio: number | null }[]>());
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
        ratio: getRateRatio(rate.rate),
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

  const destinationsForProgram = useMemo(() => {
    if (
      !selectedProgramName ||
      selectedProgramName === ALL_PROGRAMS_OPTION
    ) {
      return [] as {
        partner: string;
        sources: { from: string; rate: string }[];
      }[];
    }

    const programConversions = conversions.filter(
      (conversion) => getProgramName(conversion) === selectedProgramName
    );

    const destinationsMap = new Map<
      string,
      { partner: string; sources: { from: string; rate: string }[] }
    >();

    programConversions.forEach((conversion) => {
      conversion.rates.forEach((rate) => {
        rate.partners.forEach((partner) => {
          const existing = destinationsMap.get(partner.to);
          const sourceInfo = { from: conversion.from, rate: rate.rate };

          if (existing) {
            existing.sources.push(sourceInfo);
            return;
          }

          destinationsMap.set(partner.to, {
            partner: partner.to,
            sources: [sourceInfo],
          });
        });
      });
    });

    return Array.from(destinationsMap.values())
      .map((destination) => ({
        ...destination,
        sources: destination.sources.sort((a, b) =>
          a.from.localeCompare(b.from)
        ),
      }))
      .sort((a, b) => a.partner.localeCompare(b.partner));
  }, [conversions, selectedProgramName]);

  const indirectOpportunities = useMemo(() => {
    if (!normalizedSelectedFrom) {
      return [] as {
        finalPartner: string;
        via: string;
        combinedRatio: number;
        directRatio: number;
        firstRate: string;
        secondRate: string;
      }[];
    }

    const directEdges = edgesByFrom.get(normalizedSelectedFrom) ?? [];

    const directBestRatio = directEdges.reduce((acc, edge) => {
      if (edge.ratio === null) {
        return acc;
      }

      const existing = acc.get(edge.to);
      if (!existing || edge.ratio > existing) {
        acc.set(edge.to, edge.ratio);
      }

      return acc;
    }, new Map<string, number>());

    if (directBestRatio.size === 0) {
      return [];
    }

    const opportunities = new Map<
      string,
      {
        finalPartner: string;
        via: string;
        combinedRatio: number;
        directRatio: number;
        firstRate: string;
        secondRate: string;
      }
    >();

    directEdges.forEach((edge) => {
      if (edge.ratio === null) {
        return;
      }

      const secondLegEdges = edgesByFrom.get(edge.to) ?? [];

      secondLegEdges.forEach((secondLeg) => {
        if (secondLeg.ratio === null) {
          return;
        }

        if (secondLeg.to === edge.to) {
          return;
        }

        const directRatio = directBestRatio.get(secondLeg.to);

        if (directRatio === undefined) {
          return;
        }

        const combinedRatio = edge.ratio * secondLeg.ratio;

        if (combinedRatio + Number.EPSILON < directRatio) {
          return;
        }

        const key = `${secondLeg.to}__${edge.to}`;
        const existing = opportunities.get(key);

        if (!existing || combinedRatio > existing.combinedRatio) {
          opportunities.set(key, {
            finalPartner: secondLeg.to,
            via: edge.to,
            combinedRatio,
            directRatio,
            firstRate: edge.rateLabel,
            secondRate: secondLeg.rateLabel,
          });
        }
      });
    });

    return Array.from(opportunities.values()).sort(
      (a, b) => b.combinedRatio - a.combinedRatio
    );
  }, [edgesByFrom, normalizedSelectedFrom]);

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

          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-8 lg:p-10">
              {selectedPartner ? (
                <div className="flex h-full flex-col gap-8">
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

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                        Snapshot
                      </p>
                      <p className="mt-3 text-sm leading-6 text-slate-100/80">
                        Review how the numbers translate before you move your balance. Confirm current partner promos
                        and make sure you are ready—most transfers are final.
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
                    Select a source program and destination partner to see the transfer breakdown with tips tailored to
                    the combination.
                  </p>
                </div>
              )}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                  Destinations for {selectedProgramName === ALL_PROGRAMS_OPTION ? "selected program" : selectedProgramName}
                </p>
                {destinationsForProgram.length > 0 ? (
                  <ul className="mt-4 space-y-4">
                    {destinationsForProgram.map((destination) => (
                      <li key={destination.partner} className="rounded-2xl border border-white/5 bg-slate-950/60 p-4">
                        <p className="text-sm font-semibold text-white">{destination.partner}</p>
                        <ul className="mt-3 space-y-2 text-xs text-slate-200/80">
                          {destination.sources.map((source) => (
                            <li key={`${destination.partner}__${source.from}__${source.rate}`}>
                              <span className="font-medium text-slate-100">{source.from}</span>
                              <span className="text-slate-400"> · {source.rate}</span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-slate-200/70">
                    Select a specific program to see every partner you can move points into, grouped by the cards or
                    sources that unlock them.
                  </p>
                )}
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-200/70">
                  Indirect earning opportunities
                </p>
                {indirectOpportunities.length > 0 ? (
                  <ul className="mt-4 space-y-4">
                    {indirectOpportunities.map((opportunity) => (
                      <li
                        key={`${opportunity.finalPartner}__${opportunity.via}`}
                        className="rounded-2xl border border-emerald-300/20 bg-slate-950/60 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-white">{opportunity.finalPartner}</p>
                            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/80">Via {opportunity.via}</p>
                          </div>
                          {opportunity.combinedRatio > opportunity.directRatio ? (
                            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/90">
                              Better than direct
                            </span>
                          ) : (
                            <span className="rounded-full bg-slate-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200/70">
                              Matches direct
                            </span>
                          )}
                        </div>
                        <dl className="mt-3 space-y-2 text-xs text-slate-200/80">
                          <div className="flex justify-between gap-3">
                            <dt className="uppercase tracking-[0.2em] text-slate-400">Direct</dt>
                            <dd className="font-medium text-slate-100">1 : {formatEffectiveRatio(opportunity.directRatio)}</dd>
                          </div>
                          <div className="rounded-xl border border-white/5 bg-slate-900/60 p-3">
                            <p className="font-medium text-slate-100">{opportunity.firstRate}</p>
                            <p className="mt-1 text-[0.7rem] uppercase tracking-[0.3em] text-slate-400">then</p>
                            <p className="mt-1 font-medium text-slate-100">{opportunity.secondRate}</p>
                          </div>
                          <div className="flex justify-between gap-3">
                            <dt className="uppercase tracking-[0.2em] text-emerald-200/80">Effective</dt>
                            <dd className="font-semibold text-emerald-200">1 : {formatEffectiveRatio(opportunity.combinedRatio)}</dd>
                          </div>
                        </dl>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-slate-200/70">
                    Select a transfer pair to reveal two-step paths that keep pace with or beat the direct rate.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
