import React from 'react';
import type { Location } from '../../../../stores/itinerary.types';

interface MapViewProps {
  location: Location;
}

export default function MapView({ location }: MapViewProps) {
  return (
    <div className="w-full h-64 border rounded-md p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">{location.name}</h3>
        {location.mapUrl && (
          <a 
            href={location.mapUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Open in Maps
          </a>
        )}
      </div>
      
      {location.address && (
        <p className="text-gray-600 text-sm">{location.address}</p>
      )}
      
      <div className="flex flex-col space-y-1 text-sm text-gray-500">
        {location.contact && (
          <p>Contact: {location.contact}</p>
        )}
        {location.confirmationNumber && (
          <p>Confirmation: {location.confirmationNumber}</p>
        )}
        {location.website && (
          <a 
            href={location.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            Visit Website
          </a>
        )}
      </div>
      
      <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-400">
        Coordinates: {location.lat}, {location.lng}
      </div>
    </div>
  );
}
