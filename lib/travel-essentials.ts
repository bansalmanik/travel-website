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
