import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BankProgramSections } from "@/app/components/bank-program-sections";
import type { BankProgram } from "@/app/travel-with-points/(bank-programs)/bank-programs/types";
import { getBankProgramContent } from "@/lib/contentData";

const siteUrl = "https://example.com";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const runtime = "edge";

async function getPrograms(): Promise<BankProgram[]> {
  const { programs } = await getBankProgramContent();

  return programs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const programs = await getPrograms();
  const program = programs.find((item) => item.slug === decodedSlug);

  if (!program) {
    return {
      title: "Bank program not found | Travel with Points",
    };
  }

  const keywords = [
    program.name,
    `${program.name} rewards portal`,
    `${program.issuer} ${program.programType}`,
    `${program.name} transfer partners`,
    "bank loyalty program guide",
    ...program.sections.map((section) => section.title),
  ];

  return {
    title: `${program.name} loyalty playbook | Travel with Points`,
    description: program.summary,
    keywords,
    alternates: {
      canonical: `/travel-with-points/bank-programs/${program.slug}`,
    },
    openGraph: {
      title: `${program.name} loyalty playbook`,
      description: program.summary,
      type: "article",
      url: `${siteUrl}/travel-with-points/bank-programs/${program.slug}`,
    },
    twitter: {
      card: "summary",
      title: `${program.name} loyalty playbook`,
      description: program.summary,
    },
  };
}

export default async function BankProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const programs = await getPrograms();
  const program = programs.find((item) => item.slug === decodedSlug);

  if (!program) {
    notFound();
  }

  const sectionTitles = program.sections.map((section) => section.title);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${program.name} portal guide`,
    description: program.summary,
    about: {
      "@type": "FinancialProduct",
      name: program.name,
      provider: program.issuer,
      serviceType: program.programType,
    },
    articleSection: sectionTitles,
    mainEntityOfPage: `${siteUrl}/travel-with-points/bank-programs/${program.slug}`,
    author: {
      "@type": "Organization",
      name: "Travel with Points",
    },
    publisher: {
      "@type": "Organization",
      name: "Travel with Points",
      url: siteUrl,
    },
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
              <Link href="/travel-with-points" className="hover:text-sky-300">
                Travel with Points
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/travel-with-points/bank-programs" className="hover:text-sky-300">
                Bank programs
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-sky-200">{program.name}</li>
          </ol>
        </nav>

        <header className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-300">
            Bank partner portal guide
          </p>
          <h1 className="text-4xl font-semibold text-white">{program.name}</h1>
          <p className="text-base text-slate-200/80">{program.summary}</p>
        </header>

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur lg:grid-cols-3">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
              Issuer
            </p>
            <p className="text-sm text-slate-100/90">{program.issuer}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
              Program type
            </p>
            <p className="text-sm text-slate-100/90">{program.programType}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
              How to join
            </p>
            <p className="text-sm text-slate-100/90">{program.joinCost}</p>
          </div>
        </section>

        <BankProgramSections sections={program.sections} />

        <footer className="flex flex-col gap-3 text-sm text-slate-200/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-white">Compare more bank portals</p>
          <Link
            href="/travel-with-points/bank-programs"
            className="inline-flex items-center font-semibold text-sky-200"
          >
            Back to bank programs hub
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
