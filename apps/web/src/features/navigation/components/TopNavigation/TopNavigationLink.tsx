'use client';

import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { cx, cva } from 'styled-system/css';

export const topNavigationLinkRecipe = cva({
  base: {
    display: 'flex',
    flexDir: 'row',
    gap: '1',
    justifyContent: 'start',
    alignItems: 'center',
    fontFamily: 'heading',
    px: '4',
    py: '2',
    rounded: 'lg',
    _descendantIcon: { display: 'inline', w: '4', h: '4' },
  },
  variants: {
    selected: {
      true: {
        color: 'keyplate.11',
        cursor: 'not-allowed',
      },
      false: {
        _hover: {
          bg: 'keyplate.a.3',
        },
      },
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export type TopNavigationLinkProps = LinkProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof LinkProps> & {
    className?: string;
    selected?: boolean;
    children: ReactNode;
  };

export const TopNavigationLink = ({
  href,
  className,
  selected,
  children,
  ...props
}: TopNavigationLinkProps): ReactNode => {
  // Retrieve the current path starting with /.
  // Refer: https://nextjs.org/docs/app/api-reference/functions/use-pathname
  const currentPath = usePathname(); // e.g. `/docs/works/shelfree`
  // Check if the current path is the same as the href.
  const isBeingOpened = useMemo(() => currentPath === href.toString(), [currentPath, href]);

  const link = topNavigationLinkRecipe({
    selected: selected || isBeingOpened,
  });

  return (
    <Link
      href={href}
      className={cx(link, className)}
      aria-current={selected || isBeingOpened ? 'page' : undefined}
      {...props}
    >
      {children}
    </Link>
  );
};
