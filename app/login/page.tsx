'use client';

import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import { GoogleButton } from './google-button';
import { login, signup } from './actions';

export default function LoginPage() {
  const [type, toggle] = useToggle(['login', 'register']);
  const handleSubmit = type === 'register' ?  signup : login;
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: false,
    },

    validate: {
      email: val =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? null : 'Invalid email',
      password: val =>
        val.length < 6 ? 'Password should include at least 6 characters' : null,
    },
  });

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 60px)',
        }}
      >
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" fw={500}>
            Welcome to FlavorSync, {type} with
          </Text>

          <Group grow mb="md" mt="md">
            <GoogleButton radius="xl">Google</GoogleButton>
          </Group>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />

          <form>
            <Stack>
              {type === 'register' && (
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={event =>
                    form.setFieldValue('name', event.currentTarget.value)
                  }
                  radius="md"
                />
              )}

              <TextInput
                required
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="hello@gmail.com"
                value={form.values.email}
                onChange={event =>
                  form.setFieldValue('email', event.currentTarget.value)
                }
                error={form.errors.email && 'Invalid email'}
                radius="md"
              />

              <PasswordInput
                required
                label="Password"
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                value={form.values.password}
                onChange={event =>
                  form.setFieldValue('password', event.currentTarget.value)
                }
                error={
                  form.errors.password &&
                  'Password should include at least 6 characters'
                }
                radius="md"
              />

              {type === 'register' && (
                <Checkbox
                  color="icon"
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  onChange={event =>
                    form.setFieldValue('terms', event.currentTarget.checked)
                  }
                />
              )}
            </Stack>

            <Group justify="space-between" mt="xl">
              <Anchor
                component="button"
                type="button"
                c="dimmed"
                onClick={() => toggle()}
                size="xs"
              >
                {type === 'register'
                  ? 'Already have an account? Login'
                  : "Don't have an account? Register"}
              </Anchor>
              <Button
                color="icon"
                type="submit"
                radius="xl"
                formAction={handleSubmit}
              >
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
        </Paper>
      </div>
    </>
  );
}
