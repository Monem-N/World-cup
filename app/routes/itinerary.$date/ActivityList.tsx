import type { Activity } from '../../../stores/itinerary.types';
import React from 'react';
import Timeline from './components/Timeline';

interface ActivityListProps {
  activities: Activity[];
}

export default function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="grid gap-4">
      <h3 className="text-xl font-bold mb-2">Activities</h3>
      <Timeline activities={activities} />
    </div>
  );
}
