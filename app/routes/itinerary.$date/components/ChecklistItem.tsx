import React from 'react';
import { useItineraryStoreActions } from '../../../../stores/itinerary';
import type { ActivityStatus } from '../../../../stores/itinerary.types';
import { Checkbox } from '../../../components/ui/checkbox';

interface ChecklistItemProps {
  activityId: string;
  status: ActivityStatus;
}

export default function ChecklistItem({ activityId, status }: ChecklistItemProps) {
  const isCompleted = status === 'completed';
  const { updateActivityStatus } = useItineraryStoreActions(); // Use the actions hook

  const handleCheckboxChange = () => {
    const newStatus = isCompleted ? 'pending' : 'completed';
    updateActivityStatus(activityId, newStatus);
  };

  return (
    <div className="flex items-center">
      <label className="flex items-center cursor-pointer text-sm text-gray-700">
        <Checkbox
          checked={isCompleted}
          onCheckedChange={handleCheckboxChange}
          className="mr-2"
        />
        Mark as Done
      </label>
    </div>
  );
}
