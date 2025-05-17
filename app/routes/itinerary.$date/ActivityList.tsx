import React from 'react';
import ActivityCard from './ActivityCard';

interface ActivityListProps {
  activities: any[]; // Replace 'any' with the actual type for activities
}

export default function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="grid gap-4">
      <h3 className="text-xl font-bold mb-2">Activities</h3>
      {activities.map(activity => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
