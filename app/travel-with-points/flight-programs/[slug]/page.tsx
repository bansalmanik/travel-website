import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import flightData from "@/data/flight-programs.json";

type SectionImage = {
  src: string;
  alt: string;
  caption?: string;
};

type BaseSection = {
  id: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  images?: SectionImage[];
};

type BulletSection = BaseSection & {
  style: "bullets";
  bullets: string[];
};

type TableSection = BaseSection & {
  style: "table";
  table: {
    caption?: string;
    columns: string[];
    rows: { cells: string[] }[];
  };
};

type ProgramSection = BulletSection | TableSection;

type FlightProgram = {
  slug: string;
  name: string;
  alliance: string;
  hub: string;
  summary: string;
  seoDescription: string;
  sections: ProgramSection[];
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

  const renderSectionContent = (section: ProgramSection) => {
    if (section.style === "table") {
      return (
        <div className="space-y-6">
          {section.intro ? (
            <p className="text-sm text-slate-100/80">{section.intro}</p>
          ) : null}
          {section.paragraphs?.map((paragraph, index) => (
            <p key={`${section.id}-table-paragraph-${index}`} className="text-sm text-slate-100/80">
              {paragraph}
            </p>
          ))}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[340px] border-separate border-spacing-y-2 text-left text-sm text-slate-100/80">
              {section.table.caption ? (
                <caption className="pb-2 text-left text-xs uppercase tracking-[0.2em] text-emerald-300">
                  {section.table.caption}
                </caption>
              ) : null}
              <thead>
                <tr>
                  {section.table.columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="rounded-lg bg-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-emerald-200"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.table.rows.map((row, rowIndex) => (
                  <tr key={`${section.id}-${rowIndex}`} className="align-top">
                    {row.cells.map((cell, cellIndex) => (
                      <td key={`${section.id}-${rowIndex}-${cellIndex}`} className="rounded-lg bg-white/5 px-4 py-3">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {section.intro ? (
          <p className="text-sm text-slate-100/80">{section.intro}</p>
        ) : null}
        {section.paragraphs?.map((paragraph, index) => (
          <p key={`${section.id}-paragraph-${index}`} className="text-sm text-slate-100/80">
            {paragraph}
          </p>
        ))}
        <ul className="space-y-3 text-sm leading-6 text-slate-100/80">
          {section.bullets.map((bullet, index) => (
            <li key={`${section.id}-bullet-${index}`} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 flex-none rounded-full bg-emerald-300" aria-hidden />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-20 lg:py-28">
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

        {program.sections.map((section) => (
          <section
            key={section.id}
            className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
            aria-labelledby={`${section.id}-heading`}
          >
            <div className="space-y-4">
              <h2 id={`${section.id}-heading`} className="text-xl font-semibold text-white">
                {section.title}
              </h2>
              {renderSectionContent(section)}
            </div>
            {section.images && section.images.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {section.images.map((image) => (
                  <figure
                    key={`${section.id}-${image.src}`}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/10"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    {image.caption ? (
                      <figcaption className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-200/70">
                        {image.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            ) : null}
          </section>
        ))}

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
      </article>
    </main>
  );
}
