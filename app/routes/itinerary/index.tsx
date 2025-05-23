import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { format, parseISO, isToday, isFuture } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { getAvailableItineraryDates } from '~/api/itineraryApi';

import { Calendar } from '~/components/ui/calendar';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { cn } from '~/lib/utils';

import {
  CalendarIcon,
  PlusCircle,
  Calendar as CalendarIcon2,
  ChevronRight,
  MapPin,
  Clock,
  Trophy,
  Plane,
  BedIcon,
  UtensilsIcon,
  MapIcon,
  InfoIcon
} from 'lucide-react';

export function meta() {
  return [
    { title: "Itinerary Overview - World Cup Itinerary" },
  ];
}

export default function ItineraryIndex() {
  const { t } = useTranslation();

  // State to hold the selected date
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Fetch available dates from the API
  const { data: availableDates, isLoading, error } = useQuery({
    queryKey: ['itineraryDates'],
    queryFn: getAvailableItineraryDates,
  });

  // Handler for when a date is selected in the calendar
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  // Handler for the "View Itinerary" button click
  const handleViewItinerary = () => {
    if (selectedDate) {
      // Format the date to YYYY-MM-DD to match the dynamic route parameter
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      // Navigate to the DayProgramPage route with the selected date
      navigate(`/itinerary/${formattedDate}`);
    }
  };

  // Example metadata for the World Cup dates
  // In a real app, this would come from an API
  type DateMetadata = {
    activities: number;
    highlights: string[];
    location: string;
  };

  const dateMetadata: Record<string, DateMetadata> = {
    "2025-06-14": {
      activities: 3,
      highlights: ["Arrival in New York", "Hotel Check-in"],
      location: "New York",
    },
    "2025-06-15": {
      activities: 4,
      highlights: ["USA vs. Mexico", "Fan Zone"],
      location: "New York",
    },
    "2025-06-16": {
      activities: 5,
      highlights: ["City Tour", "Statue of Liberty"],
      location: "New York",
    },
    "2025-06-17": {
      activities: 3,
      highlights: ["Travel to Nashville", "Hotel Check-in"],
      location: "Nashville",
    },
    "2025-06-18": {
      activities: 4,
      highlights: ["Brazil vs. Argentina", "Fan Zone"],
      location: "Nashville",
    },
  };

  // Function to determine card status styling
  const getStatusStyles = (dateStr: string) => {
    const date = parseISO(dateStr);

    if (isToday(date)) {
      return {
        badge: "Today",
        badgeVariant: "default" as const,
        borderColor: "border-primary"
      };
    } else if (isFuture(date)) {
      return {
        badge: "Upcoming",
        badgeVariant: "outline" as const,
        borderColor: ""
      };
    } else {
      return {
        badge: "Past",
        badgeVariant: "secondary" as const,
        borderColor: "border-muted"
      };
    }
  };

  // Create an array of dates with metadata
  const dates = availableDates?.map(date => {
    const metadata = dateMetadata[date] || {
      activities: 0,
      highlights: ["No highlights available"],
      location: "Unknown",
    };

    return {
      date,
      ...metadata,
      status: isFuture(parseISO(date)) ? "upcoming" : "past"
    };
  }) || [];

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t('itinerary.index.title', 'Itinerary')}</h1>
        </div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="animate-pulse bg-muted h-8 w-1/3 rounded"></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="text-center p-8">
          <CardContent>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
              <CalendarIcon className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="text-lg font-medium mb-2">Error Loading Itinerary</h3>
            <p className="text-muted-foreground mb-4">
              {(error as Error).message || 'There was an error loading your itinerary data.'}
            </p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No dates available
  if (!availableDates || availableDates.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="text-center p-8">
          <CardContent>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <CalendarIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Itinerary Dates Available</h3>
            <p className="text-muted-foreground mb-4">
              There are no itinerary dates available yet.
            </p>
            <Button>Create Your First Itinerary</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('itinerary.title', 'Your Itinerary')}</h1>
        <Button variant="outline" size="sm">
          <CalendarIcon className="h-4 w-4 mr-2" />
          Calendar View
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">
            <InfoIcon className="h-4 w-4 mr-2" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="cards">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>Days</span>
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <MapIcon className="h-4 w-4 mr-2" />
            <span>Calendar</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>FIFA World Cup 2025 USA Trip</CardTitle>
              <CardDescription>Your complete itinerary for the World Cup</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Dates</span>
                  <span className="font-medium">June 14-25, 2025</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Locations</span>
                  <span className="font-medium">New York/Jersey City area, Nashville</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Travelers</span>
                  <span className="font-medium">6 adults</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <span className="font-medium">12 days</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Trophy className="h-3 w-3" />
                    <span>3 Matches</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Plane className="h-3 w-3" />
                    <span>2 Flights</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <BedIcon className="h-3 w-3" />
                    <span>3 Hotels</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <UtensilsIcon className="h-3 w-3" />
                    <span>12 Meals</span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold mb-4">Upcoming Days</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dates.slice(0, 4).map((item) => {
              const date = parseISO(item.date);
              const formattedDate = format(date, 'EEEE, MMMM d, yyyy');

              return (
                <Card key={item.date} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{formattedDate}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.highlights.join(', ')}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button variant="ghost" size="sm" asChild className="ml-auto">
                      <Link to={`/itinerary/${item.date}`}>
                        View Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {dates.length > 4 && (
            <div className="mt-4 text-center">
              <Button variant="outline">
                View All {dates.length} Days
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="cards" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dates.map((item) => {
              const date = parseISO(item.date);
              const formattedDate = format(date, 'EEEE, MMMM d, yyyy');
              const { badge, badgeVariant, borderColor } = getStatusStyles(item.date);

              return (
                <Card
                  key={item.date}
                  className={cn(
                    "overflow-hidden transition-all hover:shadow-md",
                    borderColor
                  )}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant={badgeVariant} className="mb-2">{badge}</Badge>
                      <div className="text-sm text-muted-foreground">
                        {format(date, 'MMM d')}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{formattedDate}</CardTitle>
                    <CardDescription className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      {item.highlights.map((highlight: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          {idx === 0 ? (
                            <Trophy className="h-4 w-4 text-primary mt-0.5" />
                          ) : (
                            <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                          )}
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="text-sm text-muted-foreground">
                      {item.activities} {item.activities === 1 ? 'activity' : 'activities'}
                    </div>
                    <Button variant="ghost" size="sm" asChild className="gap-1">
                      <Link to={`/itinerary/${item.date}`}>
                        View Details
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}

            {/* Add Day Card */}
            <Card className="flex flex-col items-center justify-center p-6 h-full border-dashed hover:border-primary/50 hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <PlusCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Add New Day</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Create a new day in your itinerary
              </p>
              <Button variant="outline" size="sm">Create Day</Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <div className="bg-card border rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <CalendarIcon2 className="h-5 w-5 text-primary" />
                  Select a Date
                </h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-md border shadow-sm"
                  initialFocus
                />
              </div>

              <div className="md:w-1/2">
                <h3 className="text-lg font-medium mb-4">Date Details</h3>

                {selectedDate ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</h4>

                      {availableDates?.includes(format(selectedDate, 'yyyy-MM-dd')) ? (
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            You already have an itinerary for this date.
                          </p>
                          <Button
                            onClick={handleViewItinerary}
                            className="w-full"
                          >
                            View Existing Itinerary
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            No itinerary exists for this date yet. Would you like to create one?
                          </p>
                          <Button
                            variant="outline"
                            className="w-full"
                          >
                            Create New Itinerary
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Plane className="h-4 w-4 text-primary" />
                        Travel Tips
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Plan your transportation and accommodation well in advance. World Cup venues can be crowded and prices tend to increase closer to match days.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 bg-muted/30 rounded-lg">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Select a date to view or create an itinerary</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
