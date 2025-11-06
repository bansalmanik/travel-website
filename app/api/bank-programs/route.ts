import type { NextRequest } from "next/server";

export const runtime = "edge";

type BankProgramsKV = {
  get(key: string): Promise<string | null>;
};

type RouteContext = {
  env: {
    BANK_PROGRAMS: BankProgramsKV;
  };
};

export async function GET(_request: NextRequest, { env }: RouteContext) {
  const data = await env.BANK_PROGRAMS.get("bank-programs.json");

  if (!data) {
    return new Response("Bank programs data not found", { status: 404 });
  }

  return new Response(data, {
    headers: { "content-type": "application/json" },
  });
}
