'use client'

import { Card, Image, Text, Badge, Button, Group, Rating } from '@mantine/core'
import { Recipe } from '@/app/types'
import { useHtmlData } from '@/app/contexts/HtmlDataContext'
import { useRouter } from 'next/navigation';

export default function RecipeCard ({ recipe }: { recipe: Recipe }) {
  const { setRecipeData } = useHtmlData();
  const router = useRouter();
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      <Card.Section>
        <Image src={recipe.image} height={160} alt={recipe.title + ' image'} />
      </Card.Section>

      <Group justify='space-between' mt='md'>
        <Text fw={500}>{recipe.title}</Text>
        <Badge color='icon'>Tag</Badge>
        {/* <Badge color='icon'>{recipe.tag}</Badge> */}
      </Group>
      <Rating fractions={2} />
      {/* {recipe.rating} */}
      <Text size='sm' c='dimmed' lineClamp={3}>
        {recipe.description}
      </Text>

      <Button color='icon' fullWidth mt='md' radius='md' onClick={() => {setRecipeData(recipe); router.push('/recipe');}}>
        More Details
      </Button>
    </Card>
  )
}
