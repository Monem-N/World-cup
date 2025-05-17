import * as React from 'react';
import type { Activity } from '../../../../../stores/itinerary.types';
import { Timeline, TimelineItem } from '~/components/ui/timeline';

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  activities: Activity[];
}

export default function ItineraryTimeline({ activities }: TimelineProps) {
  return (
    <Timeline className="mb-6">
      <h3 className="text-xl font-bold mb-4">Timeline</h3>
      {activities.map(activity => (
        <TimelineItem key={activity.id}>
          <div className="pl-8 pb-8 last:pb-0">
            <div className="absolute left-0 top-0 flex h-full justify-center">
              <div className="h-full w-px bg-gray-300"></div>
            </div>
            <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-blue-500"></div>
            </div>
            <h6 className="text-md font-semibold">{activity.time} - {activity.title}</h6>
          </div>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
