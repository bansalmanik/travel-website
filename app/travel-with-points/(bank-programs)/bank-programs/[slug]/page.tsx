import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BankProgramSections } from "@/app/components/bank-program-sections";
import { ArrowLink } from "@/app/travel-with-points/_shared/arrow-link";
import { Breadcrumbs } from "@/app/travel-with-points/_shared/breadcrumbs";
import { JsonLd } from "@/app/travel-with-points/_shared/json-ld";
import { TravelArticle, TravelGradientPage } from "@/app/travel-with-points/_shared/layout";
import {
  createSlugResolver,
  resolveSlugParam,
} from "@/app/travel-with-points/_shared/slug-helpers";
import { getBankProgramContent } from "@/lib/contentData";

const siteUrl = "https://example.com";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const runtime = "edge";

const bankProgramResolver = createSlugResolver(async () => {
  const { programs } = await getBankProgramContent();

  return programs;
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = await resolveSlugParam(params);
  const program = await bankProgramResolver.findBySlug(slug);

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
  const { entity: program } = await bankProgramResolver.fromParams(params);

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
    <TravelGradientPage>
      <JsonLd data={structuredData} />
      <TravelArticle>
        <Breadcrumbs
          items={[
            { label: "Travel with Points", href: "/travel-with-points" },
            { label: "Bank programs", href: "/travel-with-points/bank-programs" },
            { label: program.name },
          ]}
          linkHoverClass="hover:text-sky-300"
          currentClass="text-sky-200"
        />

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
          <ArrowLink
            href="/travel-with-points/bank-programs"
            accentClass="text-sky-200"
          >
            Back to bank programs hub
          </ArrowLink>
        </footer>
      </TravelArticle>
    </TravelGradientPage>
  );
}
