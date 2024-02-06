import type { Meta, StoryObj } from '@storybook/react';
import { DocumentLink } from './DocumentLink';
import { css } from 'styled-system/css';

type Story = StoryObj<typeof DocumentLink>;

const meta: Meta<typeof DocumentLink> = {
  component: DocumentLink,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={css({ w: '72' })}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'MDX Showcase',
    description: 'This page demonstrates the usage of MDX.',
    // Disable Next.js typed routes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    href: '/docs/example' as unknown as any,
    emoji: '📝',
  },
  argTypes: {},
};

export default meta;

export const Default: Story = {};

export const Japanese: Story = {
  args: {
    title: 'MDXの使い方',
    description: 'このページでは、MDXの基本的な使い方を紹介します。',
  },
};

export const Selected: Story = {
  args: {
    selected: true,
  },
};
