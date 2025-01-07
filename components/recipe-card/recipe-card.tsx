import { Card, Image, Text, Badge, Button, Group, Rating } from '@mantine/core'
import { Recipe } from '@/app/types'
import { useHtmlData } from '@/app/contexts/HtmlDataContext'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RecipeCard ({ recipe, index }: { recipe: Recipe, index: number}) {
  const { recipeData, setRecipeData, setIndex } = useHtmlData();
  const router = useRouter();
  // if (!recipeData) return null
  const [signedUrl, setSignedUrl] = useState<string | null>("-1")
    useEffect(() => {
      // if (recipeData.image) {
        const fetchSignedUrl = async () => {
          try {
            const response = await fetch(
              `/api/signed-url?src=${encodeURIComponent(recipe.image)}`
            )
            const data = await response.json()
  
            if (response.ok) {
              setSignedUrl(data.signedUrl)
            } else {
              setSignedUrl(null)
              console.error('Error fetching signed URL:', data.error)
            }
          } catch (error) {
            setSignedUrl(null)
            console.error('Error fetching signed URL:', error)
          }
        }
  
        fetchSignedUrl()
      // }
    }, [])
  
    if (signedUrl === "-1") return null

    
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      <Card.Section>
        <Image src={signedUrl} height={160} alt={recipe.title + ' image'} fallbackSrc="https://placehold.co/600x400?text=Placeholder"/>
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
      {/* Indexes from 1 for some reason */}
      <Button color='icon' fullWidth mt='md' radius='md' onClick={() => {setRecipeData(recipe); setIndex(index+1); router.push('/recipe');}}>
        More Details
      </Button>
    </Card>
  )
}
