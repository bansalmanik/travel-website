"use client";

import { useMemo, useState } from "react";

import { PointsInput } from "./components/PointsInput";
import { ResultCard } from "./components/ResultCard";
import { SelectInput } from "./components/SelectInput";
import type { Conversion } from "@/app/pointsconversion/types";

type ConversionByFrom = Record<string, Conversion>;

export default function PointsConversionContent({
  conversions,
}: {
  conversions: Conversion[];
}) {
  const [selectedFrom, setSelectedFrom] = useState<string>("");
  const [selectedTo, setSelectedTo] = useState<string>("");
  const [transferPoints, setTransferPoints] = useState<string>("");

  const conversionsByFrom = useMemo(() => {
    return conversions.reduce((acc, conversion) => {
      acc[conversion.from] = conversion;
      return acc;
    }, {} as ConversionByFrom);
  }, [conversions]);

  const fromOptions = useMemo(() => {
    return conversions
      .map((conversion) => conversion.from)
      .sort((a, b) => a.localeCompare(b));
  }, [conversions]);

  const normalizedFrom = useMemo(() => {
    if (selectedFrom && fromOptions.includes(selectedFrom)) {
      return selectedFrom;
    }

    return fromOptions[0] ?? "";
  }, [fromOptions, selectedFrom]);

  const selectedConversion = useMemo(() => {
    if (!normalizedFrom) return null;
    return conversionsByFrom[normalizedFrom] ?? null;
  }, [conversionsByFrom, normalizedFrom]);

  const partnerOptions = useMemo(() => {
    if (!selectedConversion) return [] as string[];

    const partners = selectedConversion.rates.flatMap((rate) =>
      rate.partners.map((partner) => partner.to)
    );

    return Array.from(new Set(partners)).sort((a, b) => a.localeCompare(b));
  }, [selectedConversion]);

  const normalizedTo = useMemo(() => {
    if (selectedTo && partnerOptions.includes(selectedTo)) {
      return selectedTo;
    }

    return "";
  }, [partnerOptions, selectedTo]);

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

    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    }

    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)}k`;
    }

    return value.toFixed(0);
  };

  const selectedRate = useMemo(() => {
    if (!selectedConversion || !normalizedTo) return null;

    return (
      selectedConversion.rates.find((rate) =>
        rate.partners.some((partner) => partner.to === normalizedTo)
      ) ?? null
    );
  }, [normalizedTo, selectedConversion]);

  const selectedPartnerInsight = useMemo(() => {
    if (!selectedRate || !normalizedTo) return "";

    return (
      selectedRate.partners.find((partner) => partner.to === normalizedTo)
        ?.insight ?? ""
    );
  }, [normalizedTo, selectedRate]);

  const projectedPoints = selectedRate
    ? formatProjectedPoints(calculateProjectedPoints(selectedRate.rate))
    : null;

  const helperMessage = useMemo(() => {
    if (!normalizedFrom) {
      return "Choose the points program you're transferring from.";
    }

    if (!normalizedTo) {
      return "Select a destination partner to see the conversion details.";
    }

    if (!parsedTransferPoints) {
      return "Enter how many points you want to move to see the projected balance.";
    }

    return "";
  }, [normalizedFrom, normalizedTo, parsedTransferPoints]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50 text-slate-900">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <header className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">
            Transfer Calculator
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Points Transfer Calculator
          </h1>
          <p className="text-base text-slate-600 sm:text-lg">
            See instant transfer values across all partner programs without the clutter.
          </p>
        </header>

        <section className="space-y-6 rounded-3xl bg-white/90 p-6 shadow-xl shadow-indigo-100 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectInput
              id="transfer-from"
              label="Transfer From"
              placeholder="Any program..."
              options={fromOptions}
              value={normalizedFrom}
              onChange={(value) => {
                setSelectedFrom(value);
                setSelectedTo("");
              }}
            />

            <SelectInput
              id="transfer-to"
              label="Transfer To"
              placeholder="Any partner..."
              options={partnerOptions}
              value={normalizedTo}
              onChange={setSelectedTo}
              disabled={partnerOptions.length === 0}
            />
          </div>

          <PointsInput
            id="transfer-points"
            label="Points"
            placeholder="Enter points to transfer"
            value={transferPoints}
            onChange={setTransferPoints}
          />

          {helperMessage ? (
            <p className="rounded-2xl bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
              {helperMessage}
            </p>
          ) : null}
        </section>

        <section className="rounded-3xl border border-indigo-50 bg-white p-6 shadow-lg shadow-indigo-100 sm:p-8">
          {helperMessage ? (
            <div className="flex flex-col items-start gap-3 text-left">
              <h2 className="text-xl font-semibold text-slate-900">Your transfer summary</h2>
              <p className="text-sm text-slate-600">
                Pick your source, destination, and points amount to calculate the transfer value.
              </p>
            </div>
          ) : selectedConversion && selectedRate && normalizedTo ? (
            <ResultCard
              fromProgram={selectedConversion.from}
              toProgram={normalizedTo}
              rate={selectedRate.rate}
              projectedPoints={projectedPoints}
              note={selectedPartnerInsight}
            />
          ) : (
            <p className="text-sm text-slate-600">
              Once your selections are complete, you will see the conversion details here.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

