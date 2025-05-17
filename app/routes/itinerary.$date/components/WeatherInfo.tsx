import React from 'react';

interface WeatherInfoProps {
  data: any; // Replace 'any' with the actual type for weather data
}

export default function WeatherInfo({ data }: WeatherInfoProps) {
  return (
    <div className="text-sm text-gray-700 mt-4">
      <h5 className="text-md font-semibold mb-1">Weather Forecast</h5>
      {data ? (
        <div className="flex items-center">
          {/* Placeholder for weather icon */}
          <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
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
