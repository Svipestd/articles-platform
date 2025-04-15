import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonVariant } from './Button';

const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Text',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Text',
    disabled: true,
  },
};

export const Text: Story = {
  args: {
    children: 'Text',
    variant: ButtonVariant.TEXT,
  },
};

export const Outline: Story = {
  args: {
    children: 'Text',
    variant: ButtonVariant.OUTLINE,
  },
};
