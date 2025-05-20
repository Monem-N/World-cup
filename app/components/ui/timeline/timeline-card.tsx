'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../collapsible';
import { Button } from '../button';
import { ChevronDown, ChevronUp, MapPin, Bus, FileText, FileEdit } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';
import { Skeleton } from '../skeleton';
import type { TimelineCardProps } from './types';
import { useTimelineContext } from './context';
import { TimelineTime } from './timeline';

/**
 * TimelineCard component for displaying detailed timeline item information
 * @component
 */
const TimelineCardBase = React.forwardRef<HTMLDivElement, TimelineCardProps>((
  {
    data,
    title,
    time,
    location,
    transport,
    documents,
    notes,
    renderLocation,
    renderTransport,
    renderDocuments,
    expanded,
    defaultExpanded = false,
    onExpandedChange,
    className,
    ...props
  },
  ref
) => {
  // Get context values
  const { expandable = true } = useTimelineContext();

  // Local state for expansion
  const [isOpen, setIsOpen] = React.useState(expanded !== undefined ? expanded : defaultExpanded);
  const [activeSection, setActiveSection] = React.useState<string | null>(null);

  // Sync with controlled state
  React.useEffect(() => {
    if (expanded !== undefined) {
      setIsOpen(expanded);
    }
  }, [expanded]);

  // Handle state changes
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onExpandedChange?.(open);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveSection(activeSection === sectionId ? null : sectionId);
    }
  };

  // Check if we have any details to show
  const hasDetails = location || transport || documents?.length || notes;

  return (
    <Card
      ref={ref}
      className={cn("w-full hover:shadow-md transition-shadow duration-200", className)}
      role="region"
      aria-label={`Timeline event: ${title}`}
      {...props}
    >
      <Collapsible
        open={isOpen}
        onOpenChange={handleOpenChange}
        disabled={!expandable || !hasDetails}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {time && <TimelineTime date={time} className="text-sm text-muted-foreground" />}
          </div>
          {expandable && hasDetails && (
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-9 p-0"
                aria-expanded={isOpen}
                aria-controls="timeline-content"
                aria-label={`Toggle ${title} details`}
              >
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                )}
              </Button>
            </CollapsibleTrigger>
          )}
        </CardHeader>

        {hasDetails && (
          <CollapsibleContent id="timeline-content">
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Location Section */}
                {location && (
                  <div
                    className="space-y-2"
                    role="region"
                    aria-labelledby="location-heading"
                  >
                    <div
                      className="flex items-center gap-2 text-sm font-medium"
                      id="location-heading"
                    >
                      <MapPin className="h-4 w-4" />
                      <span>Location</span>
                    </div>
                    <div className="pl-6">
                      {renderLocation ? renderLocation(location) : (
                        <div>
                          <div className="font-medium">{location.name}</div>
                          {location.address && <div className="text-sm text-muted-foreground">{location.address}</div>}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Transport Section */}
                {transport && (
                  <div
                    className="space-y-2"
                    role="region"
                    aria-labelledby="transport-heading"
                  >
                    <div
                      className="flex items-center gap-2 text-sm font-medium"
                      id="transport-heading"
                    >
                      <Bus className="h-4 w-4" />
                      <span>Transport</span>
                    </div>
                    <div className="pl-6">
                      {renderTransport ? renderTransport(transport) : (
                        <div>
                          <div className="font-medium">{transport.mode}</div>
                          {transport.details && <div className="text-sm text-muted-foreground">{transport.details}</div>}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Documents Section */}
                {documents && documents.length > 0 && (
                  <div
                    className="space-y-2"
                    role="region"
                    aria-labelledby="documents-heading"
                  >
                    <div
                      className="flex items-center gap-2 text-sm font-medium"
                      id="documents-heading"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Documents ({documents.length})</span>
                    </div>
                    <div className="pl-6">
                      {renderDocuments ? renderDocuments(documents) : (
                        <ul className="list-disc list-inside space-y-1">
                          {documents.map((doc, index) => (
                            <li key={index} className="text-sm">
                              <a
                                href={doc}
                                className="text-primary hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {doc.split('/').pop()}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}

                {/* Notes Section */}
                {notes && (
                  <div
                    className="space-y-2"
                    role="region"
                    aria-labelledby="notes-heading"
                  >
                    <div
                      className="flex items-center gap-2 text-sm font-medium"
                      id="notes-heading"
                    >
                      <FileEdit className="h-4 w-4" />
                      <span>Notes</span>
                    </div>
                    <div className="pl-6 text-sm">
                      {notes}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </CollapsibleContent>
        )}
      </Collapsible>
    </Card>
  );
});
TimelineCardBase.displayName = 'TimelineCard';

/**
 * TimelineCardSkeleton component for displaying a loading state
 * @component
 */
const TimelineCardSkeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <Card ref={ref} className={cn("w-full", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
    </Card>
  )
);
TimelineCardSkeleton.displayName = 'TimelineCardSkeleton';

// Export the component with its skeleton
export const TimelineCard = Object.assign(React.memo(TimelineCardBase), {
  Skeleton: TimelineCardSkeleton
});