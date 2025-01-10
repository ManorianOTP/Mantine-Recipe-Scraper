import { Card, Image, Text, Badge, Button, Group, Rating, Skeleton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Recipe } from '@/app/types';
import { useHtmlData } from '@/app/contexts/HtmlDataContext';

export default function RecipeCard({ recipe, index }: { recipe: Recipe; index: number }) {
  const { setRecipeData, setIndex } = useHtmlData();
  const router = useRouter();

  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignedUrl = async () => {
      try {
        const response = await fetch(`/api/signed-url?src=${encodeURIComponent(recipe.image)}`);
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
  }, [recipe.image]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        {loading ? (
          <Skeleton height={160} />
        ) : signedUrl ? (
          <Image
            src={signedUrl}
            height={160}
            alt={`${recipe.title} image`}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
        ) : (
          <Image
            src="https://placehold.co/600x400?text=Placeholder"
            height={160}
            alt="Placeholder image"
          />
        )}
      </Card.Section>

      <Group justify="space-between" mt="md">
        <Text fw={500}>{recipe.title}</Text>
        <Badge color="icon">Tag</Badge>
        {/* <Badge color='icon'>{recipe.tag}</Badge> */}
      </Group>
      <Rating fractions={2} />
      {/* {recipe.rating} */}
      <Text size="sm" c="dimmed" lineClamp={3}>
        {recipe.description}
      </Text>
      {/* Indexes from 1 for some reason */}
      <Button
        color="icon"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => {
          setRecipeData(recipe);
          setIndex(index + 1);
          router.push('/recipe');
        }}
      >
        More Details
      </Button>
    </Card>
  );
}
