import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { getDocumentLinkTreeMetadata } from '../../utils/getDocumentLinkTreeMetadata';
import { DocumentLinkTree } from '../DocumentLinkTree/DocumentLinkTree';
import { cx, sva, type RecipeVariantProps } from 'styled-system/css';

export const sidebarSlotRecipe = sva({
  slots: ['container', 'treelist'],
  base: {
    container: {
      display: 'flex',
      flexDir: 'column',
      gap: '2',
      alignItems: 'stretch',
      justifyContent: 'start',
      p: '4',
    },
    treelist: {
      display: 'flex',
      flexDir: 'column',
      gap: '2',
      w: 'full',
    },
  },
  variants: {
    hasPadding: {
      true: {
        container: {
          p: '4',
        },
      },
      false: {
        container: {
          p: '0',
        },
      },
    },
  },
  defaultVariants: {
    hasPadding: true,
  },
});

export type SidebarProps = RecipeVariantProps<typeof sidebarSlotRecipe> & ComponentPropsWithoutRef<'nav'>;

export const Sidebar = ({ className, hasPadding, ...props }: SidebarProps): ReactNode => {
  const { container, treelist } = sidebarSlotRecipe({ hasPadding });
  const rootTrees = getDocumentLinkTreeMetadata();

  return (
    <nav className={cx(container, className)} {...props}>
      <ol className={cx(treelist)}>
        {rootTrees.map((rootTree) => (
          <DocumentLinkTree key={rootTree.slug[0]} metadata={rootTree} />
        ))}
      </ol>
    </nav>
  );
};
