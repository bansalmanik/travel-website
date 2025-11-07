import type { NextRequest } from "next/server";

export const runtime = "edge";

type BankProgramsKV = {
  get(key: string): Promise<string | null>;
};

type RouteEnv = {
  BANK_PROGRAMS: BankProgramsKV;
};

type RouteContext = {
  params: Promise<Record<string, string>>;
  env?: RouteEnv;
};

export async function GET(
  _request: NextRequest,
  context: RouteContext
): Promise<Response> {
  const store = context.env?.BANK_PROGRAMS;

  if (!store) {
    return new Response("Bank programs store is not configured", {
      status: 500
    });
  }

  const data = await store.get("bank-programs.json");

  if (!data) {
    return new Response("Bank programs data not found", { status: 404 });
  }

  return new Response(data, {
    headers: { "content-type": "application/json" },
  });
}
