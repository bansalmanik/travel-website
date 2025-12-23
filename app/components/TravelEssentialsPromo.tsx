import Link from 'next/link';

export function TravelEssentialsPromo() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 lg:p-10 text-white shadow-xl">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-2">
            <span className="text-3xl" role="img" aria-label="plug">🔌</span>
            <span className="text-3xl" role="img" aria-label="water">💧</span>
            <span className="text-3xl" role="img" aria-label="money">💰</span>
          </div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Plug, Sip & Tip
        </h2>
        
        <p className="text-blue-100 text-base sm:text-lg mb-6 leading-relaxed">
          Get instant answers to the three questions every traveler asks: 
          Can I charge my phone? Can I drink the water? Do I tip?
        </p>
        
        
        <Link
          href="/travel-essentials"
          className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
        >
          <span>Try It Now</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
