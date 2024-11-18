import type { Meta, StoryObj } from '@storybook/react';
import { LanguageSwitcher } from './LanguageSwitcher';

const meta = {
  title: 'widgets/LanguageSwitcher',
  component: LanguageSwitcher,
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;

type Story = StoryObj<typeof LanguageSwitcher>;

export const Default: Story = {
  args: {},
};
