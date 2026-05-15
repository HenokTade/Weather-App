import { useTranslation } from 'react-i18next';
import { getWeatherIconUrl } from '../services/weatherApi';
import type { CurrentWeather } from '../types/weather';
import { formatTime } from '../utils/formatters';

interface CurrentWeatherProps {
  weather: CurrentWeather;
  cityName: string;
  isCelsius: boolean;
  lastUpdated?: number;
}

export function CurrentWeatherDisplay({ weather, cityName, isCelsius, lastUpdated }: CurrentWeatherProps) {
  const { i18n } = useTranslation();
  const isAmharic = i18n.language === 'am';
  const temp = isCelsius ? Math.round(weather.temp) : Math.round(weather.temp * 9/5 + 32);
  const unit = isCelsius ? '°C' : '°F';
  const isNight = weather.weather[0]?.icon.includes('n');

  const getLastUpdatedText = () => {
    if (!lastUpdated) return '';
    const seconds = Math.floor((Date.now() - lastUpdated) / 1000);
    if (seconds < 60) return isAmharic ? 'ከጥቂት ጊዜ በፊት' : 'Updated a few seconds ago';
    if (seconds < 3600) return isAmharic ? `ከ${Math.floor(seconds / 60)} ደቂቃ በፊት` : `Updated ${Math.floor(seconds / 60)} min ago`;
    return isAmharic ? `ከ${Math.floor(seconds / 3600)} ሰዓት በፊት` : `Updated ${Math.floor(seconds / 3600)} hr ago`;
  };

  return (
    <div className={`text-center px-4 py-8 ${isNight ? 'text-white' : 'text-gray-800'}`}>
      <h1 className="text-2xl font-bold mb-1">{cityName}</h1>
      <p className="text-sm opacity-80 mb-1">
        {new Date().toLocaleDateString(isAmharic ? 'am-ET' : 'en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      {lastUpdated && (
        <p className="text-xs opacity-60 mb-3">{getLastUpdatedText()}</p>
      )}
      
      <div className="flex items-center justify-center mb-4 animate-bounce-slow">
        <img
          src={getWeatherIconUrl(weather.weather[0]?.icon || '01d')}
          alt={weather.weather[0]?.description}
          className="w-32 h-32 drop-shadow-lg"
        />
      </div>
      
      <div className="text-7xl font-bold mb-2">{temp}{unit}</div>
      <p className="text-xl capitalize mb-2">{weather.weather[0]?.description}</p>
      <p className="opacity-70">
        {isAmharic ? 'ይሰማል' : 'Feels like'} {isCelsius ? Math.round(weather.feels_like) : Math.round(weather.feels_like * 9/5 + 32)}{unit}
      </p>

      <div className="flex justify-center gap-8 mt-8 text-sm">
        <div className="flex flex-col items-center">
          <span className="opacity-70">{isAmharic ? 'ጸባሪት' : 'Sunrise'}</span>
          <span className="font-semibold">{weather.sunrise ? formatTime(weather.sunrise) : '--:--'}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="opacity-70">{isAmharic ? 'ምሽት' : 'Sunset'}</span>
          <span className="font-semibold">{weather.sunset ? formatTime(weather.sunset) : '--:--'}</span>
        </div>
      </div>
    </div>
  );
}