export interface PlugInfo {
  type: string;
  voltage: string;
  frequency: string;
  description: string;
}

export interface WaterInfo {
  safe: boolean;
  note: string;
}

export interface TippingInfo {
  expected: boolean;
  note: string;
}

export interface MonthWeather {
  temp: string;
  condition: string;
  rainfall: string;
}

export interface WeatherInfo {
  [month: string]: MonthWeather;
}

export interface CountryEssentials {
  country: string;
  code: string;
  plug: PlugInfo;
  water: WaterInfo;
  tipping: TippingInfo;
  weather?: WeatherInfo;
  weatherRegions?: {
    [regionName: string]: WeatherInfo;
  };
}

let cachedData: CountryEssentials[] | null = null;

export async function getTravelEssentials(): Promise<CountryEssentials[]> {
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch('/data/travel-essentials.json');
    if (!response.ok) {
      throw new Error('Failed to fetch travel essentials data');
    }
    cachedData = await response.json();
    return cachedData as CountryEssentials[];
  } catch (error) {
    console.error('Error loading travel essentials:', error);
    return [];
  }
}

export function searchCountries(query: string, countries: CountryEssentials[]): CountryEssentials[] {
  if (!query.trim()) {
    return countries;
  }

  const searchTerm = query.toLowerCase().trim();
  return countries.filter(country =>
    country.country.toLowerCase().includes(searchTerm) ||
    country.code.toLowerCase() === searchTerm
  );
}

/**
 * Converts a country name to a URL-friendly slug
 * e.g., "United States" -> "united-states"
 */
export function getCountrySlug(country: CountryEssentials): string {
  return country.country
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

/**
 * Finds a country by its URL slug
 */
export function getCountryBySlug(slug: string, countries: CountryEssentials[]): CountryEssentials | null {
  const normalizedSlug = slug.toLowerCase();
  return countries.find(country => getCountrySlug(country) === normalizedSlug) || null;
}

/**
 * Gets all country slugs for static generation
 */
export function getAllCountrySlugs(countries: CountryEssentials[]): string[] {
  return countries.map(country => getCountrySlug(country));
}
