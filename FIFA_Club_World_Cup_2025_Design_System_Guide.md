# FIFA Club World Cup 2025™ Design System & Styling Guide

## Table of Contents
1. [Brand Color System](#brand-color-system)
2. [CSS Architecture Pattern](#css-architecture-pattern)
3. [Gradient Implementation Standards](#gradient-implementation-standards)
4. [Animation and Effects Guidelines](#animation-and-effects-guidelines)
5. [Component Styling Patterns](#component-styling-patterns)
6. [Responsive Design Standards](#responsive-design-standards)
7. [Code Examples and Templates](#code-examples-and-templates)

---

## Brand Color System

### Core Brand Colors

```css
/* Primary Brand Colors - Always use these exact hex values */
Gold:  #FFD700  /* Primary accent, success states, highlights */
Red:   #DC2626  /* Secondary accent, alerts, match days */
Black: #000000  /* Base dark color, text on light backgrounds */
```

### Why Hardcoded Values?

**CSS custom properties were replaced with hardcoded hex values for:**
- **Cross-browser compatibility**: Eliminates CSS custom property resolution issues
- **Performance**: Faster rendering without variable lookups
- **Reliability**: Guaranteed color display across all browsers and devices
- **Gradient support**: Better compatibility with complex gradient implementations

### Color Usage Guidelines

#### Gold (#FFD700) - Primary Accent
```css
/* Use for: */
- Primary icons and highlights
- Success states and positive indicators
- Trophy and achievement elements
- Primary text gradients (start color)
- Loading spinners and progress indicators
```

#### Red (#DC2626) - Secondary Accent
```css
/* Use for: */
- Secondary icons and accents
- Alert states and match day indicators
- Heart icons and emotional elements
- Secondary text gradients (end color)
- Error states and warnings
```

#### Transparency Variations
```css
/* Standard transparency levels */
rgba(255, 215, 0, 0.1)  /* 10% - Subtle backgrounds */
rgba(255, 215, 0, 0.2)  /* 20% - Glow effects */
rgba(255, 215, 0, 0.3)  /* 30% - Floating particles */
rgba(255, 215, 0, 0.4)  /* 40% - Button glows */
rgba(255, 215, 0, 0.8)  /* 80% - Text colors */
```

---

## CSS Architecture Pattern

### Systematic Class Naming Convention

**Pattern**: `{component}-{element}-{variant}`

```css
/* Component-based organization */
.loading-*     /* Loading state elements */
.error-*       /* Error state elements */
.premium-*     /* Premium badge elements */
.hero-*        /* Hero section elements */
.stats-*       /* Statistics cards */
.countdown-*   /* Countdown timer */
.tab-*         /* Tab navigation and content */
.essential-*   /* Essential categories */
.footer-*      /* Footer elements */
.action-*      /* Action buttons */
```

### Class Naming Examples

```css
/* Good Examples */
.stats-card-glow-gold        /* Stats card with gold glow */
.countdown-particle          /* Floating particle in countdown */
.footer-heart-icon          /* Heart icon in footer */
.tab-content-icon-red       /* Red icon in tab content */
.essential-category-gold    /* Gold essential category */

/* Avoid */
.goldGlow                   /* Not descriptive enough */
.red-icon                   /* Too generic */
.button1                    /* No semantic meaning */
```

### Creating New Classes

**Template for new components:**

```css
/* 1. Base component styles */
.{component}-base {
  /* Base styling */
}

/* 2. Color variants */
.{component}-gold {
  background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
}

.{component}-red {
  background: linear-gradient(135deg, #DC2626 0%, #FFD700 100%);
}

/* 3. Interactive states */
.{component}-hover:hover {
  /* Hover effects */
}

/* 4. Size variants */
.{component}-small { /* Small variant */ }
.{component}-large { /* Large variant */ }
```

---

## Gradient Implementation Standards

### Standard Gradient Patterns

#### Primary Gold-to-Red Gradient
```css
.gradient-primary {
  background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
}
```

#### Secondary Red-to-Gold Gradient
```css
.gradient-secondary {
  background: linear-gradient(135deg, #DC2626 0%, #FFD700 100%);
}
```

#### Complex Multi-Stop Gradient
```css
.gradient-complex {
  background: linear-gradient(135deg, #FFD700 0%, #DC2626 25%, #FFD700 50%, #DC2626 75%, #FFD700 100%);
}
```

### Text Gradient Implementation

**Standard Pattern with Fallback:**

```css
.text-gradient-gold {
  background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: gradient-shift 4s ease infinite;
}

/* Fallback for unsupported browsers */
@supports not (-webkit-background-clip: text) {
  .text-gradient-gold {
    background: none;
    color: #FFD700;
    text-shadow:
      0 0 10px rgba(255, 215, 0, 0.5),
      0 0 20px rgba(220, 38, 38, 0.3);
  }
}
```

### Button Gradient Implementation

```css
.button-gradient-gold {
  background: linear-gradient(135deg, #FFD700 0%, #FFD700 30%, #DC2626 100%);
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

.button-gradient-gold:hover {
  background: linear-gradient(135deg, #FFF700 0%, #FFE55C 30%, #EF4444 100%);
  background-size: 200% 200%;
}
```

### Glow Effect Implementation

```css
.glow-gold {
  background: linear-gradient(135deg, #FFD700 0%, #DC2626 50%, #FFD700 100%);
}

.glow-gold-inner {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.4) 0%, rgba(220, 38, 38, 0.4) 100%);
}
```

---

## Animation and Effects Guidelines

### Core Keyframe Animations

#### Float Animation
```css
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
```

#### Gradient Shift Animation
```css
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient-shift {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}
```

#### Pulse Glow Animation
```css
@keyframes pulse-glow {
  0%, 100% {
    opacity: 1;
    filter: brightness(1) drop-shadow(0 0 8px #FFD700);
  }
  50% {
    opacity: 0.8;
    filter: brightness(1.2) drop-shadow(0 0 16px #FFD700);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}
```

### Timing Standards

```css
/* Standard durations */
--duration-fast: 300ms;      /* Quick interactions */
--duration-normal: 500ms;    /* Standard transitions */
--duration-slow: 1000ms;     /* Dramatic effects */

/* Standard easing functions */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-sharp: cubic-bezier(0.4, 0, 1, 1);
```

### Glassmorphism Effects

```css
.glass-premium {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-card-hover:hover {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(24px) saturate(200%);
  border: 1px solid rgba(255, 215, 0, 0.3);
  transform: translateY(-4px) scale(1.02);
}
```

---

## Component Styling Patterns

### Stats Card Pattern

```css
/* Base stats card */
.stats-card {
  transform: hover:scale-105;
  transition: all 0.5s;
  background: linear-gradient(to bottom right, rgba(0,0,0,0.7), rgba(0,0,0,0.5));
  backdrop-filter: blur(2xl);
  border-radius: 1.5rem;
  padding: 2rem;
  border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
  overflow: hidden;
}

/* Glow variants */
.stats-card-glow-gold {
  background: linear-gradient(135deg, #FFD700 0%, #DC2626 50%, #FFD700 100%);
}

.stats-card-glow-red {
  background: linear-gradient(135deg, #DC2626 0%, #FFD700 50%, #DC2626 100%);
}
```

### Button Pattern

```css
/* Base action button */
.action-button {
  position: relative;
  width: 100%;
  color: black;
  padding: 2.5rem 2rem;
  border-radius: 1.5rem;
  font-weight: bold;
  font-size: 1.25rem;
  transition: all 0.5s;
  transform: hover:scale-105 hover:-translate-y-2;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
  overflow: hidden;
}

/* Color variants */
.action-button-gold {
  background: linear-gradient(135deg, #FFD700 0%, #FFD700 30%, #DC2626 100%);
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

.action-button-red {
  background: linear-gradient(135deg, #DC2626 0%, #DC2626 30%, #FFD700 100%);
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}
```

### Tab Navigation Pattern

```css
.tab-nav-container {
  position: relative;
}

.tab-nav-glow {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(220, 38, 38, 0.3) 100%);
}

.tab-active {
  background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
}

.tab-inactive {
  color: rgba(255,255,255,0.7);
}

.tab-inactive:hover {
  color: white;
  background: rgba(255,255,255,0.1);
  transform: scale(1.02);
}
```

---

## Responsive Design Standards

### Breakpoint System

```css
/* Mobile First Approach */
/* Base styles: 320px+ */

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) { }

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { }

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) { }

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) { }
```

### Typography Scaling

```css
/* Responsive typography pattern */
.hero-title {
  font-size: 3rem;        /* Base: 48px */
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 5rem;      /* md: 80px */
  }
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 7rem;      /* lg: 112px */
  }
}

@media (min-width: 1280px) {
  .hero-title {
    font-size: 10rem;     /* xl: 160px */
  }
}
```

### Spacing Standards

```css
/* Consistent spacing scale */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

---

## Code Examples and Templates

### Complete Stats Card Component

```jsx
// Stats Card Template
const StatsCard = ({
  icon: Icon,
  value,
  label,
  description,
  variant = 'gold',
  delay = 0
}) => (
  <div className="group relative transform hover:scale-105 transition-all duration-500">
    <div
      className={`absolute -inset-1 stats-card-glow-${variant} rounded-3xl blur-lg opacity-25 group-hover:opacity-60 transition-all duration-500 animate-pulse`}
      style={{ animationDelay: `${delay}s` }}
    />
    <div className={`relative bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 stats-card-border-${variant} transition-all duration-500 shadow-2xl overflow-hidden`}>
      {/* Background Pattern */}
      <div className={`absolute inset-0 stats-card-bg-${variant} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <div className={`absolute -inset-3 stats-icon-glow-${variant} rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500`} />
            <div className={`relative stats-icon-bg-${variant} p-3 rounded-2xl backdrop-blur-sm border stats-icon-border-${variant}`}>
              <Icon className={`w-8 h-8 stats-icon-${variant} group-hover:scale-110 transition-transform duration-300`} />
            </div>
          </div>
          <div className="text-right">
            <span className={`text-5xl font-black stats-number-${variant} group-hover:scale-110 transition-transform duration-300 inline-block`}>
              {value}
            </span>
            <div className="text-xs text-white/50 font-medium uppercase tracking-wider">
              {label}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-white font-bold text-lg mb-2">{label}</p>
            <p className="text-white/60 text-sm">{description}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
```

### Action Button Component

```jsx
// Action Button Template
const ActionButton = ({
  children,
  variant = 'gold',
  onClick,
  icon: Icon,
  delay = 0
}) => (
  <div className="group relative">
    <div
      className={`absolute -inset-2 rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition-all duration-500 animate-pulse button-glow-${variant}`}
      style={{ animationDelay: `${delay}s` }}
    />
    <div className={`absolute -inset-1 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-all duration-500 button-glow-${variant}-inner`} />

    <button
      onClick={onClick}
      className={`action-button-${variant} relative w-full text-black px-10 py-8 rounded-3xl font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl group overflow-hidden`}
    >
      {/* Button Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="absolute -inset-4 bg-black/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="relative bg-black/20 p-4 rounded-2xl backdrop-blur-sm group-hover:bg-black/30 transition-all duration-300">
            <Icon className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
        <div className="text-center">
          {children}
        </div>
      </div>
    </button>
  </div>
);
```

### CSS-in-JS Pattern

```jsx
// Component with embedded styles
const PremiumComponent = () => (
  <div className="premium-container">
    {/* Component JSX */}

    <style jsx>{`
      /* Component-specific styles */
      .premium-container {
        position: relative;
        background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5));
        backdrop-filter: blur(20px);
        border-radius: 1.5rem;
        padding: 2rem;
        border: 1px solid rgba(255,255,255,0.2);
      }

      .premium-element-gold {
        background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
        color: black;
        padding: 1rem 2rem;
        border-radius: 1rem;
        font-weight: bold;
        transition: all 0.3s ease;
      }

      .premium-element-gold:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
      }

      .premium-text-gradient {
        background: linear-gradient(135deg, #FFD700 0%, #DC2626 100%);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
        animation: gradient-shift 3s ease infinite;
      }

      @supports not (-webkit-background-clip: text) {
        .premium-text-gradient {
          background: none;
          color: #FFD700;
        }
      }

      @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
    `}</style>
  </div>
);
```

### Floating Particles Template

```jsx
// Floating Particles Component
const FloatingParticles = ({ count = 8, variant = 'gold' }) => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className={`absolute w-3 h-3 ${variant === 'gold' ? 'footer-particle' : 'countdown-particle'} rounded-full animate-float blur-sm`}
        style={{
          left: `${10 + i * 12}%`,
          top: `${20 + (i % 3) * 30}%`,
          animationDelay: `${i * 0.8}s`,
          animationDuration: `${5 + i * 0.5}s`
        }}
      />
    ))}
  </div>
);
```

---

## Implementation Checklist

### Before Starting Development

- [ ] Review brand color guidelines
- [ ] Understand CSS architecture pattern
- [ ] Set up base keyframe animations
- [ ] Configure responsive breakpoints

### For Each New Component

- [ ] Follow naming convention: `{component}-{element}-{variant}`
- [ ] Use hardcoded hex values: `#FFD700`, `#DC2626`, `#000000`
- [ ] Implement gradient fallbacks for text
- [ ] Add appropriate hover states and animations
- [ ] Test responsive behavior across breakpoints
- [ ] Ensure glassmorphism effects are consistent

### Quality Assurance

- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness verification
- [ ] Animation performance check
- [ ] Color contrast accessibility validation
- [ ] Code consistency with established patterns

---

## Best Practices Summary

1. **Always use hardcoded hex values** instead of CSS custom properties
2. **Follow the systematic naming convention** for maintainability
3. **Include browser fallbacks** for advanced CSS features
4. **Use consistent animation timing** and easing functions
5. **Implement responsive design** with mobile-first approach
6. **Test across all target browsers** and devices
7. **Maintain visual hierarchy** with proper spacing and typography
8. **Use glassmorphism effects** consistently for premium appearance

---

## Support and Maintenance

For questions or clarifications about this design system:

1. **Reference this guide** for all styling decisions
2. **Follow established patterns** when creating new components
3. **Test thoroughly** before implementing in production
4. **Document any new patterns** that extend this system
5. **Maintain consistency** across all application pages

---

*This guide ensures the FIFA Club World Cup 2025™ application maintains a premium, professional appearance with consistent technical implementation across all components and pages.*