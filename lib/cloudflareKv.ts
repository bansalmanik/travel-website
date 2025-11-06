const KV_NAMESPACE_NAME = "MilesGoRound" as const;

type CloudflareKVNamespace = {
  get: (
    key: string,
    options?: {
      type?: "text" | "json" | "arrayBuffer";
      cacheTtl?: number;
    }
  ) => Promise<unknown>;
};

let cachedNamespace: CloudflareKVNamespace | undefined | null;

function resolveNamespaceFromGlobal(): CloudflareKVNamespace | undefined {
  if (typeof globalThis !== "object" || globalThis === null) {
    return undefined;
  }

  const directBinding = (globalThis as Record<string, unknown>)[
    KV_NAMESPACE_NAME
  ] as CloudflareKVNamespace | undefined;

  if (directBinding) {
    return directBinding;
  }

  const envBinding = (globalThis as { env?: Record<string, unknown> }).env?.[
    KV_NAMESPACE_NAME
  ] as CloudflareKVNamespace | undefined;

  if (envBinding) {
    return envBinding;
  }

  const underscoredEnv = (
    globalThis as { __env__?: Record<string, unknown> }
  ).__env__?.[KV_NAMESPACE_NAME] as CloudflareKVNamespace | undefined;

  return underscoredEnv;
}

function resolveNamespace(): CloudflareKVNamespace | undefined {
  if (cachedNamespace !== undefined) {
    return cachedNamespace ?? undefined;
  }

  const namespace = resolveNamespaceFromGlobal();

  if (namespace) {
    cachedNamespace = namespace;
    return namespace;
  }

  cachedNamespace = null;
  return undefined;
}

export async function readMilesGoRoundKVJson<T>(
  key: string
): Promise<T | undefined> {
  const namespace = resolveNamespace();

  if (!namespace) {
    return undefined;
  }

  const value = await namespace.get(key, { type: "json" });

  if (!value) {
    return undefined;
  }

  return value as T;
}
