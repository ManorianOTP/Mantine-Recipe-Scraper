'use client';

import { Clock, Save, Users } from 'lucide-react';
import {
  Button,
  Image,
  Checkbox,
  Divider,
  Flex,
  Group,
  Rating,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useHtmlData } from '@/app/contexts/HtmlDataContext';
import EditableText from '@/components/editable-text/editable-text';

export default function RecipeDetails() {
  const { recipeData, index, setIndex } = useHtmlData();
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get-recipes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error:', errorData.error);
          return;
        }

        const data = await response.json();
        setRecipes(data[0].recipes || []);
      } catch (error) {
        console.error('Request failed:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (recipeData?.image) {
      const fetchSignedUrl = async () => {
        try {
          const response = await fetch(
            `/api/signed-url?src=${encodeURIComponent(recipeData.image)}`
          );
          const data = await response.json();

          if (response.ok) {
            setSignedUrl(data.signedUrl);
          } else {
            console.error('Error fetching signed URL:', data.error);
          }
        } catch (error) {
          console.error('Error fetching signed URL:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchSignedUrl();
    } else {
      setLoading(false);
    }
  }, [recipeData?.image]);

  if (!recipeData) return null;

  return (
    <>
      <Flex
        align={{ base: 'center', sm: 'start' }}
        direction={{ base: 'column', sm: 'row' }}
      >
        {loading ? (
          <Skeleton width={350} height={350} />
        ) : (
          <Image
            width={350}
            height={350}
            src={signedUrl || 'https://placehold.co/600x400?text=Placeholder'}
            alt="Recipe Image"
            style={{ objectFit: 'cover' }}
          />
        )}

        <Stack justify="space-between" style={{ flexGrow: '1', paddingLeft: '2px' }}>
          <div>
            <Group justify="space-between" align="flex-start">
              <Title order={1} flex={1} mb={2}>
                <EditableText dataKey="title" />
              </Title>
              <Button
                leftSection={<Save />}
                color="icon"
                maw={101}
                mr={5}
                mt={10}
                onClick={async () => {
                  const recipe = [JSON.parse(JSON.stringify(recipeData))];

                  try {
                    let newRecipe = true;
                    if (index !== null) {
                      newRecipe = false;
                      recipe[0].image = recipe[0].image.replace(
                        '/temporary-recipe-images',
                        '/recipe-images'
                      );
                    }
                    const response = await fetch('/api/add-recipe', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ recipe, index }),
                    });

                    if (!response.ok) {
                      const errorData = await response.json();
                      console.error('Error:', errorData.error);
                      return;
                    }
                    const data = await response.json();
                    if (newRecipe) {
                      setIndex(recipes.length + 1);
                    }
                  } catch (error) {
                    console.error('Request failed:', error);
                  }
                }}
              >
                Save
              </Button>
            </Group>
            <Rating fractions={2} style={{ marginBottom: '2px' }} />
            <Text>Category</Text>
            <EditableText dataKey="description" />
          </div>
          <div>
            <Group preventGrowOverflow style={{ whiteSpace: 'pre' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Clock size={18} />
                <Text ml="xs">Prep Time: </Text>
                <EditableText dataKey="prepTime" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Clock size={18} />
                <Text ml="xs">Cook Time: </Text>
                <EditableText dataKey="cookTime" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Users size={18} />
                <Text ml="xs">Serves: </Text>
                <EditableText dataKey="servings" />
              </div>
            </Group>
          </div>
        </Stack>
      </Flex>
      <Divider my="sm" />

      <section>
        <Title order={2}>Ingredients</Title>
        <div style={{ marginTop: '0.5rem' }}>
          {recipeData.ingredients.map((_ingredient, index) => (
            <div key={index}>
              <Group gap="xs">
                <Checkbox color="icon" style={{ padding: '2px' }} />
                <EditableText dataKey="ingredients" index={index} />
              </Group>
            </div>
          ))}
        </div>
      </section>

      <Divider my="sm" />

      <section>
        <Title order={2}>Method</Title>
        <div style={{ marginTop: '0.5rem' }}>
          {recipeData.method.map((_ingredient, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <Text>Step {index + 1}</Text>
              <EditableText dataKey="method" index={index} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
