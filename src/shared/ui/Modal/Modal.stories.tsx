import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'shared/Modal',
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas illum sequi ullam nemo fugit, magnam excepturi facere numquam deserunt veritatis repudiandae doloremque illo, earum tempora. Corrupti quaerat suscipit voluptas ullam.',
    isOpen: true,
  },
};
