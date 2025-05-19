# World Cup Itinerary App Tasks for AI Implementation

## Component Architecture Refactoring

1. Create base Timeline component structure
   - File path: `app/components/ui/timeline/index.tsx`
   - Export all subcomponents from this file
   - Follow compound component pattern from shadcn/ui

2. Define Timeline component types
   - File path: `app/components/ui/timeline/types.ts`
   - Include interfaces for all timeline components
   - Example: `export interface TimelineProps extends React.HTMLAttributes<HTMLElement> {...}`

3. Implement TimelineContext
   - File path: `app/components/ui/timeline/context.tsx`
   - Create context for sharing state between components
   - Include provider component with value prop

4. Create TimelineItem component
   - File path: `app/components/ui/timeline/timeline-item.tsx`
   - Include expand/collapse functionality
   - Add proper ARIA attributes (aria-expanded, aria-controls)

5. Create TimelineIcon component
   - File path: `app/components/ui/timeline/timeline-icon.tsx`
   - Support different activity types (transport, match, meal, hotel, activity)
   - Include status indicators (confirmed, pending, in-progress)

6. Create TimelineConnector component
   - File path: `app/components/ui/timeline/timeline-connector.tsx`
   - Add status-based styling
   - Support customizable length

7. Create TimelineContent component
   - File path: `app/components/ui/timeline/timeline-content.tsx`
   - Support expandable details section
   - Include accessibility features

8. Update main Timeline container
   - File path: `app/components/ui/timeline/timeline.tsx`
   - Compose all subcomponents correctly
   - Add animation states

9. Refactor route-specific Timeline
   - File path: `app/routes/itinerary.$date/components/Timeline/index.tsx`
   - Use the new unified Timeline components
   - Maintain existing functionality

10. Add internationalization to Timeline components
    - Use `useTranslation` hook in all components
    - Replace hardcoded strings with translation keys
    - Example: `const { t } = useTranslation(); <span>{t('timeline.confirmed')}</span>`

## Accessibility Improvements

1. Add ARIA attributes to TimelineItem
   - File path: `app/components/ui/timeline/timeline-item.tsx`
   - Add `aria-expanded`, `aria-controls`, `role="button"` attributes
   - Add keyboard event handlers (Enter and Space)

2. Fix focus management
   - Update all interactive elements to properly handle focus
   - Ensure focus trap in expandable details
   - Add visible focus indicators

3. Add keyboard navigation
   - Implement arrow key navigation between timeline items
   - Add tab index management
   - Support Enter key for activation

## Performance Optimization

1. Implement React.memo for pure components
   - Add to all timeline subcomponents
   - Example: `export const TimelineItem = React.memo(TimelineItemComponent);`

2. Add useMemo for expensive calculations
   - Example: `const sortedActivities = useMemo(() => sortActivitiesByTime(activities), [activities]);`

3. Implement useCallback for event handlers
   - Example: `const handleToggle = useCallback(() => setExpanded(!expanded), [expanded]);`

4. Add code splitting to routes
   - File path: `app/routes.ts`
   - Use React.lazy and Suspense
   - Example: `const ItineraryPage = React.lazy(() => import('./routes/itinerary.$date'));`

## State Management Refactoring

1. Split Zustand store into modules
   - Create domain-specific stores
   - File paths: `stores/itinerary.ts`, `stores/activities.ts`, `stores/user.ts`

2. Optimize selectors
   - File path: `stores/itinerary.ts`
   - Use fine-grained selectors
   - Example: `export const useCurrentDay = () => useItineraryStore(state => state.currentDay);`

3. Connect React Query with Zustand
   - Create data fetching hooks that update store
   - Add proper cache invalidation
   - Implement optimistic updates

## Testing Instructions

1. For each component:
   - Verify rendering without errors
   - Check all props work as expected
   - Test expanding/collapsing functionality
   - Verify accessibility attributes are present

2. For store changes:
   - Verify selectors return expected values
   - Test action creators modify state correctly
   - Check performance with React DevTools

3. For accessibility:
   - Test keyboard navigation works properly
   - Verify screen reader announces state changes
   - Check all interactive elements are accessible