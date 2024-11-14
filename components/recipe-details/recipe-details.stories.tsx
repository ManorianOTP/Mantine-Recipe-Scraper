import type { Meta, StoryObj } from '@storybook/react';
import { HtmlDataProvider, useHtmlData } from '@/app/contexts/HtmlDataContext';
import RecipeDetails from './recipe-details';

const meta = {
  component: RecipeDetails,
} satisfies Meta<typeof RecipeDetails>;

export default meta;

const mockData = {
  title: 'Easy chocolate fudge cake',
  ingredients: [
    '150ml sunflower oil plus extra for the tin',
    '175g self-raising flour',
    '2 tbsp cocoa powder',
    '1 tsp bicarbonate of soda',
    '150g caster sugar',
    '2 tbsp golden syrup',
    '2 large eggs lightly beaten',
    '150ml semi-skimmed milk',
    '100g unsalted butter',
    '225g icing sugar',
    '40g cocoa powder',
    '2½ tbsp milk (a little more if needed)',
  ],
  method: [
    'Heat the oven to 180C/160C fan/gas 4. Oil and line the base of two 18cm sandwich tins. Sieve the flour, cocoa powder and bicarbonate of soda into a bowl. Add the caster sugar and mix well.',
    'Make a well in the centre and add the golden syrup, eggs, sunflower oil and milk. Beat well with an electric whisk until smooth.',
    'Pour the mixture into the two tins and bake for 25-30 mins until risen and firm to the touch. Remove from oven, leave to cool for 10 mins before turning out onto a cooling rack.',
    'To make the icing, beat the unsalted butter in a bowl until soft. Gradually sieve and beat in the icing sugar and cocoa powder, then add enough of the milk to make the icing fluffy and spreadable.',
    'Sandwich the two cakes together with the butter icing and cover the sides and the top of the cake with more icing.',
  ],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    // Here we call the hook inside the context provider and set the mock data
    return (
      <HtmlDataProvider>
        <SetMockData />
        <RecipeDetails {...args} />
      </HtmlDataProvider>
    );
  },
};

const SetMockData = () => {
  const { setRecipeData } = useHtmlData();
  // Set the mock data inside the context
  setRecipeData(mockData);
  return null; // No need to render anything for this component
};
