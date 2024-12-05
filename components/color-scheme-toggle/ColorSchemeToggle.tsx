'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <>
      <ActionIcon
        color="blue"
        variant="subtle"
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        radius="xl"
        size="lg"
        darkHidden>
        <Sun size={18} />
      </ActionIcon>
      <ActionIcon
        color="yellow"
        variant="subtle"
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        radius="xl"
        size="lg"
        lightHidden
      >
        <Moon size={18} />
      </ActionIcon>
    </>
  );
}
