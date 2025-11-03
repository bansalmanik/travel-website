import { cache } from "react";

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
import type { JournalDataset, JournalEntry } from "@/app/journals/types";
import type { Conversion } from "@/app/pointsconversion/types";
import { filterEnabled, filterEnabledDeep } from "./filterEnabled";


async function loadJsonData<T>(fileName: string): Promise<T> {
    const data = await import(`@/data/${fileName}`);
    return data.default as T;
}

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
    const data = await loadJsonData<JournalDataset>("journals.json");
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
    const data = await loadJsonData<CreditCardDataset>("credit-cards.json");

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
    const data = await loadJsonData<{
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
    const data = await loadJsonData<HotelDataset>("hotel-programs.json");

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

export async function getPointsConversions(): Promise<Conversion[]> {
    const data = await loadJsonData<Conversion[]>("points-conversion.json");
    return filterEnabled(data).map((conversion) =>
        filterEnabledDeep(conversion)
    ) as Conversion[];
}
