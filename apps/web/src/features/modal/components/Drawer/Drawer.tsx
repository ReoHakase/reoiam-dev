'use client';

import { Drawer as VaulDrawer } from 'vaul';
import { createSlotRecipeContext } from '@/states/createSlotRecipeContext';
import { sva } from 'styled-system/css';

const drawerSlotRecipe = sva({
  slots: ['overlay', 'content', 'scrollarea', 'title', 'description', 'close', 'knob'],
  base: {
    overlay: {
      position: 'fixed',
      inset: '0',
    },
    content: {
      boxShadow: 'floating',
      bg: 'keyplate.1',
      position: 'fixed',
      bottom: '0',
      left: '0',
      right: '0',
      w: 'calc(token(sizes.full) - token(spaces.2) * 2)',
      display: 'flex',
      flexDirection: 'column',
      roundedTop: 'xl',
      zIndex: '100',
      mx: '2',
    },
    scrollarea: {
      p: '4',
      display: 'flex',
      flexDirection: 'column',
      gap: '2',
      w: 'full',
    },
    knob: {
      w: '24',
      alignSelf: 'center',
      h: '1',
      bg: 'keyplate.6',
      rounded: 'full',
      my: '4',
      flexShrink: '0',
    },
    title: {
      fontWeight: 'bold',
      fontFamily: 'heading',
      fontSize: 'lg',
    },
    description: {
      fontSize: 'sm',
    },
    close: {
      position: 'absolute',
      top: '2',
      color: 'keyplate.11',
      right: '2',
      fontSize: 'sm',
      fontWeight: 'bold',
      fontFamily: 'heading',
      textTransform: 'uppercase',
      cursor: 'pointer',
    },
  },
  variants: {
    overlay: {
      dark: {
        overlay: {
          bg: 'keyplate.a.2', // TODO: Use token
        },
      },
      transparent: {
        overlay: {
          bg: 'transparent',
        },
      },
    },
    occupancy: {
      full: {
        content: {
          h: '90%',
        },
      },
      twothird: {
        content: {
          h: '67%',
        },
      },
      half: {
        content: {
          h: '50%',
        },
      },
      third: {
        content: {
          h: '33%',
        },
      },
    },
    scrollable: {
      true: {
        scrollarea: {
          overflowY: 'auto',
        },
      },
      false: {
        scrollarea: {
          overflowY: 'hidden',
        },
      },
    },
  },
  defaultVariants: {
    scrollable: false,
    occupancy: 'full',
    overlay: 'dark',
  },
});

const { withVariantProvider, withVariantConsumer } = createSlotRecipeContext(drawerSlotRecipe);

// Disabled `compilerOptions.decleration` in tsconfig.json to avoid the following error:
// The inferred type of "X" cannot be named without a reference to "Y" ...
// Refer: https://github.com/microsoft/TypeScript/issues/42873
const Drawer = withVariantProvider(VaulDrawer.Root, null);
const DrawerTrigger = VaulDrawer.Trigger;
const DrawerPortal = VaulDrawer.Portal;
const DrawerOverlay = withVariantConsumer(VaulDrawer.Overlay, 'overlay');
const DrawerContent = withVariantConsumer(VaulDrawer.Content, 'content');
const DrawerScrollArea = withVariantConsumer('div', 'scrollarea');
const DrawerKnob = withVariantConsumer('div', 'knob');
const DrawerTitle = withVariantConsumer(VaulDrawer.Title, 'title');
const DrawerDescription = withVariantConsumer(VaulDrawer.Description, 'description');
const DrawerClose = withVariantConsumer(VaulDrawer.Close, 'close');

export {
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
};
