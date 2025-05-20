import SkeletonLoader from '../../components/SkeletonLoader';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
//import type { UseQueryOptions } from '@tanstack/react-query';
import { useItineraryStoreActions } from '../../../stores/itinerary';
import type { DayProgram } from '../../../stores/itinerary.types';
import { fetchItinerary as fetchItineraryApi } from '../../api/itineraryApi';
import ErrorComponent from '../../components/ErrorComponent';
import { Button } from '../../components/ui/button';
import { useState } from 'react';
// Import components used in the route
import DayHeader from './DayHeader';
import Timeline from './components/Timeline';

// Move mock fetching logic out of component file (RECOMMENDED)
// For demonstration, I'll keep it here momentarily but strongly advise moving it.
/*
async function fetchMockItinerary(date: string): Promise<DayProgram> {
  console.log(`Workspaceing mock data for date: ${date}`);
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // Assuming fetchItineraryApi returns DayProgram or can be mapped to it
  // In a real scenario, fetchItineraryApi would likely call your backend
  // If fetchItineraryApi actually uses a mock, put the mock data/logic inside itineraryApi.ts
  try {
    const data = await fetchItineraryApi(date);
    // TODO: Add validation if necessary, e.g., using Zod
    return data; // Ensure data returned by fetchItineraryApi matches DayProgram type
  } catch (error) {
    console.error("Error fetching mock itinerary:", error);
    throw error; // Re-throw to be caught by react-query
  }
}
*/

export default function DayProgramPage() {
  // Get the date param
  const { date } = useParams<{ date: string }>();
  const { t } = useTranslation();

  // Get specific actions from the Zustand actions hook
  const { setItinerary } = useItineraryStoreActions();

  // Fetch data using react-query
  const { data, isLoading, error } = useQuery<DayProgram, Error>({
    queryKey: ['itinerary', date as string],
    // Use the fetching function
    queryFn: () => fetchItineraryApi(date as string),
    // Only enable the query if date exists
    enabled: !!date,
    // Add placeholder/initial data if you want to show something immediately
    // initialData: { ... } // Define a default DayProgram structure
  });

  // Use useEffect to update Zustand store when data is fetched
  React.useEffect(() => {
    if (data) {
      setItinerary(data);
    }
  }, [data, setItinerary]);


  if (isLoading) {
    // TODO: Replace with skeleton loader component
    return <SkeletonLoader />;
  }

  if (error) {
    // TODO: Replace with error handling component
    return <ErrorComponent message={error.message} />;
  }

  // If data is not available after loading (e.g., date param missing and enabled was false)
  if (!data) {
    return <div>No itinerary data available.</div>; // Or a specific "Select a date" message
  }


  // Format the date for display
  const dateObj = new Date(date || "");
  const formattedDate = dateObj.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format date components for UI
  const dayOfMonth = dateObj.getDate();
  const month = dateObj.toLocaleDateString(undefined, { month: 'short' });
  const year = dateObj.getFullYear();
  const dayOfWeek = dateObj.toLocaleDateString(undefined, { weekday: 'long' });

  // Render the page content using the fetched data
  return (
    <div className="container mx-auto px-4 py-8 space-y-8" role="main">
      {/* Hero section with date */}
      <div className="bg-gradient-to-r from-primary/10 to-background rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center mb-8">
        <div className="flex-shrink-0 bg-card rounded-lg p-4 text-center shadow-sm border w-24 h-24 flex flex-col justify-center">
          <span className="text-3xl font-bold">{dayOfMonth}</span>
          <span className="text-sm font-medium text-muted-foreground">{month} {year}</span>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{dayOfWeek}</h1>
          <p className="text-muted-foreground">
            {t('itinerary.dayDescription', 'Manage your activities for this day')}
          </p>

          {/* Data source indicator */}
          <div className="mt-4 text-xs px-2 py-1 rounded-full inline-flex items-center gap-1 bg-muted">
            <span className={`w-1.5 h-1.5 rounded-full ${data._source === 'supabase' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
            <span className="text-muted-foreground">
              {data._source === 'supabase' ? 'Live Data' : 'Demo Data'}
            </span>
          </div>
        </div>

        <div className="flex-shrink-0 flex gap-2">
          <Button variant="outline" size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export
          </Button>
        </div>
      </div>

      {/* Day Header with summary */}
      <div className="bg-card rounded-lg border shadow-sm p-6 mb-8">
        <DayHeader data={data} />
      </div>

      {/* Timeline section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Timeline</h2>
          <Button variant="outline" size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Activity
          </Button>
        </div>

        {data.items && data.items.length > 0 ? (
          <Timeline activities={data.items} />
        ) : (
          <div className="bg-muted/20 rounded-lg p-8 text-center border border-dashed">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">No Activities Yet</h3>
            <p className="text-muted-foreground mb-4">{t('itinerary.timelineEmpty', 'No activities planned for this day yet.')}</p>
            <Button>Add Your First Activity</Button>
          </div>
        )}
      </div>
    </div>
  );
}