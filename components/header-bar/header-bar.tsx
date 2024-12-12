'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Group, Text } from '@mantine/core';
import { ColorSchemeToggle } from '../color-scheme-toggle/color-scheme-toggle';
import ScrapeBox from '../scrape-box/scrape-box';
import classes from './header-bar.module.css';

export default function HeaderBar() {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Image priority src="/recipe-icon.png" alt="FlavorSync Logo" width={50} height={50} />

          <Link className={`${classes.link} ${classes.responsiveLink}`} href="/">
            <Text size="lg" fw={700} className={classes.responsiveLink}>
              FlavorSync
            </Text>
          </Link>
        </Group>
        <ScrapeBox />
        <Group gap="xs" wrap="nowrap">
          <ColorSchemeToggle />
          <Link className={classes.link} href="/login">
            Login
          </Link>
        </Group>
      </div>
    </header>
  );
}
