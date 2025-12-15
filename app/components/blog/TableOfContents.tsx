import Link from "next/link";

import { BlogHeading } from "@/lib/blog";

interface TableOfContentsProps {
  headings: BlogHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">On this page</p>
      <ul className="space-y-2 text-sm text-slate-700">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "ml-3" : undefined}>
            <Link href={`#${heading.id}`} className="transition hover:text-amber-700">
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
