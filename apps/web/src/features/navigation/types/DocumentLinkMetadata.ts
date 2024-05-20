import type { LinkProps } from 'next/link';

export type DocumentLinkMetadata<T> = {
  emoji?: string;
  title: string;
  description: string;
  slug: string[];
  href: LinkProps<T>['href'];
};

export type DocumentLinkTreeMetadata<T> = DocumentLinkMetadata<T> & {
  children?: DocumentLinkTreeMetadata<T>[];
};
