'use client';

import * as React from 'react';
import { TimelineProvider } from './context';
import { Timeline, TimelineItem, TimelineConnector, TimelineHeader, TimelineTitle, 
         TimelineIcon, TimelineDescription, TimelineContent, TimelineTime, TimelineEmpty } from './timeline';
import { TimelineCard } from './timeline-card';

// Re-export all components
export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineTitle,
  TimelineIcon,
  TimelineDescription,
  TimelineContent,
  TimelineTime,
  TimelineEmpty,
  TimelineCard,
  TimelineProvider,
};

// Export types
export type { 
  TimelineProps,
  TimelineItemProps,
  TimelineIconProps,
  TimelineConnectorProps,
  TimelineCardProps,
  TimelineLayoutProps,
  TimelineElement,
} from './types';
