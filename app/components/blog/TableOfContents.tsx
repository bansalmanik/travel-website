interface HeadingItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (!headings.length) return null;

  return (
    <aside className="sticky top-28 hidden h-fit max-w-xs rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-700 shadow-sm lg:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">On this page</p>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level > 2 ? "ml-3" : ""}>
            <a
              href={`#${heading.id}`}
              className="inline-block rounded-lg px-2 py-1 transition hover:bg-amber-50 hover:text-amber-800"
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
