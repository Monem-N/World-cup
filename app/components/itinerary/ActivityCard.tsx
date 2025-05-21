import { useState } from 'react';
import {
  MapPinIcon,
  ClockIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckCircleIcon,
  CircleIcon,
  HelpCircleIcon
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { LocationDetails } from './LocationDetails';
import { TransportDetails } from './TransportDetails';
import type { Activity } from '~/lib/types';

interface ActivityCardProps {
  activity: Activity;
  className?: string;
  onStatusChange?: (id: string, status: Activity['status']) => void;
}

export function ActivityCard({ activity, className, onStatusChange }: ActivityCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={`w-full overflow-hidden border-l-4 ${getBorderColorForType(activity.type)} ${className}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={getVariantForType(activity.type)}>
                {formatActivityType(activity.type)}
              </Badge>
              {activity.important && (
                <Badge variant="destructive" className="h-5 px-1">
                  <AlertCircleIcon className="h-3 w-3 mr-1" />
                  Important
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-semibold">{activity.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>{formatTime(activity.time)}</span>
              {activity.duration && (
                <span className="ml-1">({activity.duration})</span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Badge variant={getStatusVariant(activity.status)}>
              {formatStatus(activity.status)}
            </Badge>

            {onStatusChange && (
              <div className="flex gap-1 mt-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => onStatusChange(activity.id, 'pending')}
                  disabled={activity.status === 'pending'}
                >
                  <CircleIcon className={`h-4 w-4 ${activity.status === 'pending' ? 'text-primary' : 'text-muted-foreground'}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => onStatusChange(activity.id, 'confirmed')}
                  disabled={activity.status === 'confirmed'}
                >
                  <HelpCircleIcon className={`h-4 w-4 ${activity.status === 'confirmed' ? 'text-primary' : 'text-muted-foreground'}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => onStatusChange(activity.id, 'completed')}
                  disabled={activity.status === 'completed'}
                >
                  <CheckCircleIcon className={`h-4 w-4 ${activity.status === 'completed' ? 'text-primary' : 'text-muted-foreground'}`} />
                </Button>
              </div>
            )}
          </div>
        </div>

        {activity.location && (
          <div className="mt-3 flex items-start gap-1 text-sm">
            <MapPinIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <span className="font-medium">{activity.location.name}</span>
          </div>
        )}

        {activity.notes && (
          <p className="mt-3 text-sm text-muted-foreground">{activity.notes}</p>
        )}

        {expanded && (
          <div className="mt-4 space-y-4">
            {activity.location && <LocationDetails location={activity.location} />}
            {activity.transport && <TransportDetails transport={activity.transport} />}

            {activity.attachments && activity.attachments.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Attachments</h4>
                <div className="flex flex-wrap gap-2">
                  {activity.attachments.map((attachment, index) => (
                    <Button key={index} variant="outline" size="sm" className="text-xs">
                      {attachment}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 py-2 bg-muted/20 flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="text-xs w-full"
        >
          {expanded ? (
            <>
              <ChevronUpIcon className="h-4 w-4 mr-1" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDownIcon className="h-4 w-4 mr-1" />
              Show More
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

function getBorderColorForType(type: Activity['type']): string {
  switch (type) {
    case 'transport': return 'border-blue-500';
    case 'match': return 'border-green-500';
    case 'meal': return 'border-amber-500';
    case 'hotel': return 'border-indigo-500';
    case 'activity': return 'border-violet-500';
    default: return 'border-gray-500';
  }
}

function getVariantForType(type: Activity['type']): "default" | "destructive" | "outline" | "secondary" | null | undefined {
  switch (type) {
    case 'transport': return 'default';
    case 'match': return 'secondary';
    case 'meal': return 'outline';
    case 'hotel': return 'default';
    case 'activity': return 'secondary';
    default: return 'default';
  }
}

function getStatusVariant(status: Activity['status']): "default" | "destructive" | "outline" | "secondary" | null | undefined {
  switch (status) {
    case 'completed': return 'default';
    case 'confirmed': return 'secondary';
    case 'pending': return 'outline';
    default: return 'outline';
  }
}

function formatActivityType(type: Activity['type']): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function formatStatus(status: Activity['status']): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
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
