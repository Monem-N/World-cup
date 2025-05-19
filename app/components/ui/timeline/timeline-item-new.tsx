import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '~/lib/utils';
import { TimelineCard } from './timeline-card';
import { TimelineIcon } from './timeline';
import type { TimelineItemProps } from './types';
import type { TimelineColor } from '~/lib/types';


export function TimelineItem<T>({
  data,
  title,
  time,
  date,
  icon,
  iconColor = 'primary',
  status = 'completed',
  showConnector = true,
  location,
  transport,
  documents,
  notes,
  className,
  renderLocation,
  renderTransport,
  renderDocuments,
  ...props
}: TimelineItemProps<T>) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn('relative flex gap-4', className)}
      {...props}
    >
      {/* Timeline dot and connector */}
      <div className="flex flex-col items-center">
        <TimelineIcon
          icon={icon}
          color={iconColor}
          status={status}
          iconSize="md"
        />
        {showConnector && (
          <div
            className={cn(
              'w-px grow',
              status === 'completed' ? 'bg-primary' :
              status === 'in-progress' ? 'bg-accent' :
              'bg-muted'
            )}
          />
        )}
      </div>

      {/* Timeline content */}
      <div className="flex-1 pt-1">
        {date && (
          <time
            dateTime={date}
            className="block text-sm font-medium text-muted-foreground mb-2"
          >
            {date}
          </time>
        )}
        <TimelineCard
          data={data}
          title={title}
          time={time}
          location={location}
          transport={transport}
          documents={documents}
          notes={notes}
          renderLocation={renderLocation}
          renderTransport={renderTransport}
          renderDocuments={renderDocuments}
        />
      </div>
    </motion.li>
  );
}

TimelineItem.displayName = 'TimelineItem';