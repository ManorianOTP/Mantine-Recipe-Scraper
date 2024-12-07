'use client';

import { useState } from 'react';
import { Edit } from 'lucide-react';
import { ActionIcon, Group, Stack, Text, Textarea } from '@mantine/core';
import { useHtmlData } from '@/app/contexts/HtmlDataContext';

export default function EditableText() {
  const { recipeData } = useHtmlData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentDescription, setCurrentDescription] = useState(recipeData?.description || '');

  if (!recipeData) return null;

  const handleEditClick = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false); // Add save logic if needed

  return (
    <Stack>
      {isEditing ? (
        <Textarea
          variant="unstyled"
          radius="xs"
          autosize
          value={currentDescription}
          onChange={(event) => setCurrentDescription(event.target.value)}
          onBlur={handleSave} // Save changes on blur
          styles={{
            input: {
              fontSize: 'inherit',
              lineHeight: 'inherit',
              color: 'inherit',
            },
          }}
        />
      ) : (
        <Text>
          <ActionIcon onClick={handleEditClick} size="sm" radius="xl">
            <Edit size={16} />
          </ActionIcon>
          {currentDescription}
        </Text>
      )}
    </Stack>
  );
}
