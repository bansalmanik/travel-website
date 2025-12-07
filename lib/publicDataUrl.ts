const preferredBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.CF_PAGES_URL ??
    process.env.VERCEL_URL ??
    "http://localhost:3000";

function normalizeBaseUrl(baseUrl: string) {
    return baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;
}

export function buildPublicDataUrl(pathname: string) {
    const baseUrl = normalizeBaseUrl(preferredBaseUrl);
    return new URL(pathname, baseUrl).toString();
}

export async function fetchPublicJson<T>(pathname: string, init?: RequestInit): Promise<T> {
    const dataUrl = buildPublicDataUrl(pathname);

    const response = await fetch(dataUrl, init);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${pathname}: ${response.status}`);
    }

    return (await response.json()) as T;
}
