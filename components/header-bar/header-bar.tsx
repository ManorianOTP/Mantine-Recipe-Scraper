import Image from 'next/image';
import Link from 'next/link';
import { Group, Text } from '@mantine/core';
import { ColorSchemeToggle } from '../color-scheme-toggle/color-scheme-toggle';
import ScrapeBox from '../scrape-box/scrape-box';
import classes from './header-bar.module.css';
import { createClient } from '@/utils/supabase/server';

export default async function HeaderBar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Image
            priority
            src="/recipe-icon.png"
            alt="FlavorSync Logo"
            width={50}
            height={50}
          />

          <Link
            className={`${classes.link} ${classes.responsiveLink}`}
            href="/"
            prefetch={true}
          >
            <Text size="lg" fw={700} className={classes.responsiveLink}>
              FlavorSync
            </Text>
          </Link>
        </Group>
        <ScrapeBox />
        <Group gap="xs" wrap="nowrap">
          <ColorSchemeToggle />
          {!user ? (
            <Link className={classes.link} href="/login">
              Login
            </Link>
          ) : (
            <Link className={classes.link} href="/private">
              Profile
            </Link>
          )}
        </Group>
      </div>
    </header>
  );
}
