import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { Header } from './Header';

type Story = StoryObj<typeof Header>;

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await userEvent.keyboard('{Escape}');
  },
};
