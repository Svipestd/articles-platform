import type { Meta, StoryObj } from '@storybook/react';
import LoginForm from './LoginUserForm';
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator/StoreDecorator';

const meta: Meta<typeof LoginForm> = {
  title: 'features/LoginForm',
  component: LoginForm,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [(Story) => StoreDecorator(Story, { loginUser: { isLoading: true } })],
};

export const WithError: Story = {
  args: {},
  decorators: [
    (Story) =>
      StoreDecorator(Story, {
        loginUser: { isLoading: true },
      }),
  ],
};

export const WithLoading: Story = {
  args: {},
  decorators: [
    (Story) =>
      StoreDecorator(Story, {
        loginUser: { isLoading: true },
      }),
  ],
};
