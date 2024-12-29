'use client'

import RecipeCard from '@/components/recipe-card/recipe-card'
import { Grid } from '@mantine/core'

export default function HomePage () {
  const numbers = Array.from({ length: 15 }, (_, index) => index + 1)
  return (
    <>
      <Grid m={'5px'}>
        {numbers.map((number, index) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2, xxl: 1.5 }}>
            <RecipeCard
              recipe={{
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
                  '2½ tbsp milk (a little more if needed)'
                ],
                method: [
                  'Heat the oven to 180C/160C fan/gas 4. Oil and line the base of two 18cm sandwich tins. Sieve the flour, cocoa powder and bicarbonate of soda into a bowl. Add the caster sugar and mix well.',
                  'Make a well in the centre and add the golden syrup, eggs, sunflower oil and milk. Beat well with an electric whisk until smooth.',
                  'Pour the mixture into the two tins and bake for 25-30 mins until risen and firm to the touch. Remove from oven, leave to cool for 10 mins before turning out onto a cooling rack.',
                  'To make the icing, beat the unsalted butter in a bowl until soft. Gradually sieve and beat in the icing sugar and cocoa powder, then add enough of the milk to make the icing fluffy and spreadable.',
                  'Sandwich the two cakes together with the butter icing and cover the sides and the top of the cake with more icing.'
                ],
                description:
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium adipisci dolore quod nostrum sequi? Cupiditate id soluta obcaecati eos error rem consequuntur, asperiores itaque aut explicabo exercitationem quis perferendis suscipit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium adipisci dolore quod nostrum sequi? Cupiditate id soluta obcaecati eos error rem consequuntur, asperiores itaque aut explicabo exercitationem quis perferendis suscipit?',
                image: '/chocolate-fudge-cake-91de17a.jpg',
                prepTime: '25',
                cookTime: '30',
                servings: ' 8'
              }}
            />
          </Grid.Col>
        ))}
      </Grid>
    </>
  )
}
