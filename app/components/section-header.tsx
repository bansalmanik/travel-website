import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
};

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  className,
}: SectionHeaderProps) {
  const baseAlignment = align === "center" ? "mx-auto text-center" : undefined;
  const descriptionAlignment = align === "center" ? "mx-auto" : undefined;

  return (
    <header className={classNames("space-y-4", baseAlignment, className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600 sm:text-sm sm:tracking-[0.32em]">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="text-2xl font-semibold text-slate-900 sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className={classNames("text-sm leading-6 text-slate-600 sm:text-base", descriptionAlignment)}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
