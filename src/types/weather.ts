export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  timezone: string;
}

export interface CurrentWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  wind_deg: number;
  clouds: number;
  visibility: number;
  uvi: number;
  weather: WeatherCondition[];
  sunrise: number;
  sunset: number;
  dt: number;
}

export interface HourlyWeather {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  weather: WeatherCondition[];
  pop: number;
}

export interface DailyWeather {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
  };
  humidity: number;
  wind_speed: number;
  weather: WeatherCondition[];
  pop: number;
  sunrise: number;
  sunset: number;
  summary?: string;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface City {
  name: string;
  nameAm: string;
  lat: number;
  lon: number;
  country: string;
}

export interface GeocodingResult {
  name: string;
  local_names?: { am?: string };
  lat: number;
  lon: number;
  country: string;
}