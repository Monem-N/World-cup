import React, { useState, useMemo, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api';
import { useGoogleMaps } from '~/components/maps/GoogleMapsLoader';
import type { Activity } from '~/lib/types';
import { Card, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { MapIcon, ExternalLinkIcon } from 'lucide-react';

interface ItineraryMapViewProps {
  activities: Activity[];
}

// Map container style
const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '400px'
};

// Default center (will be adjusted based on markers)
const defaultCenter = {
  lat: 40.7128, // New York City coordinates as default
  lng: -74.0060
};

// Map options
const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
};

const ItineraryMapView: React.FC<ItineraryMapViewProps> = ({ activities }) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Filter activities with valid locations
  const activitiesWithLocations = useMemo(() =>
    activities.filter(activity =>
      activity.location?.lat && activity.location?.lng
    ),
    [activities]
  );

  // Handle marker click
  const handleMarkerClick = useCallback((activity: Activity) => {
    setSelectedActivity(activity);
  }, []);

  // Close info window
  const handleInfoWindowClose = useCallback(() => {
    setSelectedActivity(null);
  }, []);

  // Open in Google Maps
  const openInGoogleMaps = useCallback((lat: number, lng: number) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank', 'noopener,noreferrer');
  }, []);

  // If Google Maps is not loaded yet or there's an error, show a placeholder
  if (!isLoaded || loadError) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <MapIcon className="h-12 w-12 text-muted-foreground" />
            {loadError ? (
              <p className="text-destructive">Error loading Google Maps</p>
            ) : (
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // If there are no activities with locations, show a message
  if (activitiesWithLocations.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <MapIcon className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">No locations to display on the map</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full h-[500px] rounded-md overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
        options={mapOptions}
      >
        <MarkerClusterer>
          {(clusterer) => (
            <div>
              {activitiesWithLocations.map((activity) => (
                <Marker
                  key={activity.id}
                  position={{
                    lat: activity.location!.lat,
                    lng: activity.location!.lng
                  }}
                  title={activity.title}
                  onClick={() => handleMarkerClick(activity)}
                  clusterer={clusterer}
                />
              ))}
            </div>
          )}
        </MarkerClusterer>

        {selectedActivity && selectedActivity.location && (
          <InfoWindow
            position={{
              lat: selectedActivity.location.lat,
              lng: selectedActivity.location.lng
            }}
            onCloseClick={handleInfoWindowClose}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-medium text-base mb-1">{selectedActivity.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{selectedActivity.time}</p>
              {selectedActivity.location.address && (
                <p className="text-xs text-gray-500 mb-2">{selectedActivity.location.address}</p>
              )}
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs flex items-center justify-center gap-1"
                onClick={() => openInGoogleMaps(
                  selectedActivity.location!.lat,
                  selectedActivity.location!.lng
                )}
              >
                <ExternalLinkIcon className="h-3 w-3" />
                Open in Google Maps
              </Button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default ItineraryMapView;