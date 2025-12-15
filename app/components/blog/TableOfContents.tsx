import { Heading } from "@/lib/blogTypes";

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (!headings.length) return null;

  return (
    <aside className="sticky top-24 hidden max-h-[70vh] w-64 shrink-0 overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 lg:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">On this page</p>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level > 2 ? "pl-4" : undefined}>
            <a href={`#${heading.id}`} className="transition hover:text-amber-700">
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
