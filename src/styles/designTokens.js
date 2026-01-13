/**
 * PlateShare Design System Tokens
 * Centralized configuration for consistent styling across the application
 */

export const designTokens = {
  // Color System - Maximum 3 primary colors + neutrals
  colors: {
    primary: {
      50: '#fef9ee',   // Light amber background
      100: '#fef3c7',  // Lighter amber
      500: '#ebc15e',  // Main amber (existing brand color)
      600: '#b48518',  // Darker amber (existing brand color)
      900: '#ac7800'   // Darkest amber
    },
    secondary: {
      50: '#fdf2f8',   // Light rose
      500: '#8d5751',  // Main rose-brown (existing brand color)
      600: '#7c4a44',  // Darker rose-brown
      900: '#5c2e2a'   // Darkest rose-brown
    },
    accent: {
      50: '#f0fdf4',   // Light green
      500: '#22c55e',  // Success green
      600: '#16a34a',  // Darker green
      900: '#14532d'   // Darkest green
    },
    neutral: {
      50: '#fafafa',   // Lightest gray
      100: '#f5f5f5',  // Light gray
      200: '#e5e5e5',  // Border gray
      500: '#737373',  // Medium gray
      700: '#404040',  // Dark gray
      900: '#171717'   // Darkest gray
    }
  },

  // Spacing System
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '5rem',   // 80px
    '5xl': '6rem'    // 96px
  },

  // Typography System
  typography: {
    fontFamily: {
      primary: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem'      // 48px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },

  // Border Radius System
  borderRadius: {
    none: '0',
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px'
  },

  // Shadow System
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  },

  // Animation System
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },

  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',   // Mobile landscape
    md: '768px',   // Tablet
    lg: '1024px',  // Desktop
    xl: '1280px',  // Large desktop
    '2xl': '1536px' // Extra large desktop
  },

  // Component-specific tokens
  components: {
    card: {
      padding: '1.5rem',
      borderRadius: '0.75rem',
      shadow: 'md'
    },
    button: {
      paddingX: '1rem',
      paddingY: '0.5rem',
      borderRadius: '0.5rem',
      fontWeight: '600'
    },
    input: {
      padding: '0.75rem',
      borderRadius: '0.5rem',
      borderWidth: '1px'
    },
    navbar: {
      height: '4rem',
      padding: '1rem'
    }
  },

  // Accessibility tokens
  accessibility: {
    focusRing: {
      width: '2px',
      offset: '2px',
      color: 'primary'
    },
    touchTarget: {
      minSize: '44px'
    },
    contrast: {
      normal: '4.5:1',  // WCAG AA standard
      large: '3:1'      // WCAG AA for large text
    }
  }
};

// Theme configurations
export const themes = {
  light: {
    name: 'plateshare_light',
    colors: {
      primary: designTokens.colors.primary[500],
      secondary: designTokens.colors.secondary[500],
      accent: designTokens.colors.accent[500],
      neutral: designTokens.colors.neutral[500],
      background: '#ffffff',
      surface: designTokens.colors.neutral[100],
      border: designTokens.colors.neutral[200],
      text: designTokens.colors.neutral[900]
    }
  },
  dark: {
    name: 'plateshare_dark',
    colors: {
      primary: designTokens.colors.primary[500],
      secondary: designTokens.colors.secondary[500],
      accent: designTokens.colors.accent[500],
      neutral: designTokens.colors.neutral[700],
      background: '#1f1f1f',
      surface: '#2a2a2a',
      border: '#3a3a3a',
      text: '#ffffff'
    }
  }
};

// Utility functions for design tokens
export const getSpacing = (size) => designTokens.spacing[size] || size;
export const getColor = (color, shade = 500) => designTokens.colors[color]?.[shade] || color;
export const getFontSize = (size) => designTokens.typography.fontSize[size] || size;
export const getBorderRadius = (size) => designTokens.borderRadius[size] || size;

// Component style generators
export const generateCardStyles = () => ({
  padding: designTokens.components.card.padding,
  borderRadius: designTokens.components.card.borderRadius,
  boxShadow: designTokens.shadows[designTokens.components.card.shadow]
});

export const generateButtonStyles = (variant = 'primary') => ({
  paddingLeft: designTokens.components.button.paddingX,
  paddingRight: designTokens.components.button.paddingX,
  paddingTop: designTokens.components.button.paddingY,
  paddingBottom: designTokens.components.button.paddingY,
  borderRadius: designTokens.components.button.borderRadius,
  fontWeight: designTokens.components.button.fontWeight,
  backgroundColor: designTokens.colors[variant]?.[500] || designTokens.colors.primary[500]
});

export default designTokens;