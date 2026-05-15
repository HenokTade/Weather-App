export const ETHIOPIAN_CITIES: { name: string; nameAm: string; lat: number; lon: number }[] = [
  { name: 'Addis Ababa', nameAm: 'አዲስ አበባ', lat: 9.0320, lon: 38.7469 },
  { name: 'Dire Dawa', nameAm: 'ድሬዳዋ', lat: 9.5931, lon: 41.8661 },
  { name: 'Mekelle', nameAm: 'መቀሌ', lat: 13.4967, lon: 39.4734 },
  { name: 'Gondar', nameAm: 'ጎንዳር', lat: 12.6031, lon: 37.4518 },
  { name: 'Hawassa', nameAm: 'ሀዋሳ', lat: 7.0339, lon: 38.4742 },
  { name: 'Bahir Dar', nameAm: 'ባሕር ዳር', lat: 11.6000, lon: 37.3914 },
  { name: 'Jimma', nameAm: 'ጅማ', lat: 7.6733, lon: 36.8344 },
  { name: 'Harar', nameAm: 'ሐረር', lat: 9.3117, lon: 42.1186 },
  { name: 'Adama', nameAm: 'አዳማ', lat: 8.5421, lon: 39.2697 },
  { name: 'Hwasa', nameAm: 'ሃዋሳ', lat: 6.9500, lon: 38.4667 },
];

export const KIREMT_MONTHS = [6, 7, 8, 9];
export const KIREMT_LABEL_AM = 'ክረምት';
export const KIREMT_LABEL_EN = 'Kiremt (Rainy Season)';

export const WEATHER_ICONS: Record<string, string> = {
  '01d': 'sun',
  '01n': 'moon',
  '02d': 'cloud-sun',
  '02n': 'cloud-moon',
  '03d': 'cloud',
  '03n': 'cloud',
  '04d': 'clouds',
  '04n': 'clouds',
  '09d': 'rain',
  '09n': 'rain',
  '10d': 'rain-sun',
  '10n': 'rain-moon',
  '11d': 'thunderstorm',
  '11n': 'thunderstorm',
  '13d': 'snow',
  '13n': 'snow',
  '50d': 'mist',
  '50n': 'mist',
};

export const UNITS = {
  TEMP: 'metric',
  SPEED: 'metric',
} as const;

export const API_CONFIG = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  ONE_CALL_URL: 'https://api.openweathermap.org/data/3.0',
};