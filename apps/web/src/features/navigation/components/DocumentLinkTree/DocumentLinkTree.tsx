import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import type { DocumentLinkTreeMetadata } from '../../types/DocumentLinkMetadata';
import { DocumentLink } from '../DocumentLink/DocumentLink';
import { cx, sva, type RecipeVariantProps } from 'styled-system/css';

export const documentLinkTreeSlotRecipe = sva({
  slots: ['container', 'childlist'],
  base: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2',
      alignItems: 'stretch',
      justifyContent: 'start',
    },
    childlist: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2',
      borderLeft: '2px solid',
      borderColor: 'keyplate.6',
      pl: '4',
    },
  },
});

export type DocumentLinkTreeProps<T> = {
  metadata: DocumentLinkTreeMetadata<T>;
} & RecipeVariantProps<typeof documentLinkTreeSlotRecipe> &
  ComponentPropsWithoutRef<'li'>;

export const DocumentLinkTree = <T,>({ metadata, className, ...props }: DocumentLinkTreeProps<T>): ReactNode => {
  const { container, childlist } = documentLinkTreeSlotRecipe(props);
  const { children, ...parent } = metadata;
  return (
    <li className={cx(container, className)}>
      <DocumentLink {...parent} />
      {children && (
        <ol className={cx(childlist)}>
          {children.map((child, index) => (
            <DocumentLinkTree key={index} metadata={child} />
          ))}
        </ol>
      )}
    </li>
  );
};
