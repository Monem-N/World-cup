import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useItineraryStoreActions } from '../../../stores/itinerary';
import type { DayProgram, Activity } from '../../../stores/itinerary.types';
import { fetchItinerary as fetchItineraryApi } from '../../api/itineraryApi';

// Import components used in the route
import DayHeader from './DayHeader';
import ActivityList from './ActivityList';
import Timeline from './components/Timeline';

// Move mock fetching logic out of component file (RECOMMENDED)
// For demonstration, I'll keep it here momentarily but strongly advise moving it.
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


export default function DayProgramPage() {
  // Get the date param
  const { date } = useParams<{ date: string }>();

  // Get specific actions from the Zustand actions hook
  const { setItinerary } = useItineraryStoreActions();

  // Fetch data using react-query
  const { data, isLoading, error } = useQuery<DayProgram, Error>({
    queryKey: ['itinerary', date as string],
    // Use the fetching function
    queryFn: () => fetchMockItinerary(date as string),
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
    return <div>Loading...</div>;
  }

  if (error) {
    // TODO: Replace with error handling component
    return <div>Error: {error.message}</div>;
  }

  // If data is not available after loading (e.g., date param missing and enabled was false)
   if (!data) {
       return <div>No itinerary data available.</div>; // Or a specific "Select a date" message
   }


  // Render the page content using the fetched data
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Day Program Detail Page for {date}</h1>
      {/* Render other components here, passing down data */}
        <>
          {/* Pass the entire data object or specific parts needed by DayHeader */}
          <DayHeader data={data} />
          {/* Pass the items array to ActivityList and Timeline */}
          <ActivityList activities={data.items} />
          <Timeline activities={data.items} />
        </>
    </div>
  );
}