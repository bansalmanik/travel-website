const categoryStyles: Record<string, string> = {
  "credit-cards": "bg-amber-100 text-amber-900",
  hotels: "bg-sky-100 text-sky-900",
  airlines: "bg-indigo-100 text-indigo-900",
  "travel-tips": "bg-emerald-100 text-emerald-900",
  destinations: "bg-rose-100 text-rose-900",
};

export function CategoryBadge({ category }: { category: string }) {
  const label = category.replace(/-/g, " ").toUpperCase();
  const style = categoryStyles[category] ?? "bg-slate-100 text-slate-800";

  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      {label}
    </span>
  );
}
