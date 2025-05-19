import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { type HTMLMotionProps } from 'framer-motion';
import type { TimelineColor } from '../../../lib/types';

/**
 * Timeline component props interface
 */
export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  /** Size of the timeline */
  size?: 'sm' | 'md' | 'lg';
  /** Size of the timeline icons */
  iconSize?: 'sm' | 'md' | 'lg';
  /** Whether to animate timeline items */
  animate?: boolean;
  /** Whether to show connectors between timeline items */
  showConnectors?: boolean;
  /** Default color for timeline icons */
  defaultIconColor?: TimelineColor;
  /** Default status for timeline items */
  defaultStatus?: 'completed' | 'in-progress' | 'pending';
  /** Whether timeline items are clickable */
  clickable?: boolean;
  /** Whether timeline items are expandable */
  expandable?: boolean;
  /** Whether the timeline is in a loading state */
  isLoading?: boolean;
  /** Whether the timeline has an error */
  hasError?: boolean;
  /** Error message if hasError is true */
  errorMessage?: string;
  /** Custom class names */
  className?: string;
}

/**
 * Timeline item props interface
 */
export interface TimelineItemProps<T = any> extends Omit<HTMLMotionProps<'li'>, 'children'> {
  /** Data associated with the timeline item */
  data?: T;
  /** Title of the timeline item */
  title?: string;
  /** Time of the event */
  time?: string;
  /** Date string for the timeline item */
  date?: string;
  /** Description text */
  description?: string;
  /** Custom icon element */
  icon?: React.ReactNode;
  /** Color theme for the icon */
  iconColor?: TimelineColor;
  /** Current status of the item */
  status?: 'completed' | 'in-progress' | 'pending';
  /** Whether to show the connector line */
  showConnector?: boolean;
  /** Whether the item is expanded */
  expanded?: boolean;
  /** Default expanded state */
  defaultExpanded?: boolean;
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
  /** Whether the item is clickable */
  clickable?: boolean;
  /** Callback when the item is clicked */
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
  /** Location information */
  location?: {
    name: string;
    address?: string;
    lat: number;
    lng: number;
  };
  /** Transport information */
  transport?: {
    mode: string;
    details?: string;
  };
  /** Associated documents */
  documents?: string[];
  /** Additional notes */
  notes?: string;
  /** Custom location renderer */
  renderLocation?: (location: NonNullable<TimelineItemProps<T>['location']>) => React.ReactNode;
  /** Custom transport renderer */
  renderTransport?: (transport: NonNullable<TimelineItemProps<T>['transport']>) => React.ReactNode;
  /** Custom documents renderer */
  renderDocuments?: (documents: NonNullable<TimelineItemProps<T>['documents']>) => React.ReactNode;
}

/**
 * Timeline card props interface
 */
export interface TimelineCardProps<T = any> extends React.HTMLAttributes<HTMLDivElement> {
  /** Data associated with the timeline item */
  data?: T;
  /** Title of the card */
  title?: string;
  /** Time of the event */
  time?: string;
  /** Location information */
  location?: {
    name: string;
    address?: string;
    lat: number;
    lng: number;
  };
  /** Transport information */
  transport?: {
    mode: string;
    details?: string;
  };
  /** Associated documents */
  documents?: string[];
  /** Additional notes */
  notes?: string;
  /** Whether the card is expanded */
  expanded?: boolean;
  /** Default expanded state */
  defaultExpanded?: boolean;
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
  /** Custom location renderer */
  renderLocation?: (location: NonNullable<TimelineCardProps<T>['location']>) => React.ReactNode;
  /** Custom transport renderer */
  renderTransport?: (transport: NonNullable<TimelineCardProps<T>['transport']>) => React.ReactNode;
  /** Custom documents renderer */
  renderDocuments?: (documents: NonNullable<TimelineCardProps<T>['documents']>) => React.ReactNode;
}

/**
 * Timeline icon props interface
 */
export interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon element - can be any valid React node */
  icon?: React.ReactNode;
  /** Color theme using CSS variables */
  color?: TimelineColor;
  /** Current status */
  status?: 'completed' | 'in-progress' | 'pending';
  /** Icon size */
  iconSize?: 'sm' | 'md' | 'lg';
}

/**
 * Timeline connector props interface
 */
export interface TimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current status */
  status?: 'completed' | 'in-progress' | 'pending';
  /** Color theme */
  color?: TimelineColor;
}

/**
 * Timeline layout props interface
 */
export interface TimelineLayoutProps {
  /** Array of timeline elements to display */
  items: TimelineElement[];
  /** Size of the timeline */
  size?: 'sm' | 'md' | 'lg';
  /** Color theme for icons */
  iconColor?: TimelineColor;
  /** Custom icon element */
  customIcon?: React.ReactNode;
  /** Whether to animate timeline items */
  animate?: boolean;
  /** Color theme for connector lines */
  connectorColor?: TimelineColor;
  /** Custom class names */
  className?: string;
}

/**
 * Timeline element interface
 */
export interface TimelineElement {
  /** Date string for the timeline item */
  date?: string;
  /** Title of the timeline item */
  title: string;
  /** Description text */
  description?: string;
  /** Custom icon element or function returning an icon */
  icon?: React.ReactNode | (() => React.ReactNode);
  /** Color theme */
  color?: TimelineColor;
}