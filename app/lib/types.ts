export interface TripEvent {
  id: string;
  time: string;
  desc: string;
  details?: string[];
  timezone?: string;
}

export interface ItineraryDay {
  id: string;
  date: string;
  events: TripEvent[];
}

export interface WeatherInfo {
  date: string;
  temperature: number;
  condition: string;
  icon: string;
}

export interface TravelEssential {
  id: string;
  name: string;
  category: string;
  packed: boolean;
}

export interface Overview {
  dates: string;
  travelers: string;
  locations: string;
}

export interface TripInformation {
  overview: {
    title: string;
    location: string;
    participants: string[];
    duration: number;
  };
  dates: string;
  itinerary: ItineraryDay[];
  essentials: TravelEssential[];
  destination: string;
  startDate: string;
  endDate: string;
  weather: WeatherInfo[];
  travelers: number;
}

export type TimelineColor = 'primary' | 'secondary' | 'muted' | 'accent' | 'destructive';

export interface Activity {
  id: string;
  type: 'transport' | 'match' | 'meal' | 'hotel' | 'activity';
  title: string;
  time: string;
  duration?: string;
  location?: Location;
  transport?: TransportDetails;
  notes?: string;
  attachments?: string[];
  status: ActivityStatus;
  important?: boolean;
  requiresConfirmation?: boolean;
  isGroupEvent?: boolean;
}

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
}

export interface TransportDetails {
  mode: string;
  carrier?: string;
  bookingReference?: string;
  seatMap?: { [key: string]: string };
  pickup_time?: string;
  pickup_location?: string;
  estimated_cost?: number;
  shared_with?: string[];
  notes?: string;
}

export interface DayProgram {
  date: string;
  title: string;
  summary: string;
  weather?: WeatherInfo;
  reminders?: string[];
  docs?: string[];
  items: Activity[];
  _source?: 'supabase' | 'mock'; // Indicates where the data came from
}

export interface ItineraryState {
  currentItinerary: DayProgram | null;
}
export interface ItineraryData {
  date: string;
  title: string;
  summary: string;
  weather: {
    forecast: string;
    temperature: string;
    wind: string;
    icon: string;
  };
  reminders: string[];
  docs: string[];
  items: Activity[];
}

// Add HTMLMotionProps type for Framer Motion
import type { HTMLMotionProps as FramerHTMLMotionProps } from 'framer-motion';
export type HTMLMotionProps<T extends string> = any;