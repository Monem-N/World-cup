import * as React from 'react';
import { TimelineItem } from '~/components/ui/timeline';
import type { Activity, TimelineColor } from '~/lib/types';
import MapView from '../MapView';
import TransportInfo from '../TransportInfo';

interface TimelineItemAdapterProps {
  activity: Activity;
}

const activityTypeToIcon: Record<Activity['type'], TimelineColor> = {
  transport: 'accent',
  match: 'primary',
  meal: 'secondary',
  hotel: 'muted',
  activity: 'primary',
};

export function TimelineItemAdapter({ activity }: TimelineItemAdapterProps) {
  const {
    title,
    time,
    type,
    location,
    transport,
    attachments,
    notes,
    status,
  } = activity;

  return (
    <TimelineItem
      data={activity}
      title={title}
      time={time}
      iconColor={activityTypeToIcon[type]}
      status={status === 'confirmed' ? 'completed' : status === 'pending' ? 'pending' : 'in-progress'}
      location={location ? {
        name: location.name,
        address: location.address,
        lat: location.lat,
        lng: location.lng,
      } : undefined}
      transport={transport ? {
        mode: transport.mode,
        details: transport.carrier,
      } : undefined}
      documents={attachments}
      notes={notes}
      renderLocation={(loc) => <MapView location={loc} />}
      renderTransport={(trans) => <TransportInfo transport={trans} />}
    />
  );
}