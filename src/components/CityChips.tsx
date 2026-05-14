import { useTranslation } from 'react-i18next';
import { ETHIOPIAN_CITIES } from '../types/constants';

interface CityChipsProps {
  onCitySelect: (lat: number, lon: number, name: string) => void;
  currentCity: string;
}

export function CityChips({ onCitySelect, currentCity }: CityChipsProps) {
  const { i18n } = useTranslation();
  const isAmharic = i18n.language === 'am';

  return (
    <div className="px-4 py-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {ETHIOPIAN_CITIES.map((city) => (
          <button
            key={city.name}
            onClick={() => onCitySelect(city.lat, city.lon, city.name)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              currentCity === city.name
                ? 'bg-ethiopia-green text-white'
                : 'bg-white/80 backdrop-blur text-gray-700 hover:bg-white'
            }`}
          >
            {isAmharic ? city.nameAm : city.name}
          </button>
        ))}
      </div>
    </div>
  );
}