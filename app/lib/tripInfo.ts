import React from 'react';
import type { ItineraryDay, TripInformation, TravelEssential, WeatherInfo, TripEvent } from './types';

export interface Trip {
  overview: {
    title: string;
    location: string;
    participants: string[];
    duration: number;
  };
  itinerary: ItineraryDay[];
  essentials: TravelEssential[];
  destination: string;
  startDate: string;
  endDate: string;
  weather: WeatherInfo[];
  travelers: number;
}

export interface Day {
  date: string;
  events: TripEvent[];
  id: string;
}

export const tripInfo: Trip = { // Corrected type to Trip
  overview: {
    title: "FIFA Club World Cup 2025 USA Trip",
    location: "New York/Jersey City area, Nashville",
    participants: ["6 adults"],
    duration: 12, // June 14-25 is 12 days
  },
  itinerary: [
    {
      date: "June 14, 2025",
      events: [
        { id: "event-day1-1", time: "10:45-13:00", desc: "Outbound Flight DL0141 - Brussels (BRU) → New York (JFK)", details: ["Cabin: Main cabin", "Baggage: 1x23 Kg", "Booking Reference: TTA4RV"] },
        { id: "event-day1-2", time: "After 16:00", desc: "Check-in at Jersey City Accommodation", details: ["Address: 35 Dwight St, 1st floor, Jersey City, NJ 07305", "Reservation: HA-50R169"] },
      ],
      id: "day-1"
    },
    {
      date: "June 15, 2025",
      events: [
        { id: "event-day2-1", time: "", desc: "Non-Match Day: Free day in New York/NJ area", details: ["Suggested Activities: Jersey Gardens Outlet Mall (Elizabeth, NJ)", "Manhattan sightseeing (Times Square, Central Park)"] },
      ],
      id: "day-2"
    },
    {
      date: "June 16, 2025",
      events: [
        { id: "event-day3-1", time: "21:00", desc: "Match 8: CR Flamengo vs EST", details: ["Location: Lincoln Financial Field, Philadelphia", "Tickets: Category PSUPPA", "Note: Plan for travel time to Philadelphia (approximately 2 hours from Jersey City)"] },
      ],
      id: "day-3"
    },
    {
      date: "June 17, 2025",
      events: [
        { id: "event-day4-1", time: "", desc: "Non-Match Day: Free day in New York/NJ area", details: ["Suggested Activities: Woodbury Common Premium Outlets (Central Valley, NY)", "Statue of Liberty & Ellis Island tour"] },
      ],
      id: "day-4"
    },
    {
      date: "June 18, 2025",
      events: [
        { id: "event-day5-1", time: "", desc: "Non-Match Day: Free day in New York/NJ area", details: ["Suggested Activities: Empire State Building", "Fifth Avenue shopping"] },
      ],
      id: "day-5"
    },
    {
      date: "June 19, 2025",
      events: [
        { id: "event-day6-1", time: "21:42-23:15", desc: "Flight UA2038 - Newark (EWR) → Nashville (BNA)", details: ["Terminal: A", "Class: Economy", "Note: Baggage allowance to be confirmed with United Airlines"] },
      ],
      id: "day-6"
    },
    {
      date: "June 20, 2025",
      events: [
        { id: "event-day7-1", time: "18:00", desc: "Match 23: Club León vs EST", details: ["Location: GEODIS Park, Nashville", "Tickets: Category PSUPPA", "Note: Nashville accommodation needed (not yet booked)"] },
      ],
      id: "day-7"
    },
    {
      date: "June 21, 2025",
      events: [
        { id: "event-day8-1", time: "06:00-09:27", desc: "Flight B61074 - Nashville (BNA) → New York (JFK)", details: ["Terminal: T5", "Class: Economy", "Note: Baggage allowance to be confirmed with JetBlue"] },
      ],
      id: "day-8"
    },
    {
      date: "June 22, 2025",
      events: [
        { id: "event-day9-1", time: "", desc: "Non-Match Day: Free day in New York/NJ area", details: ["Suggested Activities: Top of the Rock observation deck", "Brooklyn Bridge walk"] },
      ],
      id: "day-9"
    },
    {
      date: "June 23, 2025",
      events: [
        { id: "event-day10-1", time: "", desc: "Non-Match Day: Free day in New York/NJ area", details: ["Suggested Activities: One World Observatory", "The Oculus & Westfield World Trade Center shopping"] },
      ],
      id: "day-10"
    },
    {
      date: "June 24, 2025",
      events: [
        { id: "event-day11-1", time: "21:00", desc: "Match 40: EST vs Chelsea FC", details: ["Location: Lincoln Financial Field, Philadelphia", "Tickets: Category PSUPPA", "Note: Plan for travel time to Philadelphia (approximately 2 hours from Jersey City)"] },
      ],
      id: "day-11"
    },
    {
      date: "June 25, 2025",
      events: [
        { id: "event-day12-1", time: "Before 11:00", desc: "Check-out from Jersey City Accommodation", details: [""] },
        { id: "event-day12-2", time: "18:55-08:40+1", desc: "Return Flight DL0140 - New York (JFK) → Brussels (BRU)", details: ["Arrival in Brussels on June 26", "Cabin: Main cabin", "Baggage: 1x23 Kg"] },
      ],
      id: "day-12"
    },
  ],
  essentials: [
    { id: "essential-1", name: "Comfortable walking shoes", category: "Essentials", packed: false },
    { id: "essential-2", name: "Light jacket or sweater", category: "Essentials", packed: false },
    { id: "essential-3", name: "Umbrella or light raincoat", category: "Essentials", packed: false },
    { id: "essential-4", name: "Sunscreen, sunglasses, and hat", category: "Essentials", packed: false },
    { id: "essential-5", name: "Refillable water bottle", category: "Essentials", packed: false },
    { id: "essential-6", name: "Team merchandise/colors", category: "Soccer Matches", packed: false },
    { id: "essential-7", name: "Comfortable stadium clothing", category: "Soccer Matches", packed: false },
    { id: "essential-8", name: "Small backpack", category: "Soccer Matches", packed: false },
    { id: "essential-9", name: "Phone and charger", category: "Electronics", packed: false },
    { id: "essential-10", name: "Camera", category: "Electronics", packed: false },
    { id: "essential-11", name: "Power bank", category: "Electronics", packed: false },
    { id: "essential-12", name: "US power adapters (Type A/B, 120V)", category: "Electronics", packed: false },
  ],
  destination: "New York/Jersey City, Nashville",
  startDate: "June 14, 2025",
  endDate: "June 25, 2025",
  weather: [
    { date: "June 14-25, 2025", temperature: 70, condition: "Moderate chance of rain", icon: "cloud-rain" }, // Using 70 as a representative temp for the range
    { date: "June 19-21, 2025", temperature: 75, condition: "Low to moderate chance of rain", icon: "cloud-rain" }, // Using 75 as a representative temp for the range
  ],
  travelers: 6,
};
