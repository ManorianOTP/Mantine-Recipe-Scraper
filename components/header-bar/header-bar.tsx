'use client';

import Image from 'next/image';
import { Group, Text } from '@mantine/core';
import { ColorSchemeToggle } from '../color-scheme-toggle/ColorSchemeToggle';
import classes from './header-bar.module.css';
import ScrapeBox from '../scrape-box/scrape-box';

export default function HeaderBar() {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Image src="/recipe-icon.png" alt="FlavorSync Logo" width={50} height={50} />
          <Text size="lg" fw={700} display={{base: 'none', xs: 'inline'}}>FlavorSync</Text>
        </Group>
        <ScrapeBox/>
        <Group gap="xs" wrap="nowrap">
          <ColorSchemeToggle />
          <a
            key={'Login'}
            href={'/login'}
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            {'Login'}
          </a>
        </Group>
      </div>
    </header>
  );
}
