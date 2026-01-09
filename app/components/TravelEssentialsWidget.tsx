'use client';

import { useState, useEffect, useMemo } from 'react';
import type { CountryEssentials } from '@/lib/travel-essentials';

interface TravelEssentialsWidgetProps {
  data: CountryEssentials[];
}

export function TravelEssentialsWidget({ data }: TravelEssentialsWidgetProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryEssentials | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isWeatherExpanded, setIsWeatherExpanded] = useState(false);

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    return data
      .filter(country =>
        country.country.toLowerCase().includes(query) ||
        country.code.toLowerCase() === query
      )
      .slice(0, 5);
  }, [searchQuery, data]);

  useEffect(() => {
    if (filteredCountries.length === 1 &&
      filteredCountries[0].country.toLowerCase() === searchQuery.toLowerCase()) {
      setSelectedCountry(filteredCountries[0]);
      setShowSuggestions(false);
    }
  }, [filteredCountries, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredCountries.length > 0) {
      setSelectedCountry(filteredCountries[0]);
      setShowSuggestions(false);
    }
  };

  const handleCountrySelect = (country: CountryEssentials) => {
    setSelectedCountry(country);
    setSearchQuery(country.country);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
    if (!e.target.value.trim()) {
      setSelectedCountry(null);
      setIsWeatherExpanded(false);
    }
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getConditionColor = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes('ideal') || lower.includes('pleasant') || lower.includes('perfect')) return 'text-green-600';
    if (lower.includes('hot') || lower.includes('cold') || lower.includes('extreme')) return 'text-orange-600';
    if (lower.includes('rainy') || lower.includes('monsoon')) return 'text-blue-600';
    return 'text-slate-600';
  };

  const getRainfallIcon = (rainfall: string) => {
    const lower = rainfall.toLowerCase();
    if (lower.includes('very high')) return '🌧️🌧️🌧️';
    if (lower.includes('high')) return '🌧️🌧️';
    if (lower.includes('moderate')) return '🌧️';
    return '☀️';
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative mb-5 sm:mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search for a country..."
            className="w-full px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all shadow-sm pr-24 sm:pr-28"
            aria-label="Search for country travel essentials"
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 sm:px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
            aria-label="Search"
          >
            Search
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredCountries.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-lg overflow-hidden">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleCountrySelect(country)}
                className="w-full px-4 py-2.5 sm:px-6 sm:py-3 text-left hover:bg-blue-50 transition-colors border-b border-slate-100 last:border-b-0"
              >
                <span className="font-medium text-slate-900 text-sm sm:text-base">{country.country}</span>
                <span className="ml-2 text-xs sm:text-sm text-slate-500">({country.code})</span>
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Results Dashboard */}
      {selectedCountry && (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          {/* Header - Sticky on mobile */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 sm:px-6 sm:py-5 sticky top-0 z-20 shadow-md sm:relative sm:shadow-none">
            <h2 className="text-lg sm:text-2xl font-bold text-white">
              {selectedCountry.country}
            </h2>
            <p className="text-blue-100 mt-0.5 text-xs sm:text-base opacity-90">Essential travel information</p>
          </div>

          {/* Three-Column Grid - Stacked on mobile, 3-col on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 md:divide-slate-200">
            {/* Plug Section */}
            <div className="p-4 sm:p-5 md:p-6 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 bg-amber-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-lg font-bold text-slate-500 uppercase tracking-wider mb-1 sm:mb-2 sm:text-slate-900 sm:normal-case">Power Plug</h3>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-lg sm:text-2xl font-bold text-amber-600 leading-none">{selectedCountry.plug.type}</p>
                    <p className="text-[10px] sm:text-sm text-slate-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                      {selectedCountry.plug.voltage} • {selectedCountry.plug.frequency}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {selectedCountry.plug.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Water Section */}
            <div className="p-4 sm:p-5 md:p-6 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${selectedCountry.water.safe ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                  {selectedCountry.water.safe ? (
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-lg font-bold text-slate-500 uppercase tracking-wider mb-1 sm:mb-2 sm:text-slate-900 sm:normal-case">Tap Water</h3>
                  <div className="space-y-1 sm:space-y-2">
                    <p className={`text-lg sm:text-2xl font-bold leading-none ${selectedCountry.water.safe ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {selectedCountry.water.safe ? 'Safe' : 'Not Safe'}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {selectedCountry.water.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tipping Section */}
            <div className="p-4 sm:p-5 md:p-6 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${selectedCountry.tipping.expected ? 'bg-purple-100' : 'bg-slate-100'
                  }`}>
                  <svg className={`w-4 h-4 sm:w-6 sm:h-6 ${selectedCountry.tipping.expected ? 'text-purple-600' : 'text-slate-600'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-lg font-bold text-slate-500 uppercase tracking-wider mb-1 sm:mb-2 sm:text-slate-900 sm:normal-case">Tipping</h3>
                  <div className="space-y-1 sm:space-y-2">
                    <p className={`text-lg sm:text-2xl font-bold leading-none ${selectedCountry.tipping.expected ? 'text-purple-600' : 'text-slate-600'
                      }`}>
                      {selectedCountry.tipping.expected ? 'Expected' : 'Optional'}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {selectedCountry.tipping.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Section - Collapsible */}
          {selectedCountry.weather && (
            <div className="border-t border-slate-200">
              <button
                onClick={() => setIsWeatherExpanded(!isWeatherExpanded)}
                className="w-full px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                aria-expanded={isWeatherExpanded}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">Month-by-Month Weather</h3>
                    <p className="text-xs sm:text-sm text-slate-600">Plan your visit with climate insights</p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-slate-400 transition-transform ${isWeatherExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isWeatherExpanded && (
                <div className="px-0 sm:px-6 pb-4 sm:pb-6">
                  {/* Weather Grid - Horizontal Scroll on mobile, Grid on md+ */}
                  <div className="flex overflow-x-auto pb-4 gap-3 px-4 sm:px-0 scrollbar-hide snap-x md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:overflow-visible">
                    {months.map((month) => {
                      const weather = selectedCountry.weather?.[month];
                      if (!weather) return null;

                      return (
                        <div
                          key={month}
                          className="flex-shrink-0 w-[160px] sm:w-auto bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200 hover:border-sky-300 hover:shadow-sm transition-all snap-start"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm sm:text-base font-bold text-slate-900">{month}</h4>
                            <span className="text-base sm:text-lg" role="img" aria-label="rainfall indicator">
                              {getRainfallIcon(weather.rainfall)}
                            </span>
                          </div>
                          <div className="space-y-1 sm:space-y-1.5">
                            <p className="text-base sm:text-lg font-bold text-sky-600">
                              {weather.temp}
                            </p>
                            <p className={`text-[10px] sm:text-sm font-semibold uppercase tracking-tight ${getConditionColor(weather.condition)}`}>
                              {weather.condition}
                            </p>
                            <p className="text-[10px] sm:text-xs text-slate-500 font-medium">
                              Rain: {weather.rainfall}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile Scroll Indicator */}
                  <div className="flex items-center justify-center gap-1.5 mt-1 mb-4 md:hidden">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Swipe for more months</p>
                  </div>

                  <div className="mt-5 p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex gap-3">
                      <svg className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-slate-900">Climate Overview</p>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          This is a general climate overview based on historical averages, not a live weather forecast.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!selectedCountry && (
        <div className="text-center py-10 sm:py-12 px-4 sm:px-6">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full mb-4 sm:mb-5">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
            Search for a country to get started
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
            Get instant information about power plugs, tap water safety, and tipping customs for your destination
          </p>
        </div>
      )}
    </div>
  );
}
