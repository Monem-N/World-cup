import { Card } from "../ui/card";
import { useTripInfo } from "../../lib/tripContext";

interface TripSummaryCardProps {
  overview: {
    dates: string;
    travelers: string;
    locations: string;
  };
}

export function TripSummaryCard({ overview }: TripSummaryCardProps) {
  return (
    <Card className="p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl font-bold mb-4 tracking-tight">Trip Summary</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Destination</h3>
          <p className="text-muted-foreground">{overview.locations}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Duration</h3>
          <p className="text-muted-foreground">
            {overview.dates}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Travelers</h3>
          <p className="text-muted-foreground">{overview.travelers}</p>
        </div>
      </div>
    </Card>
  );
}