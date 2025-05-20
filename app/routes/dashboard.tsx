import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTripInfo } from '../lib/tripContext';
import type { TripInformation } from '../lib/types';
import { PageLayout } from '~/components/layout/PageLayout';

// UI Components
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';

// Icons
import {
  AlertCircle,
  Calendar,
  Users,
  MapPin,
  Plane,
  Hotel,
  Ticket,
  Clock,
  CloudRain,
  Sun,
  Cloud,
  Luggage,
  ArrowRight
} from 'lucide-react';

// Custom Components
import { EnhancedDashboardHeader } from '../components/dashboard/EnhancedDashboardHeader';
import { CountdownTimer } from '../components/dashboard/CountdownTimer';
import { TripProgressTracker } from '../components/dashboard/TripProgressTracker';

/**
 * Enhanced Dashboard Page
 *
 * A comprehensive dashboard for managing and viewing trip information
 * with improved UI, responsive design, and proper error handling.
 */
export default function Dashboard() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { tripInfo } = useTripInfo();

  // State for loading and error handling
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Process trip data
  const tripStartDate = tripInfo?.itinerary?.[0]?.date;

  // Calculate days left until trip
  const daysLeft = React.useMemo(() => {
    if (!tripStartDate) return null;
    try {
      return Math.ceil(
        (Number(new Date(Date.parse(tripStartDate + ', 2025'))) - Number(new Date())) /
        (1000 * 60 * 60 * 24)
      );
    } catch (error) {
      console.error('Error calculating days left:', error);
      return null;
    }
  }, [tripStartDate]);

  // Process overview data with error handling
  const overviewData = React.useMemo(() => {
    try {
      if (!tripInfo || Object.keys(tripInfo).length === 0) {
        throw new Error('Trip information is not available');
      }

      return {
        destination: tripInfo.destination,
        startDate: tripInfo.startDate,
        endDate: tripInfo.endDate,
        travelers: tripInfo.travelers,
        dates: `${tripInfo.startDate} - ${tripInfo.endDate}`,
        locations: tripInfo.destination,
        itinerary: tripInfo.itinerary,
        weather: tripInfo.weather,
        essentials: tripInfo.essentials,
        overview: {
          title: tripInfo.overview.title,
          location: tripInfo.destination,
          participants: tripInfo.overview.participants,
          duration: tripInfo.overview.duration,
          dates: `${tripInfo.startDate} - ${tripInfo.endDate}`,
          travelers: tripInfo.travelers
        }
      } as TripInformation;
    } catch (error) {
      setHasError(true);
      setErrorMessage((error as Error).message || 'Failed to process trip information');
      return {} as TripInformation;
    }
  }, [tripInfo]);

  // Determine active tab
  const activeTab = pathname.split('/').pop() || 'overview';

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Calculate trip progress
  const totalDays = tripInfo?.overview?.duration || 0;
  const elapsedDays = totalDays - (daysLeft || 0);
  const progress = Math.max(0, Math.min(100, (elapsedDays / totalDays) * 100));

  // Handle error state
  if (hasError) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t('dashboard.error_title', 'Error Loading Dashboard')}</AlertTitle>
          <AlertDescription>
            {t('dashboard.error_description', 'There was a problem loading your trip information: {{message}}', { message: errorMessage })}
          </AlertDescription>
        </Alert>
        <Button onClick={() => window.location.reload()}>
          {t('dashboard.retry', 'Retry')}
        </Button>
      </div>
    );
  }

  return (
    <PageLayout showBreadcrumbs={false}>
      <div className="space-y-6">
        {isLoading ? (
          // Loading state
          <div className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <div className="flex flex-col md:flex-row gap-4">
                <Skeleton className="h-6 w-full md:w-1/3" />
                <Skeleton className="h-6 w-full md:w-1/3" />
                <Skeleton className="h-6 w-full md:w-1/3" />
              </div>
            </div>

            <Skeleton className="h-[200px] w-full rounded-lg" />

            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-[300px] w-full rounded-lg" />
            </div>
          </div>
        ) : (
          // Loaded content
          <>
            <EnhancedDashboardHeader
              overview={overviewData}
              tripStartDate={tripStartDate}
              daysLeft={daysLeft}
            />

            {/* Trip Progress Tracker */}
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  {t('dashboard.trip_progress', 'Trip Progress')}
                </CardTitle>
                <CardDescription>
                  {progress > 0
                    ? t('dashboard.trip_in_progress', 'Your trip is in progress! {{elapsed}} of {{total}} days completed.',
                        { elapsed: elapsedDays, total: totalDays })
                    : t('dashboard.trip_countdown', 'Your trip starts in {{days}} days!',
                        { days: daysLeft || 0 })
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TripProgressTracker progress={progress} />
              </CardContent>
            </Card>

            {/* Countdown Timer Card - Only show if trip hasn't started yet */}
            {daysLeft && daysLeft > 0 && (
              <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-primary/10 via-background to-secondary/10">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold">
                      {t('dashboard.countdown_to_kickoff', 'Countdown to Kickoff')}
                    </CardTitle>
                    <Badge variant="outline" className="bg-primary/10">
                      {t('dashboard.days_left', '{{count}} days left', { count: daysLeft })}
                    </Badge>
                  </div>
                  <CardDescription>
                    {t('dashboard.countdown_description', 'Get ready for your World Cup adventure!')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  {tripStartDate && (
                    <CountdownTimer targetDate={new Date(`${tripStartDate}, 2025`)} />
                  )}
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {t('dashboard.departure_date', 'Departure: {{date}}', { date: tripInfo.startDate })}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            )}

            {/* Main Content Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={navigate}
              className="space-y-4"
            >
              <TabsList className="grid w-full grid-cols-3 h-auto p-1">
                <TabsTrigger
                  value="overview"
                  className="flex items-center gap-2 py-3"
                >
                  <Plane className="h-4 w-4" />
                  <span>{t('dashboard.overview', 'Overview')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="itinerary"
                  className="flex items-center gap-2 py-3"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{t('dashboard.itinerary', 'Itinerary')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="essentials"
                  className="flex items-center gap-2 py-3"
                >
                  <Luggage className="h-4 w-4" />
                  <span>{t('dashboard.essentials', 'Essentials')}</span>
                </TabsTrigger>
              </TabsList>

              <div className="p-1">
                <Outlet />
              </div>
            </Tabs>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t('dashboard.quick_actions', 'Quick Actions')}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 gap-2">
                  <Hotel className="h-5 w-5" />
                  <span className="text-sm">{t('dashboard.view_accommodations', 'Accommodations')}</span>
                </Button>
                <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 gap-2">
                  <Ticket className="h-5 w-5" />
                  <span className="text-sm">{t('dashboard.view_tickets', 'Match Tickets')}</span>
                </Button>
                <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 gap-2">
                  <Plane className="h-5 w-5" />
                  <span className="text-sm">{t('dashboard.view_flights', 'Flight Info')}</span>
                </Button>
                <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 gap-2">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm">{t('dashboard.view_map', 'Explore Map')}</span>
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </PageLayout>
  );
}
