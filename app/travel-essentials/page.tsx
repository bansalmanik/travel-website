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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Plug, Sip & Tip
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed">
                Get instant answers to the three questions every traveler asks: 
                <span className="block mt-2 font-semibold text-white">
                  Can I charge my phone? Can I drink the water? Do I tip?
                </span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
                <div className="flex items-center gap-2 bg-blue-500/30 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>50+ Countries</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-500/30 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-500/30 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>Mobile Friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Widget Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <TravelEssentialsWidget data={data} />
        </div>

        {/* Info Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
              Why You Need This Tool
            </h2>
            
            <div className="space-y-6 text-slate-700 leading-relaxed">
              <p>
                Landing in a new country shouldn't start with panic. Whether you're a seasoned traveler or taking your first international trip, 
                these three essentials can make or break your first day abroad.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 my-8">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Power Plugs</h3>
                  <p className="text-sm text-slate-600">
                    Know exactly which adapter you need before you travel
                  </p>
                </div>

                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Tap Water</h3>
                  <p className="text-sm text-slate-600">
                    Stay healthy by knowing if the water is safe to drink
                  </p>
                </div>

                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Tipping</h3>
                  <p className="text-sm text-slate-600">
                    Avoid awkward moments with local tipping customs
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
                How to Use This Tool
              </h3>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Type your destination country in the search bar</li>
                <li>Get instant results for plugs, water safety, and tipping</li>
                <li>Bookmark this page for quick reference while traveling</li>
                <li>Share with fellow travelers to help them prepare</li>
              </ol>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-6 mt-8 rounded-r-lg">
                <h3 className="font-bold text-blue-900 mb-2">Pro Tip</h3>
                <p className="text-blue-800 text-sm sm:text-base">
                  Save this page to your phone's home screen for offline access. Take a screenshot of your destination's 
                  info before you fly, so you have it handy even without internet connection.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
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
