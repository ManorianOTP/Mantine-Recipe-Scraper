'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { useMounted } from '@mantine/hooks';

export function ColorSchemeToggle() {
  const { colorScheme } = useMantineColorScheme();
  const { setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const isMounted = useMounted();

  return isMounted ? (
    <ActionIcon
      color={isDark ? 'yellow' : 'blue'}
      variant="subtle"
      onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
      radius="xl"
      size="lg"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </ActionIcon>
  ) : null;
}
