import type { TripEvent } from '../../lib/types';
// Assuming a translation function 't' is available
// import { useTranslation } from 'react-i18next'; // Example import

interface ItineraryEventItemProps {
  event: TripEvent;
}

export default function ItineraryEventItem({ event }: ItineraryEventItemProps) {
  // const { t } = useTranslation(); // Example usage

  return (
    <li className="mb-1 flex items-start">
      {/* Time */}
      <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">
        {/* {t('itinerary.event.time', { time: event.time })} Example i18n */}
        {event.time}
      </span>
      {/* Description */}
      <span className="text-gray-600 dark:text-gray-400 flex-1">
        {/* {t('itinerary.event.description', { description: event.desc })} Example i18n */}
        {event.desc}
      </span>
    </li>
  );
}
