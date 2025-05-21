import { MapPinIcon, PhoneIcon, LinkIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import type { Location } from '~/lib/types';

interface LocationDetailsProps {
  location: Location;
}

export function LocationDetails({ location }: LocationDetailsProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Location Details</h4>
      
      <div className="bg-muted/30 rounded-lg p-3 space-y-2">
        {location.address && (
          <div className="flex items-start gap-2 text-sm">
            <MapPinIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <span>{location.address}</span>
          </div>
        )}
        
        {location.contact && (
          <div className="flex items-start gap-2 text-sm">
            <PhoneIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <span>{location.contact}</span>
          </div>
        )}
        
        {location.website && (
          <div className="flex items-start gap-2 text-sm">
            <LinkIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <a href={location.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {location.website}
            </a>
          </div>
        )}
        
        {location.confirmationNumber && (
          <div className="text-sm">
            <span className="text-muted-foreground">Confirmation:</span>
            <span className="ml-1 font-medium">{location.confirmationNumber}</span>
          </div>
        )}
        
        {location.lat && location.lng && (
          <div className="mt-3">
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full text-xs"
              onClick={() => {
                const url = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
            >
              View on Map
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
