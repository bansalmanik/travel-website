import type { ReactNode } from "react";

import { cx, travelContentShell, travelGradientBackground } from "./styles";

type WrapperProps = {
  children: ReactNode;
  className?: string;
};

export function TravelGradientPage({ children, className }: WrapperProps) {
  return (
    <main className={cx(travelGradientBackground, className)}>{children}</main>
  );
}

export function TravelStack({ children, className }: WrapperProps) {
  return (
    <div className={cx(travelContentShell, "gap-12", className)}>{children}</div>
  );
}

export function TravelArticle({ children, className }: WrapperProps) {
  return (
    <article className={cx(travelContentShell, "gap-12", className)}>
      {children}
    </article>
  );
}
