import React from 'react';
import ItineraryTimeline from '../../components/dashboard/ItineraryTimeline';
import { useTripInfo } from '../../lib/tripContext';

export default function DashboardItinerary() {
  const { tripInfo } = useTripInfo();
  const itinerary = tripInfo.itinerary;

  return (
    <ItineraryTimeline itinerary={itinerary} />
  );
}