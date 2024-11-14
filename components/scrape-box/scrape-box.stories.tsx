import type { Meta, StoryObj } from '@storybook/react';
import { HtmlDataProvider } from '@/app/contexts/HtmlDataContext';
import ScrapeBox from './scrape-box';

const meta = {
  component: ScrapeBox,
} satisfies Meta<typeof ScrapeBox>;

export default meta;

type Story = StoryObj<typeof meta>;

// Wrap ScrapeBox with HtmlDataProvider in the story
export const Default: Story = {
  render: (args) => (
    <HtmlDataProvider>
      <ScrapeBox {...args} />
    </HtmlDataProvider>
  ),
};
