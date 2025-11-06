import type { Metadata } from "next";
import type { JSX } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BankProgramSections } from "@/app/components/bank-program-sections";
import type { BankProgram } from "@/app/travel-with-points/bank-programs/types";
import { cache } from "react";

import { getBankProgramContent } from "@/lib/contentData";

type BankProgramPageConfig = {
  slug: string;
  fallbackName: string;
  fallbackSummary: string;
};

type BankProgramPageDefinition = {
  generateMetadata: () => Promise<Metadata>;
  runtime: "edge";
  Page: () => Promise<JSX.Element>;
};

export function makeBankProgramPage({
  slug,
  fallbackName,
  fallbackSummary,
}: BankProgramPageConfig): BankProgramPageDefinition {
  const loadPrograms = cache(async () => {
    const { programs } = await getBankProgramContent();
    return programs;
  });

  async function generateMetadata(): Promise<Metadata> {
    const programsForMetadata = await loadPrograms();
    const metadataProgram = programsForMetadata.find(
      (program) => program.slug === slug && (program.enabled ?? true)
    );

    const programName = metadataProgram?.name ?? fallbackName;
    const pageTitle = `${programName} | Bank Programs | Miles Go Round`;
    const pageDescription = metadataProgram?.summary ?? fallbackSummary;

    return {
      title: pageTitle,
      description: pageDescription,
      alternates: {
        canonical: `/travel-with-points/bank-programs/${slug}`,
      },
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        type: "article",
        url: `https://example.com/travel-with-points/bank-programs/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: pageDescription,
      },
    } satisfies Metadata;
  }

  async function loadProgram(): Promise<BankProgram | undefined> {
    const programs = await loadPrograms();

    return programs.find((program) => program.slug === slug);
  }

  const Page = async function BankProgramPage() {
    const program = await loadProgram();

    if (!program) {
      notFound();
    }

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
      mainEntityOfPage: `https://example.com/travel-with-points/bank-programs/${program.slug}`,
      author: {
        "@type": "Organization",
        name: "Miles Go Round",
      },
      publisher: {
        "@type": "Organization",
        name: "Miles Go Round",
        url: "https://example.com",
      },
    };

    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-300">Bank partner portal guide</p>
            <h1 className="text-4xl font-semibold text-white">{program.name}</h1>
            <p className="text-base text-slate-200/80">{program.summary}</p>
          </header>

          <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur lg:grid-cols-3">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">Issuer</p>
              <p className="text-sm text-slate-100/90">{program.issuer}</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">Program type</p>
              <p className="text-sm text-slate-100/90">{program.programType}</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">How to join</p>
              <p className="text-sm text-slate-100/90">{program.joinCost}</p>
            </div>
          </section>

          <BankProgramSections sections={program.sections} />

          <footer className="flex flex-col gap-3 text-sm text-slate-200/80 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold text-white">Compare more bank portals</p>
            <Link href="/travel-with-points/bank-programs" className="inline-flex items-center font-semibold text-sky-200">
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
  };

  return { generateMetadata, runtime: "edge" as const, Page };
}
