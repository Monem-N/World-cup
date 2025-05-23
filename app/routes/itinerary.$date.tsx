import { Outlet } from "react-router";
import { useTranslation } from "react-i18next";

export function handle() {
  const { t } = useTranslation();
  return {
    breadcrumb: (data: any) => {
      // Format the date for the breadcrumb
      if (data?.date) {
        const formattedDate = new Date(data.date).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric'
        });
        return formattedDate;
      }
      return t('itinerary.dayDetails', 'Day Details');
    },
  };
}

export function loader({ params }: { params: { date: string } }) {
  return { date: params.date };
}

export default function ItineraryDateLayout() {
  return <Outlet />;
}
