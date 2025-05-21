import {
  PlaneIcon,
  TrainIcon,
  BusIcon,
  CarIcon,
  ShipIcon,
  FootprintsIcon
} from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import type { TransportDetails as TransportDetailsType } from '~/lib/types';

interface TransportDetailsProps {
  transport: TransportDetailsType;
}

export function TransportDetails({ transport }: TransportDetailsProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Transport Details</h4>

      <div className="bg-muted/30 rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-2">
          {getTransportIcon(transport.mode)}
          <span className="font-medium">{transport.mode}</span>
          {transport.carrier && (
            <span className="text-sm text-muted-foreground">
              with {transport.carrier}
            </span>
          )}
        </div>

        {transport.bookingReference && (
          <div className="text-sm">
            <span className="text-muted-foreground">Booking Reference:</span>
            <span className="ml-1 font-medium">{transport.bookingReference}</span>
          </div>
        )}

        {transport.pickup_time && (
          <div className="text-sm">
            <span className="text-muted-foreground">Pickup Time:</span>
            <span className="ml-1 font-medium">{formatTime(transport.pickup_time)}</span>
          </div>
        )}

        {transport.pickup_location && (
          <div className="text-sm">
            <span className="text-muted-foreground">Pickup Location:</span>
            <span className="ml-1 font-medium">{transport.pickup_location}</span>
          </div>
        )}

        {transport.estimated_cost && (
          <div className="text-sm">
            <span className="text-muted-foreground">Estimated Cost:</span>
            <span className="ml-1 font-medium">${transport.estimated_cost}</span>
          </div>
        )}

        {transport.shared_with && transport.shared_with.length > 0 && (
          <div className="text-sm">
            <span className="text-muted-foreground">Shared With:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {transport.shared_with.map((person, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {person}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {transport.notes && (
          <div className="text-sm mt-2">
            <span className="text-muted-foreground">Notes:</span>
            <p className="mt-1">{transport.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function getTransportIcon(mode: string) {
  const iconClass = "h-4 w-4";

  switch (mode.toLowerCase()) {
    case 'flight':
    case 'plane':
    case 'airplane':
      return <PlaneIcon className={iconClass} />;
    case 'train':
      return <TrainIcon className={iconClass} />;
    case 'bus':
      return <BusIcon className={iconClass} />;
    case 'car':
      return <CarIcon className={iconClass} />;
    case 'taxi':
    case 'uber':
    case 'lyft':
      return <CarIcon className={iconClass} />;
    case 'boat':
    case 'ferry':
    case 'ship':
      return <ShipIcon className={iconClass} />;
    case 'walk':
    case 'walking':
      return <FootprintsIcon className={iconClass} />;
    default:
      return <CarIcon className={iconClass} />;
  }
}

function formatTime(time: string): string {
  if (!time) return '';

  // Convert 24-hour format to 12-hour format
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}
