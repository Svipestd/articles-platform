import type { Meta, StoryObj } from '@storybook/react';
import { AppLink, AppLinkColor } from './AppLink';

const meta = {
  title: 'shared/AppLink',
  component: AppLink,
  args: {
    to: '/',
  },
} satisfies Meta<typeof AppLink>;

export default meta;

type Story = StoryObj<typeof AppLink>;

export const Primary: Story = {
  args: {
    children: 'Link',
    color: AppLinkColor.PRIMARY,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Link',
    color: AppLinkColor.SECONDARY,
  },
};
