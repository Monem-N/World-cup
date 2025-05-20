import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
import { Button } from '~/components/ui/button';
import { ChevronDown, ChevronUp, MapPin, Bus, FileText, FileEdit } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
import type { TimelineCardProps } from './types';

const TimelineCardBase = React.forwardRef<HTMLDivElement, TimelineCardProps>((
  // Props destructuring with improved organization
  
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
    className,
    ...props
  },
  ref
) => {
  // State management with clear naming
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string | null>(null);

  // Memoize section visibility checks
  // Memoize section visibility checks with proper type safety
  const hasLocation = React.useMemo(() => Boolean(location?.name), [location]);
  const hasTransport = React.useMemo(() => Boolean(transport?.mode), [transport]);
  const hasDocuments = React.useMemo(() => Boolean(documents && documents.length > 0), [documents]);
  const hasNotes = React.useMemo(() => Boolean(notes), [notes]);
  const hasDetails = hasLocation || hasTransport || hasDocuments || hasNotes;

  // Enhanced keyboard navigation and accessibility
  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveSection(activeSection === sectionId ? null : sectionId);
    }
  };

  // Render section content with consistent styling
  const renderSectionContent = (content: React.ReactNode, label: string) => (
    <div className="pl-6 animate-in slide-in-from-left-1" role="region" aria-label={label}>
      {content}
    </div>
  );

  return (
    <Card
      className={cn("w-full hover:shadow-md transition-shadow duration-200", className)}
      role="region"
      aria-label={`Timeline event: ${title}`}
      {...props}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">{time}</CardDescription>
          </div>
          {hasDetails && (
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
                <span className="sr-only">Toggle details</span>
              </Button>
            </CollapsibleTrigger>
          )}
        </CardHeader>
        <CollapsibleContent>
          <CardContent id="timeline-content" className="space-y-4">
            {hasLocation && (
              <div className="space-y-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full flex justify-between items-center group hover:bg-accent"
                        onClick={() => setActiveSection(activeSection === 'location' ? null : 'location')}
                        onKeyDown={(e) => handleKeyDown(e, 'location')}
                        aria-expanded={activeSection === 'location'}
                        aria-controls="location-content"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" aria-hidden="true" />
                          <span className="font-semibold">{location?.name}</span>
                        </div>
                        {activeSection === 'location' ? (
                          <ChevronUp className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="h-4 w-4" aria-hidden="true" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View location details</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {renderSectionContent(
                  renderLocation ? (
                    renderLocation(location)
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      {location?.address && <p>{location.address}</p>}
                    </div>
                  ),
                  'Location details'
                )}
              </div>
            )}

            {hasTransport && (
              <div className="space-y-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full flex justify-between items-center group hover:bg-accent"
                        onClick={() => setActiveSection(activeSection === 'transport' ? null : 'transport')}
                        onKeyDown={(e) => handleKeyDown(e, 'transport')}
                        aria-expanded={activeSection === 'transport'}
                        aria-controls="transport-content"
                      >
                        <div className="flex items-center gap-2">
                          <Bus className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" aria-hidden="true" />
                          <span className="font-semibold">{transport?.mode}</span>
                        </div>
                        {activeSection === 'transport' ? (
                          <ChevronUp className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="h-4 w-4" aria-hidden="true" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View transport details</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {renderSectionContent(
                  renderTransport ? (
                    renderTransport(transport)
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      {transport?.details && <p>{transport.details}</p>}
                    </div>
                  ),
                  'Transport details'
                )}
              </div>
            )}

            {hasDocuments && (
              <div className="space-y-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full flex justify-between items-center group hover:bg-accent"
                        onClick={() => setActiveSection(activeSection === 'documents' ? null : 'documents')}
                        onKeyDown={(e) => handleKeyDown(e, 'documents')}
                        aria-expanded={activeSection === 'documents'}
                        aria-controls="documents-content"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" aria-hidden="true" />
                          <span className="font-semibold">Documents ({documents?.length || 0})</span>
                        </div>
                        {activeSection === 'documents' ? (
                          <ChevronUp className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="h-4 w-4" aria-hidden="true" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View required documents</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {renderSectionContent(
                  renderDocuments ? (
                    renderDocuments(documents)
                  ) : (
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1" role="list">
                      {documents?.length > 0 && documents.map((doc, index) => (
                        <li key={index} className="transition-colors hover:text-foreground" role="listitem">{doc}</li>
                      ))}
                    </ul>
                  ),
                  'Document list'
                )}
              </div>
            )}

            {hasNotes && (
              <div className="space-y-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full flex justify-between items-center group hover:bg-accent"
                        onClick={() => setActiveSection(activeSection === 'notes' ? null : 'notes')}
                        onKeyDown={(e) => handleKeyDown(e, 'notes')}
                        aria-expanded={activeSection === 'notes'}
                        aria-controls="notes-content"
                      >
                        <div className="flex items-center gap-2">
                          <FileEdit className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" aria-hidden="true" />
                          <span className="font-semibold">Notes</span>
                        </div>
                        {activeSection === 'notes' ? (
                          <ChevronUp className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="h-4 w-4" aria-hidden="true" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View additional notes</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {renderSectionContent(
                  <p className="text-sm text-muted-foreground">{notes}</p>,
                  'Additional notes'
                )}
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
});

TimelineCardBase.displayName = 'TimelineCardBase';

// Create a skeleton component for loading states
const TimelineCardSkeleton = () => (
  <Card className="w-full hover:shadow-md transition-shadow duration-200">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="space-y-2 w-full">
        <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
        <div className="h-3 w-1/4 bg-muted animate-pulse rounded" />
      </div>
      <div className="h-8 w-8 bg-muted animate-pulse rounded" />
    </CardHeader>
    <CardContent className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-8 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-2/3 bg-muted animate-pulse rounded ml-6" />
        </div>
      ))}
    </CardContent>
  </Card>
);

// Export the component with its skeleton
export const TimelineCard = Object.assign(React.memo(TimelineCardBase), {
  Skeleton: TimelineCardSkeleton
});

TimelineCard.displayName = 'TimelineCard';