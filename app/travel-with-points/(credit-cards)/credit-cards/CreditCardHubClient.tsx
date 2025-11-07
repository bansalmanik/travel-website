'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

import type {
  Card,
  CardStrategy,
  CreditCardDataset,
  FavoriteCombo,
} from "@/app/travel-with-points/(credit-cards)/credit-cards/types";
import {
  cx,
  travelContentShell,
  travelGradientBackground,
} from "@/app/travel-with-points/_shared/styles";
import { filterEnabled, filterEnabledDeep } from "@/lib/filterEnabled";

import type { AnnualFee } from "@/app/travel-with-points/(credit-cards)/credit-cards/types";

type CreditCardHubState =
  | { status: "loading" }
  | { status: "ready"; cards: Card[]; strategies: CardStrategy[]; combos: FavoriteCombo[] }
  | { status: "error" };

async function loadCreditCardContent() {
  const dataset = (await import("@/data/credit-cards.json")).default as CreditCardDataset;
  const cards = filterEnabled(dataset.cards).map((card) => filterEnabledDeep(card)) as Card[];

  return {
    cards,
    strategies: filterEnabled(dataset.cardStrategies),
    combos: filterEnabled(dataset.favoriteCombos),
  };
}

function formatAnnualFee(annualFee: AnnualFee) {
  const locale = annualFee.currency === "INR" ? "en-IN" : "en-US";
  const hasFraction = !Number.isInteger(annualFee.amount);
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: annualFee.currency,
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
  });
  const fee = formatter.format(annualFee.amount);

  if (annualFee.gstApplicable) {
    return `${fee} + GST`;
  }

  return fee;
}

export function CreditCardHubClient() {
  const [state, setState] = useState<CreditCardHubState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    loadCreditCardContent()
      .then((data) => {
        if (cancelled) {
          return;
        }

        setState({ status: "ready", ...data });
      })
      .catch(() => {
        if (!cancelled) {
          setState({ status: "error" });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <main className={travelGradientBackground}>
        <div className={cx(travelContentShell, "gap-6")}> 
          <p className="text-sm text-slate-200/70">Loading credit card strategy…</p>
        </div>
      </main>
    );
  }

  if (state.status === "error") {
    return (
      <main className={travelGradientBackground}>
        <div
          className={cx(
            "mx-auto flex max-w-3xl flex-col",
            "gap-6 px-6 py-20 lg:py-28"
          )}
        >
          <h1 className="text-3xl font-semibold text-white">Unable to load cards</h1>
          <p className="text-sm text-slate-200/80">
            Something went wrong while loading the travel credit card hub. Please refresh to try again.
          </p>
        </div>
      </main>
    );
  }

  const { cards, strategies, combos } = state;

  return (
    <main className={travelGradientBackground}>
      <div className={cx(travelContentShell, "gap-16")}> 
        <header className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">Travel with Points</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Credit card strategy</h1>
          <p className="text-base text-slate-200/80">
            Focus on cards that earn flexible currencies, pair perks with your lifestyle, and keep an eye on welcome bonus
            rules. The goal is to earn intentionally — not chase every shiny metal rectangle.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Featured travel credit cards</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {cards.map((card) => (
              <article
                key={card.slug}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-amber-300/60 hover:bg-slate-900/80"
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">{card.issuer}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      <Link href={`/travel-with-points/credit-cards/${card.slug}`} className="hover:underline">
                        {card.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-slate-200/80">{card.summary}</p>
                  </div>
                  <dl className="grid gap-3 text-sm text-slate-100/80">
                    <div>
                      <dt className="font-semibold text-white">Annual fee</dt>
                      <dd>{formatAnnualFee(card.annualFee)}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-white">Network</dt>
                      <dd>{card.network}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-white">Card type</dt>
                      <dd>{card.type}</dd>
                    </div>
                  </dl>
                  {card.websiteDisplayTags?.length ? (
                    <ul className="flex flex-wrap gap-2">
                      {card.websiteDisplayTags.slice(0, 3).map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {card.keyHighlights?.length ? (
                    <p className="text-sm text-slate-100/70">
                      <span className="font-semibold text-white">Standout highlight:</span> {card.keyHighlights[0]}
                    </p>
                  ) : null}
                </div>
                <Link
                  href={`/travel-with-points/credit-cards/${card.slug}`}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-amber-300"
                >
                  View full details
                  <svg
                    aria-hidden
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Core principles</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {strategies.map((strategy) => (
              <article key={strategy.title} className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h3 className="text-lg font-semibold text-white">{strategy.title}</h3>
                <p className="text-sm leading-6 text-slate-100/80">{strategy.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Starter card pairings</h2>
          <div className="space-y-6">
            {combos.map((combo) => (
              <article key={combo.name} className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <h3 className="text-lg font-semibold text-white">{combo.name}</h3>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">{combo.cards.join(" + ")}</p>
                <p className="text-sm leading-6 text-slate-100/80">{combo.note}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
