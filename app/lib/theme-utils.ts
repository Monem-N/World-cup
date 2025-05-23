/**
 * Theme utility functions for consistent styling across the application
 */

import type { Activity, TimelineColor } from './types';

/**
 * Maps activity types to their corresponding theme color classes
 */
export const activityTypeToColorClass: Record<Activity['type'], string> = {
  transport: 'text-activity-transport',
  match: 'text-activity-match',
  meal: 'text-activity-meal',
  hotel: 'text-activity-hotel',
  activity: 'text-activity-default',
};

/**
 * Maps activity types to their corresponding background color classes
 */
export const activityTypeToBgClass: Record<Activity['type'], string> = {
  transport: 'bg-activity-transport',
  match: 'bg-activity-match',
  meal: 'bg-activity-meal',
  hotel: 'bg-activity-hotel',
  activity: 'bg-activity-default',
};

/**
 * Maps activity types to their corresponding border color classes
 */
export const activityTypeToBorderClass: Record<Activity['type'], string> = {
  transport: 'border-activity-transport',
  match: 'border-activity-match',
  meal: 'border-activity-meal',
  hotel: 'border-activity-hotel',
  activity: 'border-activity-default',
};

/**
 * Maps activity types to timeline colors (for compatibility with existing timeline component)
 */
export const activityTypeToTimelineColor: Record<Activity['type'], TimelineColor> = {
  transport: 'accent',
  match: 'primary',
  meal: 'secondary',
  hotel: 'muted',
  activity: 'primary',
};

/**
 * Gets the appropriate CSS class for an activity type
 * @param activityType - The type of activity
 * @param variant - The style variant (text, bg, border)
 * @returns The corresponding CSS class
 */
export function getActivityColorClass(
  activityType: Activity['type'],
  variant: 'text' | 'bg' | 'border' = 'text'
): string {
  switch (variant) {
    case 'text':
      return activityTypeToColorClass[activityType] || 'text-activity-default';
    case 'bg':
      return activityTypeToBgClass[activityType] || 'bg-activity-default';
    case 'border':
      return activityTypeToBorderClass[activityType] || 'border-activity-default';
    default:
      return activityTypeToColorClass[activityType] || 'text-activity-default';
  }
}

/**
 * Gets the timeline color for an activity type
 * @param activityType - The type of activity
 * @returns The corresponding timeline color
 */
export function getActivityTimelineColor(activityType: Activity['type']): TimelineColor {
  return activityTypeToTimelineColor[activityType] || 'primary';
}

/**
 * Spacing utility functions
 */
export const spacing = {
  section: {
    sm: 'py-section-sm',
    md: 'py-section-md',
    lg: 'py-section-lg',
  },
  container: {
    sm: 'px-container-sm',
    md: 'px-container-md',
    lg: 'px-container-lg',
  },
} as const;

/**
 * Gradient utility functions
 */
export const gradients = {
  hero: 'bg-gradient-hero',
  cta: 'bg-gradient-cta',
  features: 'bg-gradient-features',
  card: 'bg-gradient-card',
  header: 'bg-gradient-header',
} as const;

/**
 * Animation utility functions
 */
export const animations = {
  transition: {
    fast: 'transition-theme-fast',
    normal: 'transition-theme-normal',
    slow: 'transition-theme-slow',
    bounce: 'transition-theme-bounce',
  },
  animate: {
    pulse: 'animate-theme-pulse',
    bounce: 'animate-theme-bounce',
    glow: 'animate-theme-glow',
  },
} as const;

/**
 * Shadow utility functions
 */
export const shadows = {
  sm: 'shadow-theme-sm',
  md: 'shadow-theme-md',
  lg: 'shadow-theme-lg',
  xl: 'shadow-theme-xl',
  glow: 'shadow-theme-glow',
} as const;

/**
 * Border radius utility functions
 */
export const borderRadius = {
  xs: 'rounded-theme-xs',
  sm: 'rounded-theme-sm',
  md: 'rounded-theme-md',
  lg: 'rounded-theme-lg',
  xl: 'rounded-theme-xl',
  '2xl': 'rounded-theme-2xl',
  full: 'rounded-theme-full',
} as const;

/**
 * Typography utility functions
 */
export const typography = {
  hero: {
    sm: 'text-hero-sm',
    md: 'text-hero-md',
    lg: 'text-hero-lg',
  },
  heading: {
    sm: 'text-heading-sm',
    md: 'text-heading-md',
    lg: 'text-heading-lg',
  },
} as const;

/**
 * Combines multiple theme utility classes
 * @param classes - Array of theme utility classes
 * @returns Combined class string
 */
export function combineThemeClasses(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Creates a theme-aware class name with fallback
 * @param themeClass - The theme-specific class
 * @param fallbackClass - Fallback class if theme class is not available
 * @returns The appropriate class name
 */
export function withThemeFallback(themeClass: string, fallbackClass: string): string {
  return themeClass || fallbackClass;
}
