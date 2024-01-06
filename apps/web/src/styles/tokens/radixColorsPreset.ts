import { definePreset } from '@pandacss/dev';
import type { Preset } from '@pandacss/dev';
import radixColorsPreset from 'pandacss-preset-radix-colors';

/**
 * Array of radix scale names.
 * @see https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette
 */
const radixScaleNames = [
  'white',
  'black',
  'bronze',
  'gold',
  'brown',
  'orange',
  'tomato',
  'red',
  'ruby',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'iris',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'jade',
  'green',
  'grass',
  'sky',
  'mint',
  'lime',
  'yellow',
  'amber',
  'gray',
  'mauve',
  'slate',
  'sage',
  'olive',
  'sand',
] as const;

type RadixColorsWithScaleAliasesPresetOptions = {
  scaleAliases?: Record<string, (typeof radixScaleNames)[number]>;
  aliasMode?: 'clone' | 'reference';
  includedRadixScales?: (typeof radixScaleNames)[number][];
} & Parameters<typeof radixColorsPreset>[0];

/**
 * Generates a Radix colors preset with scale aliases.
 * @param options - The options for generating the preset.
 * @param options.scaleAliases - The scale alias map.
 * @param options.includedRadixScales - The included radix scales. 
 *  @example
 * ```ts
 * radixColorsWithScaleAliasesPreset({
      darkMode: {
        condition: '[data-theme="dark"] &',
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
    })
 * ```
 * @returns The generated preset.
 */
export function radixColorsWithScaleAliasesPreset({
  scaleAliases = {},
  aliasMode = 'clone',
  includedRadixScales = [],
  ...baseOptions
}: RadixColorsWithScaleAliasesPresetOptions) {
  const basePreset = radixColorsPreset(baseOptions);

  const referencedScaleNames = aliasMode === 'reference' ? Object.values(scaleAliases) : [];
  const filteredScalesColors = Object.fromEntries(
    Object.entries(basePreset.theme?.extend?.semanticTokens?.colors ?? {}).filter(([scaleName]) => {
      if (includedRadixScales) {
        return (
          includedRadixScales.includes(scaleName as (typeof radixScaleNames)[number]) ||
          referencedScaleNames.includes(scaleName as (typeof radixScaleNames)[number])
        );
      }
      return true;
    }),
  );

  const scaleAliasesColors = (() => {
    switch (aliasMode) {
      case 'clone':
        return Object.fromEntries(
          Object.entries(scaleAliases).map(([alias, scaleName]) => {
            const scale = basePreset.theme?.extend?.semanticTokens?.colors?.[scaleName];
            if (!scale) {
              throw new Error(`🐼 [radixColorsWithScaleAliasesPreset] Scale ${scaleName} does not exist.`);
            }
            // Replace scaleName with alias in each references in the scale
            // Search for `{colors.${scaleName}.${string}}` and replace it with `{colors.${alias}.${string}}` recursively
            const regex = new RegExp(`"{colors.${scaleName}.([a-zA-Z\\.0-9]*)}"`, 'g');
            const scaleWithAlias: typeof scale = JSON.parse(
              JSON.stringify(scale).replaceAll(regex, `"{colors.${alias}.$1}"`),
            );

            return [alias, scaleWithAlias];
          }),
        );
      case 'reference':
        return Object.fromEntries(
          Object.entries(scaleAliases).map(([alias, scaleName]) => {
            const scale = basePreset.theme?.extend?.semanticTokens?.colors?.[scaleName];
            if (!scale) {
              throw new Error(`🐼 [radixColorsWithScaleAliasesPreset] Scale ${scaleName} does not exist.`);
            }
            const tones = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;
            const scaleWithAlias: typeof scale = Object.fromEntries(
              tones.map((key) => [
                key,
                {
                  value: `{colors.${scaleName}.${key}}`,
                },
              ]),
            );
            return [alias, scaleWithAlias];
          }),
        );
    }
  })();

  // Deep merge the two presets
  const preset: Preset = { ...basePreset };
  if (preset.theme?.extend?.semanticTokens?.colors) {
    preset.theme.extend.semanticTokens.colors = {
      ...filteredScalesColors,
      ...scaleAliasesColors,
    };
  }

  return definePreset(preset);
}
