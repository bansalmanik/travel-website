import Link from "next/link";

import { cx } from "./styles";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  linkHoverClass?: string;
  currentClass?: string;
  className?: string;
};

export function Breadcrumbs({
  items,
  linkHoverClass = "hover:text-amber-300",
  currentClass = "text-amber-200",
  className,
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cx("text-sm text-slate-300", className)}
    >
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className={linkHoverClass}>
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? currentClass : undefined}>{item.label}</span>
              )}
              {!isLast ? <span aria-hidden>/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
