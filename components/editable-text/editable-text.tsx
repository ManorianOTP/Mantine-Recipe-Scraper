'use client';

import { Textarea } from '@mantine/core';
import { useHtmlData } from '@/app/contexts/HtmlDataContext';

export default function EditableText() {
  const { recipeData } = useHtmlData();
  if (!recipeData) return null;

  return (
    <>
      <Textarea
        variant="unstyled"
        radius="xs"
        autosize
        defaultValue={recipeData.description}
        styles={{
          input: {
            fontSize: 'inherit',
            lineHeight: 'inherit',
            color: 'inherit',
          },
        }}
      />
    </>
  );
}
