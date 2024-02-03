import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { cx } from 'styled-system/css';
import { markupShowcase } from 'styled-system/recipes';
import type { RecipeVariantProps } from 'styled-system/types';

export type ShowcaseProps = {
  children?: ReactNode;
} & RecipeVariantProps<typeof markupShowcase> &
  ComponentPropsWithoutRef<'div'>;

// (3) Component Implementation
/**
 * A container with grid background for showcasing purposes.
 * @param css Style props in PandaCSS format. e.g. `[{ w: 'full', bg: 'cyan.9' }]`
 * @param children Children `ReactNode` to render.
 */
export const Showcase = ({ children, className, ...props }: ShowcaseProps): ReactNode => {
  return (
    <div className={cx(markupShowcase(props), className)} {...props}>
      {children}
    </div>
  );
};
