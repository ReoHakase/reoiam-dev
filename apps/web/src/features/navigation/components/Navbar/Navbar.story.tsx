import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { css } from 'styled-system/css';

type Story = StoryObj<typeof Navbar>;

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  tags: ['autodocs'],
  args: {
    className: css({ w: '80' }),
  },
  argTypes: {},
};

export default meta;

export const Default: Story = {};
