import type { FC } from "react";

type JsonLdProps = {
  data?: unknown;
};

const JsonLd: FC<JsonLdProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const json = typeof data === "string" ? data : JSON.stringify(data);

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
};

export { JsonLd };
