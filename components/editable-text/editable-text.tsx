'use client'

import { useState } from 'react'
import { Edit, Save } from 'lucide-react'
import { ActionIcon, Group, Stack, Text } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import { useHtmlData } from '@/app/contexts/HtmlDataContext'
import type { Recipe } from '@/app/types'

interface EditableTextProps {
  dataKey: keyof Recipe
  index?: number
}

export default function EditableText ({ dataKey, index }: EditableTextProps) {
  const { recipeData } = useHtmlData()
  const [isEditing, setIsEditing] = useState(false)
  const [currentValue, setCurrentValue] = useState(recipeData?.[dataKey] || '')
  const { hovered, ref } = useHover()

  if (!recipeData) return null

  const handleEditClick = () => setIsEditing(true)
  const handleSave = () => {
    setIsEditing(false)
    // Add save logic here if needed, e.g., update recipeData in a context or API
  }

  const displayValue = (() => {
    switch (dataKey) {
      case 'ingredients':
        return recipeData.ingredients[index!]
      case 'method':
        return recipeData.method[index!]
      default:
        return currentValue
    }
  })()

  return (
    <Stack>
      <div ref={ref}>
        <Group justify='space-between' gap="2px">
          {isEditing ? (
            <>
              <Text
                contentEditable
                suppressContentEditableWarning
                onInput={event =>
                  setCurrentValue(
                    (event.target as HTMLElement).textContent || ''
                  )
                }
                style={{
                  flex: 1,
                  fontSize: 'inherit',
                  lineHeight: 'inherit',
                  fontWeight: 'inherit',
                  border: '1px solid #ccc',
                  cursor: 'text'
                }}
              >
                {displayValue}
              </Text>
              {(dataKey === 'prepTime' || dataKey === 'cookTime') && (
                <Text
                  style={{
                    fontSize: 'inherit',
                    lineHeight: 'inherit',
                    fontWeight: 'inherit'
                  }}
                >
                  mins
                </Text>
              )}
            </>
          ) : (
            <>
              <Text
                style={{
                  flex: 1,
                  fontSize: 'inherit',
                  lineHeight: 'inherit',
                  fontWeight: 'inherit',
                  padding: '1px'
                }}
              >
                {displayValue}
              </Text>
              {(dataKey === 'prepTime' || dataKey === 'cookTime') && (
                <Text
                  style={{
                    fontSize: 'inherit',
                    lineHeight: 'inherit',
                    fontWeight: 'inherit'
                  }}
                >
                  mins
                </Text>
              )}
            </>
          )}
          {hovered ? (
            <ActionIcon
              color='icon'
              onClick={isEditing ? handleSave : handleEditClick}
              size='sm'
              radius='xl'
              ml={5}
            >
              {isEditing ? <Save size={16} /> : <Edit size={16} />}
              {/* size 22 to be same size as actionicon wrapper */}
            </ActionIcon>
          ) : (
            <Edit style={{marginLeft: '5px'}} size={22} opacity={0} />
          )}
        </Group>
      </div>
    </Stack>
  )
}
