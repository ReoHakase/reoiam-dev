import { defineConfig } from '@pandacss/dev';
import { breakpoints } from '@/styles/tokens/breakpoints';
import { radixColorsWithScaleAliasesPreset } from '@/styles/tokens/radixColorsPreset';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          heading: {
            value: 'var(--font-cal-sans)', // Make sure that the variable's name matches the one in apps/web/src/styles/fonts/index.ts
            description: 'The font used for headings and outstanding texts',
          },
          code: {
            value: 'var(--font-geist-mono)',
            description: 'The font used for code blocks and inline code',
          },
        },
      },
      breakpoints: breakpoints,
    },
  },

  conditions: {
    extend: {
      // NOTE: Make sure these selectors match the configurations passed to `next-themes` ThemeProvider
      light: "&[data-theme='light'], [data-theme='light'] &",
      dark: "&[data-theme='dark'], [data-theme='dark'] &",
    },
  },

  // Presets
  presets: [
    // Radix Scales provider for PandaCSS by milandekruijf
    // Refer: https://github.com/milandekruijf/pandacss-preset-radix-colors
    radixColorsWithScaleAliasesPreset({
      darkMode: {
        // NOTE: Make sure these selectors match the configurations passed to `next-themes` ThemeProvider
        condition: "&[data-theme='dark'], [data-theme='dark'] &",
      },
      autoP3: true,
      scaleAliases: {
        keyplate: 'slate',
        primary: 'pink',
        secondary: 'blue',
        info: 'cyan',
        success: 'green',
        warning: 'yellow',
        danger: 'crimson',
      },
      aliasMode: 'reference',
      includedRadixScales: ['white', 'black', 'cyan', 'yellow', 'pink', 'purple'],
    }),

    // Re-add the panda preset if you want to keep
    // the default keyframes, breakpoints, tokens
    // and textStyles provided by PandaCSS
    '@pandacss/preset-panda',
  ],

  // The output directory for your css system
  outdir: 'styled-system',
});
