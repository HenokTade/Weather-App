import type { WeatherData, GeocodingResult } from '../types/weather';
import { API_CONFIG } from '../types/constants';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '';

interface OpenWeatherCurrentResponse {
  main: { temp: number; humidity: number; pressure: number; feels_like: number; temp_min: number; temp_max: number };
  weather: Array<{ id: number; main: string; description: string; icon: string }>;
  wind: { speed: number };
  dt: number;
  name: string;
}

interface OpenWeatherForecastResponse {
  list: Array<{
    dt: number;
    main: { temp: number; humidity: number };
    weather: Array<{ id: number; main: string; description: string; icon: string }>;
    wind: { speed: number };
  }>;
}

function transformToWeatherData(current: OpenWeatherCurrentResponse, forecast: OpenWeatherForecastResponse): WeatherData {
  const currentData = {
    dt: current.dt,
    temp: current.main.temp,
    feels_like: current.main.feels_like,
    humidity: current.main.humidity,
    pressure: current.main.pressure,
    temp_min: current.main.temp_min,
    temp_max: current.main.temp_max,
    wind_speed: current.wind.speed,
    weather: current.weather.map(w => ({
      id: w.id,
      main: w.main,
      description: w.description,
      icon: w.icon,
    })),
  };

  const hourly = forecast.list.slice(0, 8).map(item => ({
    dt: item.dt,
    temp: item.main.temp,
    humidity: item.main.humidity,
    wind_speed: item.wind.speed,
    weather: item.weather.map(w => ({
      id: w.id,
      main: w.main,
      description: w.description,
      icon: w.icon,
    })),
  }));

  const dailyMap = new Map<string, typeof hourly[0]>();
  forecast.list.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        dt: item.dt,
        temp: item.main.temp,
        humidity: item.main.humidity,
        wind_speed: item.wind.speed,
        weather: item.weather.map(w => ({
          id: w.id,
          main: w.main,
          description: w.description,
          icon: w.icon,
        })),
      });
    }
  });
  
  const dailyEntries = Array.from(dailyMap.entries()).slice(0, 7);
  const daily = dailyEntries.map(([date, data]) => {
    const dayItems = forecast.list.filter(item => new Date(item.dt * 1000).toDateString() === date);
    const temps = dayItems.map(i => i.main.temp);
    return {
      ...data,
      temp: {
        day: data.temp,
        min: Math.min(...temps),
        max: Math.max(...temps),
      },
    };
  });

  return {
    timezone: '',
    current: currentData,
    hourly,
    daily,
  };
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const currentUrl = `${API_CONFIG.BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const forecastUrl = `${API_CONFIG.BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  const [currentResponse, forecastResponse] = await Promise.all([
    fetch(currentUrl),
    fetch(forecastUrl),
  ]);

  if (!currentResponse.ok) {
    throw new Error('Failed to fetch weather data');
  }

  if (!forecastResponse.ok) {
    throw new Error('Failed to fetch forecast data');
  }

  const currentData: OpenWeatherCurrentResponse = await currentResponse.json();
  const forecastData: OpenWeatherForecastResponse = await forecastResponse.json();

  return transformToWeatherData(currentData, forecastData);
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