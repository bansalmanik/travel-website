import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TravelEssentialsWidget } from '../../components/TravelEssentialsWidget';
import travelEssentialsData from '@/data/travel-essentials.json';
import type { CountryEssentials } from '@/lib/travel-essentials';
import { getCountryBySlug, getCountrySlug } from '@/lib/travel-essentials';

const siteUrl = 'https://www.milesgoround.com';

interface PageProps {
    params: Promise<{ country: string }>;
}

// Generate static params for all countries
export async function generateStaticParams() {
    const data = travelEssentialsData as CountryEssentials[];
    return data.map((country) => ({
        country: getCountrySlug(country),
    }));
}

// Generate metadata for each country page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { country: countrySlug } = await params;
    const data = travelEssentialsData as CountryEssentials[];
    const country = getCountryBySlug(countrySlug, data);

    if (!country) {
        return {
            title: 'Country Not Found | Travel Essentials',
        };
    }

    const title = `${country.country} Travel Essentials | Plug, Water & Tipping Guide`;
    const description = `Essential travel info for ${country.country}: ${country.plug.type} power plugs (${country.plug.voltage}), tap water is ${country.water.safe ? 'safe' : 'not safe'} to drink, and tipping is ${country.tipping.expected ? 'expected' : 'optional'}.`;

    return {
        title,
        description,
        keywords: [
            `${country.country} travel`,
            `${country.country} power plug`,
            `${country.country} voltage`,
            `${country.country} tap water`,
            `${country.country} tipping`,
            `travel to ${country.country}`,
            `${country.country} travel guide`,
            'travel essentials',
        ],
        openGraph: {
            title,
            description,
            url: `${siteUrl}/travel-essentials/${countrySlug}/`,
            type: 'article',
            images: [
                {
                    url: '/images/content/cover_1.jpg',
                    width: 1200,
                    height: 630,
                    alt: `${country.country} Travel Essentials`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/images/content/cover_1.jpg'],
        },
        alternates: {
            canonical: `${siteUrl}/travel-essentials/${countrySlug}/`,
        },
    };
}

export default async function CountryTravelEssentialsPage({ params }: PageProps) {
    const { country: countrySlug } = await params;
    const data = travelEssentialsData as CountryEssentials[];
    const country = getCountryBySlug(countrySlug, data);

    if (!country) {
        notFound();
    }

    // Structured data for this specific country
    const countryStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${country.country} Travel Essentials Guide`,
        description: `Essential travel information for ${country.country} including power plug types, tap water safety, and tipping customs.`,
        url: `${siteUrl}/travel-essentials/${countrySlug}/`,
        author: {
            '@type': 'Organization',
            name: 'Miles Go Round',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Miles Go Round',
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteUrl}/travel-essentials/${countrySlug}/`,
        },
    };

    return (
        <>
            {/* Country-specific structured data */}
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: JSON.stringify(countryStructuredData) }}
            />

            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                                {country.country} Travel Essentials
                            </h1>
                            <p className="text-base sm:text-lg text-blue-100 leading-relaxed">
                                Everything you need to know about power plugs, tap water, and tipping in {country.country}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Widget Section - Pre-populated with this country */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
                    <TravelEssentialsWidget data={data} initialCountry={country} />
                </div>

                {/* Country-Specific FAQ Section */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
                    <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 lg:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-5">
                            {country.country} Travel Tips
                        </h2>

                        <div className="space-y-4 sm:space-y-5">
                            <div>
                                <h3 className="font-bold text-slate-900 mb-2">
                                    What power adapter do I need for {country.country}?
                                </h3>
                                <p className="text-slate-700 text-sm sm:text-base">
                                    {country.country} uses {country.plug.type} plugs with {country.plug.voltage} at {country.plug.frequency}.
                                    {country.plug.description}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900 mb-2">
                                    Can I drink the tap water in {country.country}?
                                </h3>
                                <p className="text-slate-700 text-sm sm:text-base">
                                    {country.water.safe
                                        ? `Yes, tap water is safe to drink in ${country.country}. ${country.water.note}`
                                        : `No, tap water is not recommended for drinking in ${country.country}. ${country.water.note}`
                                    }
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900 mb-2">
                                    Do I need to tip in {country.country}?
                                </h3>
                                <p className="text-slate-700 text-sm sm:text-base">
                                    {country.tipping.expected
                                        ? `Yes, tipping is expected in ${country.country}. ${country.tipping.note}`
                                        : `Tipping is optional in ${country.country}. ${country.tipping.note}`
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
