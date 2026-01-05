import type { Metadata } from 'next';
import { TravelEssentialsWidget } from '../components/TravelEssentialsWidget';
import travelEssentialsData from '@/data/travel-essentials.json';
import type { CountryEssentials } from '@/lib/travel-essentials';

const siteUrl = 'https://www.milesgoround.com';

export const metadata: Metadata = {
  title: 'Travel Essentials: Plug, Sip & Tip Guide',
  description: 'Instant travel essentials for 50+ countries. Check power plug types, tap water safety, and tipping customs in seconds. Essential info for every traveler.',
  keywords: [
    'travel essentials',
    'power plug types',
    'electrical outlets by country',
    'tap water safety',
    'tipping guide',
    'tipping customs by country',
    'travel adapter guide',
    'voltage by country',
    'safe drinking water',
    'international travel tips',
    'country travel information',
    'travel preparation',
    'plug types worldwide',
    'travel checklist',
  ],
  openGraph: {
    title: 'Travel Essentials: Plug, Sip & Tip Guide | Miles Go Round',
    description: 'Instant travel essentials for 50+ countries. Check power plug types, tap water safety, and tipping customs in seconds.',
    url: `${siteUrl}/travel-essentials/`,
    type: 'website',
    images: [
      {
        url: '/images/content/cover_1.jpg',
        width: 1200,
        height: 630,
        alt: 'Travel Essentials Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Essentials: Plug, Sip & Tip Guide',
    description: 'Instant travel essentials for 50+ countries. Check power plug types, tap water safety, and tipping customs.',
    images: ['/images/content/cover_1.jpg'],
  },
  alternates: {
    canonical: `${siteUrl}/travel-essentials/`,
  },
};

export default function TravelEssentialsPage() {
  const data = travelEssentialsData as CountryEssentials[];

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Travel Essentials: Plug, Sip & Tip Guide',
            description: 'Instant travel essentials checker for power plugs, tap water safety, and tipping customs across 50+ countries',
            url: `${siteUrl}/travel-essentials/`,
            applicationCategory: 'TravelApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'Power plug type information',
              'Voltage and frequency details',
              'Tap water safety information',
              'Tipping customs and etiquette',
              'Coverage for 50+ countries',
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                Plug, Sip & Tip
              </h1>
              <p className="text-base sm:text-lg text-blue-100 leading-relaxed">
                Get instant answers to the three questions every traveler asks: 
                <span className="block mt-2 font-semibold text-white">
                  Can I charge my phone? Can I drink the water? Do I tip?
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Widget Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <TravelEssentialsWidget data={data} />
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-5">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4 sm:space-y-5">
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  Do I need a voltage converter or just an adapter?
                </h3>
                <p className="text-slate-700 text-sm sm:text-base">
                  Most modern electronics (phones, laptops, cameras) work with 100-240V and only need a plug adapter. 
                  Check your device's power brick - if it says "100-240V", you only need an adapter. Hair dryers and 
                  other heating devices often need a voltage converter.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  What if tap water is marked as "not safe"?
                </h3>
                <p className="text-slate-700 text-sm sm:text-base">
                  Stick to bottled water for drinking and brushing teeth. Avoid ice in drinks unless you're at an 
                  upscale hotel or restaurant. Be cautious with raw fruits and vegetables that may have been washed 
                  in tap water.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  How much should I tip in countries where it's expected?
                </h3>
                <p className="text-slate-700 text-sm sm:text-base">
                  The specific percentages and amounts are listed for each country in the tool above. When in doubt, 
                  ask locals or your hotel concierge for guidance. It's better to tip slightly less than to not tip 
                  at all in countries where it's expected.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  Is this information regularly updated?
                </h3>
                <p className="text-slate-700 text-sm sm:text-base">
                  Yes! We review and update country information regularly. However, local customs can vary by region 
                  within a country, so use this as a general guide and observe local practices when you arrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
