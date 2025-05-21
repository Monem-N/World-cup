import React, { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';

// Define the libraries we want to load
const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];

// Create a context to provide Google Maps loading state
export const GoogleMapsContext = React.createContext<{
  isLoaded: boolean;
  loadError: Error | undefined;
}>({
  isLoaded: false,
  loadError: undefined,
});

interface GoogleMapsLoaderProps {
  children: React.ReactNode;
}

export function GoogleMapsLoader({ children }: GoogleMapsLoaderProps) {
  // Get the Google Maps API key from environment variables
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
  const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string;

  // Load the Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    mapIds: mapId ? [mapId] : undefined,
    libraries,
  });

  // Provide the loading state to children
  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}

// Custom hook to use the Google Maps context
export function useGoogleMaps() {
  const context = React.useContext(GoogleMapsContext);
  if (context === undefined) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsLoader');
  }
  return context;
}
