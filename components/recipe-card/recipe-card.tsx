'use client'

import { Card, Image, Text, Badge, Button, Group, Rating } from '@mantine/core'
import { Recipe } from '@/app/types'

export default function RecipeCard ({ recipe }: { recipe: Recipe }) {
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      <Card.Section>
        <Image src={recipe.image} height={160} alt={recipe.title + 'Image'} />
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

      <Button color='icon' fullWidth mt='md' radius='md'>
        More Details
      </Button>
    </Card>
  )
}
