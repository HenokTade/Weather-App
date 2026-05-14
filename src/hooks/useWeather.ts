import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { fetchWeatherByCoords, fetchWeatherByCity } from '../services/weatherApi';
import { ETHIOPIAN_CITIES } from '../types/constants';
import type { WeatherData } from '../types/weather';

export function useWeather(lat?: number, lon?: number, cityName?: string) {
  return useQuery<WeatherData, Error>({
    queryKey: ['weather', lat, lon, cityName],
    queryFn: () => {
      if (lat && lon) {
        return fetchWeatherByCoords(lat, lon);
      }
      if (cityName) {
        return fetchWeatherByCity(cityName);
      }
      return fetchWeatherByCoords(ETHIOPIAN_CITIES[0].lat, ETHIOPIAN_CITIES[0].lon);
    },
    enabled: !!(lat && lon) || !!cityName,
  });
}

export function useGeolocation() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  };

  return { location, error, loading, detectLocation };
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

export function useKiremtSeason() {
  const [isKiremt, setIsKiremt] = useState(false);
  
  useEffect(() => {
    const month = new Date().getMonth() + 1;
    setIsKiremt(month >= 6 && month <= 9);
  }, []);
  
  return isKiremt;
}