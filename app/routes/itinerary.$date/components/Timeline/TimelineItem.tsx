import * as React from 'react';
import { Clock, Bus, Utensils, Activity as ActivityIcon, Trophy, Bed, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '~/lib/utils';
import { TimelineCard } from './TimelineCard';
import { TimelineIcon } from '~/components/ui/timeline/timeline';
import type { TimelineItemProps } from './types';
import type { Activity } from '../../../../../stores/itinerary.types'; // Import Activity type


export default function TimelineItem({
  activity,
  showConnector = true,
  className,
  ...props
}: TimelineItemProps) {
  const [showDetails, setShowDetails] = React.useState(false);

  const getActivityIcon = (type: Activity['type']): React.ReactNode => {
    switch (type) {
      case 'transport': return <Bus className="h-full w-full" />;
      case 'match': return <Trophy className="h-full w-full" />;
      case 'meal': return <Utensils className="h-full w-full" />;
      case 'hotel': return <Bed className="h-full w-full" />;
      case 'activity': return <ActivityIcon className="h-full w-full" />;
      default: return <Clock className="h-full w-full" />;
    }
  };

  const getActivityColor = (type: Activity['type']): 'primary' | 'secondary' | 'accent' | 'muted' => {
    switch (type) {
      case 'transport': return 'accent';
      case 'match': return 'primary';
      case 'meal': return 'secondary';
      case 'hotel': return 'muted';
      case 'activity': return 'primary';
      default: return 'muted';
    }
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };


  return (
    <li
      className={cn(
        'relative flex gap-4 group',
        'hover:bg-accent/5 rounded-lg transition-colors duration-200 p-2 -m-2',
        className
      )}
      {...props}
    >
      {/* Time display on the left */}
      <div className="w-16 text-right pr-2 pt-1.5 flex-shrink-0">
        <time className="text-xs font-medium text-muted-foreground whitespace-nowrap">
          {activity.time}
        </time>
      </div>

      {/* Timeline dot with icon and connector */}
      <div className="flex flex-col items-center z-10">
        {/* Timeline dot with icon */}
        <TimelineIcon
          icon={getActivityIcon(activity.type)}
          color={getActivityColor(activity.type)}
          status={activity.status === 'confirmed' ? 'completed' : activity.status === 'pending' ? 'pending' : 'in-progress'}
          iconSize="md"
          className={cn(
            'cursor-pointer transition-all duration-300',
            'hover:scale-110 hover:ring-2 hover:ring-offset-2 hover:ring-primary/20',
            'group-hover:shadow-lg'
          )}
        />
        {showConnector && (
          <div
            className={cn(
              'grow relative',
              'after:absolute after:left-1/2 after:-translate-x-1/2 after:top-0 after:bottom-0',
              'after:w-0.5 after:rounded-full',
              activity.status === 'confirmed'
                ? 'after:bg-gradient-to-b after:from-primary after:to-primary/30 after:shadow-[0_0_8px_rgba(var(--primary),0.2)]'
                : activity.status === 'pending'
                  ? 'after:bg-gradient-to-b after:from-accent after:to-accent/20 after:opacity-70'
                  : 'after:bg-gradient-to-b after:from-muted after:to-muted/10 after:opacity-50'
            )}
          />
        )}
      </div>

      {/* Activity content area */}
      <div className="flex-1 pt-1">
        <div
          className={cn(
            "flex items-center gap-2 cursor-pointer rounded-md",
            "transition-all duration-200",
            "hover:bg-accent/10 p-1 -m-1",
            showDetails && "bg-accent/5"
          )}
          onClick={handleToggleDetails}
          aria-expanded={showDetails}
          aria-controls={`activity-details-${activity.id}`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleToggleDetails()}
        >
          <div className="flex-1">
            <h3 className={cn(
              "text-sm font-medium",
              activity.important && "font-semibold text-primary"
            )}>
              {activity.title}
              {activity.important && (
                <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                  Important
                </span>
              )}
            </h3>
          </div>
          <div className={cn(
            "h-6 w-6 rounded-full flex items-center justify-center",
            "transition-colors duration-200",
            showDetails ? "bg-accent/20" : "bg-muted/10",
            "group-hover:bg-accent/30"
          )}>
            {showDetails ?
              <ChevronUp className="w-3.5 h-3.5 text-foreground/70" /> :
              <ChevronDown className="w-3.5 h-3.5 text-foreground/70" />
            }
          </div>
        </div>

        {showDetails && (
          <div
            id={`activity-details-${activity.id}`}
            className={cn(
              "mt-3 ml-1",
              "animate-in fade-in-0 slide-in-from-top-2 duration-200",
              "border-l-2 border-accent/20 pl-4 py-1"
            )}
          >
            <TimelineCard
              activity={activity}
              title={activity.title}
              time={activity.time}
              location={activity.location ? {
                name: activity.location.name,
                address: activity.location.address,
                lat: activity.location.lat,
                lng: activity.location.lng,
              } : undefined}
              transport={activity.transport ? {
                mode: activity.transport.mode,
                details: activity.transport.carrier,
              } : undefined}
              documents={activity.attachments}
              notes={activity.notes}
              className="shadow-sm hover:shadow-md transition-shadow duration-300"
            />
          </div>
        )}
      </div>
    </li>
  );
}
