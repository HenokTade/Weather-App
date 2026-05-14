import { useState } from 'react';
import { Search, MapPin, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ETHIOPIAN_CITIES } from '../types/constants';

interface SearchBarProps {
  onCitySelect: (lat: number, lon: number, name: string) => void;
  onDetectLocation: () => void;
}

export function SearchBar({ onCitySelect, onDetectLocation }: SearchBarProps) {
  const { i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const isAmharic = i18n.language === 'am';

  const filteredCities = ETHIOPIAN_CITIES.filter(city =>
    city.name.toLowerCase().includes(query.toLowerCase()) ||
    city.nameAm.includes(query)
  );

  const toggleLanguage = () => {
    const newLang = isAmharic ? 'en' : 'am';
    i18n.changeLanguage(newLang);
    localStorage.setItem('ethioweather-lang', newLang);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            placeholder={isAmharic ? 'ከተማ ፈልግ...' : 'Search city...'}
            className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur rounded-xl text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-ethiopia-green"
          />
          {showDropdown && (query || filteredCities.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl max-h-64 overflow-y-auto z-50">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => {
                      onCitySelect(city.lat, city.lon, city.name);
                      setQuery('');
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-ethiopia-green" />
                    <span className="font-medium">{city.name}</span>
                    <span className="text-gray-500 text-sm">{city.nameAm}</span>
                  </button>
                ))
              ) : (
                <p className="px-4 py-3 text-gray-500">
                  {isAmharic ? 'ምንም ከተማ አልተገኘም' : 'No cities found'}
                </p>
              )}
            </div>
          )}
        </div>
        <button
          onClick={onDetectLocation}
          className="p-3 bg-white/90 backdrop-blur rounded-xl shadow-lg hover:bg-gray-100 transition-colors"
          title={isAmharic ? 'አካባቢ አግኝ' : 'Detect Location'}
        >
          <MapPin className="w-5 h-5 text-ethiopia-green" />
        </button>
        <button
          onClick={toggleLanguage}
          className="p-3 bg-white/90 backdrop-blur rounded-xl shadow-lg hover:bg-gray-100 transition-colors"
          title={isAmharic ? 'English' : 'አማርኛ'}
        >
          <Globe className="w-5 h-5 text-ethiopia-gold" />
        </button>
      </div>
    </div>
  );
}