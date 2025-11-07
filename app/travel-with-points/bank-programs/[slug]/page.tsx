import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BankProgramSections } from "@/app/components/bank-program-sections";
import type { BankProgram } from "@/app/travel-with-points/bank-programs/types";
import { getBankProgramContent } from "@/lib/contentData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getPrograms(): Promise<BankProgram[]> {
  const { programs } = await getBankProgramContent();

  return programs;
}

export const runtime = "edge";

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

  const description = program.seoDescription ?? program.summary;

  return {
    title: `${program.name} rewards portal guide | Travel with Points`,
    description,
    keywords: [
      program.name,
      program.issuer,
      `${program.name} bonus categories`,
      `${program.name} accelerated rewards`,
      "bank travel portal guide",
      "accelerated reward points"
    ],
    alternates: {
      canonical: `/travel-with-points/bank-programs/${program.slug}`,
    },
    openGraph: {
      title: `${program.name} rewards portal guide`,
      description,
      type: "article",
      url: `https://example.com/travel-with-points/bank-programs/${program.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${program.name} rewards portal guide`,
      description,
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

  const description = program.seoDescription ?? program.summary;
  const siteUrl = "https://example.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: program.name,
    description,
    provider: {
      "@type": "BankOrCreditUnion",
      name: program.issuer,
    },
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      description: program.programType,
    },
    url: `${siteUrl}/travel-with-points/bank-programs/${program.slug}`,
    audience: {
      "@type": "Audience",
      audienceType: "Credit card and bank customers",
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
              <Link href="/travel-with-points" className="hover:text-rose-200">
                Travel with Points
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/travel-with-points/bank-programs" className="hover:text-rose-200">
                Bank programs
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-rose-200">{program.name}</li>
          </ol>
        </nav>

        <header className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-300">Bank rewards guide</p>
          <h1 className="text-4xl font-semibold text-white">{program.name}</h1>
          <p className="text-base text-slate-200/80">{description}</p>
        </header>

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-200/80">Issuer</p>
            <p className="text-sm font-medium text-white">{program.issuer}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-200/80">Program type</p>
            <p className="text-sm font-medium text-white">{program.programType}</p>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-200/80">How to join</p>
            <p className="text-sm font-medium text-white">{program.joinCost}</p>
          </div>
        </section>

        <BankProgramSections sections={program.sections} />

        <footer className="flex flex-col gap-3 text-sm text-slate-200/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-white">Compare more bank portals</p>
          <Link href="/travel-with-points/bank-programs" className="inline-flex items-center font-semibold text-amber-300">
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
