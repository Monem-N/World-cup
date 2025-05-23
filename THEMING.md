# Theming System Documentation

This document outlines the comprehensive theming system implemented to replace hardcoded styling with CSS custom properties for easier theming and maintenance.

## Overview

The theming system provides:
- **Centralized color management** through CSS custom properties
- **Consistent spacing and typography scales**
- **Activity-type specific styling**
- **Dark mode support**
- **Utility classes for common patterns**
- **TypeScript utilities for type-safe theming**

## File Structure

```
app/
├── styles/
│   ├── theme.css          # Main theming system
│   ├── typography.css     # Typography-specific variables
│   └── colors.ts          # Legacy color definitions (to be migrated)
├── lib/
│   └── theme-utils.ts     # TypeScript utilities for theming
└── app.css               # Main CSS file with theme imports
```

## Core Theme Variables

### Brand Colors
```css
--brand-primary: #dc2626;    /* Red */
--brand-secondary: #fbbf24;  /* Gold/Yellow */
--brand-tertiary: #059669;   /* Green */
--brand-accent: #3b82f6;     /* Blue */
```

### Activity Type Colors
```css
--activity-transport: var(--brand-accent);     /* Blue */
--activity-match: var(--brand-tertiary);       /* Green */
--activity-meal: var(--brand-secondary);       /* Yellow */
--activity-hotel: #06b6d4;                     /* Cyan */
--activity-default: #6b7280;                   /* Gray */
--activity-weather: var(--activity-default);   /* Gray */
```

### Background Gradients
```css
--gradient-hero-light: linear-gradient(135deg, #000 0%, #7f1d1d 50%, #000 100%);
--gradient-cta-light: linear-gradient(135deg, #000 0%, #7f1d1d 25%, #92400e 100%);
--gradient-features-light: linear-gradient(135deg, #000 0%, #7f1d1d 25%, #92400e 100%);
--gradient-header-light: linear-gradient(90deg, var(--brand-secondary) 0%, var(--brand-primary) 100%);
--gradient-card-light: linear-gradient(135deg, var(--primary)/5 0%, var(--secondary)/5 100%);
```

### Spacing System
```css
--space-section-sm: 4rem;
--space-section-md: 6rem;
--space-section-lg: 8rem;
--space-container-sm: 1rem;
--space-container-md: 1.5rem;
--space-container-lg: 2rem;
```

### Animation Properties
```css
--duration-fast: 0.15s;
--duration-normal: 0.3s;
--duration-slow: 0.5s;
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## Utility Classes

### Activity Type Colors
```css
.text-activity-transport    /* Blue text */
.text-activity-match        /* Green text */
.text-activity-meal         /* Yellow text */
.text-activity-hotel        /* Cyan text */
.text-activity-default      /* Gray text */

.bg-activity-transport      /* Blue background */
.bg-activity-match          /* Green background */
/* ... and so on */

.border-activity-transport  /* Blue border */
.border-activity-match      /* Green border */
/* ... and so on */
```

### Background Gradients
```css
.bg-gradient-hero           /* Hero section gradient */
.bg-gradient-cta            /* CTA section gradient */
.bg-gradient-features       /* Features section gradient */
.bg-gradient-header         /* Header gradient */
.bg-gradient-card           /* Card hover gradient */
```

### Spacing
```css
.py-section-sm              /* Small section padding */
.py-section-md              /* Medium section padding */
.py-section-lg              /* Large section padding */

.px-container-sm            /* Small container padding */
.px-container-md            /* Medium container padding */
.px-container-lg            /* Large container padding */
```

### Animations
```css
.transition-theme-fast      /* Fast transitions */
.transition-theme-normal    /* Normal transitions */
.transition-theme-slow      /* Slow transitions */
.transition-theme-bounce    /* Bouncy transitions */

.animate-theme-pulse        /* Pulse animation */
.animate-theme-bounce       /* Bounce animation */
.animate-theme-glow         /* Glow animation */
```

## TypeScript Utilities

### Activity Color Functions
```typescript
import { getActivityColorClass, getActivityTimelineColor } from '~/lib/theme-utils';

// Get text color class for an activity
const textClass = getActivityColorClass('transport', 'text');
// Returns: 'text-activity-transport'

// Get background color class for an activity
const bgClass = getActivityColorClass('match', 'bg');
// Returns: 'bg-activity-match'

// Get timeline color for an activity
const timelineColor = getActivityTimelineColor('meal');
// Returns: 'secondary'
```

### Theme Utility Objects
```typescript
import { spacing, gradients, animations, shadows } from '~/lib/theme-utils';

// Use predefined utility classes
const sectionClass = spacing.section.md;        // 'py-section-md'
const gradientClass = gradients.hero;           // 'bg-gradient-hero'
const transitionClass = animations.transition.fast; // 'transition-theme-fast'
const shadowClass = shadows.lg;                 // 'shadow-theme-lg'
```

## Dark Mode Support

All theme variables automatically adapt to dark mode:

```css
.dark {
  /* Activity colors become lighter/more vibrant */
  --activity-transport: #60a5fa;
  --activity-match: #34d399;
  --activity-meal: #fcd34d;
  
  /* Gradients use darker base colors */
  --gradient-hero-light: linear-gradient(135deg, #000 0%, #1f2937 50%, #000 100%);
  
  /* UI components adapt */
  --countdown-bg: #431407;
  --countdown-text: #fed7aa;
}
```

## Migration Examples

### Before (Hardcoded)
```tsx
<div className="bg-orange-50 text-orange-700">
  Countdown timer
</div>
```

### After (Themed)
```tsx
<div className="bg-countdown text-countdown">
  Countdown timer
</div>
```

### Before (Inline Gradient)
```tsx
<section className="bg-gradient-to-r from-yellow-500 to-red-500">
  Header content
</section>
```

### After (Themed)
```tsx
<section className="bg-gradient-header">
  Header content
</section>
```

### Before (Hardcoded Activity Colors)
```tsx
const activityColors = {
  transport: '#007bff',
  match: '#28a745',
  meal: '#ffc107',
};
```

### After (Themed)
```tsx
import { getActivityColorClass } from '~/lib/theme-utils';

const colorClass = getActivityColorClass(activity.type, 'text');
```

## Benefits

1. **Centralized Management**: All colors and styling properties are defined in one place
2. **Easy Theming**: Change the entire app's appearance by modifying CSS variables
3. **Dark Mode**: Automatic dark mode support with proper contrast ratios
4. **Type Safety**: TypeScript utilities prevent typos and provide autocomplete
5. **Consistency**: Ensures consistent styling across all components
6. **Maintainability**: Easier to update and maintain styling across the application
7. **Performance**: CSS custom properties are more performant than inline styles

## Usage Guidelines

1. **Always use theme utilities** instead of hardcoded colors or spacing
2. **Prefer utility classes** over inline styles for theme-related properties
3. **Use TypeScript utilities** for dynamic styling to maintain type safety
4. **Test in both light and dark modes** to ensure proper contrast
5. **Follow the spacing scale** for consistent layout spacing
6. **Use semantic color names** (activity-transport vs blue) for better maintainability

## Future Enhancements

- [ ] Add more semantic color tokens for different UI states
- [ ] Implement theme variants (e.g., different World Cup team themes)
- [ ] Add animation presets for common UI patterns
- [ ] Create theme builder tool for easy customization
- [ ] Add accessibility-focused color contrast utilities
