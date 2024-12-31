'use client'

import { useState, useRef } from 'react'
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
  const { recipeData, updateRecipeProperty } = useHtmlData()
  const [isEditing, setIsEditing] = useState(false)
  const { hovered, ref } = useHover()
  const editableRef = useRef<HTMLDivElement>(null) // Create a ref for the contentEditable element

  if (!recipeData) return null

  const handleEditClick = () => setIsEditing(true)
  const handleSave = () => {
    setIsEditing(false)
    const content = editableRef.current?.textContent || '' // Use the ref to get the text content

    switch (dataKey) {
      case 'ingredients':
      case 'method': {
        const temp = { ...recipeData }
        temp[dataKey] = [...temp[dataKey]]
        temp[dataKey][index!] = content
        updateRecipeProperty(dataKey, temp[dataKey])
        break
      }
      default:
        updateRecipeProperty(dataKey, content)
    }
  }

  const displayValue = () => {
    switch (dataKey) {
      case 'ingredients':
      case 'method':
        return recipeData[dataKey][index!]
      default:
        return recipeData[dataKey]
    }
  }

  return (
    <Stack>
      <div ref={ref}>
        <Group justify='space-between' gap='2px'>
          {isEditing ? (
            <>
              <Text
                contentEditable
                suppressContentEditableWarning
                style={{
                  flex: 1,
                  fontSize: 'inherit',
                  lineHeight: 'inherit',
                  fontWeight: 'inherit',
                  border: '1px solid #ccc',
                  cursor: 'text'
                }}
                ref={editableRef} // Attach the ref to the contentEditable element
              >
                {displayValue()}
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
                {displayValue()}
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
            </ActionIcon>
          ) : (
            <Edit style={{ marginLeft: '5px' }} size={22} opacity={0} />
          )}
        </Group>
      </div>
    </Stack>
  )
}