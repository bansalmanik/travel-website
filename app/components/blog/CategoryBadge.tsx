import Link from "next/link";

interface CategoryBadgeProps {
  category: string;
}

const categoryStyles: Record<string, string> = {
  "credit-cards": "bg-amber-100 text-amber-900",
  hotels: "bg-sky-100 text-sky-900",
  airlines: "bg-indigo-100 text-indigo-900",
  "travel-tips": "bg-emerald-100 text-emerald-900",
  destinations: "bg-rose-100 text-rose-900",
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const label = category.replace(/-/g, " ");
  const color = categoryStyles[category] ?? "bg-slate-100 text-slate-800";

  return (
    <Link
      href={`/blog/${category}/`}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${color}`}
    >
      {label.toUpperCase()}
    </Link>
  );
}

export default CategoryBadge;
