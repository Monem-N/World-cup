import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import type { TripInformation } from '~/lib/types';

// UI Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';

// Icons
import { Calendar, Users, MapPin, ArrowRight, Clock, Sun, CloudRain, Cloud } from 'lucide-react';

interface EnhancedDashboardHeaderProps {
  overview: TripInformation;
  tripStartDate?: string;
  daysLeft: number | null;
}

export function EnhancedDashboardHeader({ overview, tripStartDate, daysLeft }: EnhancedDashboardHeaderProps) {
  const { t } = useTranslation();

  // Weather icon mapping
  const getWeatherIcon = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'rainy':
        return <CloudRain className="h-5 w-5 text-blue-500" />;
      case 'cloudy':
        return <Cloud className="h-5 w-5 text-gray-500" />;
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />;
    }
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';

    try {
      const date = new Date(dateString + ', 2025');
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <Card className="border-0 shadow-md bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl md:text-3xl font-bold">
              {t('dashboard.welcome_title', 'Welcome to Your World Cup Journey')}
            </CardTitle>
            <CardDescription className="text-base mt-1">
              {t('dashboard.welcome_subtitle', 'Track your trip to {{destination}}', { destination: overview.destination })}
            </CardDescription>
          </div>

          {daysLeft !== null && daysLeft > 0 && (
            <Badge variant="outline" className="self-start md:self-auto px-3 py-1 text-sm bg-primary/10 border-primary/20">
              <Clock className="mr-1 h-4 w-4" />
              {t('dashboard.days_until_trip', '{{count}} days until your trip', { count: daysLeft })}
            </Badge>
          )}

          {daysLeft !== null && daysLeft <= 0 && (
            <Badge variant="outline" className="self-start md:self-auto px-3 py-1 text-sm bg-green-100 border-green-200 text-green-800">
              <Clock className="mr-1 h-4 w-4" />
              {t('dashboard.trip_in_progress', 'Trip in progress!')}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trip Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t('dashboard.trip_details', 'Trip Details')}
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{t('dashboard.dates', 'Dates')}</p>
                  <p className="text-sm text-muted-foreground">{overview.dates}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{t('dashboard.location', 'Location')}</p>
                  <p className="text-sm text-muted-foreground">{overview.destination}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{t('dashboard.travelers', 'Travelers')}</p>
                  <p className="text-sm text-muted-foreground">{overview.travelers}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Forecast */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t('dashboard.weather_forecast', 'Weather Forecast')}
            </h3>

            <div className="space-y-2">
              {overview.weather?.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getWeatherIcon(day.condition)}
                    <span className="text-sm">{day.date}</span>
                  </div>
                  <span className="text-sm font-medium">{day.temperature}°C</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Match */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t('dashboard.upcoming_matches', 'Upcoming Matches')}
            </h3>

            {overview.itinerary && overview.itinerary.length > 0 ? (
              <div className="space-y-3">
                {overview.itinerary.slice(0, 2).map((day, index) => {
                  // Get the first event from each day to display
                  const firstEvent = day.events && day.events.length > 0 ? day.events[0] : null;

                  return firstEvent ? (
                    <div key={index} className="rounded-md border p-3 bg-card">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{firstEvent.desc}</p>
                          <p className="text-sm text-muted-foreground">{day.date}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {firstEvent.time || t('dashboard.all_day', 'All day')}
                        </Badge>
                      </div>
                      {firstEvent.details && firstEvent.details.length > 0 && (
                        <p className="text-sm mt-2">{firstEvent.details[0]}</p>
                      )}
                    </div>
                  ) : (
                    <div key={index} className="rounded-md border p-3 bg-card">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{t('dashboard.no_events', 'No events')}</p>
                          <p className="text-sm text-muted-foreground">{day.date}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {t('dashboard.no_upcoming_matches', 'No upcoming matches found')}
              </p>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <div className="w-full flex justify-end">
          <Button variant="link" size="sm" asChild>
            <Link to="/itinerary" className="flex items-center gap-1">
              {t('dashboard.view_full_itinerary', 'View full itinerary')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
