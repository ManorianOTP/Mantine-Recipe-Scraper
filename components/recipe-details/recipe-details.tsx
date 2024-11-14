// components/RecipeDetails.tsx

'use client';

import { Clock, Users } from 'lucide-react';
import { Card, Checkbox, Divider, Text, Title } from '@mantine/core';
import { useHtmlData } from '@/app/contexts/HtmlDataContext';

export default function RecipeDetails() {
  const { recipeData } = useHtmlData();

  if (!recipeData) return null;

  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={1}>{recipeData.title}</Title>

        <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Clock size={18} />
            <Text ml="xs">30 mins</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Users size={18} />
            <Text ml="xs">Serves 4</Text>
          </div>
        </div>

        <Divider my="sm" />

        <section>
          <Title order={2}>Ingredients</Title>
          <div style={{ marginTop: '0.5rem' }}>
            {recipeData.ingredients.map((ingredient, index) => (
              <div key={index}>
                <Checkbox label={ingredient} style={{ padding: '2px' }} />
              </div>
            ))}
          </div>
        </section>

        <Divider my="sm" />

        <section>
          <Title order={2}>Method</Title>
          <div style={{ marginTop: '0.5rem' }}>
            {recipeData.method.map((step, index) => (
              <div key={index} style={{ marginBottom: '1rem' }}>
                <Text>Step {index + 1}</Text>
                <Text>{step}</Text>
              </div>
            ))}
          </div>
        </section>
      </Card>
    </div>
  );
}
