import React from 'react';
import { Clock, MapPin, Bus, AlertCircle, Utensils, Activity as ActivityIcon, Trophy, Bed } from 'lucide-react';

import type { Activity } from '../../../../../stores/itinerary.types';

interface TimelineItemProps {
  activity: Activity;
}

export default function TimelineItem({ activity }: TimelineItemProps) {
  const getIcon = (type: Activity['type']) => {
    switch(type) {
      case 'transport': return <Bus className="w-3 h-3 text-white" />;
      case 'match': return <Trophy className="w-3 h-3 text-white" />;
      case 'meal': return <Utensils className="w-3 h-3 text-white" />;
      case 'hotel': return <Bed className="w-3 h-3 text-white" />;
      case 'activity': return <ActivityIcon className="w-3 h-3 text-white" />;
      default: return <Clock className="w-3 h-3 text-white" />;
    }
  };

  return (
    <div className="relative pl-8 pb-8 last:pb-0 w-full">
      <div className="absolute left-0 top-0 flex h-full justify-center">
        <div className="h-full w-px bg-gray-300"></div>
      </div>
      <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center">
        <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center">
              {getIcon(activity.type)}
            </div> {/* Placeholder for event type icon */}
      </div>
      <div className="space-y-1">
            <h6 className="text-md font-semibold">{activity.time} - {activity.title}</h6>
            {activity.duration && <p className="text-sm flex items-center gap-1"><Clock className="w-3 h-3" /> {activity.duration}</p>}
            {activity.location?.name && <p className="text-sm flex items-center gap-1"><MapPin className="w-3 h-3" /> {activity.location.name}</p>}
            {activity.transport?.mode && <p className="text-sm flex items-center gap-1"><Bus className="w-3 h-3" /> {activity.transport.mode}</p>}
            {activity.important && <p className="text-sm flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Important</p>}
          </div>
      {/* Render other timeline item details here */}
    </div>
  );
}
