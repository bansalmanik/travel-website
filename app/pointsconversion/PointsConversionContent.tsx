"use client";

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";

import type { Conversion } from "@/app/pointsconversion/types";

type ConversionByFrom = Record<string, Conversion>;

const getProgramName = (conversion: Conversion) =>
  conversion.program ?? "Other";

// Program logo mapping - maps program names to their logo paths
const PROGRAM_LOGOS: Record<string, string> = {
  // Programs
  "Axis": "/Logo/axis_logo.webp",
  "HDFC": "/Logo/hdfc_logo.webp",
  "HSBC": "/Logo/hsbc_logo.webp",
  "IndusInd": "/Logo/indusind_logo.webp",
  "American Express": "/Logo/amex_logo.webp",
  "SBI": "/Logo/sbi_logo.webp",
  "Accor": "/Logo/accor_live_limitless.webp",
  "Marriott Bonvoy": "/Logo/marriott_bonvoy_logo.webp",
  
  // Partners - Airlines
  "Air India": "/Logo/maharaja_club_logo.webp",
  "Air India Maharaja Points": "/Logo/maharaja_club_logo.webp",
  "Singapore Airlines": "/Logo/krisflyer_logo.webp",
  "Singapore Airlines KrisFlyer": "/Logo/krisflyer_logo.webp",
  "Singapore Airlines KrisFlyer®": "/Logo/krisflyer_logo.webp",
  "Singapore Airlines – KrisFlyer": "/Logo/krisflyer_logo.webp",
  "Aeroplan": "/Logo/aeroplan_logo.webp",
  "Air Canada Aeroplan": "/Logo/aeroplan_logo.webp",
  "Air Canada – Aeroplan": "/Logo/aeroplan_logo.webp",
  "Flying Blue": "/Logo/flying_blue_logo.webp",
  "Air France KLM – Flying Blue": "/Logo/flying_blue_logo.webp",
  "Air France-KLM Flying Blue": "/Logo/flying_blue_logo.webp",
  "Air France–KLM Flying Blue": "/Logo/flying_blue_logo.webp",
  "Etihad Guest": "/Logo/etihad_guest_logo.webp",
  "Etihad Airways – Etihad Guest": "/Logo/etihad_guest_logo.webp",
  "JAL Mileage Bank": "/Logo/jal_mileage_bank_logo.webp",
  "Japan Airlines JAL Mileage Bank": "/Logo/jal_mileage_bank_logo.webp",
  "Japan Airlines Mileage Bank": "/Logo/jal_mileage_bank_logo.webp",
  "Japan Airlines – JAL Mileage Bank": "/Logo/jal_mileage_bank_logo.webp",
  "Qantas Frequent Flyer": "/Logo/qantas_frequent_flyer_logo.webp",
  "Qantas Airlines – Frequent Flyer": "/Logo/qantas_frequent_flyer_logo.webp",
  "Qatar Airways": "/Logo/qatar_privilege_club_logo.webp",
  "Qatar Airways Privilege Club": "/Logo/qatar_privilege_club_logo.webp",
  "Qatar Avios": "/Logo/qatar_privilege_club_logo.webp",
  "Royal Orchid Plus": "/Logo/royal_orchid_plus_logo.webp",
  "Thai Airways Royal Orchid Plus": "/Logo/royal_orchid_plus_logo.webp",
  "Thai Airways – Royal Orchid Plus": "/Logo/royal_orchid_plus_logo.webp",
  "Turkish Airlines": "/Logo/miles_&_smiles_logo.webp",
  "Turkish Airlines Miles&Smiles": "/Logo/miles_&_smiles_logo.webp",
  "Turkish Airlines – Miles&Smiles": "/Logo/miles_&_smiles_logo.webp",
  "United MileagePlus": "/Logo/mileageplus_logo.webp",
  "United MileagePlus®": "/Logo/mileageplus_logo.webp",
  "United Airlines – MileagePlus®": "/Logo/mileageplus_logo.webp",
  "British Airways Executive Club": "/Logo/british_airways_executive_club_logo.webp",
  "British Airways Executive Club (Avios)": "/Logo/british_airways_executive_club_logo.webp",
  "British Airways – Executive Club": "/Logo/british_airways_executive_club_logo.webp",
  "The British Airways Club": "/Logo/british_airways_executive_club_logo.webp",
  "Emirates Skywards": "/Logo/emirates_skywards_logo.webp",
  "Emirates Skywards®": "/Logo/emirates_skywards_logo.webp",
  "Emirates – Skywards": "/Logo/emirates_skywards_logo.webp",
  "Delta SkyMiles®": "/Logo/delta_skymiles_logo.webp",
  "Delta Air Lines – SkyMiles®": "/Logo/delta_skymiles_logo.webp",
  "American Airlines AAdvantage®": "/Logo/american_airlines_aadvantage_logo.webp",
  "American Airlines – AAdvantage": "/Logo/american_airlines_aadvantage_logo.webp",
  "ANA Mileage Club": "/Logo/ana_mileage_club_logo.webp",
  "ANA – ANA Mileage Club": "/Logo/ana_mileage_club_logo.webp",
  "Avianca LifeMiles": "/Logo/lifemiles_logo.webp",
  "Avianca Airlines – LifeMiles": "/Logo/lifemiles_logo.webp",
  "Air Asia": "/Logo/airasia_rewards_logo.webp",
  "AirAsia Rewards": "/Logo/airasia_rewards_logo.webp",
  "airasia": "/Logo/airasia_rewards_logo.webp",
  "Finnair Plus (Avios)": "/Logo/finnair_plus_logo.webp",
  "Finnair – Finnair Plus": "/Logo/finnair_plus_logo.webp",
  "Iberia Plus": "/Logo/iberia_club_logo.webp",
  "Iberia Airlines – Iberia Plus": "/Logo/iberia_club_logo.webp",
  "Virgin Atlantic Flying Club": "/Logo/virgin_atlantic_flying_club_logo.webp",
  "Virgin Atlantic – Flying Club": "/Logo/virgin_atlantic_flying_club_logo.webp",
  "Vueling Club": "/Logo/vueling_club_logo.webp",
  "LATAM Airlines LATAM Pass": "/Logo/latam_pass_logo.webp",
  "LATAM Pass (Brazil)": "/Logo/latam_pass_logo.webp",
  "LATAM Pass Brazil": "/Logo/latam_pass_logo.webp",
  "Copa Airlines ConnectMiles": "/Logo/connectmiles_logo.webp",
  "Aeromexico Rewards": "/Logo/aeromexico_rewards_logo.webp",
  "Aeromexico – Club Premier": "/Logo/aeromexico_rewards_logo.webp",
  "Aer Lingus AerClub": "/Logo/aerclub_logo.webp",
  "AEGEAN Miles+Bonus": "/Logo/miles-bonus_logo.webp",
  "Aegean Miles+Bonus": "/Logo/miles-bonus_logo.webp",
  "Asiana Club": "/Logo/asiana_club_logo.webp",
  "Asia Miles": "/Logo/asia_miles_(cathay)_logo.webp",
  "Asia Miles (Cathay Pacific)": "/Logo/asia_miles_(cathay)_logo.webp",
  "Cathay": "/Logo/asia_miles_(cathay)_logo.webp",
  "Cathay Pacific Cathay": "/Logo/asia_miles_(cathay)_logo.webp",
  "China Eastern – Eastern Miles": "/Logo/eastern_miles_logo.webp",
  "China Southern Airlines Sky Pearl Club": "/Logo/sky_pearl_club_logo.webp",
  "China Southern – Sky Pearl Club": "/Logo/sky_pearl_club_logo.webp",
  "Air China PhoenixMiles": "/Logo/phoenix_miles_logo.webp",
  "Air China – PhoenixMiles": "/Logo/phoenix_miles_logo.webp",
  "EVA Air Infinity MileageLands": "/Logo/infinity_mileagelands_logo.webp",
  "Eva Airways – Infinity MileageLands": "/Logo/infinity_mileagelands_logo.webp",
  "Hainan Airlines Fortune Wings Club": "/Logo/fortune_wings_club_logo.webp",
  "Hainan Airlines – Fortune Wings Club": "/Logo/fortune_wings_club_logo.webp",
  "Malaysia Airlines – Enrich": "/Logo/enrich_logo.webp",
  "Saudia Alfursan": "/Logo/saudia_alfursan_logo.webp",
  "Ethiopian Airlines ShebaMiles": "/Logo/shebamiles_logo.webp",
  "Ethiopian Airlines": "/Logo/shebamiles_logo.webp",
  "Virgin Australia Velocity Frequent Flyer": "/Logo/velocity_logo.webp",
  "Virgin Australia – Velocity Frequent Flyer": "/Logo/velocity_logo.webp",
  "Southwest Rapid Rewards®": "/Logo/rapid_rewards_logo.webp",
  "FRONTIER Miles": "/Logo/frontier_miles_logo.webp",
  "TAP Air Portugal Miles&Go": "/Logo/tap_miles_&_go_logo.webp",
  "Air Portugal – TAP Miles&Go": "/Logo/tap_miles_&_go_logo.webp",
  "Lufthansa – Miles & More": "/Logo/miles_&_more_logo.webp",
  "South African Airways – Voyager": "/Logo/voyager_logo.webp",
  "ITA Airways (Volare)": "/Logo/volare_logo.webp",
  "MilleMiglia (ITA Airways / Alitalia)": "/Logo/volare_logo.webp",
  "Atmos™ Rewards": "/Logo/atmos_rewards_logo.webp",
  "SpiceJet": "/Logo/spiceclub_logo.webp",
  
  // Partners - Hotels
  "Accor Live Limitless": "/Logo/accor_live_limitless.webp",
  "Marriot": "/Logo/marriott_bonvoy_logo.webp",
  "IHG One Rewards": "/Logo/ihg_rewards_club_logo.webp",
  "IHG® One Rewards": "/Logo/ihg_rewards_club_logo.webp",
  "Hilton Honors": "/Logo/hilton_honors_logo.webp",
  "Wyndham Rewards": "/Logo/wyndham_logo.webp",
  "ITC": "/Logo/itc_club_logo.webp",
  "Club ITC Green Points": "/Logo/itc_club_logo.webp",
  
  // Partners - Other
  "InterMiles": "/Logo/intermiles_logo.webp",
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
  const [selectedProgramName, setSelectedProgramName] = useState<string>("");
  const [selectedFrom, setSelectedFrom] = useState<string>("");
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
    return uniquePrograms;
  }, [conversions]);

  const filteredConversions = useMemo(() => {
    if (!selectedProgramName) {
      return [];
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
    if (fromOptions.length === 1) return fromOptions[0];
    if (selectedFrom && fromOptions.includes(selectedFrom)) return selectedFrom;
    return "";
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
    setSelectedFrom("");
    setSelectedTo("");
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

  const handleClearPoints = () => {
    setTransferPoints("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Header */}
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-800">✨ Points Calculator</h1>

        {/* Filters Card */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          {/* Dropdowns Row */}
          <div className="flex gap-3">
            <div className="flex-1">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Program</p>
              <div className="relative">
                {selectedProgramName && PROGRAM_LOGOS[selectedProgramName] && (
                  <div className="pointer-events-none absolute left-3 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white">
                    <img
                      src={PROGRAM_LOGOS[selectedProgramName]}
                      alt={selectedProgramName}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  </div>
                )}
                <select
                  value={selectedProgramName}
                  onChange={handleProgramChange}
                  className={`w-full cursor-pointer rounded-lg bg-slate-50 py-3 text-base font-medium transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    selectedProgramName && PROGRAM_LOGOS[selectedProgramName] ? 'pl-12 pr-4' : 'px-4'
                  } ${!selectedProgramName ? 'text-slate-400' : 'text-slate-700'}`}
                >
                  <option value="">Select a program</option>
                  {programOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex-1">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Transfer From</p>
              <select
                value={normalizedSelectedFrom}
                onChange={handleFromChange}
                className={`w-full rounded-lg bg-slate-50 px-4 py-3 text-base font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  !selectedProgramName || fromOptions.length === 0 ? 'cursor-not-allowed text-slate-400' : 'cursor-pointer text-slate-700 hover:bg-indigo-50'
                }`}
                disabled={!selectedProgramName || fromOptions.length === 0}
              >
                {!selectedProgramName ? (
                  <option value="">Select program first</option>
                ) : fromOptions.length === 0 ? (
                  <option value="">No cards available</option>
                ) : fromOptions.length === 1 ? (
                  <option value={fromOptions[0]}>{fromOptions[0]}</option>
                ) : (
                  <>
                    <option value="">Select card</option>
                    {fromOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Transfer To */}
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Transfer To</p>
            <div className="relative">
              {normalizedSelectedTo && PROGRAM_LOGOS[normalizedSelectedTo] && (
                <div className="pointer-events-none absolute left-3 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white">
                  <img
                    src={PROGRAM_LOGOS[normalizedSelectedTo]}
                    alt={normalizedSelectedTo}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                </div>
              )}
              <select
                value={normalizedSelectedTo}
                onChange={handleToChange}
                className={`w-full cursor-pointer rounded-lg bg-slate-50 py-3 text-base font-medium text-slate-700 transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  normalizedSelectedTo && PROGRAM_LOGOS[normalizedSelectedTo] ? 'pl-12 pr-4' : 'px-4'
                }`}
                disabled={toOptions.length === 0}
              >
                <option value="">All Partners</option>
                {toOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Points Input Below */}
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Points to Transfer</p>
            <div className="relative">
              <input
                type="number"
                min={0}
                inputMode="numeric"
                value={transferPoints}
                onChange={handleTransferPointsChange}
                placeholder="5000"
                className="w-full rounded-lg bg-slate-50 px-4 py-3.5 pr-12 text-center text-xl font-bold text-slate-700 placeholder:text-xl placeholder:font-bold placeholder:text-slate-400 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
              {transferPoints && (
                <button
                  onClick={handleClearPoints}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-300 text-slate-600 transition hover:bg-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                  aria-label="Clear points"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700">
            {filteredPartnerRows.length}
          </span>
          <span className="text-base text-slate-600">transfer partners</span>
        </div>

        {/* Results List - Single Column */}
        {!selectedProgramName ? (
          <div className="rounded-2xl bg-white/70 py-16 text-center backdrop-blur">
            <p className="text-lg font-semibold text-slate-600 mb-2">👆 Select a program to get started</p>
            <p className="text-sm text-slate-400">Choose a credit card program or loyalty program above</p>
          </div>
        ) : filteredPartnerRows.length === 0 ? (
          <div className="rounded-2xl bg-white/70 py-16 text-center backdrop-blur">
            <p className="text-base text-slate-400">No partners available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPartnerRows.map((partner) => {
              const key = `${partner.to}-${partner.rate}`;
              const projected = calculateProjectedPoints(partner.rate);
              const formattedProjected = formatPoints(projected);
              const isExpanded = expandedRow === key;

              return (
                <div
                  key={key}
                  onClick={() => setExpandedRow(isExpanded ? null : key)}
                  className={`group cursor-pointer rounded-xl bg-white p-4 shadow-sm ring-1 transition-all active:scale-[0.99] ${
                    isExpanded 
                      ? "ring-emerald-300 shadow-md" 
                      : "ring-slate-100 hover:shadow-md hover:ring-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5">
                        {PROGRAM_LOGOS[partner.to] && (
                          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 p-1">
                            <img
                              src={PROGRAM_LOGOS[partner.to]}
                              alt={partner.to}
                              className="h-full w-full rounded-full object-cover"
                            />
                          </div>
                        )}
                        <p className="truncate text-base font-semibold text-slate-800">{partner.to}</p>
                        <span className="flex-shrink-0 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600">
                          {isExpanded ? "tap to hide" : "tap for details"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">{partner.rate}</p>
                    </div>
                    
                    {formattedProjected ? (
                      <div className="flex-shrink-0 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2">
                        <p className="text-base font-bold text-white">{formattedProjected}</p>
                      </div>
                    ) : (
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${isExpanded ? "bg-emerald-100 text-emerald-600" : "bg-slate-50 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-500"}`}>
                        <svg className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {isExpanded && (
                    <div className="mt-3 rounded-lg bg-slate-50 p-3">
                      <p className="text-sm leading-relaxed text-slate-600">
                        💡 {partner.insight}
                      </p>
                    </div>
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
