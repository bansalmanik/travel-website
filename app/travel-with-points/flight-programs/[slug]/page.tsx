import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FlightProgramSections } from "@/app/components/flight-program-sections";
import type { FlightProgram } from "@/app/travel-with-points/flight-programs/types";
import { getFlightProgramContent } from "@/lib/contentData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getPrograms(): Promise<FlightProgram[]> {
  const { programs } = await getFlightProgramContent();

  return programs;
}

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((program) => ({
    slug: program.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const programs = await getPrograms();
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
      "airline miles sweet spots",
      ...(program.tags ?? [])
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
  const programs = await getPrograms();
  const program = programs.find((item) => item.slug === decodedSlug);

  if (!program) {
    notFound();
  }

  const siteUrl = "https://example.com";
  const sectionTitles = program.sections.map((section) => section.title);
  const sectionImages = program.sections.flatMap((section) =>
    (section.images ?? []).map((image) => `${siteUrl}${image.src}`)
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${program.name} loyalty playbook`,
    description: program.summary,
    about: {
      "@type": "Airline",
      name: program.name,
      parentOrganization: program.alliance
    },
    articleSection: sectionTitles,
    image: sectionImages,
    mainEntityOfPage: `${siteUrl}/travel-with-points/flight-programs/${program.slug}`,
    author: {
      "@type": "Organization",
      name: "Travel with Points"
    },
    publisher: {
      "@type": "Organization",
      name: "Travel with Points",
      url: siteUrl
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-20 lg:py-28">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/travel-with-points" className="hover:text-emerald-800">
                Travel with Points
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/travel-with-points/flight-programs" className="hover:text-emerald-800">
                Flight programs
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-emerald-800">{program.name}</li>
          </ol>
        </nav>

        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-700">Flight loyalty guide</p>
          <h1 className="text-4xl font-semibold text-slate-900">{program.name}</h1>
          <p className="text-base text-slate-700">{program.summary}</p>
        </header>

        <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Alliance & hubs</h2>
          <dl className="grid gap-6 text-sm text-slate-700 sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-slate-900">Alliance</dt>
              <dd>{program.alliance}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Primary hubs</dt>
              <dd>{program.hub}</dd>
            </div>
          </dl>
        </section>

        <FlightProgramSections sections={program.sections} />

        <footer className="flex flex-col gap-3 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-slate-900">Compare more airline programs</p>
          <Link
            href="/travel-with-points/flight-programs"
            className="inline-flex items-center font-semibold text-emerald-800"
          >
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
      </article>
    </main>
  );
}
