'use client';

import * as React from 'react';
import { cn } from '../../../lib/utils';
import { cva } from 'class-variance-authority';
import { AlertCircle, Loader2 } from 'lucide-react';
import { TimelineProvider, useTimelineContext } from './context';
import type { TimelineProps } from './types';
import type { TimelineColor } from '../../../lib/types';

const timelineVariants = cva('flex flex-col relative', {
  variants: {
    size: {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/**
 * Timeline component for displaying a vertical list of events or items
 * @component
 */
const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({
    className,
    iconSize,
    size = 'md',
    animate = true,
    showConnectors = true,
    defaultIconColor = 'primary',
    defaultStatus = 'completed',
    clickable = false,
    expandable = true,
    isLoading = false,
    hasError = false,
    errorMessage = '',
    children,
    ...props
  }, ref) => {
    const items = React.Children.toArray(children as React.ReactNode);
    const isEmpty = items.length === 0;

    // Render the timeline with context provider
    return (
      <TimelineProvider
        size={size}
        iconSize={iconSize}
        animate={animate}
        showConnectors={showConnectors}
        defaultIconColor={defaultIconColor}
        defaultStatus={defaultStatus}
        clickable={clickable}
        expandable={expandable}
        isLoading={isLoading}
        hasError={hasError}
        errorMessage={errorMessage}
        isEmpty={isEmpty}
      >
        <TimelineList
          ref={ref}
          className={className}
          items={items}
          {...props}
        />
      </TimelineProvider>
    );
  },
);
Timeline.displayName = 'Timeline';

/**
 * Internal TimelineList component that consumes the context
 * @component
 */
const TimelineList = React.forwardRef<HTMLOListElement, Omit<TimelineProps, 'size' | 'iconSize'> & { items: React.ReactNode[] }>(
  ({ className, items, children, ...props }, ref) => {
    const {
      size,
      iconSize,
      isLoading,
      hasError,
      errorMessage,
      isEmpty,
      showConnectors
    } = useTimelineContext();

    // Loading state
    if (isLoading) {
      return (
        <div className="w-full py-8 space-y-6">
          <TimelineSkeleton />
        </div>
      );
    }

    // Error state
    if (hasError) {
      return (
        <div
          className="w-full p-6 border border-destructive/50 bg-destructive/10 rounded-md text-center"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="h-6 w-6 text-destructive mx-auto mb-2" />
          <p className="text-destructive font-medium">{errorMessage || 'An error occurred loading the timeline'}</p>
        </div>
      );
    }

    // Empty state
    if (isEmpty) {
      return <TimelineEmpty />;
    }

    return (
      <ol
        ref={ref}
        aria-label="Timeline"
        className={cn(
          timelineVariants({ size }),
          'relative w-full max-w-2xl mx-auto py-8',
          className
        )}
        {...props}
      >
        {React.Children.map(items, (child, index) => {
          if (
            React.isValidElement(child) &&
            typeof child.type !== 'string' &&
            'displayName' in child.type &&
            child.type.displayName === 'TimelineItem'
          ) {
            return React.cloneElement(child, {
              iconSize,
              showConnector: showConnectors && index !== items.length - 1,
            } as any);
          }
          return child;
        })}
      </ol>
    );
  }
);
TimelineList.displayName = 'TimelineList';

/**
 * TimelineSkeleton component for displaying a loading state
 * @component
 */
const TimelineSkeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("space-y-8", className)}
      role="status"
      aria-label="Loading timeline"
      {...props}
    >
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
            {i !== 3 && <div className="h-24 w-0.5 bg-muted mt-2" />}
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            <div className="h-12 bg-muted rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
);
TimelineSkeleton.displayName = 'TimelineSkeleton';

// Import the new TimelineItem implementation
import { TimelineItem as TimelineItemImpl } from './timeline-item';

interface TimelineTimeProps extends React.HTMLAttributes<HTMLTimeElement> {
  /** Date string, Date object, or timestamp */
  date?: string | Date | number;
  /** Optional format for displaying the date */
  format?: Intl.DateTimeFormatOptions;
}

const defaultDateFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
};

const TimelineTime = React.forwardRef<HTMLTimeElement, TimelineTimeProps>(
  ({ className, date, format, children, ...props }, ref) => {
    const formattedDate = React.useMemo(() => {
      if (!date) return '';

      try {
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) return '';

        return new Intl.DateTimeFormat('en-US', {
          ...defaultDateFormat,
          ...format,
        }).format(dateObj);
      } catch (error) {
        console.error('Error formatting date:', error);
        return '';
      }
    }, [date, format]);

    return (
      <time
        ref={ref}
        dateTime={date ? new Date(date).toISOString() : undefined}
        className={cn(
          'text-sm font-medium tracking-tight text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1',
          className
        )}
        {...props}
      >
        {children || formattedDate}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </time>
    );
  },
);
TimelineTime.displayName = 'TimelineTime';

const TimelineConnector = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    status?: 'completed' | 'in-progress' | 'pending';
    color?: 'primary' | 'secondary' | 'muted' | 'accent';
  }
>(({ className, status = 'completed', color, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'w-0.5',
      {
        'bg-primary': color === 'primary' || (!color && status === 'completed'),
        'bg-muted': color === 'muted' || (!color && status === 'pending'),
        'bg-secondary': color === 'secondary',
        'bg-accent': color === 'accent',
        'bg-gradient-to-b from-primary to-muted': !color && status === 'in-progress',
      },
      className,
    )}
    {...props}
  />
));
TimelineConnector.displayName = 'TimelineConnector';

const TimelineHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-4', className)} {...props} />
  ),
);
TimelineHeader.displayName = 'TimelineHeader';

const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight text-secondary-foreground', className)}
    {...props}
  >
    {children}
  </h3>
));
TimelineTitle.displayName = 'TimelineTitle';

interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon element - can be any valid React node */
  icon?: React.ReactNode;
  /** Color theme using CSS variables */
  color?: TimelineColor;
  /** Current status */
  status?: 'completed' | 'in-progress' | 'pending';
  /** Icon size */
  iconSize?: 'sm' | 'md' | 'lg';
}

const TimelineIcon = React.forwardRef<HTMLDivElement, TimelineIconProps>(
  ({ className, icon, color = 'primary', status = 'completed', iconSize = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-10 w-10',
    };

    const iconSizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };

    // Enhanced color classes with better visual hierarchy and depth
    const colorClasses = {
      primary: 'bg-primary text-primary-foreground shadow-md shadow-primary/20',
      secondary: 'bg-secondary text-secondary-foreground shadow-md shadow-secondary/20',
      accent: 'bg-accent text-accent-foreground shadow-md shadow-accent/20',
      muted: 'bg-muted text-muted-foreground shadow-sm shadow-muted/10',
      destructive: 'bg-destructive text-destructive-foreground shadow-md shadow-destructive/20',
    };

    // Status-specific styling with visual indicators
    const statusClasses = {
      completed: 'ring-2 ring-primary/30 ring-offset-2 ring-offset-background',
      'in-progress': 'ring-2 ring-accent/30 ring-offset-2 ring-offset-background animate-pulse',
      pending: 'ring-1 ring-muted/20 ring-offset-1 ring-offset-background opacity-80',
    };



    return (
      <div
        ref={ref}
        className={cn(
          'relative flex items-center justify-center rounded-full transition-all duration-300',
          sizeClasses[iconSize],
          colorClasses[color],
          statusClasses[status],
          className,
        )}
        {...props}
      >
        {icon ? (
          <div className={cn('flex items-center justify-center text-current', iconSizeClasses[iconSize])}>
            {icon}
          </div>
        ) : null}
      </div>
    );
  },
);
TimelineIcon.displayName = 'TimelineIcon';

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('max-w-sm text-sm text-muted-foreground', className)} {...props} />
));
TimelineDescription.displayName = 'TimelineDescription';

const TimelineContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-2 pl-2', className)} {...props} />
  ),
);
TimelineContent.displayName = 'TimelineContent';

const TimelineEmpty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col items-center justify-center p-8 text-center', className)}
      {...props}
    >
      <p className="text-sm text-muted-foreground">{children || 'No timeline items to display'}</p>
    </div>
  ),
);
TimelineEmpty.displayName = 'TimelineEmpty';

export {
  Timeline,
  TimelineItemImpl as TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineTitle,
  TimelineIcon,
  TimelineDescription,
  TimelineContent,
  TimelineTime,
  TimelineEmpty,
  TimelineSkeleton,
};
