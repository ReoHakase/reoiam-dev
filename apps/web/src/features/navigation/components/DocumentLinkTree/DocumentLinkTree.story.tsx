import type { Meta, StoryObj } from '@storybook/react';
import type { DocumentLinkTreeMetadata } from '../../types/DocumentLinkMetadata';
import { DocumentLinkTree } from './DocumentLinkTree';
import { css } from 'styled-system/css';

// Disable Next.js typed routes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const documentLinkTreeMetadata: DocumentLinkTreeMetadata<any> = {
  title: 'Works',
  description: 'All the works I have done so far.',
  slug: ['works'],
  href: '/docs/works',
  emoji: '💼',
  children: [
    {
      title: 'Shelfree',
      description: 'Face recognition and RFID based smart library management system',
      slug: ['works', 'shelfree'],
      href: '/docs/works/shelfree',
      emoji: '📚',
    },
    {
      title: 'Locker.ai',
      description: 'Automated lost and found system powered by Vision-Language model and smart lockers.',
      slug: ['works', 'lockerai'],
      href: '/docs/works/lockerai',
      emoji: '🔐',
    },
  ],
};

// Disable Next.js typed routes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nestedDocumentLinkTreeMetadata: DocumentLinkTreeMetadata<any> = {
  title: 'Works',
  description: 'All the works I have done so far.',
  slug: ['works'],
  href: '/docs/works',
  emoji: '💼',
  children: [
    {
      title: 'Shelfree',
      description: 'Face recognition and RFID based smart library management system',
      slug: ['works', 'shelfree'],
      href: '/docs/works/shelfree',
      emoji: '📚',
      children: [
        {
          title: 'Shelfree Web App',
          description: 'List and check the books you have borrowed and returned from your device',
          slug: ['works', 'shelfree', 'webapp'],
          href: '/docs/works/shelfree/webapp',
        },
        {
          title: 'Shelfree Sensor Server',
          description: 'Face recognition and RFID sensor server written in Python',
          slug: ['works', 'shelfree', 'sensorserver'],
          href: '/docs/works/shelfree/sensorserver',
          emoji: '📚',
        },
      ],
    },
    {
      title: 'Locker.ai',
      description: 'Automated lost and found system powered by Vision-Language model and smart lockers.',
      slug: ['works', 'lockerai'],
      href: '/docs/works/lockerai',
      emoji: '🔐',
    },
  ],
};

type Story = StoryObj<typeof DocumentLinkTree>;

const meta: Meta<typeof DocumentLinkTree> = {
  component: DocumentLinkTree,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ol className={css({ w: '72' })}>
        <Story />
      </ol>
    ),
  ],
  args: {
    metadata: documentLinkTreeMetadata,
  },
  argTypes: {},
};

export default meta;

export const Default: Story = {};

export const Nested: Story = {
  args: {
    metadata: nestedDocumentLinkTreeMetadata,
  },
};
