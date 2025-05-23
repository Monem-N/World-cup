import { Outlet } from "react-router";

export function handle() {
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
      return "Day Details";
    },
  };
}

export function loader({ params }: { params: { date: string } }) {
  return { date: params.date };
}

export default function ItineraryDateLayout() {
  return <Outlet />;
}