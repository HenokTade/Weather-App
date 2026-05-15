import { useTranslation } from 'react-i18next';
import { getWeatherIconUrl } from '../services/weatherApi';
import type { DailyWeather } from '../types/weather';
import { formatDay } from '../utils/formatters';
import { KIREMT_MONTHS } from '../types/constants';

interface DailyForecastProps {
  daily: DailyWeather[];
  isCelsius: boolean;
}

export function DailyForecast({ daily, isCelsius }: DailyForecastProps) {
  const { i18n } = useTranslation();
  const isAmharic = i18n.language === 'am';
  const unit = isCelsius ? '°C' : '°F';
  const isKiremt = KIREMT_MONTHS.includes(new Date().getMonth() + 1);

  const fiveDayForecast = daily.slice(1, 6);

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          {isAmharic ? '5-ቀን ግምት' : '5-Day Forecast'}
        </h2>
        {isKiremt && (
          <span className="px-3 py-1 bg-sky-500 text-white text-xs rounded-full">
            {isAmharic ? 'ኪረምት' : 'Kiremt'}
          </span>
        )}
      </div>
      <div className="space-y-3">
        {fiveDayForecast.map((day, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur rounded-xl p-4 flex items-center gap-4"
          >
            <div className="w-16 text-center">
              <p className="font-semibold">{formatDay(day.dt, isAmharic ? 'am' : 'en')}</p>
            </div>
            <img
              src={getWeatherIconUrl(day.weather[0]?.icon || '01d')}
              alt={day.weather[0]?.description}
              className="w-12 h-12"
            />
            <div className="flex-1">
              <p className="text-sm capitalize text-gray-600">
                {day.weather[0]?.description}
              </p>
              {(day.pop ?? 0) > 0.1 && (
                <p className="text-xs text-sky-500">
                  {isAmharic ? 'ዝናብ' : 'Rain'}: {Math.round((day.pop ?? 0) * 100)}%
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="font-semibold">
                {isCelsius ? Math.round(day.temp.max) : Math.round(day.temp.max * 9/5 + 32)}{unit}
              </p>
              <p className="text-sm text-gray-500">
                {isCelsius ? Math.round(day.temp.min) : Math.round(day.temp.min * 9/5 + 32)}{unit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}