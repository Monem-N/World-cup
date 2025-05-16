import React from 'react';
import { getNextEvent } from '../../lib/utils';
import NextEventCard from '../../components/dashboard/NextEventCard';
import { TripSummaryCard } from '../../components/dashboard/TripSummaryCard';
import { WeatherCard } from '../../components/dashboard/WeatherCard';
import { useTripInfo } from '../../lib/tripContext';

export default function DashboardOverview() {
  const { tripInfo } = useTripInfo();
  const overviewData = {
    dates: `${tripInfo.startDate} - ${tripInfo.endDate}`,
    travelers: `${tripInfo.travelers} Travelers`,
    locations: tripInfo.destination
  };
  const { next: nextEvent } = getNextEvent(tripInfo.itinerary);
  const weather = tripInfo.weather && tripInfo.weather[0]; // Displaying only the first weather entry

  return (
    <div>
      <h1>Dashboard Overview</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <NextEventCard nextEvent={nextEvent} />
        <TripSummaryCard overview={overviewData} />
      </div>
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}