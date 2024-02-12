import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { css } from 'styled-system/css';

type Story = StoryObj<typeof Sidebar>;

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  tags: ['autodocs'],
  args: {
    className: css({ w: '80' }),
  },
  argTypes: {},
};

export default meta;

export const Default: Story = {};
