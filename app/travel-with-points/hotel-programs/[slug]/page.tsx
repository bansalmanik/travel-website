import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import type {
  HotelProgram,
  ListSection,
  QuickFact,
  SectionImage,
  StatusLevelsSection
} from "@/app/travel-with-points/hotel-programs/types";
import { getHotelProgramContent } from "@/lib/contentData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getPrograms(): Promise<HotelProgram[]> {
  const { programs } = await getHotelProgramContent();

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

export default async function HotelProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const programs = await getPrograms();
  const program = programs.find((item) => item.slug === decodedSlug);

  if (!program) {
    notFound();
  }

  const renderSectionImage = (image?: SectionImage) => {
    if (!image) {
      return null;
    }

    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        <Image
          src={image.src}
          alt={image.alt}
          width={1200}
          height={800}
          className="h-60 w-full object-cover object-center sm:h-72"
        />
      </div>
    );
  };

  const renderListSection = (defaultTitle: string, section?: ListSection) => {
    if (!section) {
      return null;
    }

    const hasContent =
      (section.description && section.description.trim().length > 0) ||
      (section.items && section.items.length > 0) ||
      (section.note && section.note.trim().length > 0) ||
      section.image;

    if (!hasContent) {
      return null;
    }

    const title = section.title ?? defaultTitle;

    return (
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          {section.description ? (
            <p className="text-sm leading-6 text-slate-700">{section.description}</p>
          ) : null}
          {section.items && section.items.length > 0 ? (
            <ul className="space-y-3 text-sm leading-6 text-slate-700">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-sky-700" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {section.note ? (
            <p className="text-sm text-slate-700">{section.note}</p>
          ) : null}
        </div>
        {renderSectionImage(section.image)}
      </section>
    );
  };

  const renderQuickFacts = (facts?: QuickFact[]) => {
    if (!facts || facts.length === 0) {
      return null;
    }

    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Quick facts</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            {facts.map((fact) => (
              <div
                key={`${fact.label}-${fact.value}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-800">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-sm font-medium text-slate-900">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    );
  };

  const renderTags = (tags?: string[]) => {
    if (!tags || tags.length === 0) {
      return null;
    }

    return (
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag}>
            <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-sky-800">
              {tag}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  const renderStatusSection = (section?: StatusLevelsSection) => {
    if (
      !section ||
      section.tiers.length === 0 ||
      !section.rows ||
      section.rows.length === 0
    ) {
      return null;
    }

    return (
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">Status levels</h2>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-800">
              Elite benefits by tier
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-separate border-spacing-y-3 text-left text-sm text-slate-700">
              <caption className="sr-only">Elite benefits comparison across loyalty tiers</caption>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="rounded-lg bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-900"
                  >
                    Benefit
                  </th>
                  {section.tiers.map((tier) => (
                    <th
                      key={tier}
                      scope="col"
                      className="rounded-lg bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-900"
                    >
                      {tier}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row) => (
                  <tr key={row.label} className="align-top">
                    <th
                      scope="row"
                      className="rounded-lg bg-slate-50 px-4 py-4 text-left text-sm font-semibold text-slate-900"
                    >
                      <div className="space-y-2">
                        <span>{row.label}</span>
                        {row.description ? (
                          <p className="max-w-xs text-xs font-normal text-slate-600">{row.description}</p>
                        ) : null}
                      </div>
                    </th>
                    {section.tiers.map((_, index) => {
                      const value = row.values[index];
                      const hasValue = typeof value === "string" && value.trim().length > 0;

                      return (
                        <td
                          key={`${row.label}-${index}`}
                          className="rounded-lg bg-slate-50 px-4 py-4 text-slate-700"
                        >
                          {hasValue ? value : <span className="text-slate-400">—</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {section.note ? <p className="text-sm text-slate-700">{section.note}</p> : null}
        </div>
        {renderSectionImage(section.image)}
      </section>
    );
  };

  const topTierLabel =
    program.statusLevels && program.statusLevels.tiers.length > 0
      ? program.statusLevels.tiers[program.statusLevels.tiers.length - 1]
      : undefined;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: program.name,
    description: program.summary,
    areaServed: program.footprint,
    url: `https://example.com/travel-with-points/hotel-programs/${program.slug}`,
    ...(program.tags ? { keywords: program.tags } : {})
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-20 lg:py-28">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/travel-with-points" className="hover:text-sky-800">
                Travel with Points
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/travel-with-points/hotel-programs" className="hover:text-sky-800">
                Hotel programs
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-sky-800">{program.name}</li>
          </ol>
        </nav>

        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-800">Hotel loyalty guide</p>
          <h1 className="text-4xl font-semibold text-slate-900">{program.name}</h1>
          <p className="text-base text-slate-700">{program.summary}</p>
          {renderTags(program.tags)}
        </header>

        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-slate-900">Program footprint</h2>
              <p className="text-sm text-slate-700">{program.footprint}</p>
            </div>
            <div className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs uppercase tracking-[0.3em] text-sky-800">
              {topTierLabel ?? "Loyalty"}
            </div>
          </div>
          <p className="text-sm text-slate-700">
            Plan your stays to layer elite benefits, smart points earning, and co-branded card perks for outsized travel value.
          </p>
        </section>

        {renderQuickFacts(program.quickFacts)}

        {renderListSection("Overview", program.overview)}

        {renderListSection("Enrollment", program.enrollment)}

        {renderStatusSection(program.statusLevels)}

        {renderListSection("Earning points", program.pointsEarn)}

        {renderListSection("Redeeming points", program.pointsBurn)}

        {renderListSection("Elite benefit details", program.eliteBenefitDetails)}

        {renderListSection("Partnerships", program.partnerships)}

        {renderListSection("Co-branded cards", program.coBrandedCards)}

        {renderListSection("Special perks", program.specialPerks)}

        {renderListSection("Lifetime status", program.lifetimeStatus)}

        {renderListSection("Membership policies", program.paidMemberships)}

        {renderListSection("Additional benefits", program.otherBenefits)}

        {renderListSection("Notes", program.notesSection)}

        <footer className="flex flex-col gap-3 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-slate-900">Research more hotel brands</p>
          <Link href="/travel-with-points/hotel-programs" className="inline-flex items-center font-semibold text-sky-800">
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
