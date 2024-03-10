'use client';

import { FolderTree } from 'lucide-react';
import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerScrollArea,
  DrawerKnob,
  DrawerTitle,
  DrawerClose,
} from '@/components/Drawer/Drawer';
import { createSlotRecipeContext } from '@/states/createSlotRecipeContext';
import { sva } from 'styled-system/css';

const navbarSlotRecipe = sva({
  slots: ['root', 'sidebarButton', 'title', 'detailButton', 'buttonLabel', 'buttonContainer'],
  base: {
    root: {
      pos: 'fixed',
      bottom: '2',
      left: {
        base: '0',
        lg: 'auto',
      },
      right: '0',
      w: {
        base: 'calc(token(sizes.full) - token(spaces.2) * 2)',
        lg: 'fit-content',
      },
      mx: '2',
      display: {
        base: 'grid',
        xl: 'none',
      },
      gridTemplateColumns: {
        base: '1fr auto 1fr',
        lg: 'auto',
      },
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '2',
      p: '1',
      bg: 'keyplate.1',
      rounded: 'md',
      shadow: 'floating',
    },
    buttonContainer: {
      display: 'flex',
      flexDir: 'row',
      justifyContent: 'end',
      alignItems: 'center',
      gap: '1',
    },
    sidebarButton: {
      justifySelf: 'start',
      display: {
        base: 'flex',
        lg: 'none',
      },
      flexDir: 'row',
      alignItems: 'center',
      gap: '2',
      p: '1',
      flexShrink: '0',
      cursor: 'pointer',
    },
    detailButton: {
      justifySelf: 'end',
      display: 'flex',
      flexDir: 'row',
      alignItems: 'center',
      gap: '2',
      p: '1',
      flexShrink: '0',
      cursor: 'pointer',
    },
    buttonLabel: {
      display: 'none',
      fontFamily: 'heading',
      md: {
        display: 'block',
        fontSize: 'md',
        color: 'keyplate.11',
      },
    },
    title: {
      display: {
        base: 'flex',
        lg: 'none',
      },
      flexDir: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      fontFamily: 'heading',
      fontSize: {
        base: 'sm',
        md: 'lg',
      },
      textAlign: 'center',
      flexGrow: '1',
    },
  },
});

const { withVariantProvider, withVariantConsumer } = createSlotRecipeContext(navbarSlotRecipe);

// Disabled `compilerOptions.decleration` in tsconfig.json to avoid the following error:
// The inferred type of "X" cannot be named without a reference to "Y" ...
// Refer: https://github.com/microsoft/TypeScript/issues/42873
export const NavbarRoot = withVariantProvider('nav', 'root');
export const NavbarButtonContainer = withVariantConsumer('div', 'buttonContainer');
export const NavbarSidebarButton = withVariantConsumer('button', 'sidebarButton');
export const NavbarTitle = withVariantConsumer('span', 'title');
export const NavbarButtonLabel = withVariantConsumer('span', 'buttonLabel');
export const NavbarDetailButton = withVariantConsumer('button', 'detailButton');

export type NavbarProps = ComponentPropsWithoutRef<typeof NavbarRoot>;

export const Navbar = ({ children, ...props }: NavbarProps): ReactNode => {
  return (
    <NavbarRoot {...props}>
      <Drawer scrollable occupancy="twothird">
        <DrawerTrigger asChild>
          <NavbarSidebarButton aria-label="Open side bar to see list of all pages">
            <FolderTree />
            <NavbarButtonLabel>Page List</NavbarButtonLabel>
          </NavbarSidebarButton>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerKnob />
            <DrawerClose>Close</DrawerClose>
            <DrawerScrollArea>
              <DrawerTitle>All Documents</DrawerTitle>
              <Sidebar hasPadding={false} />
            </DrawerScrollArea>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
      {children}
    </NavbarRoot>
  );
};
