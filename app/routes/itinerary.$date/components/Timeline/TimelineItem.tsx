import React from 'react';
import { Clock, MapPin, Bus, AlertCircle, Utensils, Activity as ActivityIcon, Trophy, Bed } from 'lucide-react';

import type { Activity } from '../../../../../stores/itinerary.types';
import ActivityCard from '../../ActivityCard';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TimelineItemProps {
  activity: Activity;
}

export default function TimelineItem({ activity }: TimelineItemProps) {
  const [showActivityCard, setShowActivityCard] = useState(false);

  const getIcon = (type: Activity['type']) => {
    switch (type) {
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
        <div className="h-full w-px bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center">
        <div className="h-4 w-4 rounded-full bg-blue-500 dark:bg-blue-700 flex items-center justify-center">
          {getIcon(activity.type)}
        </div> {/* Placeholder for event type icon */}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h6 className="text-md font-semibold">{activity.time} - {activity.title}</h6>
          <button onClick={() => setShowActivityCard(!showActivityCard)} className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
            {showActivityCard ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
        {activity.duration && <p className="text-sm flex items-center gap-1 text-gray-600 dark:text-gray-400"><Clock className="w-3 h-3" /> {activity.duration}</p>}
        {activity.location?.name && <p className="text-sm flex items-center gap-1 text-gray-600 dark:text-gray-400"><MapPin className="w-3 h-3" /> {activity.location.name}</p>}
        {activity.transport?.mode && <p className="text-sm flex items-center gap-1 text-gray-600 dark:text-gray-400"><Bus className="w-3 h-3" /> {activity.transport.mode}</p>}
        {activity.important && <p className="text-sm flex items-center gap-1 text-red-600 dark:text-red-400"><AlertCircle className="w-3 h-3" /> Important</p>}
        {showActivityCard && <ActivityCard activity={activity} />}
      </div>
    </div>
  );
}
