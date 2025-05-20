import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '~/lib/utils';

interface TripProgressTrackerProps {
  progress: number;
}

export function TripProgressTracker({ progress }: TripProgressTrackerProps) {
  const { t } = useTranslation();
  const roundedProgress = Math.round(progress);
  
  // Determine color based on progress
  const getProgressColor = () => {
    if (progress < 25) return 'bg-blue-500';
    if (progress < 50) return 'bg-green-500';
    if (progress < 75) return 'bg-yellow-500';
    return 'bg-orange-500';
  };
  
  // Generate milestone markers
  const milestones = [
    { percent: 0, label: t('progress.start', 'Start') },
    { percent: 25, label: t('progress.quarter', '25%') },
    { percent: 50, label: t('progress.half', 'Halfway') },
    { percent: 75, label: t('progress.three_quarters', '75%') },
    { percent: 100, label: t('progress.complete', 'Complete') },
  ];
  
  return (
    <div className="space-y-2">
      {/* Progress bar */}
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted">
        <div 
          className={cn("h-full transition-all duration-500 ease-in-out", getProgressColor())}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Milestone markers */}
      <div className="relative h-6 w-full">
        {milestones.map((milestone) => (
          <div 
            key={milestone.percent}
            className="absolute top-0 transform -translate-x-1/2"
            style={{ left: `${milestone.percent}%` }}
          >
            <div 
              className={cn(
                "h-2 w-2 rounded-full",
                progress >= milestone.percent ? getProgressColor() : "bg-muted-foreground/30"
              )}
            />
            <span 
              className={cn(
                "absolute top-3 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap",
                progress >= milestone.percent ? "text-foreground" : "text-muted-foreground/50"
              )}
            >
              {milestone.label}
            </span>
          </div>
        ))}
      </div>
      
      {/* Current progress text */}
      <div className="text-center text-sm font-medium">
        {t('progress.current', 'Current Progress: {{percent}}%', { percent: roundedProgress })}
      </div>
    </div>
  );
}
