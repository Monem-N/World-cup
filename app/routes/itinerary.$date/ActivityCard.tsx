import React from 'react';
import { cn } from '../../lib/utils';
import MapView from './components/MapView';
import TransportInfo from './components/TransportInfo';
import DocumentLinks from './components/DocumentLinks';
import ChecklistItem from './components/ChecklistItem';
import NotesDialog from './components/NotesDialog';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import type { Activity } from '../../../stores/itinerary.types';

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const [isNotesOpen, setIsNotesOpen] = React.useState(false);
  return (
    <Card className={cn("mb-4", {
      "border-2 border-yellow-400": activity.important,
      "border-2 border-blue-400": activity.requiresConfirmation
    })} aria-label={activity.title}>
      <CardHeader>
        <CardTitle>{activity.title}</CardTitle>
        <p className="text-sm text-gray-500">Time: {activity.time}</p>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Render other activity details here */}
        {activity.location && (
          <div className="pb-4 last:pb-0 mb-4">
            <h5 className="text-lg font-semibold mb-2">Location</h5>
            <MapView location={activity.location} />
          </div>
        )}
        {activity.transport && (
          <div className="pb-4 last:pb-0 mb-4">
            <h5 className="text-lg font-semibold mb-2">Transport</h5>
            <TransportInfo transport={activity.transport} />
          </div>
        )}
        {activity.attachments && (
          <div className="pb-4 last:pb-0 mb-4">
            <h5 className="text-lg font-semibold mb-2">Documents</h5>
            <DocumentLinks attachments={activity.attachments} />
          </div>
        )}
        <div className="flex items-center justify-between">
           <ChecklistItem activityId={activity.id} status={activity.status} />

          <NotesDialog
            notes={activity.notes}
            open={isNotesOpen}
            onOpenChange={setIsNotesOpen}
            aria-label="Activity Notes"
          />
        </div>
      </CardContent>
    </Card>
  );
}
