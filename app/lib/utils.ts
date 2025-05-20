import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names into a single string, handling Tailwind class conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import type { ItineraryDay, TripEvent } from './types';

/**
 * Finds the next upcoming event from an itinerary
 */
export function getNextEvent(itinerary: ItineraryDay[] = []) {
  if (!itinerary || itinerary.length === 0) {
    return { next: null, upcoming: [] };
  }

  // Flatten all events from all days
  const allEvents: Array<TripEvent & { date: string }> = [];

  itinerary.forEach(day => {
    if (day.events && Array.isArray(day.events)) {
      day.events.forEach(event => {
        allEvents.push({
          ...event,
          date: day.date // Add the date to each event
        });
      });
    }
  });

  // Sort by date/time
  const sortedEvents = [...allEvents].sort((a, b) => {
    try {
      // Handle cases where time might be empty
      const timeA = a.time || '00:00';
      const timeB = b.time || '00:00';

      const dateA = new Date(`${a.date}, 2025 ${timeA}`).getTime();
      const dateB = new Date(`${b.date}, 2025 ${timeB}`).getTime();
      return dateA - dateB;
    } catch (error) {
      console.error('Error sorting events:', error);
      return 0;
    }
  });

  // Find the next event after current time
  const now = new Date().getTime();
  const upcoming = sortedEvents.filter(event => {
    try {
      const time = event.time || '00:00';
      const eventTime = new Date(`${event.date}, 2025 ${time}`).getTime();
      return eventTime > now;
    } catch (error) {
      console.error('Error filtering events:', error);
      return false;
    }
  });

  return {
    next: upcoming.length > 0 ? upcoming[0] : null,
    upcoming: upcoming.slice(0, 5) // Return next 5 upcoming events
  };
}