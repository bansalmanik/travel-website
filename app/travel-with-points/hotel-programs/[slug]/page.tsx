import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import hotelData from "@/data/hotel-programs.json";

type HotelProgram = {
  slug: string;
  name: string;
  footprint: string;
  summary: string;
  seoDescription: string;
  eliteLevels: string[];
  redemptionTips: string[];
  coBrandedCards: string[];
};

const programs = (hotelData as { programs: HotelProgram[] }).programs;

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const slug = decodeURIComponent(params.slug);
  const program = programs.find((item) => item.slug === slug);

  if (!program) {
    return {
      title: "Hotel program not found | Travel with Points"
    };
  }

  return {
    title: `${program.name} loyalty blueprint | Travel with Points`,
    description: program.seoDescription,
    keywords: [
      program.name,
      `${program.name} elite status`,
      `${program.name} award chart`,
      "hotel loyalty program guide",
      "free night certificate tips"
    ],
    alternates: {
      canonical: `/travel-with-points/hotel-programs/${program.slug}`
    },
    openGraph: {
      title: `${program.name} loyalty blueprint`,
      description: program.seoDescription,
      type: "article",
      url: `https://example.com/travel-with-points/hotel-programs/${program.slug}`
    },
    twitter: {
      card: "summary",
      title: `${program.name} loyalty blueprint`,
      description: program.seoDescription
    }
  };
}

export default function HotelProgramDetailPage({ params }: PageProps) {
  const slug = decodeURIComponent(params.slug);
  const program = programs.find((item) => item.slug === slug);

  if (!program) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: program.name,
    description: program.summary,
    areaServed: program.footprint,
    url: `https://example.com/travel-with-points/hotel-programs/${program.slug}`
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-20 lg:py-28">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-300">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/travel-with-points" className="hover:text-sky-300">
                Travel with Points
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/travel-with-points/hotel-programs" className="hover:text-sky-300">
                Hotel programs
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-sky-200">{program.name}</li>
          </ol>
        </nav>

        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-300">Hotel loyalty guide</p>
          <h1 className="text-4xl font-semibold text-white">{program.name}</h1>
          <p className="text-base text-slate-200/80">{program.summary}</p>
        </header>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Program footprint</h2>
          <p className="text-sm text-slate-100/80">{program.footprint}</p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Elite level highlights</h2>
          <ul className="space-y-3 text-sm leading-6 text-slate-100/80">
            {program.eliteLevels.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-sky-300" aria-hidden />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Redemption tactics</h2>
          <ul className="space-y-3 text-sm leading-6 text-slate-100/80">
            {program.redemptionTips.map((tip) => (
              <li key={tip} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-sky-300" aria-hidden />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Co-branded credit cards</h2>
          <ul className="space-y-3 text-sm leading-6 text-slate-100/80">
            {program.coBrandedCards.map((card) => (
              <li key={card} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-sky-300" aria-hidden />
                <span>{card}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="flex flex-col gap-3 text-sm text-slate-200/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-white">Research more hotel brands</p>
          <Link href="/travel-with-points/hotel-programs" className="inline-flex items-center font-semibold text-sky-300">
            Back to hotel programs hub
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
        </footer>
      </div>
    </main>
  );
}
