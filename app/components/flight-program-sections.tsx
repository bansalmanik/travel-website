"use client";

import Image from "next/image";
import { useState } from "react";

import type {
  ContentBlock,
  ProgramSection
} from "@/app/travel-with-points/(flight-programs)/flight-programs/types";

type FlightProgramSectionsProps = {
  sections: ProgramSection[];
};

const renderBulletList = (items: string[], id: string) => (
  <ul className="space-y-3 text-sm leading-6 text-slate-100/80">
    {items.map((item, index) => (
      <li key={`${id}-bullet-${index}`} className="flex items-start gap-3">
        <span className="mt-1 h-2 w-2 flex-none rounded-full bg-emerald-300" aria-hidden />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const renderContentBlock = (block: ContentBlock, sectionId: string, index: number) => {
  if (block.type === "paragraph") {
    return (
      <p key={`${sectionId}-paragraph-${index}`} className="text-sm text-slate-100/80">
        {block.text}
      </p>
    );
  }

  return (
    <div key={`${sectionId}-block-bullets-${index}`} className="space-y-3">
      {block.title ? (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
          {block.title}
        </p>
      ) : null}
      {renderBulletList(block.items, sectionId)}
    </div>
  );
};

export function FlightProgramSections({ sections }: FlightProgramSectionsProps) {
  const [showImages, setShowImages] = useState(true);

  return (
    <div className="space-y-10">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowImages((previous) => !previous)}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200 transition hover:border-emerald-200 hover:bg-emerald-300/20"
          aria-pressed={showImages}
        >
          <span>{showImages ? "Hide visuals" : "Show visuals"}</span>
          <svg
            aria-hidden
            className={`h-4 w-4 transition ${showImages ? "rotate-0" : "-rotate-90"}`}
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
        </button>
      </div>

      {sections.map((section) => {
        const shouldDisplayImages = section.displayImages ?? true;
        const gridColumnsClass = (() => {
          if (section.style === "key-values") {
            if (section.columns === 3) return "sm:grid-cols-3";
            if (section.columns === 1) return "sm:grid-cols-1";
          }
          return "sm:grid-cols-2";
        })();

        return (
          <section
            key={section.id}
            className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
            aria-labelledby={`${section.id}-heading`}
          >
            <div className="space-y-4">
              <h2 id={`${section.id}-heading`} className="text-xl font-semibold text-white">
                {section.title}
              </h2>
              {section.intro ? (
                <p className="text-sm text-slate-100/80">{section.intro}</p>
              ) : null}
              {section.paragraphs?.map((paragraph, index) => (
                <p key={`${section.id}-intro-paragraph-${index}`} className="text-sm text-slate-100/80">
                  {paragraph}
                </p>
              ))}

              {section.style === "table" ? (
                <div className="space-y-6">
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
                              key={`${section.id}-${column}`}
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
              ) : null}

              {section.style === "bullets" ? renderBulletList(section.bullets, section.id) : null}

              {section.style === "key-values" ? (
                <dl className={`grid gap-4 text-sm text-slate-100/80 ${gridColumnsClass}`}>
                  {section.items.map((item) => (
                    <div key={`${section.id}-${item.label}`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                        {item.label}
                      </dt>
                      <dd className="mt-2 text-sm text-slate-100/90">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {section.style === "content-blocks" ? (
                <div className="space-y-6">
                  {section.blocks.map((block, index) =>
                    renderContentBlock(block, section.id, index)
                  )}
                </div>
              ) : null}
            </div>

            {showImages && shouldDisplayImages && section.images && section.images.length > 0 ? (
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
                        sizes="(min-width: 640px) 50vw, 100vw"
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
        );
      })}
    </div>
  );
}
