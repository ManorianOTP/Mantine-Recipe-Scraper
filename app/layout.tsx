import '@mantine/core/styles.css';
import type { Metadata } from "next";
import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { HtmlDataProvider } from "./contexts/HtmlDataContext";

export const metadata: Metadata = {
  title: "Recipe Scraper",
  description: "Web scraper designed to locally store online recipes",
  icons: {
    icon: "/recipe-icon.png", // https://www.flaticon.com/free-icon/recipe_3565418
  },
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}><HtmlDataProvider>{children}</HtmlDataProvider></MantineProvider>
      </body>
    </html>
  );
}
