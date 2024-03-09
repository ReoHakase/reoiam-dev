import { ListOrdered } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerScrollArea,
  DrawerKnob,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/features/modal/components/Drawer/Drawer';
import { NavbarDetailButton, NavbarButtonLabel } from '@/features/navigation/components/Navbar/Navbar';
import { allContentDocuments } from 'contentlayer/generated';

type DocumentPageProps = { params: { slug: string[] } };

export const generateStaticParams = async () => {
  const params = allContentDocuments.map((post) => ({
    slug: post._raw.flattenedPath.split('/'),
  }));
  return params;
};

const Document = ({ params }: DocumentPageProps): ReactNode => {
  // Find the post for the current page.
  const post = allContentDocuments.find(
    (contentDocument) => contentDocument._raw.flattenedPath === params.slug.join('/'),
  );

  // 404 if the post does not exist.
  if (!post) notFound();

  return (
    <Drawer occupancy="third" overlay="transparent">
      <DrawerTrigger asChild>
        <NavbarDetailButton aria-label="Open table of contents">
          <NavbarButtonLabel>Table of Contents</NavbarButtonLabel>
          <ListOrdered />
        </NavbarDetailButton>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerKnob />
          <DrawerClose>Close</DrawerClose>
          <DrawerScrollArea>
            <DrawerTitle>Table of Contents</DrawerTitle>
            <DrawerDescription>🚧 Work in progress</DrawerDescription>
          </DrawerScrollArea>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default Document;
