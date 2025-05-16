import type { ItineraryDay } from '../../lib/types';
import ItineraryEventItem from './ItineraryEventItem';
// Assuming a translation function 't' and date formatting utility are available
// import { useTranslation } from 'react-i18next'; // Example import
// import { formatDate } from '../../lib/utils'; // Example utility

interface ItineraryDaySectionProps {
  day: ItineraryDay;
}

export default function ItineraryDaySection({ day }: ItineraryDaySectionProps) {
  // const { t } = useTranslation(); // Example usage
  // const formattedDate = formatDate(day.date, t('locale')); // Example usage

  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">
        {/* {formattedDate} Example i18n */}
        {day.date}
      </h3>
      {day.events && day.events.length > 0 ? (
        <ul className="list-none pl-0">
          {day.events.map((event) => (
            <ItineraryEventItem key={event.id} event={event} />
          ))}
        </ul>
      ) : (
        <p>{/* {t('itinerary.noEvents')} Example i18n */}No events for this day.</p>
      )}
    </div>
  );
}
