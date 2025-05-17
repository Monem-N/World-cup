import * as React from 'react'
import { cn } from '~/lib/utils'

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, orientation = 'vertical', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex',
          orientation === 'vertical' ? 'flex-col' : 'flex-row',
          className
        )}
        {...props}
      />
    )
  }
)
Timeline.displayName = 'Timeline'

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, active = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex gap-4',
          active && 'font-medium',
          className
        )}
        {...props}
      />
    )
  }
)
TimelineItem.displayName = 'TimelineItem'

export { Timeline, TimelineItem }