import Link from "next/link";
import { VALID_CATEGORIES } from "@/lib/blogTypes";

const categoryStyles: Record<(typeof VALID_CATEGORIES)[number], string> = {
  "credit-cards": "bg-amber-100 text-amber-900",
  hotels: "bg-sky-100 text-sky-900",
  airlines: "bg-indigo-100 text-indigo-900",
  "travel-tips": "bg-emerald-100 text-emerald-900",
  destinations: "bg-rose-100 text-rose-900",
};

const categoryLabels: Record<(typeof VALID_CATEGORIES)[number], string> = {
  "credit-cards": "Credit Cards",
  hotels: "Hotels",
  airlines: "Airlines",
  "travel-tips": "Travel Tips",
  destinations: "Destinations",
};

interface CategoryBadgeProps {
  category: (typeof VALID_CATEGORIES)[number];
  href?: string;
}

export function CategoryBadge({ category, href }: CategoryBadgeProps) {
  const badge = (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${categoryStyles[category]}`}
    >
      {categoryLabels[category]}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {badge}
      </Link>
    );
  }

  return badge;
}
