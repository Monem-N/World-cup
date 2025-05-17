// stores/itinerary.types.ts

export type ActivityStatus = 'pending' | 'confirmed' | 'completed';

export interface Location {
  name: string;
  lat: number;
  lng: number;
  address?: string;
  contact?: string;
  confirmationNumber?: string;
  website?: string;
  mapUrl?: string;
  venueType?: string;
  reservation?: {
    underName: string;
    time: string;
    confirmationNumber: string;
    // Add other reservation details as needed
  };
  // Add any other location-specific fields from your mock
}

export interface TransportDetails {
  mode: string;
  carrier?: string;
  bookingReference?: string;
  pickup_time?: string;
  pickup_location?: string;
  dropoff_location?: string; // Add this from the plan
  seatAssignments?: { [key: string]: string };
  estimated_cost?: number;
  shared_with?: string[];
  notes?: string; // Keep notes in transport if needed, but maybe prefer activity level?
  // Add any other transport-specific fields from your mock
}

export interface Activity {
  id: string;
  type: 'transport' | 'match' | 'meal' | 'hotel' | 'activity'; // Ensure 'activity' type is included if used
  title: string;
  time: string;
  duration?: string;
  location?: Location;
  transport?: TransportDetails;
  notes?: string; // Standard notes field for the activity
  attachments?: string[]; // Array of URLs or file paths
  status: ActivityStatus;
  important?: boolean;
  requiresConfirmation?: boolean;
  isGroupEvent?: boolean; // Use camelCase as recommended
  // Add any other activity-level fields from your mock
}

export interface DayProgram { // Consolidated from ItineraryData and DayProgram
  date: string;
  title: string;
  summary: string;
  weather?: {
    forecast: string;
    temperature: string;
    wind: string;
    icon: string;
    // Add other weather details
  };
  reminders?: string[];
  docs?: string[]; // Array of URLs or file paths for day-level documents
  items: Activity[]; // Array of Activity types
  // Add any other day-level fields from your mock
}

export interface ItineraryState {
  currentItinerary: DayProgram | null;
}
