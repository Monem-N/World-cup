import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useItineraryStoreActions } from '../../../stores/itinerary';
import type { DayProgram } from '../../../stores/itinerary.types';
import { fetchItinerary as fetchItineraryApi } from '../../api/itineraryApi';
import SkeletonLoader from '../../components/SkeletonLoader';
import ErrorComponent from '../../components/ErrorComponent';
import { ItineraryDayHeader } from '../../components/itinerary/ItineraryDayHeader';
import { ItineraryTimeline } from '../../components/itinerary/ItineraryTimeline';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Card, CardContent } from '../../components/ui/card';
import ItineraryMapView from './components/ItineraryMapView';
import {
  CalendarIcon,
  MapIcon,
  FileTextIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon
} from 'lucide-react';

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


  // No need for date formatting here

  // Get previous and next dates for navigation
  const getPreviousDate = () => {
    if (!date) return null;
    const currentDate = new Date(date);
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 1);
    return prevDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const getNextDate = () => {
    if (!date) return null;
    const currentDate = new Date(date);
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    return nextDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const previousDate = getPreviousDate();
  const nextDate = getNextDate();

  // Handle activity status change
  const handleStatusChange = (id: string, status: 'pending' | 'confirmed' | 'completed') => {
    // This would typically update the status in your state management or API
    console.log(`Changing activity ${id} status to ${status}`);
  };

  // Render the page content using the fetched data
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        {previousDate ? (
          <Link to={`/itinerary/${previousDate}`}>
            <Button variant="outline" size="sm">
              <ChevronLeftIcon className="h-4 w-4 mr-1" />
              Previous Day
            </Button>
          </Link>
        ) : (
          <Button variant="outline" size="sm" disabled>
            <ChevronLeftIcon className="h-4 w-4 mr-1" />
            Previous Day
          </Button>
        )}

        <h1 className="text-2xl font-bold hidden md:block">{t('itinerary.dayView.title', 'Itinerary')}</h1>

        {nextDate ? (
          <Link to={`/itinerary/${nextDate}`}>
            <Button variant="outline" size="sm">
              Next Day
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        ) : (
          <Button variant="outline" size="sm" disabled>
            Next Day
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>

      <ItineraryDayHeader day={data} className="mb-6" />

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="timeline">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="map">
            <MapIcon className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Map</span>
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileTextIcon className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Documents</span>
          </TabsTrigger>
          <TabsTrigger value="add">
            <PlusIcon className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Add Activity</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="mt-0">
          {data.items && data.items.length > 0 ? (
            <ItineraryTimeline
              activities={data.items}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Activities Yet</h3>
                <p className="text-muted-foreground mb-4">
                  {t('itinerary.timelineEmpty', 'No activities planned for this day yet.')}
                </p>
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Your First Activity
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="map" className="mt-0">
          <Card>
            <CardContent className="p-4">
              {data.items && data.items.length > 0 ? (
                <ItineraryMapView activities={data.items} />
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No activities with locations to display</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-0">
          <Card>
            <CardContent className="p-4">
              {data.docs && data.docs.length > 0 ? (
                <ul className="space-y-2">
                  {data.docs.map((doc, index) => (
                    <li key={index} className="flex items-center p-2 hover:bg-muted rounded-md">
                      <FileTextIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <FileTextIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">No documents available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add" className="mt-0">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <PlusIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Add New Activity</h3>
              <p className="text-muted-foreground mb-4">
                {t('itinerary.addActivity', 'Create a new activity for your itinerary.')}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
                <Button variant="outline" className="flex flex-col h-auto py-4">
                  <CalendarIcon className="h-6 w-6 mb-2" />
                  <span>Event</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-4">
                  <MapIcon className="h-6 w-6 mb-2" />
                  <span>Transport</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-4">
                  <FileTextIcon className="h-6 w-6 mb-2" />
                  <span>Meal</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-4">
                  <PlusIcon className="h-6 w-6 mb-2" />
                  <span>Other</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}