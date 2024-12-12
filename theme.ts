'use client';

import { createTheme, virtualColor } from '@mantine/core';

export const theme = createTheme({
  /* Put your mantine theme override here */
  colors: {
    icon: virtualColor({
      name: 'icon',
      dark: 'yellow',
      light: 'blue',
    }),
  },
});
