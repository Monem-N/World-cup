import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { format, parseISO, isToday, isFuture } from 'date-fns'; // Using date-fns for date formatting
import { useTranslation } from 'react-i18next';

// Assuming shadcn/ui components are available at these paths
import { Calendar } from '~/components/ui/calendar'; // shadcn/ui Calendar component
import { Button } from '~/components/ui/button'; // shadcn/ui Button component
import {
  CalendarIcon,
  PlusCircle,
  Calendar as CalendarIcon2,
  ChevronRight,
  MapPin,
  Clock,
  Trophy,
  Plane
} from 'lucide-react'; // Icons
import { cn } from '~/lib/utils'; // Utility for conditional class names
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

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

  // Example dates for the World Cup with more metadata
  const dates = [
    {
      date: "2026-06-15",
      activities: 3,
      highlights: ["Opening Ceremony", "USA vs. Mexico"],
      location: "New York",
      status: "upcoming"
    },
    {
      date: "2026-06-16",
      activities: 5,
      highlights: ["Brazil vs. Argentina", "Stadium Tour"],
      location: "Miami",
      status: "upcoming"
    },
    {
      date: "2026-06-17",
      activities: 2,
      highlights: ["Germany vs. France", "Fan Zone"],
      location: "Los Angeles",
      status: "upcoming"
    },
    {
      date: "2026-06-18",
      activities: 4,
      highlights: ["England vs. Spain", "City Tour"],
      location: "Toronto",
      status: "upcoming"
    },
  ];

  // We could use today's date for additional features in the future

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

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('itinerary.title', 'Your Itinerary')}</h1>
          <p className="text-muted-foreground mt-1">Plan and manage your World Cup experience</p>
        </div>
        <Button className="flex items-center gap-1.5">
          <PlusCircle className="h-4 w-4" />
          {t('itinerary.createNew', 'Add Day')}
        </Button>
      </div>

      <Tabs defaultValue="cards" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="cards">Card View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

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
                      {item.highlights.map((highlight, idx) => (
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

                      {dates.some(d => d.date === format(selectedDate, 'yyyy-MM-dd')) ? (
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
