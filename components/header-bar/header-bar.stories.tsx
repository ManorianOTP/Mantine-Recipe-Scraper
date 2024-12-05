import type { Meta, StoryObj } from '@storybook/react';
import { HtmlDataProvider } from '@/app/contexts/HtmlDataContext';
import HeaderBar from './header-bar';

const meta = {
  component: HeaderBar,
} satisfies Meta<typeof HeaderBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <HtmlDataProvider>
      <HeaderBar {...args} />
    </HtmlDataProvider>
  ),
};
