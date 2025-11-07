import type { Metadata } from "next";
import Link from "next/link";

import { ArrowLink } from "@/app/travel-with-points/_shared/arrow-link";
import { TravelGradientPage, TravelStack } from "@/app/travel-with-points/_shared/layout";
import { getBankProgramContent } from "@/lib/contentData";

const pageTitle = "Bank Programs | Miles Go Round";
const pageDescription =
  "Compare the leading bank travel portals and redemption tools to decide where to earn and redeem your points.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/travel-with-points/bank-programs",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: "https://example.com/travel-with-points/bank-programs",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export const runtime = "edge";

export default async function BankProgramsPage() {
  const { programs } = await getBankProgramContent();

  const visiblePrograms = programs.filter((program) => program.enabled ?? true);

  if (!visiblePrograms.length) {
    return (
      <TravelGradientPage>
        <TravelStack className="items-center gap-6 text-center lg:py-32">
          <h1 className="text-4xl font-semibold sm:text-5xl">Bank Programs</h1>
          <p className="text-base leading-7 text-slate-200/80">
            Our bank portal guides are being updated. Check back soon for the latest playbooks.
          </p>
          <ArrowLink
            href="/travel-with-points"
            direction="left"
            accentClass="text-amber-300"
          >
            Back to travel with points
          </ArrowLink>
        </TravelStack>
      </TravelGradientPage>
    );
  }

  return (
    <TravelGradientPage>
      <TravelStack className="gap-12 text-center lg:py-32">
        <span className="inline-flex items-center self-center rounded-full border border-rose-200/40 bg-rose-100/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-rose-200">
          Bank Programs
        </span>
        <div className="space-y-5">
          <h1 className="text-4xl font-semibold sm:text-5xl">Bank Programs</h1>
          <p className="text-base leading-7 text-slate-200/80">
            Learn how to stack bonuses, earn accelerated points, and multiply your rewards on everyday spending.
          </p>
        </div>
        <div className="grid gap-6 text-left sm:grid-cols-2">
          {visiblePrograms.map((program) => (
            <Link
              key={program.slug}
              href={`/travel-with-points/bank-programs/${program.slug}`}
              className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
            >
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">{program.name}</h2>
                <p className="text-sm leading-6 text-slate-100/80">{program.summary}</p>
              </div>
              <span className="mt-6 inline-flex items-center text-sm font-semibold text-amber-300">
                View guide
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
              </span>
            </Link>
          ))}
        </div>
        <ArrowLink
          href="/travel-with-points"
          direction="left"
          accentClass="text-amber-300"
          className="self-center"
        >
          Back to travel with points
        </ArrowLink>
      </TravelStack>
    </TravelGradientPage>
  );
}
