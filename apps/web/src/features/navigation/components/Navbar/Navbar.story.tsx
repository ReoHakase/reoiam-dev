import type { Meta, StoryObj } from '@storybook/react';
import { ListOrdered } from 'lucide-react';
import { Navbar, NavbarTitle, NavbarDetailButton, NavbarButtonLabel, NavbarButtonContainer } from './Navbar';
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
} from '@/components/Drawer/Drawer';
import { css } from 'styled-system/css';

type Story = StoryObj<typeof Navbar>;

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  tags: ['autodocs'],
  args: {
    className: css({ w: '80' }),
    children: (
      <>
        <NavbarTitle>📝 Title of Content</NavbarTitle>
        <NavbarButtonContainer>
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
        </NavbarButtonContainer>
      </>
    ),
  },
  argTypes: {},
};

export default meta;

export const Default: Story = {};
