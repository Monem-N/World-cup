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

export interface Activity {
  id: string;
  type: 'transport' | 'match' | 'meal' | 'hotel'| 'activity';
  title: string;
  time: string;
  duration?: string;
  location?: {
    name: string;
    lat: number;
    lng: number;
    address?: string;
    contact?: string;
    confirmationNumber?: string;
  };
  transport?: {
    mode: string;
    carrier?: string;
    bookingReference?: string;
    seatMap?: { [key: string]: string };
    pickup_time?: string;
    pickup_location?: string;
    estimated_cost?: number;
    shared_with?: string[];
    notes?: string;
  };
  notes?: string;
  attachments?: string[];
  status: 'pending' | 'confirmed' | 'completed';
  important?: boolean;
  requiresConfirmation?: boolean;
  isGroupEvent?: boolean;
}