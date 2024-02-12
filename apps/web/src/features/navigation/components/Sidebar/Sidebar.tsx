import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { getDocumentLinkTreeMetadata } from '../../utils/getDocumentLinkTreeMetadata';
import { DocumentLinkTree } from '../DocumentLinkTree/DocumentLinkTree';
import { cx, sva, type RecipeVariantProps } from 'styled-system/css';

export const sidebarSlotRecipe = sva({
  slots: ['container', 'treelist'],
  base: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2',
      alignItems: 'stretch',
      justifyContent: 'start',
      p: '4',
    },
    treelist: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2',
      w: 'full',
    },
  },
});

export type SidebarProps = RecipeVariantProps<typeof sidebarSlotRecipe> & ComponentPropsWithoutRef<'nav'>;

export const Sidebar = ({ className, ...props }: SidebarProps): ReactNode => {
  const { container, treelist } = sidebarSlotRecipe(props);
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
