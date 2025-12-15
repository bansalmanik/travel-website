import Link from "next/link";
import { TableOfContentsItem } from "@/lib/blog";

export function TableOfContents({ items }: { items: TableOfContentsItem[] }) {
  if (!items.length) return null;

  return (
    <aside className="sticky top-24 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">On this page</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className={item.depth === 3 ? "ml-3" : ""}>
            <Link
              href={`#${item.id}`}
              className="text-slate-700 transition hover:text-amber-700"
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
