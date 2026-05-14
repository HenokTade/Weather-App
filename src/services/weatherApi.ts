import type { WeatherData, GeocodingResult } from '../types/weather';
import { API_CONFIG } from '../types/constants';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '';

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const url = `${API_CONFIG.ONE_CALL_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  return response.json();
}

export async function fetchWeatherByCity(cityName: string): Promise<WeatherData> {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)},ET&limit=5&appid=${API_KEY}`;
  
  const geoResponse = await fetch(geoUrl);
  if (!geoResponse.ok) {
    throw new Error('Failed to find city');
  }
  
  const geoData: GeocodingResult[] = await geoResponse.json();
  if (geoData.length === 0) {
    throw new Error('City not found');
  }
  
  return fetchWeatherByCoords(geoData[0].lat, geoData[0].lon);
}

export async function searchCities(query: string): Promise<GeocodingResult[]> {
  if (!API_KEY) {
    return [];
  }
  
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=10&appid=${API_KEY}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    return [];
  }
  
  return response.json();
}

export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}