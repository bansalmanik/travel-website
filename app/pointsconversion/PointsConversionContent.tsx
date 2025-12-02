"use client";

import { useMemo, useState } from "react";

import PointsInput from "./components/PointsInput";
import ResultCard from "./components/ResultCard";
import SelectInput from "./components/SelectInput";
import type { Conversion } from "@/app/pointsconversion/types";

type ConversionByFrom = Record<string, Conversion>;

type PartnerRow = {
  to: string;
  rate: string;
  insight: string;
};

type Ratio = {
  fromValue: number;
  toValue: number;
};

type PointsConversionContentProps = {
  conversions: Conversion[];
};

const parseRatio = (rate: string): Ratio | null => {
  const numericParts = rate
    .split(":")
    .map((part) => part.replace(/[^0-9.]/g, "").trim());

  if (numericParts.length !== 2) {
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

const calculateProjectedPoints = (rate: string, transferPoints: number | null) => {
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

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}k`;
  }

  return value.toFixed(0);
};

export default function PointsConversionContent({ conversions }: PointsConversionContentProps) {
  const [selectedFrom, setSelectedFrom] = useState<string>(conversions[0]?.from ?? "");
  const [selectedTo, setSelectedTo] = useState<string>("");
  const [transferPoints, setTransferPoints] = useState<string>("");

  const conversionsByFrom = useMemo(() => {
    return conversions.reduce((acc, conversion) => {
      acc[conversion.from] = conversion;

      return acc;
    }, {} as ConversionByFrom);
  }, [conversions]);

  const fromOptions = useMemo(
    () => conversions.map((conversion) => conversion.from).sort((a, b) => a.localeCompare(b)),
    [conversions]
  );

  const normalizedSelectedFrom = useMemo(() => {
    if (!selectedFrom || !fromOptions.includes(selectedFrom)) {
      return "";
    }

    return selectedFrom;
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
    () => Array.from(new Set(partnerRows.map((partner) => partner.to))).sort((a, b) => a.localeCompare(b)),
    [partnerRows]
  );

  const normalizedSelectedTo = useMemo(() => {
    if (!selectedTo || !toOptions.includes(selectedTo)) {
      return "";
    }

    return selectedTo;
  }, [selectedTo, toOptions]);

  const selectedPartner = useMemo(() => {
    if (!normalizedSelectedTo) {
      return null;
    }

    return (
      partnerRows.find((partner) => partner.to === normalizedSelectedTo) ?? partnerRows.find((partner) => partner.to === selectedTo)
    );
  }, [normalizedSelectedTo, partnerRows, selectedTo]);

  const parsedTransferPoints = useMemo(() => {
    const numericPoints = Number(transferPoints);

    if (!Number.isFinite(numericPoints) || numericPoints <= 0) {
      return null;
    }

    return numericPoints;
  }, [transferPoints]);

  const projectedPoints = useMemo(
    () => calculateProjectedPoints(selectedPartner?.rate ?? "", parsedTransferPoints),
    [selectedPartner?.rate, parsedTransferPoints]
  );

  const formattedProjectedPoints = useMemo(() => formatProjectedPoints(projectedPoints), [projectedPoints]);

  const readyForResult = Boolean(normalizedSelectedFrom && normalizedSelectedTo && parsedTransferPoints);

  const helperTitle = useMemo(() => {
    if (!normalizedSelectedFrom) return "Start by choosing a program";
    if (!normalizedSelectedTo) return "Pick a partner";
    if (!parsedTransferPoints) return "Enter the points you want to move";
    return "";
  }, [normalizedSelectedFrom, normalizedSelectedTo, parsedTransferPoints]);

  const helperBody = useMemo(() => {
    if (!normalizedSelectedFrom) return "Search for the card or program you want to transfer points from.";
    if (!normalizedSelectedTo) return "Select a destination partner to see the transfer ratio and projected points.";
    if (!parsedTransferPoints) return "Add the number of points you plan to transfer to view the projected amount.";
    return "";
  }, [normalizedSelectedFrom, normalizedSelectedTo, parsedTransferPoints]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <header className="text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Transfer Calculator</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Points Transfer Calculator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            See instant transfer values across all partner programs. Choose your source, destination, and amount to get a quick
            conversion summary.
          </p>
        </header>

        <section className="rounded-3xl bg-white/90 p-5 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200 sm:p-6 lg:p-8">
          <div className="space-y-5">
            <SelectInput
              label="Transfer From"
              placeholder="Search any program..."
              options={fromOptions}
              value={normalizedSelectedFrom}
              onChange={(value) => {
                setSelectedFrom(value);
                setSelectedTo("");
              }}
              helperText="Start typing to filter long lists."
              disabled={fromOptions.length === 0}
            />

            <SelectInput
              label="Transfer To"
              placeholder={normalizedSelectedFrom ? "Search destination partner..." : "Choose a source first"}
              options={toOptions}
              value={normalizedSelectedTo}
              onChange={setSelectedTo}
              helperText={normalizedSelectedFrom ? "Pick a partner to see the ratio." : undefined}
              disabled={!normalizedSelectedFrom || toOptions.length === 0}
            />

            <PointsInput
              label="Points"
              value={transferPoints}
              onChange={setTransferPoints}
              placeholder="How many points are you moving?"
            />

            <div className="rounded-2xl bg-slate-50 px-4 py-5 text-sm text-slate-700 ring-1 ring-slate-200">
              {readyForResult && selectedPartner ? (
                <ResultCard
                  fromProgram={normalizedSelectedFrom}
                  toProgram={selectedPartner.to}
                  transferRate={selectedPartner.rate}
                  projectedPoints={formattedProjectedPoints}
                  rawProjectedPoints={projectedPoints}
                  insight={selectedPartner.insight}
                />
              ) : (
                <div className="space-y-1 text-center sm:text-left">
                  <p className="text-base font-semibold text-slate-900">{helperTitle}</p>
                  <p className="text-sm text-slate-600">{helperBody}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
