import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getJournalEntries } from "@/lib/contentData";

export type PageProps = {
  params: Promise<{ slug: string }>;
};


export async function generateStaticParams() {
  const journals = await getJournalEntries();

  return journals.map((entry) => ({
    slug: entry.slug,
  }));
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const journals = await getJournalEntries();
  const journal = journals.find((entry) => entry.slug === decodedSlug);

  if (!journal) {
    return {
      title: "Journal not found | Miles Go Round",
    };
  }

  const pageUrl = `https://example.com/journals/${journal.slug}`;

  return {
    title: `${journal.title} | Miles Go Round`,
    description: journal.seoDescription,
    alternates: {
      canonical: `/journals/${journal.slug}`,
    },
    openGraph: {
      title: journal.title,
      description: journal.seoDescription,
      type: "article",
      url: pageUrl,
      images: [
        {
          url: journal.heroImage.src,
          alt: journal.heroImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: journal.title,
      description: journal.seoDescription,
      images: [journal.heroImage.src],
    },
  };
}

export default async function JournalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const journals = await getJournalEntries();
  const journal = journals.find((entry) => entry.slug === decodedSlug);

  if (!journal) {
    notFound();
  }

  const pageUrl = `https://example.com/journals/${journal.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: journal.title,
    description: journal.seoDescription,
    datePublished: journal.publishedOn,
    author: {
      "@type": "Person",
      name: journal.author,
    },
    image: journal.heroImage.src,
    url: pageUrl,
  };

  return (
    <main
      id="top"
      className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-20 lg:py-28">
        <header className="space-y-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">Travel Journal</p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">{journal.title}</h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">
            <span>{journal.displayDate}</span>
            <span>•</span>
            <span>{journal.readTime}</span>
            <span>•</span>
            <span>{journal.author}</span>
          </div>
        </header>

        <div className="relative h-72 w-full overflow-hidden rounded-3xl border border-white/10">
          <Image
            src={journal.heroImage.src}
            alt={journal.heroImage.alt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>

        <p className="text-base leading-7 text-slate-200/80">{journal.summary}</p>

        <div className="space-y-12 text-base leading-relaxed text-slate-200/90">
          {journal.sections.map((section) => (
            <section
              key={section.heading}
              className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
            >
              <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
              <div className="space-y-4 text-sm leading-7 text-slate-100/80">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
              {section.image ? (
                <figure className="space-y-3">
                  <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-slate-800/40">
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 90vw"
                    />
                  </div>
                  {section.image.caption ? (
                    <figcaption className="text-xs uppercase tracking-[0.2em] text-slate-200/70">
                      {section.image.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}
            </section>
          ))}
        </div>

        <footer className="flex flex-col gap-3 text-sm text-slate-200/80 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/journals" className="inline-flex items-center font-semibold text-amber-300">
            <svg
              aria-hidden
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 12H5" />
              <path d="m12 5-7 7 7 7" />
            </svg>
            Back to journals
          </Link>
          <a
            href="#top"
            className="inline-flex items-center font-semibold text-amber-300"
          >
            Back to top
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
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
          </a>
        </footer>
      </article>
    </main>
  );
}
