import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { cx, css, sva } from 'styled-system/css';
import type { SystemStyleObject, RecipeVariantProps } from 'styled-system/types';

// (1) Style
export const myComponentSlotRecipe = sva({
  slots: ['root', 'label'],
  base: {
    root: {
      bg: 'keyplate.12',
      rounded: 'md',
      p: '2',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1',
    },
    label: {
      fontFamily: 'heading',
      color: 'keyplate.1',
    },
  },
});

// (2) Type Definition
export type MyComponentProps = {
  css?: SystemStyleObject[];
  children?: ReactNode;
} & RecipeVariantProps<typeof myComponentSlotRecipe> &
  ComponentPropsWithoutRef<'div'>;

// (3) Component Implementation
/**
 * Renders a component.
 * @param css Style props in PandaCSS format. e.g. `[{ w: 'full', bg: 'cyan.9' }]`
 * @param children Children `ReactNode` to render.
 */
export const MyComponent = ({ css: cssProps = [{}], children, className, ...props }: MyComponentProps): ReactNode => {
  const { root } = myComponentSlotRecipe(props);
  return (
    <div className={cx(root, css(...cssProps), className)} {...props}>
      {children}
    </div>
  );
};
