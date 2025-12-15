import { VALID_CATEGORIES } from "@/lib/blog";

const CATEGORY_STYLES: Record<string, string> = {
  "credit-cards": "bg-amber-100 text-amber-900",
  hotels: "bg-sky-100 text-sky-900",
  airlines: "bg-indigo-100 text-indigo-900",
  "travel-tips": "bg-emerald-100 text-emerald-900",
  destinations: "bg-rose-100 text-rose-900",
};

function formatCategoryLabel(category: string) {
  return category.replace(/-/g, " ").toUpperCase();
}

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export function CategoryBadge({ category, className = "" }: CategoryBadgeProps) {
  const isValid = (VALID_CATEGORIES as readonly string[]).includes(category);
  const styles = CATEGORY_STYLES[category] ?? "bg-slate-100 text-slate-800";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${styles} ${className}`.trim()}
      aria-label={isValid ? `Category: ${formatCategoryLabel(category)}` : category}
    >
      {formatCategoryLabel(category)}
    </span>
  );
}
