import type { Meta, StoryObj } from '@storybook/react';
import { CommentViewCard } from './CommentViewCard';

const meta: Meta<typeof CommentViewCard> = {
  title: 'widgets/CommentCard',
  component: CommentViewCard,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
