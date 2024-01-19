/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable storybook/story-exports */
/* eslint-disable storybook/default-exports */
import React, { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    isColored: false,
    text: 'Сохранить',
    type: 'button',
  },
};
