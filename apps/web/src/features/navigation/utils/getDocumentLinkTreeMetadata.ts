import type { DocumentLinkTreeMetadata, DocumentLinkMetadata } from '../types/DocumentLinkMetadata';
import { allContentDocuments } from 'contentlayer/generated';

/**
 * Retrieves the metadata for all document links.
 * Resulting array is sorted by slug length in descending order.
 * In other words, deeper links come first.
 *
 * @template T - Next.js route implementation. (Only used for type checking when typedRoute in enabled in config.)
 * @returns An array of `DocumentLinkTreeMetadata` objects.
 */
const getAllDocumentLinkMetadata = <T>(): DocumentLinkMetadata<T>[] => {
  // Sort by slug length in descending order
  const documentLinkMetadata = allContentDocuments
    .map((document) => {
      return {
        emoji: document.emoji,
        title: document.title,
        description: document.description,
        slug: document._raw.flattenedPath.split('/'),
        href: document.url,
      };
    })
    .sort((a, b) => b.slug.length - a.slug.length);

  return documentLinkMetadata;
};

export const getDocumentLinkTreeMetadata = <T>(): DocumentLinkTreeMetadata<T>[] => {
  const partialTrees: DocumentLinkTreeMetadata<T>[] = getAllDocumentLinkMetadata<T>();

  partialTrees.forEach((document) => {
    const parentSlug = document.slug.slice(0, -1);
    const parent = partialTrees.find((d) => d.slug.join('/') === parentSlug.join('/'));
    if (parent) {
      if (parent.children === undefined) {
        parent.children = [];
      }
      parent.children.push(document);
    }
  });

  const rootTrees = partialTrees.filter((document) => document.slug.length === 1);

  return rootTrees;
};
