import type { Meta, StoryObj } from '@storybook/react';
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
} from './Drawer';
import { Sidebar } from '@/features/navigation/components/Sidebar/Sidebar';

type Story = StoryObj<typeof Drawer>;

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  tags: ['autodocs'],
  args: {
    scrollable: false,
    children: (
      <>
        <DrawerTrigger asChild>
          <button>Open Drawer</button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerKnob />
            <DrawerScrollArea>
              <DrawerTitle>Drawer Title</DrawerTitle>
              <DrawerDescription>Drawer Description</DrawerDescription>
            </DrawerScrollArea>
            <DrawerClose>Close</DrawerClose>
          </DrawerContent>
        </DrawerPortal>
      </>
    ),
  },
  argTypes: {
    scrollable: {
      control: {
        type: 'boolean',
      },
      description: 'If true, the drawer content will be scrollable',
    },
  },
};

export default meta;

export const Default: Story = {};

export const Scrollable: Story = {
  args: {
    scrollable: true,
    children: (
      <>
        <DrawerTrigger asChild>
          <button>Open Drawer</button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerKnob />
            <DrawerScrollArea>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum. Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
              ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum. Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
              ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum. Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
              ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
              <br />
            </DrawerScrollArea>
          </DrawerContent>
        </DrawerPortal>
      </>
    ),
  },
};

export const Navigation: Story = {
  args: {
    scrollable: true,
    children: (
      <>
        <DrawerTrigger asChild>
          <button>Open Drawer</button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerKnob />
            <DrawerClose>Close</DrawerClose>
            <DrawerScrollArea>
              <Sidebar />
            </DrawerScrollArea>
          </DrawerContent>
        </DrawerPortal>
      </>
    ),
  },
};

export const Undissmissable: Story = {
  args: {
    scrollable: true,
    open: true,
    dismissible: false,
    children: (
      <>
        <DrawerTrigger asChild>
          <button>Open Drawer</button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerKnob />
            <DrawerScrollArea>
              <DrawerTitle>Drawer Title</DrawerTitle>
              <DrawerDescription>Drawer Description</DrawerDescription>
            </DrawerScrollArea>
          </DrawerContent>
        </DrawerPortal>
      </>
    ),
  },
};
