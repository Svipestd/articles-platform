import type { Meta, StoryObj } from '@storybook/react';
import ProfilePage from './ProfilePage';
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator/StoreDecorator';
import { Currency } from '@/entities/Currency';
import Avatar from '@/shared/assets/images/avatarDefault.jpg';
import { Country } from '@/entities/Country';

const meta: Meta<typeof ProfilePage> = {
  title: 'pages/ProfilePage',
  component: ProfilePage,
};

export default meta;

type Story = StoryObj<typeof meta>;

const data = {
  username: 'Username',
  firstName: 'John',
  lastName: 'Doe',
  age: 25,
  country: Country.USA,
  city: 'New Yourk',
  currency: Currency.USD,
  avatar: Avatar,
};

export const Default: Story = {
  args: {},
  decorators: [
    (story) =>
      StoreDecorator(story, {
        // profile: {
        //   form: data,
        //   data: data,
        //   readonly: true,
        // },
      }),
  ],
};
