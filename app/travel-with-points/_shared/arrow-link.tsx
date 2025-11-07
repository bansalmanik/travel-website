import Link from "next/link";
import type { ReactNode } from "react";

import { cx } from "./styles";
import { ArrowIcon } from "./arrow-icon";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  direction?: "left" | "right";
  accentClass: string;
  className?: string;
};

export function ArrowLink({
  href,
  children,
  direction = "right",
  accentClass,
  className,
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex items-center text-sm font-semibold",
        accentClass,
        className
      )}
    >
      {direction === "left" ? (
        <ArrowIcon direction="left" className="mr-2 h-4 w-4" />
      ) : null}
      {children}
      {direction === "right" ? (
        <ArrowIcon direction="right" className="ml-2 h-4 w-4" />
      ) : null}
    </Link>
  );
}
