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
