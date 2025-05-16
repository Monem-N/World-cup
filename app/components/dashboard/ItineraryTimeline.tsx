import type { ItineraryDay, TripEvent } from '../../lib/types';
import { Timeline, TimelineItem, TimelineTime, TimelineTitle, TimelineDescription } from '../ui/timeline';
// Assuming a translation function 't' is available
// import { useTranslation } from 'react-i18next'; // Example import
// import React, { memo } from 'react'; // Example for memoization

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

  const flattenedEvents = flattenItinerary(itinerary);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">
        {/* {t('itinerary.timeline.title')} Example i18n */}
        Itinerary Timeline
      </h2>
      {flattenedEvents.length > 0 ? (
        <Timeline>
          {flattenedEvents.map((event, index) => (
            <TimelineItem
              key={event.id || index}
              date={event.date} // Pass event date to TimelineItem date prop
              title={event.time} // Pass event time to TimelineItem title prop
              description={event.desc} // Pass event description to TimelineItem description prop
            >
              {/* No children needed here if using props */}
            </TimelineItem>
          ))}
        </Timeline>
      ) : (
        <p>{/* {t('itinerary.timeline.noItinerary')} Example i18n */}No itinerary data available.</p>
      )}
    </div>
  );
}
