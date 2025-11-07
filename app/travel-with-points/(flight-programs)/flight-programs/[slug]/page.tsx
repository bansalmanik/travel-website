import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FlightProgramSections } from "@/app/components/flight-program-sections";
import { ArrowLink } from "@/app/travel-with-points/_shared/arrow-link";
import { Breadcrumbs } from "@/app/travel-with-points/_shared/breadcrumbs";
import { JsonLd } from "@/app/travel-with-points/_shared/json-ld";
import { TravelArticle, TravelGradientPage } from "@/app/travel-with-points/_shared/layout";
import {
  createSlugResolver,
  resolveSlugParam,
} from "@/app/travel-with-points/_shared/slug-helpers";
import { getFlightProgramContent } from "@/lib/contentData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const runtime = "edge";

const flightProgramResolver = createSlugResolver(async () => {
  const { programs } = await getFlightProgramContent();

  return programs;
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = await resolveSlugParam(params);
  const program = await flightProgramResolver.findBySlug(slug);

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
  const { entity: program } = await flightProgramResolver.fromParams(params);

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
    <TravelGradientPage>
      <JsonLd data={structuredData} />
      <TravelArticle>
        <Breadcrumbs
          items={[
            { label: "Travel with Points", href: "/travel-with-points" },
            { label: "Flight programs", href: "/travel-with-points/flight-programs" },
            { label: program.name },
          ]}
          linkHoverClass="hover:text-emerald-300"
          currentClass="text-emerald-200"
        />

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

        <FlightProgramSections sections={program.sections} />

        <footer className="flex flex-col gap-3 text-sm text-slate-200/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-white">Compare more airline programs</p>
          <ArrowLink
            href="/travel-with-points/flight-programs"
            accentClass="text-emerald-300"
          >
            Back to flight programs hub
          </ArrowLink>
        </footer>
      </TravelArticle>
    </TravelGradientPage>
  );
}
