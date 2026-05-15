import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherDisplay } from './components/CurrentWeather';
import { WeatherDetails } from './components/WeatherDetails';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { CityChips } from './components/CityChips';
import { Header, ErrorState, LoadingState } from './components/UIComponents';
import { useWeather, useGeolocation } from './hooks/useWeather';
import { ETHIOPIAN_CITIES } from './types/constants';
import { getWeatherGradient } from './utils/formatters';

function App() {
  const { i18n } = useTranslation();
  const isAmharic = i18n.language === 'am';
  
  const [selectedCity, setSelectedCity] = useState({
    lat: ETHIOPIAN_CITIES[0].lat,
    lon: ETHIOPIAN_CITIES[0].lon,
    name: ETHIOPIAN_CITIES[0].name,
  });
  const [isCelsius, setIsCelsius] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const { location, detectLocation } = useGeolocation();
  const { data, isLoading, isError, error, refetch, dataUpdatedAt } = useWeather(
    selectedCity.lat,
    selectedCity.lon
  );

  useEffect(() => {
    if (location) {
      setSelectedCity({
        lat: location.lat,
        lon: location.lon,
        name: 'Current Location',
      });
    }
  }, [location]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleCitySelect = (lat: number, lon: number, name: string) => {
    setSelectedCity({ lat, lon, name });
  };

  const handleDetectLocation = () => {
    detectLocation();
  };

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
    localStorage.setItem('ethioweather-unit', String(!isCelsius));
  };

  useEffect(() => {
    const savedUnit = localStorage.getItem('ethioweather-unit');
    if (savedUnit !== null) {
      setIsCelsius(savedUnit === 'true');
    }
  }, []);

  const gradient = data ? getWeatherGradient(data.current.weather[0]?.icon || '01d', data.current.weather[0]?.icon.includes('n')) : 'weather-gradient-sunny';

  return (
    <div className={`min-h-screen ${gradient} transition-all duration-1000`}>
      <div className="bg-black/10 min-h-screen">
        <Header isCelsius={isCelsius} onToggleUnit={toggleUnit} />
        
        {isOffline && (
          <div className="mx-4 bg-yellow-500/90 text-white px-4 py-2 rounded-lg text-sm text-center">
            {isAmharic ? 'ከተስስር ግንኙነት ውጪ' : 'You are offline'}
          </div>
        )}

        <SearchBar
          onCitySelect={handleCitySelect}
          onDetectLocation={handleDetectLocation}
        />

        <CityChips
          onCitySelect={handleCitySelect}
          currentCity={selectedCity.name}
        />

        {isLoading && <LoadingState isAmharic={isAmharic} />}
        
        {isError && (
          <ErrorState
            message={error?.message || (isAmharic ? 'ስህተት ተከስቷል' : 'Something went wrong')}
            onRetry={refetch}
          />
        )}

        {data && !isLoading && !isError && (
          <>
            <CurrentWeatherDisplay
              weather={data.current}
              cityName={selectedCity.name}
              isCelsius={isCelsius}
              lastUpdated={dataUpdatedAt}
            />
            
            {data.hourly && data.hourly.length > 0 && (
              <HourlyForecast hourly={data.hourly} isCelsius={isCelsius} />
            )}
            
            {data.daily && data.daily.length > 0 && (
              <DailyForecast daily={data.daily} isCelsius={isCelsius} />
            )}
            
            <WeatherDetails weather={data.current} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;