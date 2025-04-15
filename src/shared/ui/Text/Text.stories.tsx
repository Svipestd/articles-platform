import type { Meta, StoryObj } from '@storybook/react';
import { Text, TextColor } from './Text';

const meta = {
  title: 'shared/Text',
  component: Text,
  args: {},
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  args: {
    text: 'Text Text Text Text Text',
  },
};

export const Error: Story = {
  args: {
    text: 'Text Text Text Text Text',
    color: TextColor.ERROR,
  },
};
