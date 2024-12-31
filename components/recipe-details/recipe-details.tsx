'use client'

import Image from 'next/image'
import { Clock, Save, Users } from 'lucide-react'
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Rating,
  Stack,
  Text,
  Title
} from '@mantine/core'
import { useHtmlData } from '@/app/contexts/HtmlDataContext'
import EditableText from '@/components/editable-text/editable-text'

export default function RecipeDetails () {
  const { recipeData, index } = useHtmlData()

  if (!recipeData) return null

  return (
    <>
      <Flex
        align={{ base: 'center', sm: 'start' }}
        direction={{ base: 'column', sm: 'row' }}
      >
        <Image
          width={350}
          height={350}
          src={recipeData.image}
          alt='Recipe Image'
          style={{ objectFit: 'cover' }}
          priority
        />
        <Stack
          justify='space-between'
          style={{ flexGrow: '1', paddingLeft: '2px' }}
        >
          <div>
            <Group justify='space-between' align='flex-start'>
              <Title order={1} flex={1} mb={2}>
                <EditableText dataKey='title' />
              </Title>
              <Button
                leftSection={<Save />}
                color='icon'
                maw={101}
                mr={5}
                mt={10}
                onClick={async () => {
                  const recipes = [recipeData]

                  try {
                    const response = await fetch('/api/add-recipe', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ recipes, index })
                    })

                    if (!response.ok) {
                      const errorData = await response.json()
                      console.error('Error:', errorData.error)
                      return
                    }

                    const data = await response.json()
                    console.log('Success:', data.message)
                  } catch (error) {
                    console.error('Request failed:', error)
                  }
                }}
              >
                Save
              </Button>
            </Group>
            <Rating fractions={2} style={{ marginBottom: '2px' }} />
            <Text>Category</Text>
            <EditableText dataKey='description' />
          </div>
          <div>
            <Group preventGrowOverflow style={{ whiteSpace: 'pre' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Clock size={18} />
                <Text ml='xs'>Prep Time: </Text>
                <EditableText dataKey='prepTime' />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Clock size={18} />
                <Text ml='xs'>Cook Time: </Text>
                <EditableText dataKey='cookTime' />
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Users size={18} />
                <Text ml='xs'>Serves: </Text>
                <EditableText dataKey='servings' />
              </div>
            </Group>
          </div>
        </Stack>
      </Flex>
      <Divider my='sm' />

      <section>
        <Title order={2}>Ingredients</Title>
        <div style={{ marginTop: '0.5rem' }}>
          {recipeData.ingredients.map((_ingredient, index) => (
            <div key={index}>
              <Group gap='xs'>
                <Checkbox color='icon' style={{ padding: '2px' }} />
                <EditableText dataKey='ingredients' index={index} />
              </Group>
            </div>
          ))}
        </div>
      </section>

      <Divider my='sm' />

      <section>
        <Title order={2}>Method</Title>
        <div style={{ marginTop: '0.5rem' }}>
          {recipeData.method.map((_ingredient, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <Text>Step {index + 1}</Text>
              <EditableText dataKey='method' index={index} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
