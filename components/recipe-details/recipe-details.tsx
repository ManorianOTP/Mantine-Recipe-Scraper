'use client';

import Image from 'next/image';
import { Clock, Users } from 'lucide-react';
import { Checkbox, Divider, Flex, Rating, Stack, Text, Title } from '@mantine/core';
import { useHtmlData } from '@/app/contexts/HtmlDataContext';

export default function RecipeDetails() {
  const { recipeData } = useHtmlData();

  if (!recipeData) return null;

  return (
    <>
      <Flex align={{ base: 'center', sm: 'start' }} direction={{ base: 'column', sm: 'row' }}>
        <Image
          width={350}
          height={350}
          src="/chocolate-fudge-cake-91de17a.webp"
          alt="Recipe Image"
          style={{ objectFit: 'cover'}}
          priority={true}
        />
        <Stack justify="space-between" style={{flexGrow: '1', paddingLeft: '2px'}}>
          <div>
            <Title order={1} style={{ marginBottom: '2px' }}>
              {recipeData.title}
            </Title>
            <Rating fractions={2} style={{ marginBottom: '2px' }} />
            <Text>Category</Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium adipisci dolore
              quod nostrum sequi? Cupiditate id soluta obcaecati eos error rem consequuntur,
              asperiores itaque aut explicabo exercitationem quis perferendis suscipit? Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Laudantium adipisci dolore quod nostrum
              sequi? Cupiditate id soluta obcaecati eos error rem consequuntur, asperiores itaque
              aut explicabo exercitationem quis perferendis suscipit?
            </Text>
          </div>
          <div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Clock size={18} />
                <Text ml="xs">30 mins</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Users size={18} />
                <Text ml="xs">Serves 4</Text>
              </div>
            </div>
          </div>
        </Stack>
      </Flex>
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
    </>
  );
}
