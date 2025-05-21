interface WeatherInfo {
  temperature?: {
    high?: number;
    low?: number;
    unit?: string; // e.g., "C", "F"
  };
  condition?: string; // e.g., "Sunny", "Partly Cloudy", "Rain"
  icon?: string; // URL or identifier for a weather icon
  details?: any; // Flexible field for additional weather data
}

interface Location {
  name?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  website?: string;
  contact?: string;
  details?: any; // Flexible field for additional location details
}

interface TransportDetails {
  mode: string; // e.g., "Flight", "Train", "Uber", "Bus", "Walking", "Metro", "Ferry"
  carrier?: string; // e.g., "Delta Airlines", "NJ Transit", "Uber"
  number?: string; // e.g., flight number, bus number, train number
  from?: Location;
  to?: Location;
  duration?: string;
  cost?: string;
  notes?: string;
  details?: any; // Flexible field for additional transport details (e.g., stops, frequency)
}

interface Activity {
  id: string; // Descriptive ID (e.g., "flight-bru-jfk-20250614")
  type: "transport" | "match" | "meal" | "hotel" | "activity"; // Defined activity types
  status: "pending" | "confirmed" | "completed"; // Status of the activity
  time: string; // 24-hour format (e.g., "09:00")
  duration?: string; // Duration of the activity (e.g., "1h30", "2 hours")
  title: string; // Title of the activity
  description?: string; // Description of the activity
  location?: Location; // Location of the activity
  transport?: TransportDetails; // Transport details for this activity
  important?: boolean; // Flag for critical activities
  details?: any; // Flexible field for additional activity details
}

interface DayItinerary {
  date: string; // ISO format (YYYY-MM-DD)
  title?: string;
  summary?: string;
  location?: string;
  theme?: string;
  weather?: WeatherInfo; // Weather information for the day
  schedule?: Activity[]; // Array of activities for the day
  areaSuggestions?: {
    area: string;
    suggestions: {
      name: string;
      details?: string;
    }[];
  }[];
  options?: {
    type: string;
    name: string;
    details?: any;
  }[];
  checklist?: string[];
  tips?: string[];
  reminders?: string[]; // Added reminders field
  whyItsMagic?: string[];
  bonusSuggestions?: {
    type: string;
    name: string;
    location?: string;
    details?: string;
  }[];
  mapView?: {
    markers?: {
      label: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    }[];
    routeSuggestion?: {
      mode: string;
      estimatedTime: string;
    };
  };
  placesToVisitLater?: {
    name: string;
    reason?: string;
    recommendedFor?: string;
  }[];
  details?: any;
}

interface Itinerary {
  dateRange: string; // Represents the date or date range of the itinerary (e.g., "2025-06-14" or "2025-06-19_2025-06-21")
  title?: string;
  summary?: string;
  theme?: string;
  days?: DayItinerary[]; // Array of DayItinerary objects
  practicalActions?: {
    action: string;
    details?: string;
  }[];
  concludingRemarks?: string[];
  details?: any;
}
