import React from 'react';
import type { Location } from '../../../../stores/itinerary.types';

// Assuming Google Maps integration will be handled here

interface MapViewProps {
  location: Location;
}

export default function MapView({ location }: MapViewProps) {
  // Implement Google Maps rendering here
  return (
    <div className="w-full h-64 border rounded-md flex items-center justify-center text-gray-500">
      {/* Google Maps component will go here */}
      <p className="text-sm"> location : {location.lat}, {location.lng}</p>
      <p>Map placeholder for {location.name}</p>
    </div>
  );
}
