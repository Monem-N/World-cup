import React from 'react';
import WeatherInfo from './components/WeatherInfo';
import ReminderStrip from './components/ReminderStrip';

interface DayHeaderProps {
  data: any; // Replace 'any' with the actual type for day data
}

export default function DayHeader({ data }: DayHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold">{data?.title}</h2>
      <p className="text-gray-600">{data?.summary}</p>
      {/* Render weather and reminders here */}
      {data?.weather && <WeatherInfo data={data.weather} />}
      {data?.reminders && <ReminderStrip reminders={data.reminders} />}
    </div>
  );
}
