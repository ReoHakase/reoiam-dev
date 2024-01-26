import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { cx, css, sva } from 'styled-system/css';
import type { SystemStyleObject, RecipeVariantProps } from 'styled-system/types';

// (1) Style
export const showcaseSlotRecipe = sva({
  slots: ['root'],
  base: {
    root: {
      w: 'full',
      bgImage:
        'linear-gradient(0deg, transparent 31px, token(colors.keyplate.4) 32px), linear-gradient(90deg,  transparent 31px, token(colors.keyplate.4) 32px)',
      bgSize: '32px 32px',
      bgRepeat: 'repeat',
      rounded: 'lg',
      border: '1px solid',
      borderColor: 'keyplate.6',
      p: '4',
      my: '2',
      overflowX: 'scroll',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'start',
      gap: '2',
    },
  },
  variants: {
    direction: {
      row: {
        root: {
          flexDirection: 'row',
        },
      },
      column: {
        root: {
          flexDirection: 'column',
        },
      },
    },
  },
  defaultVariants: {
    direction: 'column',
  },
});

// (2) Type Definition
export type ShowcaseProps = {
  css?: SystemStyleObject[];
  children?: ReactNode;
} & RecipeVariantProps<typeof showcaseSlotRecipe> &
  ComponentPropsWithoutRef<'div'>;

// (3) Component Implementation
/**
 * A container with grid background for showcasing purposes.
 * @param css Style props in PandaCSS format. e.g. `[{ w: 'full', bg: 'cyan.9' }]`
 * @param children Children `ReactNode` to render.
 */
export const Showcase = ({ css: cssProps = [{}], children, className, ...props }: ShowcaseProps): ReactNode => {
  const { root } = showcaseSlotRecipe(props);
  return (
    <div className={cx(root, css(...cssProps), className)} {...props}>
      {children}
    </div>
  );
};
