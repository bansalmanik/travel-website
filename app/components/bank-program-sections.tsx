import { Fragment, type ReactElement } from "react";

import type {
  BankProgramSection,
  BulletSection,
  ContentBlock,
  ContentBlocksSection,
  KeyValueItem,
  KeyValueSection,
  TableRow,
  TableSection,
} from "@/app/travel-with-points/bank-programs/types";

function hasKeyValueContent(items?: KeyValueItem[]): items is KeyValueItem[] {
  return Boolean(items?.some((item) => item.value?.trim().length));
}

function hasBulletContent(section: BulletSection): boolean {
  return Boolean(section.bullets && section.bullets.length > 0);
}

function hasContentBlocks(section: ContentBlocksSection): section is ContentBlocksSection {
  return Boolean(section.blocks && section.blocks.some((block) => block.text?.trim().length));
}

function hasTableContent(section: TableSection): boolean {
  return Boolean(
    section.table &&
      section.table.columns &&
      section.table.columns.length > 0 &&
      section.table.rows &&
      section.table.rows.some((row) => row.cells && row.cells.length > 0)
  );
}

function renderIntro(intro?: string) {
  if (!intro) {
    return null;
  }

  return <p className="text-sm leading-6 text-slate-700">{intro}</p>;
}

function renderKeyValueSection(section: KeyValueSection) {
  if (!hasKeyValueContent(section.items)) {
    return null;
  }

  return (
    <section
      key={section.id}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
        {renderIntro(section.intro)}
      </div>
      <dl className="grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
        {section.items
          ?.filter((item) => item.value?.trim().length)
          .map((item) => (
            <div
              key={`${section.id}-${item.label}-${item.value}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-700">
                {item.label}
              </dt>
              <dd className="mt-2 text-sm font-medium text-slate-900">{item.value}</dd>
            </div>
          ))}
      </dl>
    </section>
  );
}

function renderBulletSection(section: BulletSection) {
  if (!hasBulletContent(section)) {
    return null;
  }

  return (
    <section
      key={section.id}
      className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
        {renderIntro(section.intro)}
      </div>
      <ul className="space-y-3 text-sm leading-6 text-slate-700">
        {section.bullets?.map((bullet, index) => (
          <li key={`${section.id}-bullet-${index}`} className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-600" aria-hidden />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function renderBlock(block: ContentBlock, index: number) {
  if (block.type === "paragraph") {
    if (!block.text.trim()) {
      return null;
    }

    return (
      <p key={`paragraph-${index}`} className="text-sm leading-6 text-slate-700">
        {block.text}
      </p>
    );
  }

  return null;
}

function renderContentBlocksSection(section: ContentBlocksSection) {
  if (!hasContentBlocks(section)) {
    return null;
  }

  return (
    <section
      key={section.id}
      className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
        {renderIntro(section.intro)}
      </div>
      <div className="space-y-4">
        {section.blocks?.map((block, index) => (
          <Fragment key={`${section.id}-block-${index}`}>{renderBlock(block, index)}</Fragment>
        ))}
      </div>
    </section>
  );
}

function renderTableRow(row: TableRow, index: number): ReactElement | null {
  const hasContent = row.cells.some((cell) => cell.trim().length);

  if (!hasContent) {
    return null;
  }

  return (
    <tr key={`row-${index}`}>
      {row.cells.map((cell, cellIndex) => (
        <td
          key={`cell-${index}-${cellIndex}`}
          className="border-t border-slate-200 px-4 py-3 text-left align-top text-sm text-slate-700"
        >
          {cell}
        </td>
      ))}
    </tr>
  );
}

function renderTableSection(section: TableSection) {
  if (!hasTableContent(section)) {
    return null;
  }

  return (
    <section
      key={section.id}
      className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
        {renderIntro(section.intro)}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead>
            <tr>
              {section.table?.columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-[0.35em] text-amber-700"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {section.table?.rows
              .map((row, index) => renderTableRow(row, index))
              .filter((row): row is ReactElement => row !== null)}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function BankProgramSections({ sections }: { sections: BankProgramSection[] }) {
  return (
    <div className="space-y-8">
      {sections.map((section) => {
        switch (section.style) {
          case "key-values":
            return renderKeyValueSection(section);
          case "bullets":
            return renderBulletSection(section);
          case "content-blocks":
            return renderContentBlocksSection(section);
          case "table":
            return renderTableSection(section);
          default:
            return null;
        }
      })}
    </div>
  );
}
