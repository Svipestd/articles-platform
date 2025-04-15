import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarSize } from './Avatar';
import AvatarDefault from '@/shared/assets/images/avatarDefault.jpg';

const meta: Meta<typeof Avatar> = {
  title: 'shared/Avatar',
  component: Avatar,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: AvatarDefault,
  },
};

export const Small: Story = {
  args: {
    src: AvatarDefault,
    size: AvatarSize.S,
  },
};
