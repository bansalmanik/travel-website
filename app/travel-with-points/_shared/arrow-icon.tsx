import type { FC } from "react";

type ArrowIconProps = {
  direction: "left" | "right";
  className?: string;
};

export const ArrowIcon: FC<ArrowIconProps> = ({ direction, className }) => {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {direction === "left" ? (
        <>
          <path d="M19 12H5" />
          <path d="m12 5-7 7 7 7" />
        </>
      ) : (
        <>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </>
      )}
    </svg>
  );
};
