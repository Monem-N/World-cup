import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import type { ItineraryDay, TripEvent } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNextEvent(itinerary: ItineraryDay[]): { next: (TripEvent & { date: string }) | null; nextDate: Date | null } {
  const now = new Date();
  let next: (TripEvent & { date: string }) | null = null;
  let nextDate: Date | null = null;

  for (const day of itinerary) {
    const dayDate = new Date(Date.parse(day.date + ', 2025'));

    for (const event of day.events) {
      let eventDate = new Date(dayDate);
      const timeMatch = event.time.match(/(\d{2}:\d{2})/);

      if (timeMatch) {
        const [h, m] = timeMatch[1].split(':');
        eventDate.setHours(Number(h), Number(m), 0, 0);

        // Convert event time to UTC based on event location's timezone
        const timezone = event.timezone || 'America/New_York'; // Default to ET
        eventDate = toZonedTime(eventDate, timezone);
      }

      // Convert current time to event's timezone for comparison
      const nowInEventTz = fromZonedTime(now, event.timezone || 'America/New_York');

      if (!nextDate || (eventDate > nowInEventTz && (!nextDate || eventDate < nextDate))) {
        next = { ...event, date: day.date };
        nextDate = eventDate;
      }
    }
  }

  return { next, nextDate };
}
