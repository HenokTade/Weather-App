export function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDay(timestamp: number, lang: string = 'en'): string {
  const date = new Date(timestamp * 1000);
  const days = lang === 'am' 
    ? ['እሑድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'ዐርብ', 'ቅዳሜ']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function getWindDirection(deg: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

export function getWeatherGradient(icon: string, isNight: boolean = false): string {
  if (isNight) return 'weather-gradient-night';
  
  if (icon.includes('n')) return 'weather-gradient-night';
  if (icon.includes('01')) return 'weather-gradient-sunny';
  if (icon.includes('02') || icon.includes('03')) return 'weather-gradient-cloudy';
  if (icon.includes('09') || icon.includes('10')) return 'weather-gradient-rainy';
  
  return 'weather-gradient-sunny';
}

export function celsiusToFahrenheit(c: number): number {
  return Math.round((c * 9/5) + 32);
}

export function mpsToMph(mps: number): number {
  return Math.round(mps * 2.237);
}

export function kmToMi(km: number): number {
  return Math.round(km * 0.621);
}