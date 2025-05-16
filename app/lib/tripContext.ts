import React, { createContext, useContext } from 'react';
import type { TripInformation } from './types';
import { tripInfo as actualTripInfo } from './tripInfo'; // Import the actual tripInfo

interface TripContextType {
  tripInfo: TripInformation;
}

const TripContext = createContext<TripContextType>({
  tripInfo: {} as TripInformation,
});

export function TripProvider({ children }: { children: React.ReactNode }) {
  // Use the imported actualTripInfo instead of placeholder data
  const tripInfo: TripInformation = actualTripInfo as TripInformation;

  return (
    React.createElement(TripContext.Provider, { value: { tripInfo } }, children)
  );
}

export const useTripInfo = () => useContext(TripContext);
