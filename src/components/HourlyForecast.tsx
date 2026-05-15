import { useTranslation } from 'react-i18next';
import { getWeatherIconUrl } from '../services/weatherApi';
import type { HourlyWeather } from '../types/weather';
import { formatTime } from '../utils/formatters';

interface HourlyForecastProps {
  hourly: HourlyWeather[];
  isCelsius: boolean;
}

export function HourlyForecast({ hourly, isCelsius }: HourlyForecastProps) {
  const { i18n } = useTranslation();
  const isAmharic = i18n.language === 'am';
  const unit = isCelsius ? '°C' : '°F';

  const next24Hours = hourly.slice(0, 12);

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">
        {isAmharic ? 'ሰአታት' : 'Hourly Forecast'}
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {next24Hours.map((hour, index) => {
          const pop = Math.round((hour.pop ?? 0) * 100);
          return (
            <div
              key={index}
              className="flex-shrink-0 bg-white/80 backdrop-blur rounded-xl p-3 text-center min-w-[75px]"
            >
              <p className="text-xs font-medium text-gray-600 mb-1">
                {index === 0 ? (isAmharic ? 'አሁን' : 'Now') : formatTime(hour.dt)}
              </p>
              <img
                src={getWeatherIconUrl(hour.weather[0]?.icon || '01d')}
                alt={hour.weather[0]?.description}
                className="w-12 h-12 mx-auto"
              />
              <p className="font-bold text-lg mt-1">
                {isCelsius ? Math.round(hour.temp) : Math.round(hour.temp * 9/5 + 32)}{unit}
              </p>
              <p className="text-xs text-gray-500">
                {isAmharic ? 'ይሰማል' : 'Feels'} {isCelsius ? Math.round(hour.feels_like ?? hour.temp) : Math.round((hour.feels_like ?? hour.temp) * 9/5 + 32)}{unit}
              </p>
              {pop > 0 && (
                <div className="mt-1 flex items-center justify-center gap-1">
                  <span className="text-xs text-sky-600 font-medium">{pop}%</span>
                  {pop > 30 && (
                    <span className="text-xs text-sky-500">💧</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}