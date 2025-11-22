/**
 * ORCHESTOR DESIGN SYSTEM
 * Design tokens and utilities for consistent UI
 */

export const designTokens = {
  // === COLORS ===
  colors: {
    customGreen: '#E2FDE6',
    customDark: '#1a1a1a',
    customGray: '#2a2a2a',
    black: '#000000',
    white: '#ffffff',
    gray: {
      200: '#e5e5e5',
      600: '#737373',
      700: '#404040',
      800: '#262626',
    },
  },

  // === TYPOGRAPHY ===
  fonts: {
    logo: "'Array', serif",
    body: "'LT Superior', Arial, sans-serif",
    mono: 'monospace',
  },

  fontSizes: {
    // Responsive clamp values from design
    logo: 'clamp(48px, 14vw, 200px)',
    h1: 'clamp(32px, 4.5vw, 60px)',
    h2Large: 'clamp(40px, 6vw, 90px)',
    h2Medium: 'clamp(40px, 6vw, 80px)',
    h2Small: 'clamp(36px, 5vw, 72px)',
    h3: 'clamp(32px, 4vw, 48px)',
    h4: 'clamp(20px, 2.5vw, 28px)',
    bodyLarge: 'clamp(20px, 2.5vw, 36px)',
    bodyMedium: 'clamp(18px, 2vw, 28px)',
    body: 'clamp(16px, 1.5vw, 25px)',
    bodySmall: 'clamp(14px, 1.5vw, 18px)',
    caption: 'clamp(12px, 1.5vw, 14px)',
    menu: 'clamp(24px, 3vw, 40px)',
    time: 'clamp(14px, 2vw, 20px)',
    button: 'clamp(18px, 2vw, 25px)',
    buttonLarge: 'clamp(18px, 2.5vw, 28px)',
    step: 'clamp(60px, 8vw, 96px)',
    label: 'clamp(16px, 2vw, 20px)',
    input: '14px',
    icon: 'clamp(40px, 5vw, 56px)',
    iconLarge: 'clamp(48px, 6vw, 64px)',
    sectionLabel: 'clamp(14px, 1.5vw, 18px)',
  },

  letterSpacing: {
    tightest: '-5px',
    normal: '-1px',
  },

  lineHeight: {
    tight: '0.85',
    heading: '1.2',
    normal: '1.4',
    relaxed: '1.5',
    loose: '1.6',
    veryLoose: '1.7',
    extraLoose: '1.8',
  },

  // === SPACING ===
  spacing: {
    sectionPadding: 'clamp(20px, 4vw, 30px)',
    sectionPaddingY: 'clamp(80px, 12vw, 150px)',
    sectionPaddingYLarge: 'clamp(100px, 15vw, 200px)',
    sectionPaddingX: 'clamp(20px, 4vw, 50px)',
    navbarMargin: 'clamp(30px, 5vw, 35px)',
    navbarGap: 'clamp(50px, 8vw, 80px)',
    contentGap: 'clamp(20px, 3vw, 50px)',
    gridGap: 'clamp(40px, 6vw, 80px)',
    gridGapSmall: 'clamp(40px, 5vw, 60px)',
    headingMargin: 'clamp(40px, 6vw, 80px)',
    sectionMargin: 'clamp(50px, 8vw, 100px)',
    sectionMarginLarge: 'clamp(60px, 10vw, 120px)',
    heroScroll: 'clamp(20px, 5vw, 120px)',
    heroCTA: 'clamp(50px, 10vw, 200px)',
    cardPadding: 'clamp(30px, 4vw, 50px)',
    buttonPaddingX: 'clamp(20px, 3vw, 40px)',
    buttonPaddingXLarge: 'clamp(30px, 4vw, 50px)',
    buttonPaddingXCTA: 'clamp(40px, 5vw, 80px)',
    buttonPaddingY: '15px',
    buttonPaddingYLarge: 'clamp(18px, 2.5vw, 25px)',
  },

  // === SIZING ===
  sizing: {
    heroImageWidth: 'clamp(500px, 52vw, 1125px)',
    heroImageHeight: 'clamp(400px, 38vw, 695px)',
    heroImageHeightMd: '500px',
    heroImageHeightSm: '300px',
    maxWidthContent: '1400px',
    maxWidthDemo: '900px',
    maxWidthNarrow: '1000px',
    maxWidthCTA: '800px',
    minWidthContent: '300px',
    textareaHeight: '200px',
    iconSize: 'clamp(40px, 5vw, 56px)',
    iconSizeLarge: 'clamp(48px, 6vw, 64px)',
  },

  // === BORDERS ===
  borders: {
    width: '2px',
    radius: '5px',
    radiusLarge: '10px',
  },

  // === TRANSITIONS ===
  transitions: {
    default: '0.3s ease-in-out',
    colors: 'transition-colors',
    fadeIn: '0.8s ease',
  },

  // === OPACITY ===
  opacity: {
    subtle: '0.5',
    medium: '0.6',
    light: '0.7',
    lighter: '0.8',
  },

  // === BREAKPOINTS ===
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
    '1.5xl': '1600px',
    '2xl': '1800px',
  },
} as const

export type DesignTokens = typeof designTokens
