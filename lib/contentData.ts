import { cache } from "react";
import { headers } from "next/headers";

import type {
    AwardPlaybookItem,
    FavoriteRoute,
    FlightProgram,
} from "@/app/travel-with-points/flight-programs/types";
import type {
    Card,
    CardStrategy,
    CreditCardDataset,
    FavoriteCombo,
} from "@/app/travel-with-points/credit-cards/types";
import type {
    ElitePath,
    HotelDataset,
    HotelProgram,
    ListSection,
} from "@/app/travel-with-points/hotel-programs/types";
import type { BankProgram } from "@/app/travel-with-points/bank-programs/types";
import type { JournalDataset, JournalEntry } from "@/app/journals/types";
import type { Conversion } from "@/app/pointsconversion/types";
import { filterEnabled, filterEnabledDeep } from "./filterEnabled";

function getNormalizedFallbackBaseUrl(): string | undefined {
    const fallbackBaseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!fallbackBaseUrl) {
        return undefined;
    }

    return fallbackBaseUrl.startsWith("http")
        ? fallbackBaseUrl
        : `https://${fallbackBaseUrl}`;
}

async function resolveBaseUrl(): Promise<string | undefined> {
    const headerList = await headers();
    const protocol = headerList.get("x-forwarded-proto") ?? "https";
    const host =
        headerList.get("x-forwarded-host") ?? headerList.get("host");

    if (host) {
        return `${protocol}://${host}`;
    }

    return getNormalizedFallbackBaseUrl();
}

async function getBaseUrlOrThrow(context: string): Promise<string> {
    const baseUrl = await resolveBaseUrl();

    if (!baseUrl) {
        throw new Error(
            `Unable to determine base URL for ${context}. ` +
                "Set NEXT_PUBLIC_SITE_URL to the deployed domain."
        );
    }

    return baseUrl;
}

async function fetchJsonData<T>(fileName: string): Promise<T> {
    const baseUrl = await getBaseUrlOrThrow("static data request");
    const response = await fetch(new URL(`/data/${fileName}`, baseUrl), {
        cache: "force-cache",
        next: { revalidate: 60 * 60 },
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch ${fileName} (${response.status}).`
        );
    }

    return (await response.json()) as T;
}

const fetchBankPrograms = cache(async () => {
    const baseUrl = await getBaseUrlOrThrow("bank program API route");
    const response = await fetch(new URL("/api/bank-programs", baseUrl), {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch bank programs (${response.status}).`
        );
    }

    return (await response.json()) as { programs?: BankProgram[] };
});

type ImageLike = { src: string };

async function resolveImage<T extends ImageLike>(image: T): Promise<T> {
    return { ...image };
}

async function resolveOptionalImage<T extends ImageLike>(
    image: T | undefined | null
): Promise<T | undefined> {
    if (!image) return undefined;
    return resolveImage(image);
}

async function resolveImages<T extends ImageLike>(
    images: T[] | undefined | null
): Promise<T[] | undefined> {
    if (!images?.length) return images ?? undefined;
    return Promise.all(images.map((image) => resolveImage(image)));
}

async function resolveListSection(
    section: ListSection | undefined
): Promise<ListSection | undefined> {
    if (!section) return undefined;
    if (!section.image) return section;

    const image = await resolveOptionalImage(section.image);
    return { ...section, image };
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
    const data = await fetchJsonData<JournalDataset>("journals.json");
    const journals = filterEnabled(data.journals).map((entry) =>
        filterEnabledDeep(entry)
    );

    return Promise.all(
        journals.map(async (entry) => ({
            ...entry,
            heroImage: await resolveImage(entry.heroImage),
            sections: await Promise.all(
                entry.sections.map(async (section) => ({
                    ...section,
                    image: await resolveOptionalImage(section.image),
                }))
            ),
        }))
    );
}

export async function getCreditCardContent(): Promise<{
    cards: Card[];
    cardStrategies: CardStrategy[];
    favoriteCombos: FavoriteCombo[];
}> {
    const data = await fetchJsonData<CreditCardDataset>(
        "credit-cards.json"
    );

    const cards = filterEnabled(data.cards).map((card) => filterEnabledDeep(card));

    const cardsWithImages = await Promise.all(
        cards.map(async (card) => {
            const cardImage = await resolveOptionalImage(card.media?.cardImage);

            return {
                ...card,
                media: card.media
                    ? { ...card.media, cardImage }
                    : cardImage
                        ? { cardImage }
                        : undefined,
            };
        })
    );

    return {
        cards: cardsWithImages,
        cardStrategies: filterEnabled(data.cardStrategies),
        favoriteCombos: filterEnabled(data.favoriteCombos),
    };
}

export async function getFlightProgramContent(): Promise<{
    programs: FlightProgram[];
    awardPlaybook: AwardPlaybookItem[];
    favoriteRoutes: FavoriteRoute[];
}> {
    const data = await fetchJsonData<{
        programs: FlightProgram[];
        awardPlaybook: AwardPlaybookItem[];
        favoriteRoutes: FavoriteRoute[];
    }>("flight-programs.json");

    const programs = filterEnabled(data.programs).map((program) =>
        filterEnabledDeep(program)
    );

    const programsWithImages = await Promise.all(
        programs.map(async (program) => ({
            ...program,
            sections: await Promise.all(
                program.sections.map(async (section) => ({
                    ...section,
                    images: await resolveImages(section.images),
                }))
            ),
        }))
    );

    return {
        programs: programsWithImages,
        awardPlaybook: filterEnabled(data.awardPlaybook),
        favoriteRoutes: filterEnabled(data.favoriteRoutes),
    };
}

export async function getHotelProgramContent(): Promise<{
    programs: HotelProgram[];
    elitePaths: ElitePath[];
    bookingTips: string[];
}> {
    const data = await fetchJsonData<HotelDataset>("hotel-programs.json");

    const programs = filterEnabled(data.programs ?? []).map((program) =>
        filterEnabledDeep(program)
    );

    const programsWithImages = await Promise.all(
        programs.map(async (program) => ({
            ...program,
            overview: await resolveListSection(program.overview),
            enrollment: await resolveListSection(program.enrollment),
            coBrandedCards: await resolveListSection(program.coBrandedCards),
            pointsEarn: await resolveListSection(program.pointsEarn),
            pointsBurn: await resolveListSection(program.pointsBurn),
            eliteBenefitDetails: await resolveListSection(program.eliteBenefitDetails),
            partnerships: await resolveListSection(program.partnerships),
            specialPerks: await resolveListSection(program.specialPerks),
            lifetimeStatus: await resolveListSection(program.lifetimeStatus),
            paidMemberships: await resolveListSection(program.paidMemberships),
            otherBenefits: await resolveListSection(program.otherBenefits),
            notesSection: await resolveListSection(program.notesSection),
            statusLevels: program.statusLevels
                ? {
                    ...program.statusLevels,
                    image: await resolveOptionalImage(program.statusLevels.image),
                }
                : undefined,
        }))
    );

    return {
        programs: programsWithImages,
        elitePaths: filterEnabled(data.elitePaths ?? []),
        bookingTips: data.bookingTips ?? [],
    };
}

export async function getBankProgramContent(): Promise<{
    programs: BankProgram[];
}> {
    const data = await fetchBankPrograms();

    const programs = filterEnabled(data.programs ?? []).map((program) =>
        filterEnabledDeep(program)
    ) as BankProgram[];

    return { programs };
}

export async function getPointsConversions(): Promise<Conversion[]> {
    const data = await fetchJsonData<Conversion[]>("points-conversion.json");
    return filterEnabled(data).map((conversion) =>
        filterEnabledDeep(conversion)
    ) as Conversion[];
}
