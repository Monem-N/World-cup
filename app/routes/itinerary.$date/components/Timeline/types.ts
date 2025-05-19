import type { Activity, TimelineColor } from '~/lib/types';
import type { HTMLMotionProps } from '~/lib/types';

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  activities: Activity[];
  isLoading?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}

export interface TimelineItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  activity: Activity;
  isLast?: boolean;
  showConnector?: boolean;
  className?: string;
}

export interface TimelineCardProps extends React.HTMLAttributes<HTMLDivElement> {
  activity: Activity;
  title?: string;
  time?: string;
  location?: {
    name: string;
    address?: string;
    lat: number;
    lng: number;
  };
  transport?: {
    mode: string;
    details?: string;
  };
  documents?: string[];
  notes?: string;
  data?: any;
  renderLocation?: (location: any) => React.ReactNode;
  renderTransport?: (transport: any) => React.ReactNode;
  renderDocuments?: (documents: string[]) => React.ReactNode;
  showLocation?: boolean;
  showTransport?: boolean;
  showDocuments?: boolean;
  showNotes?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export interface TimelineItemAdapterProps {
  activity: Activity;
  isLast?: boolean;
}