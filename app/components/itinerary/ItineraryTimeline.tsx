import {
  PlaneIcon,
  UtensilsIcon,
  Trophy,
  BedIcon,
  MapIcon,
  CircleIcon
} from 'lucide-react';
import { ActivityCard } from './ActivityCard';
import type { Activity } from '~/lib/types';

interface ItineraryTimelineProps {
  activities: Activity[];
  className?: string;
  onStatusChange?: (id: string, status: Activity['status']) => void;
  itineraryDate: string;
}

export function ItineraryTimeline({ activities, className, onStatusChange, itineraryDate }: ItineraryTimelineProps) {
  // Sort activities by time
  const sortedActivities = [...activities].sort((a, b) => {
    return a.time.localeCompare(b.time);
  });

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        {sortedActivities.map((activity, index) => (
          <div key={activity.id} className="mb-8 relative">
            {/* Timeline connector */}
            {index < sortedActivities.length - 1 && (
              <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-muted-foreground/20" style={{ transform: 'translateX(-50%)' }} />
            )}

            <div className="flex items-start gap-4">
              {/* Timeline icon */}
              <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${getIconBgColorForType(activity.type)} text-white`}>
                {getIconForActivityType(activity.type)}
              </div>

              {/* Activity card */}
              <div className="flex-1">
                <ActivityCard
                  activity={activity}
                  onStatusChange={onStatusChange}
                  itineraryDate={itineraryDate}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getIconForActivityType(type: Activity['type']) {
  const iconClass = "h-4 w-4";

  switch (type) {
    case 'transport':
      return <PlaneIcon className={iconClass} />;
    case 'match':
      return <Trophy className={iconClass} />;
    case 'meal':
      return <UtensilsIcon className={iconClass} />;
    case 'hotel':
      return <BedIcon className={iconClass} />;
    case 'activity':
      return <MapIcon className={iconClass} />;
    default:
      return <CircleIcon className={iconClass} />;
  }
}

function getIconBgColorForType(type: Activity['type']): string {
  switch (type) {
    case 'transport': return 'bg-blue-500';
    case 'match': return 'bg-green-500';
    case 'meal': return 'bg-amber-500';
    case 'hotel': return 'bg-indigo-500';
    case 'activity': return 'bg-violet-500';
    default: return 'bg-gray-500';
  }
}
