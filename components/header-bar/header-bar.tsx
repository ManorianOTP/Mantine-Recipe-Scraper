'use client';

import Image from 'next/image';
import { Group, Text } from '@mantine/core';
import { ColorSchemeToggle } from '../color-scheme-toggle/ColorSchemeToggle';
import ScrapeBox from '../scrape-box/scrape-box';
import classes from './header-bar.module.css';
import Link from 'next/link';

export default function HeaderBar() {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Image
            priority={true}
            src="/recipe-icon.png"
            alt="FlavorSync Logo"
            width={50}
            height={50}
          />
          <Text size="lg" fw={700} display={{ base: 'none', xs: 'inline' }}>
            FlavorSync
          </Text>
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
