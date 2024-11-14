import type { Meta, StoryObj } from '@storybook/react';

import { ColorSchemeToggle } from './ColorSchemeToggle';

const meta = {
  component: ColorSchemeToggle,
} satisfies Meta<typeof ColorSchemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};