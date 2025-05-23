import React from 'react';
import { useNavigate } from 'react-router';
import type { ItineraryDay, TripEvent } from '../../lib/types';
import { Timeline, TimelineItem } from '../ui/timeline';
// Uncomment when i18n is implemented
// import { useTranslation } from 'react-i18next';

interface ItineraryTimelineProps {
  itinerary?: ItineraryDay[];
}

// Helper function to flatten itinerary days into a single list of events with date info
const flattenItinerary = (itinerary?: ItineraryDay[]): (TripEvent & { date: string })[] => {
  if (!itinerary) return [];
  return itinerary.flatMap(day =>
    day.events?.map(event => ({
      ...event,
      date: day.date, // Add date to each event
    })) || []
  );
};

export default function ItineraryTimeline({ itinerary }: ItineraryTimelineProps) {
  // const { t } = useTranslation(); // Example usage
  const navigate = useNavigate();

  const flattenedEvents = flattenItinerary(itinerary);

  // Function to format date for URL
  const formatDateForUrl = (dateString: string) => {
    try {
      // Handle different date formats
      let date: Date;

      // Check if the date is in "Month Day, Year" format (e.g., "June 17, 2025")
      if (/[A-Za-z]+ \d{1,2}, \d{4}/.test(dateString)) {
        date = new Date(dateString);
      }
      // Check if the date is already in ISO format (YYYY-MM-DD)
      else if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString; // Already in the correct format
      }
      // Try to parse as a general date string
      else {
        date = new Date(dateString);
      }

      // Check if the date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid date:', dateString);
        return null;
      }

      // Format as YYYY-MM-DD for the URL
      const year = date.getFullYear();
      // Month is 0-indexed, so add 1 and pad with leading zero if needed
      const month = String(date.getMonth() + 1).padStart(2, '0');
      // Pad day with leading zero if needed
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return null;
    }
  };

  // Handle click on a timeline item
  const handleTimelineItemClick = (dateString: string) => {
    const formattedDate = formatDateForUrl(dateString);
    if (formattedDate) {
      navigate(`/itinerary/${formattedDate}`);
    } else {
      console.warn('Could not navigate: invalid date format', dateString);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">
          {/* Uncomment when i18n is implemented */}
          {/* {t('itinerary.timeline.title')} */}
          Itinerary Timeline
        </h2>
        <p className="text-xs text-muted-foreground">Click on a date to view detailed itinerary</p>
      </div>
      {flattenedEvents.length > 0 ? (
        <Timeline
          clickable={true}
          animate={true}
          size="md"
          defaultIconColor="primary"
        >
          {flattenedEvents.map((event, index) => (
            <TimelineItem
              key={event.id || index}
              date={event.date}
              title={event.time}
              description={event.desc}
              onClick={() => handleTimelineItemClick(event.date)}
              aria-label={`View itinerary for ${event.date}`}
              status="completed"
              iconColor={index === 0 ? 'primary' : 'muted'}
            />
          ))}
        </Timeline>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          {/* Uncomment when i18n is implemented */}
          {/* {t('itinerary.timeline.noItinerary')} */}
          No itinerary data available.
        </div>
      )}
    </div>
  );
}
