/**
 * World Cup Itinerary Color System
 * Based on Qatar World Cup palette with accessible color combinations
 */

export const worldCupColors = {
  // Primary colors based on Qatar World Cup
  primary: {
    DEFAULT: "hsl(350, 90%, 45%)", // Maroon red (Qatar primary color)
    light: "hsl(350, 90%, 55%)",
    dark: "hsl(350, 90%, 35%)",
    foreground: "hsl(0, 0%, 100%)",
  },
  // Secondary colors
  secondary: {
    DEFAULT: "hsl(205, 100%, 50%)", // Bright blue
    light: "hsl(205, 100%, 60%)",
    dark: "hsl(205, 100%, 40%)",
    foreground: "hsl(0, 0%, 100%)",
  },
  // Accent colors for different activity types
  accent: {
    DEFAULT: "hsl(40, 95%, 55%)", // Gold
    light: "hsl(40, 95%, 65%)",
    dark: "hsl(40, 95%, 45%)",
    foreground: "hsl(0, 0%, 0%)",
  },
  // Status colors
  success: {
    DEFAULT: "hsl(142, 70%, 45%)",
    light: "hsl(142, 70%, 55%)",
    dark: "hsl(142, 70%, 35%)",
    foreground: "hsl(0, 0%, 100%)",
  },
  warning: {
    DEFAULT: "hsl(38, 95%, 50%)",
    light: "hsl(38, 95%, 60%)",
    dark: "hsl(38, 95%, 40%)",
    foreground: "hsl(0, 0%, 0%)",
  },
  danger: {
    DEFAULT: "hsl(358, 85%, 55%)",
    light: "hsl(358, 85%, 65%)",
    dark: "hsl(358, 85%, 45%)",
    foreground: "hsl(0, 0%, 100%)",
  },
  // Background colors with different levels
  background: {
    DEFAULT: "hsl(0, 0%, 100%)",
    secondary: "hsl(0, 0%, 98%)",
    tertiary: "hsl(0, 0%, 96%)",
  },
  // Foreground/text colors
  foreground: {
    DEFAULT: "hsl(222, 47%, 11%)",
    secondary: "hsl(215, 14%, 34%)",
    tertiary: "hsl(212, 10%, 54%)",
    quaternary: "hsl(212, 10%, 70%)",
    muted: "hsl(212, 10%, 70%)",
    disabled: "hsl(212, 10%, 80%)",
  },
  // Team colors for various countries
  teams: {
    qatar: "hsl(350, 90%, 45%)",
    brazil: "hsl(120, 100%, 28%)",
    argentina: "hsl(210, 100%, 56%)",
    england: "hsl(0, 0%, 100%)",
    france: "hsl(210, 100%, 30%)",
    spain: "hsl(0, 85%, 50%)",
    germany: "hsl(0, 0%, 0%)",
    netherlands: "hsl(25, 100%, 50%)",
    portugal: "hsl(0, 100%, 35%)",
    belgium: "hsl(0, 80%, 45%)",
  }
};

/**
 * Convert the color system to CSS variables
 * @returns CSS variables as a string
 */
export function getCssVariables() {
  let cssVars = ":root {\n";
  
  // Add primary color variables
  cssVars += `  --color-primary: ${worldCupColors.primary.DEFAULT};\n`;
  cssVars += `  --color-primary-light: ${worldCupColors.primary.light};\n`;
  cssVars += `  --color-primary-dark: ${worldCupColors.primary.dark};\n`;
  cssVars += `  --color-primary-foreground: ${worldCupColors.primary.foreground};\n\n`;
  
  // Add secondary color variables
  cssVars += `  --color-secondary: ${worldCupColors.secondary.DEFAULT};\n`;
  cssVars += `  --color-secondary-light: ${worldCupColors.secondary.light};\n`;
  cssVars += `  --color-secondary-dark: ${worldCupColors.secondary.dark};\n`;
  cssVars += `  --color-secondary-foreground: ${worldCupColors.secondary.foreground};\n\n`;
  
  // Add accent color variables
  cssVars += `  --color-accent: ${worldCupColors.accent.DEFAULT};\n`;
  cssVars += `  --color-accent-light: ${worldCupColors.accent.light};\n`;
  cssVars += `  --color-accent-dark: ${worldCupColors.accent.dark};\n`;
  cssVars += `  --color-accent-foreground: ${worldCupColors.accent.foreground};\n\n`;
  
  // Add status color variables
  cssVars += `  --color-success: ${worldCupColors.success.DEFAULT};\n`;
  cssVars += `  --color-success-light: ${worldCupColors.success.light};\n`;
  cssVars += `  --color-success-dark: ${worldCupColors.success.dark};\n`;
  cssVars += `  --color-success-foreground: ${worldCupColors.success.foreground};\n\n`;
  
  cssVars += `  --color-warning: ${worldCupColors.warning.DEFAULT};\n`;
  cssVars += `  --color-warning-light: ${worldCupColors.warning.light};\n`;
  cssVars += `  --color-warning-dark: ${worldCupColors.warning.dark};\n`;
  cssVars += `  --color-warning-foreground: ${worldCupColors.warning.foreground};\n\n`;
  
  cssVars += `  --color-danger: ${worldCupColors.danger.DEFAULT};\n`;
  cssVars += `  --color-danger-light: ${worldCupColors.danger.light};\n`;
  cssVars += `  --color-danger-dark: ${worldCupColors.danger.dark};\n`;
  cssVars += `  --color-danger-foreground: ${worldCupColors.danger.foreground};\n\n`;
  
  // Add background color variables
  cssVars += `  --color-background: ${worldCupColors.background.DEFAULT};\n`;
  cssVars += `  --color-background-secondary: ${worldCupColors.background.secondary};\n`;
  cssVars += `  --color-background-tertiary: ${worldCupColors.background.tertiary};\n\n`;
  
  // Add foreground color variables
  cssVars += `  --color-foreground: ${worldCupColors.foreground.DEFAULT};\n`;
  cssVars += `  --color-foreground-secondary: ${worldCupColors.foreground.secondary};\n`;
  cssVars += `  --color-foreground-tertiary: ${worldCupColors.foreground.tertiary};\n`;
  cssVars += `  --color-foreground-quaternary: ${worldCupColors.foreground.quaternary};\n`;
  cssVars += `  --color-foreground-muted: ${worldCupColors.foreground.muted};\n`;
  cssVars += `  --color-foreground-disabled: ${worldCupColors.foreground.disabled};\n`;
  
  cssVars += "}";
  
  return cssVars;
}