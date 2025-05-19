import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudSun } from 'lucide-react';

interface WeatherInfoProps {
  data: any; // Replace 'any' with the actual type for weather data
}

export default function WeatherInfo({ data }: WeatherInfoProps) {
  return (

    <div className="text-sm text-gray-700 mt-4" aria-label="Weather Forecast">
      <h5 className="text-md font-semibold mb-1">Weather Forecast</h5>
      {data ? (
        <div className="flex items-center">
          {/* Placeholder for weather icon */}
          <div className="w-8 h-8 mr-2 text-weather-icon" role="img" aria-label={`Weather icon: ${data.forecast}`}>
            {data.icon === 'cloudy' && <Cloud />}
            {data.icon === 'sunny' && <Sun />}
            {data.icon === 'rainy' && <CloudRain />}
            {data.icon === 'partly-cloudy' && <CloudSun />}
            {data.icon === 'snowy' && <CloudSnow />}
          </div>
          <div>
            <p><span className="font-medium">Forecast:</span> {data.forecast}</p>
            <p><span className="font-medium">Temperature:</span> {data.temperature}</p>
            <p><span className="font-medium">Wind:</span> {data.wind}</p>
          </div>
        </div>
      ) : (
        <p>Weather data not available.</p>
      )}
    </div>
  );
}
