"use client";

import { useMemo, useState } from "react";

const transferPairs = [
  {
    from: "American Express Membership Rewards",
    to: "Air Canada Aeroplan",
    rate: "1 : 1",
    terms:
      "Transfers are usually instant. Bonus promotions can occasionally increase the ratio.",
  },
  {
    from: "American Express Membership Rewards",
    to: "Marriott Bonvoy",
    rate: "1 : 1",
    terms:
      "Allow up to 48 hours. A 5,000-point bonus is added for every 60,000 points transferred.",
  },
  {
    from: "Chase Ultimate Rewards",
    to: "World of Hyatt",
    rate: "1 : 1",
    terms:
      "Transfers are instant. Redemptions start at 3,500 points for off-peak Category 1 hotels.",
  },
  {
    from: "Chase Ultimate Rewards",
    to: "United MileagePlus",
    rate: "1 : 1",
    terms:
      "Transfers are instant, but you cannot transfer United miles back to Chase once complete.",
  },
  {
    from: "Citi ThankYou Points",
    to: "Avianca LifeMiles",
    rate: "1 : 1",
    terms:
      "Transfers post within 24 hours. LifeMiles regularly discounts award bookings by 10–15%.",
  },
  {
    from: "Citi ThankYou Points",
    to: "Choice Privileges",
    rate: "1 : 2",
    terms:
      "Expect 1–2 day processing. Watch for seasonal promotions on all-inclusive partner resorts.",
  },
];

export default function PointsConversionPage() {
  const [selectedFrom, setSelectedFrom] = useState("American Express Membership Rewards");
  const [selectedTo, setSelectedTo] = useState("");

  const fromOptions = useMemo(
    () => Array.from(new Set(transferPairs.map((pair) => pair.from))),
    []
  );

  const toOptions = useMemo(() => {
    if (!selectedFrom) {
      return [];
    }

    return Array.from(
      new Set(
        transferPairs
          .filter((pair) => pair.from === selectedFrom)
          .map((pair) => pair.to)
      )
    );
  }, [selectedFrom]);

  const selectedPair = useMemo(() => {
    if (!selectedFrom || !selectedTo) {
      return null;
    }

    return transferPairs.find(
      (pair) => pair.from === selectedFrom && pair.to === selectedTo
    );
  }, [selectedFrom, selectedTo]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16 lg:py-24">
        <header className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">
            Points Conversion
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">
            Find the best way to move your rewards
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-200/80">
            Pick a transferable currency and a partner program to instantly see the standard conversion ratio plus any
            quirks worth knowing before you initiate the transfer.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">
                Transfer from
              </span>
              <select
                value={selectedFrom}
                onChange={(event) => {
                  setSelectedFrom(event.target.value);
                  setSelectedTo("");
                }}
                className="w-full rounded-2xl border border-white/20 bg-slate-900/80 px-4 py-3 text-base text-slate-100 shadow focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
              >
                <option value="" disabled>
                  Select a points currency
                </option>
                {fromOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">
                Transfer to
              </span>
              <select
                value={selectedTo}
                onChange={(event) => setSelectedTo(event.target.value)}
                className="w-full rounded-2xl border border-white/20 bg-slate-900/80 px-4 py-3 text-base text-slate-100 shadow focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                disabled={!selectedFrom}
              >
                <option value="" disabled>
                  {selectedFrom ? "Select a partner program" : "Pick a source first"}
                </option>
                {toOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900/60 p-8 text-center">
            {selectedPair ? (
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">
                  Conversion Rate
                </p>
                <p className="text-5xl font-semibold text-white">{selectedPair.rate}</p>
                <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-100/80">
                  {selectedPair.terms}
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-slate-200/70">
                <p className="text-lg font-semibold text-white">Choose a partner pairing</p>
                <p className="text-sm leading-6">
                  Select both dropdowns to reveal the standard transfer ratio and any timing or bonus details to watch
                  before submitting your request.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold text-white">How to use this tool</h2>
          <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-slate-100/80">
            <li>
              Start with the card issuer or flexible points ecosystem where you currently hold a balance.
            </li>
            <li>
              Scan the partner list to confirm that award seats or rooms are available before you transfer.
            </li>
            <li>
              Remember that transfers are one-way—double-check the conversion rate and terms before proceeding.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
