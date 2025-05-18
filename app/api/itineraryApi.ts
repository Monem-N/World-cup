import type { ItineraryData } from '../types/itinerary';

// Using mock data for now
export const mockItineraryData: ItineraryData = {
  date: "2025-02-05",
  title: "Arrival + Match Day",
  summary: "Arrive in New Jersey, check-in, attend opening match.",
  weather: {
    forecast: "Partly cloudy",
    temperature: "7°C",
    wind: "15 km/h",
    icon: "cloudy"
  },
  reminders: ["Bring printed match ticket", "Charge phone power bank"],
  docs: ["hotel-checkin.pdf", "match-ticket.pdf"],
  items: [
    {
      id: "breakfast1",
      type: "meal",
      title: "Breakfast at Airport",
      time: "06:30",
      duration: "1h",
      location: {
        name: "Heathrow Airport Terminal 5",
        lat: 51.4700,
        lng: -0.4543
      },
      notes: "Grab a quick breakfast before boarding",
      status: "pending"
    },
    {
      id: "lunch1",
      type: "meal",
      title: "Lunch at JFK",
      time: "14:30",
      duration: "1h",
      location: {
        name: "JFK Terminal 5",
        lat: 40.6413,
        lng: -73.7781
      },
      notes: "Have lunch after immigration",
      status: "pending"
    },
    {
      id: "meeting1",
      type: "activity",
      title: "Group Meeting at Hotel",
      time: "19:00",
      duration: "30m",
      location: {
        name: "Hotel XYZ Conference Room",
        lat: 40.7128,
        lng: -74.0060
      },
      notes: "Discuss match day plans",
      status: "pending",
      isGroupEvent: true
    },
    {
      id: "flight1",
      type: "transport",
      title: "Flight from London to New York",
      time: "08:00",
      duration: "8h",
      location: {
        name: "Heathrow Airport (LHR)",
        lat: 51.4700,
        lng: -0.4543
      },
      transport: {
        mode: "Flight",
        carrier: "British Airways",
        bookingReference: "BA245",
        seatMap: {
          "Alice": "10A",
          "Bob": "10B",
          "Charlie": "10C"
        },
        notes: "Check-in online beforehand."
      },
      attachments: ["flight-ticket.pdf"],
      status: "completed"
    },
    {
      id: "transfer1",
      type: "transport",
      title: "Airport Transfer to Hotel",
      time: "16:00",
      duration: "1h",
      location: {
        name: "John F. Kennedy International Airport (JFK)",
        lat: 40.6413,
        lng: -73.7781
      },
      transport: {
        mode: "Taxi",
        pickup_time: "16:00",
        pickup_location: "Terminal 5, outside arrivals",
        estimated_cost: 60
      },
      status: "pending"
    },
    {
      id: "hotel1",
      type: "hotel",
      title: "Check-in at Hotel XYZ",
      time: "17:30",
      location: {
        name: "Hotel XYZ",
        address: "123 Main St, New York, NY",
        lat: 40.7128,
        lng: -74.0060,
        contact: "+1 212-555-1212",
        confirmationNumber: "HXYZ987"
      },
      notes: "Early check-in requested.",
      status: "pending"
    },
    {
      id: "match1",
      type: "match",
      title: "Opening Match at MetLife Stadium",
      time: "20:00",
      duration: "2h",
      location: {
        name: "MetLife Stadium",
        address: "1 MetLife Stadium Dr, East Rutherford, NJ",
        lat: 40.8135,
        lng: -74.0745
      },
      transport: {
        mode: "Uber",
        pickup_time: "18:30",
        pickup_location: "Terminal 5, outside arrivals",
        estimated_cost: 40,
        shared_with: ["User1", "User2", "User3"]
      },
      notes: "Arrive early for security checks. Seat Section 134, Row 12.",
      attachments: ["match-ticket.pdf"],
      status: "pending",
      important: true,
      requiresConfirmation: true,
      isGroupEvent: true
    }
  ]
};

export async function fetchItinerary(date: string): Promise<ItineraryData> {
  console.log(`Fetching mock data for date: ${date}`);
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockItineraryData;
}