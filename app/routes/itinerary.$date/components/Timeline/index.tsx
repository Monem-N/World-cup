import * as React from 'react';
import type { Activity } from '../../../../../stores/itinerary.types';
import { Timeline } from '~/components/ui/timeline';
import TimelineItem from './TimelineItem';

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  activities: Activity[];
}

export default function ItineraryTimeline({ activities }: TimelineProps) {
  return (
    <Timeline className="mb-6">
      <h3 className="text-xl font-bold mb-4">Timeline</h3>
      {activities.map(activity => (
        <TimelineItem key={activity.id} activity={activity} />
      ))}
    </Timeline>
  );
}
