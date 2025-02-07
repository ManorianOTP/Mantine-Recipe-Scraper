import type { Meta, StoryObj } from '@storybook/react';
import { HtmlDataProvider, useHtmlData } from '@/app/contexts/HtmlDataContext';
import RecipeDetails from './recipe-details';

const meta = {
  component: RecipeDetails,
} satisfies Meta<typeof RecipeDetails>;

export default meta;

const mockData = {
  title: 'Classic Victoria sandwich recipe',
  ingredients: [
      '200g caster sugar',
      '200g softened butter',
      '4 eggs beaten',
      '200g self-raising flour',
      '1 tsp  baking powder',
      '2 tbsp milk',
      '100g butter softened',
      '140g icing sugar sifted',
      'drop vanilla extract (optional)',
      'half a 340g jar good-quality strawberry jam',
      'icing sugar to decorate',
  ],
  method: [
      'Heat oven to 190C/fan 170C/gas 5. Butter two 20cm sandwich tins and line with non-stick baking paper.',
      'In a large bowl, beat 200g caster sugar, 200g softened butter, 4 beaten eggs, 200g self-raising flour, 1 tsp baking powder and 2 tbsp milk together until you have a smooth, soft batter.',
      'Divide the mixture between the tins, smooth the surface with a spatula or the back of a spoon.',
      'Bake for about 20 mins until golden and the cake springs back when pressed.',
      'Turn onto a cooling rack and leave to cool completely.',
      'To make the filling, beat the 100g softened butter until smooth and creamy, then gradually beat in 140g sifted icing sugar and a drop of vanilla extract (if you’re using it).',
      'Spread the buttercream over the bottom of one of the sponges. Top it with 170g strawberry jam and sandwich the second sponge on top.',
      'Dust with a little icing sugar before serving. Keep in an airtight container and eat within 2 days.',
  ],
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium adipisci dolore quod nostrum sequi? Cupiditate id soluta obcaecati eos error rem consequuntur, asperiores itaque aut explicabo exercitationem quis perferendis suscipit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium adipisci dolore quod nostrum sequi? Cupiditate id soluta obcaecati eos error rem consequuntur, asperiores itaque aut explicabo exercitationem quis perferendis suscipit? Hi',
  image: '/',
  prepTime: '40',
  cookTime: '20',
  servings: '8',
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) =>
    // Here we call the hook inside the context provider and set the mock data
     (
      <HtmlDataProvider>
        <SetMockData />
        <RecipeDetails {...args} />
      </HtmlDataProvider>
    )
  ,
};

const SetMockData = () => {
  const { setRecipeData } = useHtmlData();
  // Set the mock data inside the context
  setRecipeData(mockData);
  return null; // No need to render anything for this component
};
