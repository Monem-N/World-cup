'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '~/lib/utils';
import { TimelineCard } from './timeline-card';
import { TimelineIcon } from './timeline';
import { useTimelineContext } from './context';
import type { TimelineItemProps } from './types';

/**
 * TimelineItem component for displaying a single timeline entry
 * @component
 */
export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>((
  {
    data,
    title,
    time,
    date,
    description,
    icon,
    iconColor = 'primary',
    status = 'completed',
    showConnector = true,
    expanded,
    defaultExpanded,
    onExpandedChange,
    clickable,
    onClick,
    location,
    transport,
    documents,
    notes,
    className,
    renderLocation,
    renderTransport,
    renderDocuments,
    ...props
  },
  ref
) => {
  // Get context values
  const { 
    animate = true, 
    defaultIconColor, 
    defaultStatus,
    clickable: contextClickable,
  } = useTimelineContext();

  // Use context values as fallbacks
  const finalIconColor = iconColor || defaultIconColor || 'primary';
  const finalStatus = status || defaultStatus || 'completed';
  const isClickable = clickable !== undefined ? clickable : contextClickable;

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // Handle click events
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (isClickable && onClick) {
      onClick(e);
    }
  };

  // Determine if we should render the card or just basic content
  const hasDetailedContent = location || transport || documents || notes;

  return (
    <motion.li
      ref={ref}
      initial={animate ? 'hidden' : undefined}
      animate={animate ? 'visible' : undefined}
      exit={animate ? 'exit' : undefined}
      variants={itemVariants}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative flex gap-4 pb-8 last:pb-0',
        isClickable && 'cursor-pointer hover:bg-accent/5 transition-colors',
        className
      )}
      onClick={handleClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `View details for ${title}` : undefined}
      {...props}
    >
      {/* Timeline dot and connector */}
      <div className="flex flex-col items-center">
        <TimelineIcon
          icon={icon}
          color={finalIconColor}
          status={finalStatus}
          iconSize="md"
          aria-hidden="true"
        />
        {showConnector && (
          <div
            className={cn(
              'w-px grow',
              finalStatus === 'completed' ? 'bg-primary' :
              finalStatus === 'in-progress' ? 'bg-accent' :
              'bg-muted'
            )}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Timeline content */}
      <div className="flex-1 pt-1">
        {date && (
          <time
            dateTime={typeof date === 'string' ? date : undefined}
            className="block text-sm font-medium text-muted-foreground mb-2"
          >
            {date}
          </time>
        )}
        
        {hasDetailedContent ? (
          <TimelineCard
            data={data}
            title={title}
            time={time}
            location={location}
            transport={transport}
            documents={documents}
            notes={notes}
            expanded={expanded}
            defaultExpanded={defaultExpanded}
            onExpandedChange={onExpandedChange}
            renderLocation={renderLocation}
            renderTransport={renderTransport}
            renderDocuments={renderDocuments}
          />
        ) : (
          <div className="space-y-1">
            {title && <h3 className="text-sm font-medium">{title}</h3>}
            {time && <p className="text-sm text-muted-foreground">{time}</p>}
            {description && <p className="text-sm">{description}</p>}
          </div>
        )}
      </div>
    </motion.li>
  );
});

TimelineItem.displayName = 'TimelineItem';
