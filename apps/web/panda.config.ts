import { defineConfig } from '@pandacss/dev';
import radixColorsPreset from 'pandacss-preset-radix-colors';
import { breakpoints } from '@/styles/tokens/breakpoints';

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
        colors: {
          hina: {
            value: '#F99D99',
          },
        },
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

  // Presets
  presets: [
    // Radix Scales provider for PandaCSS by milandekruijf
    // Refer: https://github.com/milandekruijf/pandacss-preset-radix-colors
    radixColorsPreset({
      darkMode: {
        condition: '[data-theme="dark"] &',
      },
      autoP3: false,
    }),

    // Re-add the panda preset if you want to keep
    // the default keyframes, breakpoints, tokens
    // and textStyles provided by PandaCSS
    '@pandacss/preset-panda',
  ],

  // The output directory for your css system
  outdir: 'styled-system',
});
