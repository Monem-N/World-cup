import React from 'react';
import Timeline from './components/Timeline';

interface ActivityListProps {
  activities: any[]; // Replace 'any' with the actual type for activities
}

export default function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="grid gap-4">
      <h3 className="text-xl font-bold mb-2">Activities</h3>
      <Timeline activities={activities} />
    </div>
  );
}
