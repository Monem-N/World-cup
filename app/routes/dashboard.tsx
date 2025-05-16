import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
// Components
import DashboardHeader from '../components/dashboard/DashboardHeader';
import type { TripInformation } from '../lib/types'; // Import TripInformation type
import { useTranslation } from 'react-i18next';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useTripInfo } from '../lib/tripContext';

export default function Dashboard() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
const navigate = useNavigate();
  // Remove: const navigate = useNavigate();
  // Use the existing navigate function or import navigate if needed.
  const { tripInfo } = useTripInfo();
  const tripStartDate = tripInfo.itinerary[0]?.date;

  // Calculate days left until trip
  const daysLeft = React.useMemo(() => tripStartDate ?
    Math.ceil((Number(new Date(Date.parse(tripStartDate + ', 2025'))) - Number(new Date())) / (1000 * 60 * 60 * 24)) :
    null,
  [tripStartDate]);

  const overviewData = React.useMemo(() => ({
    destination: tripInfo.destination,
    startDate: tripInfo.startDate,
    endDate: tripInfo.endDate,
    travelers: tripInfo.travelers,
    dates: `${tripInfo.startDate} - ${tripInfo.endDate}`,
    locations: tripInfo.destination,
    itinerary: tripInfo.itinerary,
    weather: tripInfo.weather,
    essentials: tripInfo.essentials
  }), [tripInfo.startDate, tripInfo.endDate, tripInfo.travelers, tripInfo.destination, tripInfo.itinerary, tripInfo.weather, tripInfo.essentials]);

  const activeTab = pathname.split('/').pop();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <DashboardHeader
        overview={overviewData}
        tripStartDate={tripStartDate}
        daysLeft={daysLeft}
        t={t}
      />

      <Tabs value={activeTab} onValueChange={navigate} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">{t('dashboard.overview')}</TabsTrigger>
          <TabsTrigger value="itinerary">{t('dashboard.itinerary')}</TabsTrigger>
          <TabsTrigger value="essentials">{t('dashboard.essentials')}</TabsTrigger>
        </TabsList>

        <Outlet />
      </Tabs>
    </div>
  );
}
