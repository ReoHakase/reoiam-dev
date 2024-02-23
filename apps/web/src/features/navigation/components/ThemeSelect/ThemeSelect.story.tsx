import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSelect } from './ThemeSelect';
import { ThemeProvider } from '@/providers/ThemeProvider';

type Story = StoryObj<typeof ThemeSelect>;

const meta: Meta<typeof ThemeSelect> = {
  component: ThemeSelect,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  args: {},
  argTypes: {
    open: {
      control: {
        type: 'boolean',
      },
      description: 'If true, the select content will be visible',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Event handler for when the select content visibility changes',
    },
    onValueChange: {
      action: 'onValueChange',
      description: 'Event handler for when the select value changes',
    },
    value: {
      control: {
        type: 'text',
      },
      description: 'The current value of the select',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    defaultOpen: true,
  },
};
