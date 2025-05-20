import React from 'react';
import { useTranslation } from 'react-i18next';
import { getNextEvent } from '../../lib/utils';
import { useTripInfo } from '../../lib/tripContext';
import type { ItineraryDay } from '../../lib/types';

// UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

// Icons
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Sun,
  CloudRain,
  Cloud,
  Ticket,
  Hotel,
  Plane,
  Utensils,
  Trophy
} from 'lucide-react';

/**
 * Enhanced Dashboard Overview
 *
 * A comprehensive overview of the trip with key information and upcoming events
 */
export default function DashboardOverview() {
  const { t } = useTranslation();
  const { tripInfo } = useTripInfo();

  // Process data
  const overviewData = {
    dates: `${tripInfo.startDate} - ${tripInfo.endDate}`,
    travelers: `${tripInfo.travelers} ${t('dashboard.travelers', 'Travelers')}`,
    locations: tripInfo.destination
  };

  const { next: nextEvent } = getNextEvent(tripInfo.itinerary);
  const weather = tripInfo.weather || [];

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

  // Helper function to check if a day contains events of a specific type
  const dayContainsEventType = (day: ItineraryDay, keywords: string[]) => {
    if (!day.events || !Array.isArray(day.events)) return false;

    return day.events.some((event: { desc: string }) => {
      if (!event.desc) return false;
      const desc = event.desc.toLowerCase();
      return keywords.some(keyword => desc.includes(keyword));
    });
  };

  // Group itinerary days by event types they contain
  const matchEvents = tripInfo.itinerary?.filter(day =>
    dayContainsEventType(day, ['match', 'game'])
  ) || [];

  const tourEvents = tripInfo.itinerary?.filter(day =>
    dayContainsEventType(day, ['tour', 'visit'])
  ) || [];

  const otherEvents = tripInfo.itinerary?.filter(day =>
    !dayContainsEventType(day, ['match', 'game', 'tour', 'visit'])
  ) || [];

  return (
    <div className="space-y-6">
      {/* Next Event Card */}
      {nextEvent && (
        <Card className="border-0 shadow-sm bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl font-bold">
                  {t('dashboard.next_event', 'Next Event')}
                </CardTitle>
                <CardDescription>
                  {t('dashboard.coming_up_next', 'Coming up next on your itinerary')}
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-primary/10">
                <Clock className="mr-1 h-3 w-3" />
                {nextEvent.time}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border p-4 bg-card">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div>
                  <h3 className="font-semibold text-lg">{nextEvent.desc}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>{nextEvent.date}</span>
                  </div>
                  {nextEvent.details && nextEvent.details.length > 0 && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {nextEvent.details.find(d => d.toLowerCase().includes('location:'))?.replace('Location:', '').trim() ||
                         t('dashboard.location_unknown', 'Location unknown')}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-2 md:mt-0">
                  {nextEvent.desc.toLowerCase().includes('match') && (
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                      <Trophy className="h-8 w-8 text-primary" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trip Summary and Weather */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trip Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {t('dashboard.trip_summary', 'Trip Summary')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{t('dashboard.dates', 'Dates')}</p>
                <p className="text-sm text-muted-foreground">{overviewData.dates}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{t('dashboard.location', 'Location')}</p>
                <p className="text-sm text-muted-foreground">{overviewData.locations}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{t('dashboard.travelers', 'Travelers')}</p>
                <p className="text-sm text-muted-foreground">{tripInfo.travelers}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Ticket className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{t('dashboard.matches', 'Matches')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('dashboard.match_count', '{{count}} matches scheduled', { count: matchEvents.length })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Forecast */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {t('dashboard.weather_forecast', 'Weather Forecast')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weather.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {weather.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                      <div className="flex items-center gap-3">
                        {getWeatherIcon(day.condition)}
                        <span>{day.date}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">{day.temperature}°C</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {day.condition}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  {t('dashboard.no_weather_data', 'No weather data available')}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {t('dashboard.events', 'Events')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="matches" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="matches" className="text-sm">
                {t('dashboard.matches', 'Matches')}
                {matchEvents.length > 0 && (
                  <Badge variant="secondary" className="ml-2">{matchEvents.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="tours" className="text-sm">
                {t('dashboard.tours', 'Tours')}
                {tourEvents.length > 0 && (
                  <Badge variant="secondary" className="ml-2">{tourEvents.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="other" className="text-sm">
                {t('dashboard.other', 'Other')}
                {otherEvents.length > 0 && (
                  <Badge variant="secondary" className="ml-2">{otherEvents.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="matches" className="mt-4 space-y-4">
              {matchEvents.length > 0 ? (
                matchEvents.map((day, index) => {
                  // Get the first match event from this day
                  const matchEvent = day.events.find(e =>
                    e.desc.toLowerCase().includes('match') ||
                    e.desc.toLowerCase().includes('game')
                  );

                  if (!matchEvent) return null;

                  // Extract location from details if available
                  const locationDetail = matchEvent.details?.find(d =>
                    d.toLowerCase().includes('location:')
                  );
                  const location = locationDetail
                    ? locationDetail.replace('Location:', '').trim()
                    : t('dashboard.location_unknown', 'Location unknown');

                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-md border">
                      <div>
                        <p className="font-medium">{matchEvent.desc}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{day.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{matchEvent.time || t('dashboard.time_tbd', 'TBD')}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{location}</span>
                        </div>
                      </div>
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                  );
                }).filter(Boolean)
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  {t('dashboard.no_matches', 'No matches scheduled')}
                </div>
              )}
            </TabsContent>

            <TabsContent value="tours" className="mt-4 space-y-4">
              {tourEvents.length > 0 ? (
                tourEvents.map((day, index) => {
                  // Get the first tour event from this day
                  const tourEvent = day.events.find(e =>
                    e.desc.toLowerCase().includes('tour') ||
                    e.desc.toLowerCase().includes('visit')
                  );

                  if (!tourEvent) return null;

                  // Extract location from details if available
                  const locationDetail = tourEvent.details?.find(d =>
                    d.toLowerCase().includes('location:')
                  );
                  const location = locationDetail
                    ? locationDetail.replace('Location:', '').trim()
                    : t('dashboard.location_unknown', 'Location unknown');

                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-md border">
                      <div>
                        <p className="font-medium">{tourEvent.desc}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{day.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{tourEvent.time || t('dashboard.time_tbd', 'TBD')}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{location}</span>
                        </div>
                      </div>
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                  );
                }).filter(Boolean)
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  {t('dashboard.no_tours', 'No tours scheduled')}
                </div>
              )}
            </TabsContent>

            <TabsContent value="other" className="mt-4 space-y-4">
              {otherEvents.length > 0 ? (
                otherEvents.map((day, index) => {
                  // Get the first event from this day
                  const otherEvent = day.events[0];

                  if (!otherEvent) return null;

                  // Extract location from details if available
                  const locationDetail = otherEvent.details?.find(d =>
                    d.toLowerCase().includes('location:')
                  );
                  const location = locationDetail
                    ? locationDetail.replace('Location:', '').trim()
                    : '';

                  // Determine icon based on event description
                  const getEventIcon = () => {
                    const desc = otherEvent.desc.toLowerCase();
                    if (desc.includes('dinner') || desc.includes('meal') || desc.includes('restaurant')) {
                      return <Utensils className="h-6 w-6 text-primary" />;
                    } else if (desc.includes('hotel') || desc.includes('accommodation') || desc.includes('check-in')) {
                      return <Hotel className="h-6 w-6 text-primary" />;
                    } else if (desc.includes('flight') || desc.includes('airport') || desc.includes('plane')) {
                      return <Plane className="h-6 w-6 text-primary" />;
                    } else {
                      return <Calendar className="h-6 w-6 text-primary" />;
                    }
                  };

                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-md border">
                      <div>
                        <p className="font-medium">{otherEvent.desc}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{day.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{otherEvent.time || t('dashboard.time_tbd', 'TBD')}</span>
                          </div>
                        </div>
                        {location && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>{location}</span>
                          </div>
                        )}
                      </div>
                      {getEventIcon()}
                    </div>
                  );
                }).filter(Boolean)
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  {t('dashboard.no_other_events', 'No other events scheduled')}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}