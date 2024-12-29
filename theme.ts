'use client'

import { createTheme, virtualColor } from '@mantine/core'

export const theme = createTheme({
  /* Put your mantine theme override here */

  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '160em',
    xxl: '215em'
  },

  colors: {
    icon: virtualColor({
      name: 'icon',
      dark: 'yellow',
      light: 'blue'
    })
  }
})
