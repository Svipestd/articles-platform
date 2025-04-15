import type { Meta, StoryObj } from '@storybook/react';
import { CurrencySelect } from './CurrencySelect';
import { Currency } from '../../model/types/currency';

const meta: Meta<typeof CurrencySelect> = {
  title: 'widgets/CurrencySelect',
  component: CurrencySelect,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
