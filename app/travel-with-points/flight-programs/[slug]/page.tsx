import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import flightData from "@/data/flight-programs.json";

type FlightProgram = {
  slug: string;
  name: string;
  alliance: string;
  hub: string;
  summary: string;
  seoDescription: string;
  eliteLevels: string[];
  sweetSpots: string[];
  transferPartners: string[];
};

const programs = (flightData as { programs: FlightProgram[] }).programs;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const program = programs.find((item) => item.slug === decodedSlug);

  if (!program) {
    return {
      title: "Flight program not found | Travel with Points"
    };
  }

  return {
    title: `${program.name} loyalty playbook | Travel with Points`,
    description: program.seoDescription,
    keywords: [
      program.name,
      `${program.name} award chart`,
      `${program.name} elite status`,
      `${program.alliance} loyalty program`,
      "airline miles sweet spots"
    ],
    alternates: {
      canonical: `/travel-with-points/flight-programs/${program.slug}`
    },
    openGraph: {
      title: `${program.name} loyalty playbook`,
      description: program.seoDescription,
      type: "article",
      url: `https://example.com/travel-with-points/flight-programs/${program.slug}`
    },
    twitter: {
      card: "summary",
      title: `${program.name} loyalty playbook`,
      description: program.seoDescription
    }
  };
}

export default async function FlightProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const program = programs.find((item) => item.slug === decodedSlug);

  if (!program) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: program.name,
    description: program.summary,
    areaServed: program.hub,
    parentOrganization: program.alliance,
    url: `https://example.com/travel-with-points/flight-programs/${program.slug}`
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
              <Link href="/travel-with-points" className="hover:text-emerald-300">
                Travel with Points
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/travel-with-points/flight-programs" className="hover:text-emerald-300">
                Flight programs
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-emerald-200">{program.name}</li>
          </ol>
        </nav>

        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-300">Flight loyalty guide</p>
          <h1 className="text-4xl font-semibold text-white">{program.name}</h1>
          <p className="text-base text-slate-200/80">{program.summary}</p>
        </header>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Alliance & hubs</h2>
          <dl className="grid gap-6 text-sm text-slate-100/80 sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-white">Alliance</dt>
              <dd>{program.alliance}</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Primary hubs</dt>
              <dd>{program.hub}</dd>
            </div>
          </dl>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Elite status highlights</h2>
          <ul className="space-y-3 text-sm leading-6 text-slate-100/80">
            {program.eliteLevels.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-emerald-300" aria-hidden />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Award sweet spots</h2>
          <ul className="space-y-3 text-sm leading-6 text-slate-100/80">
            {program.sweetSpots.map((sweetSpot) => (
              <li key={sweetSpot} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-emerald-300" aria-hidden />
                <span>{sweetSpot}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Transfer partners</h2>
          <p className="text-sm text-slate-100/80">
            Build balances quickly by moving points from bank currencies directly into {program.name}:
          </p>
          <ul className="grid gap-3 text-sm text-slate-100/80 sm:grid-cols-2">
            {program.transferPartners.map((partner) => (
              <li key={partner} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-emerald-300" aria-hidden />
                <span>{partner}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="flex flex-col gap-3 text-sm text-slate-200/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-white">Compare more airline programs</p>
          <Link href="/travel-with-points/flight-programs" className="inline-flex items-center font-semibold text-emerald-300">
            Back to flight programs hub
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
