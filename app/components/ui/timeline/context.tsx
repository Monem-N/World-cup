import * as React from 'react';

/**
 * Timeline context state interface
 */
export interface TimelineContextState {
  /** Size of the timeline */
  size?: 'sm' | 'md' | 'lg';
  /** Size of the timeline icons */
  iconSize?: 'sm' | 'md' | 'lg';
  /** Whether the timeline is in a loading state */
  isLoading?: boolean;
  /** Whether the timeline has an error */
  hasError?: boolean;
  /** Error message if hasError is true */
  errorMessage?: string;
  /** Whether the timeline is empty */
  isEmpty?: boolean;
  /** Whether to animate timeline items */
  animate?: boolean;
  /** Whether to show connectors between timeline items */
  showConnectors?: boolean;
  /** Default color for timeline icons */
  defaultIconColor?: 'primary' | 'secondary' | 'accent' | 'muted' | 'destructive';
  /** Default status for timeline items */
  defaultStatus?: 'completed' | 'in-progress' | 'pending';
  /** Whether timeline items are clickable */
  clickable?: boolean;
  /** Whether timeline items are expandable */
  expandable?: boolean;
}

/**
 * Timeline context interface
 */
export interface TimelineContextValue extends TimelineContextState {
  /** Update the timeline context state */
  updateContext: (state: Partial<TimelineContextState>) => void;
}

/**
 * Timeline context
 */
const TimelineContext = React.createContext<TimelineContextValue | undefined>(undefined);

/**
 * Timeline provider props
 */
export interface TimelineProviderProps extends React.PropsWithChildren<TimelineContextState> {}

/**
 * Timeline provider component
 * @component
 */
export function TimelineProvider({
  children,
  size = 'md',
  iconSize = 'md',
  isLoading = false,
  hasError = false,
  errorMessage = '',
  isEmpty = false,
  animate = true,
  showConnectors = true,
  defaultIconColor = 'primary',
  defaultStatus = 'completed',
  clickable = false,
  expandable = true,
}: TimelineProviderProps) {
  const [state, setState] = React.useState<TimelineContextState>({
    size,
    iconSize,
    isLoading,
    hasError,
    errorMessage,
    isEmpty,
    animate,
    showConnectors,
    defaultIconColor,
    defaultStatus,
    clickable,
    expandable,
  });

  const updateContext = React.useCallback((newState: Partial<TimelineContextState>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  }, []);

  // Update state when props change
  React.useEffect(() => {
    setState({
      size,
      iconSize,
      isLoading,
      hasError,
      errorMessage,
      isEmpty,
      animate,
      showConnectors,
      defaultIconColor,
      defaultStatus,
      clickable,
      expandable,
    });
  }, [
    size,
    iconSize,
    isLoading,
    hasError,
    errorMessage,
    isEmpty,
    animate,
    showConnectors,
    defaultIconColor,
    defaultStatus,
    clickable,
    expandable,
  ]);

  const value = React.useMemo(
    () => ({
      ...state,
      updateContext,
    }),
    [state, updateContext]
  );

  return <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>;
}

/**
 * Hook to use the timeline context
 * @returns The timeline context value
 * @throws Error if used outside of a TimelineProvider
 */
export function useTimelineContext() {
  const context = React.useContext(TimelineContext);
  if (context === undefined) {
    throw new Error('useTimelineContext must be used within a TimelineProvider');
  }
  return context;
}
