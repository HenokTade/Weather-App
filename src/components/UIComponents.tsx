import { Thermometer, RefreshCw, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const { i18n } = useTranslation();
  const isAmharic = i18n.language === 'am';

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] px-4 py-8">
      <AlertCircle className="w-12 h-12 text-ethiopia-red mb-4" />
      <p className="text-lg text-center mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 bg-ethiopia-green text-white rounded-xl hover:bg-opacity-90 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        {isAmharic ? 'እንደገና ሞክር' : 'Try Again'}
      </button>
    </div>
  );
}

interface HeaderProps {
  isCelsius: boolean;
  onToggleUnit: () => void;
}

export function Header({ isCelsius, onToggleUnit }: HeaderProps) {
  const { i18n } = useTranslation();
  const isAmharic = i18n.language === 'am';

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-ethiopia-green rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">☀️</span>
        </div>
        <h1 className="text-lg font-bold">
          {isAmharic ? 'ኢትዮዌዘር' : 'EthioWeather'}
        </h1>
      </div>
      <button
        onClick={onToggleUnit}
        className="flex items-center gap-1 px-3 py-1.5 bg-white/80 backdrop-blur rounded-full text-sm font-medium hover:bg-white transition-colors"
      >
        <Thermometer className="w-4 h-4" />
        <span>{isCelsius ? '°C' : '°F'}</span>
      </button>
    </div>
  );
}

interface LoadingStateProps {
  isAmharic: boolean;
}

export function LoadingState({ isAmharic }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-ethiopia-green border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500">
          {isAmharic ? 'በመጫል...' : 'Loading...'}
        </p>
      </div>
    </div>
  );
}