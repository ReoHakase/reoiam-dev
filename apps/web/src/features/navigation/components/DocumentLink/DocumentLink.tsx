'use client';

import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import type { ReactNode } from 'react';
import type { DocumentLinkMetadata } from '../../types/DocumentLinkMetadata';
import { cx, sva, type RecipeVariantProps } from 'styled-system/css';

export const documentLinkSlotRecipe = sva({
  slots: ['link', 'titlegroup', 'title', 'description', 'emoji'],
  base: {
    link: {
      w: 'full',
      display: 'flex',
      flexDir: 'row',
      justifyContent: 'start',
      alignItems: 'center',
      gap: '2',
      p: '2',
      rounded: 'lg',
      transition: 'background-color 0.1s',
    },
    titlegroup: {
      display: 'flex',
      flexDir: 'column',
    },
    title: {
      fontWeight: 'bold',
      fontFamily: 'heading',
      transition: 'color 0.1s',
    },
    description: {
      fontSize: 'xs',
      transition: 'color 0.1s',
    },
    emoji: {
      aspectRatio: 'square',
      h: '10',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid',
      rounded: 'md',
      fontSize: '2xl',
      transition: 'background-color 0.1s, border-color 0.1s',
    },
  },
  variants: {
    selected: {
      true: {
        link: {
          bg: 'primary.3',
        },
        title: {
          color: 'primary.12',
        },
        description: {
          color: 'primary.11',
        },
        emoji: {
          color: 'primary.11',
          bg: 'primary.4',
          borderColor: 'primary.5',
        },
      },
      false: {
        link: {
          _hover: {
            bg: 'keyplate.3',
          },
        },
        title: {},
        description: {
          color: 'keyplate.11',
        },
        emoji: {
          color: 'keyplate.11',
          bg: {
            base: 'keyplate.2',
            _groupHover: 'keyplate.4',
          },
          borderColor: {
            base: 'keyplate.3',
            _groupHover: 'keyplate.5',
          },
        },
      },
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export type DocumentLinkProps<T> = {
  className?: string;
} & DocumentLinkMetadata<T> &
  RecipeVariantProps<typeof documentLinkSlotRecipe> &
  Omit<LinkProps<T>, 'href'>;

/**
 * Renders a document item.
 * @param emoji Emoji that represents the document.
 * @param title Title of document.
 * @param description Description to document.
 * @param href Path to the document.
 */
export const DocumentLink = <T,>({
  emoji,
  title,
  description,
  href,
  selected,
  className,
  ...props
}: DocumentLinkProps<T>): ReactNode => {
  // Retrieve the current path starting with /.
  // Refer: https://nextjs.org/docs/app/api-reference/functions/use-pathname
  const currentPath = usePathname(); // e.g. `/docs/works/shelfree`
  // Check if the current path is the same as the href.
  const isBeingOpened = useMemo(() => currentPath === href.toString(), [currentPath, href]);

  const {
    link,
    titlegroup,
    title: titleStyle,
    description: descriptionStyle,
    emoji: emojiStyle,
  } = documentLinkSlotRecipe({
    selected: selected || isBeingOpened,
  });

  return (
    <Link href={href} className={cx(link, 'group', className)} {...props}>
      {emoji && <span className={emojiStyle}>{emoji}</span>}
      <div className={titlegroup}>
        <p className={titleStyle}>{title}</p>
        <p className={descriptionStyle}>{description}</p>
      </div>
    </Link>
  );
};
