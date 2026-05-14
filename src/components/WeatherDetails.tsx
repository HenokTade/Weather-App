import { useTranslation } from 'react-i18next';
import { Wind, Droplets, Gauge, Eye, Sun } from 'lucide-react';
import type { CurrentWeather } from '../types/weather';
import { getWindDirection } from '../utils/formatters';

interface WeatherDetailsProps {
  weather: CurrentWeather;
}

export function WeatherDetails({ weather }: WeatherDetailsProps) {
  const { i18n } = useTranslation();
  const isAmharic = i18n.language === 'am';

  const details = [
    { icon: Wind, label: isAmharic ? 'ነፋስ' : 'Wind', value: `${Math.round(weather.wind_speed)} m/s ${getWindDirection(weather.wind_deg)}` },
    { icon: Droplets, label: isAmharic ? 'እርጋታ' : 'Humidity', value: `${weather.humidity}%` },
    { icon: Gauge, label: isAmharic ? 'ግፊት' : 'Pressure', value: `${weather.pressure} hPa` },
    { icon: Eye, label: isAmharic ? 'ማየት' : 'Visibility', value: `${(weather.visibility / 1000).toFixed(1)} km` },
    { icon: Sun, label: isAmharic ? 'UV ማውጫ' : 'UV Index', value: Math.round(weather.uvi).toString() },
  ];

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">
        {isAmharic ? 'ዝርዝሮች' : 'Details'}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {details.map((item, index) => (
          <div key={index} className="bg-white/80 backdrop-blur rounded-xl p-4 flex items-center gap-3">
            <div className="p-2 bg-ethiopia-green/10 rounded-lg">
              <item.icon className="w-5 h-5 text-ethiopia-green" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{item.label}</p>
              <p className="font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}