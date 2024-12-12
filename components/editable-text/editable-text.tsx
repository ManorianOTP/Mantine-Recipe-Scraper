'use client';

import { useState } from 'react';
import { Edit, Save } from 'lucide-react';
import { ActionIcon, Group, Stack, Text, Textarea } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useHtmlData } from '@/app/contexts/HtmlDataContext';
import type { Recipe } from '@/app/types';

interface EditableTextProps {
  dataKey: keyof Recipe;
  index?: number;
}

export default function EditableText({ dataKey, index }: EditableTextProps) {
  const { recipeData } = useHtmlData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(recipeData?.[dataKey] || '');
  const { hovered, ref } = useHover();

  if (!recipeData) return null;

  const handleEditClick = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here if needed, e.g., update recipeData in a context or API
  };
  return (
    <Stack>
      {isEditing ? (
        <div ref={ref}>
          <Group preventGrowOverflow>
            <Textarea
              variant="unstyled"
              radius="xs"
              autosize
              value={(() => {
                switch (dataKey) {
                  case 'ingredients':
                    return recipeData.ingredients[index!];
                  case 'method':
                    return recipeData.method[index!];
                  default:
                    return currentValue;
                }
              })()}
              onChange={(event) => setCurrentValue(event.target.value)}
              style={{ flexGrow: '1' }}
              styles={{
                input: {
                  fontSize: 'inherit',
                  lineHeight: 'inherit',
                  color: 'inherit',
                  border: 'inherit',
                  padding: 'inherit',
                },
              }}
            />
            {hovered ? (
              <ActionIcon color="icon" onClick={handleSave} size="sm" radius="xl">
                <Save size={16} />
              </ActionIcon>
            ) : (
              <Save color="icon" size={22} style={{ opacity: 0 }} /> // size 22 to be same size as actionicon wrapper
            )}
          </Group>
        </div>
      ) : (
        <div ref={ref}>
          <Group preventGrowOverflow>
            <Text
              style={{
                flex: 1,
                fontSize: 'inherit',
                lineHeight: 'inherit',
                fontWeight: 'inherit',
              }}
            >
              {(() => {
                switch (dataKey) {
                  case 'prepTime':
                  case 'cookTime':
                    return `${currentValue} mins`;
                  case 'ingredients':
                    return recipeData.ingredients[index!];
                  case 'method':
                    return recipeData.method[index!];
                  default:
                    return currentValue;
                }
              })()}
            </Text>
            {hovered ? (
              <ActionIcon color="icon" onClick={handleEditClick} size="sm" radius="xl">
                <Edit size={16} />
              </ActionIcon>
            ) : (
              <Edit color="icon" size={22} style={{ opacity: 0 }} /> // size 22 to be same size as actionicon wrapper
            )}
          </Group>
        </div>
      )}
    </Stack>
  );
}
