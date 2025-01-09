import '@mantine/core/styles.css'

import React from 'react'
import type { Metadata } from 'next'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { theme } from '../theme'
import { HtmlDataProvider } from './contexts/HtmlDataContext'
import HeaderBar from '@/components/header-bar/header-bar'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'

export const metadata: Metadata = {
  title: 'Recipe Scraper',
  description: 'Web scraper designed to locally store online recipes',
  icons: {
    icon: '/recipe-icon.png' // https://www.flaticon.com/free-icon/recipe_3565418
  }
}

export default function RootLayout ({ children }: { children: any }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <HtmlDataProvider>
            <HeaderBar />
            {children}
          </HtmlDataProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
