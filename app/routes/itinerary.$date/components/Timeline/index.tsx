import * as React from 'react';
import { Timeline } from '~/components/ui/timeline';
import { TimelineItemAdapter } from './TimelineItemAdapter';
import type { TimelineProps } from './types';

export default function ItineraryTimeline({ activities, ...props }: TimelineProps) {
  // Check if we have activities
  const hasActivities = activities && activities.length > 0;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Timeline</h3>
      <Timeline
        className="mb-6"
        expandable={true}
        animate={true}
        isLoading={!hasActivities && props.isLoading}
        hasError={props.hasError}
        errorMessage={props.errorMessage}
      >
        {hasActivities ? (
          activities.map(activity => (
            <TimelineItemAdapter key={activity.id} activity={activity} />
          ))
        ) : null}
      </Timeline>
    </div>
  );
}
