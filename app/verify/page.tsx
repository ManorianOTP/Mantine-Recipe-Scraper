import { Divider, Paper, Text } from '@mantine/core'

export default function VerifyPage () {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 60px)'
      }}
    >
      <Paper radius='md' p='xl' withBorder maw={350}>
        <Text size='lg' fw={500}>
          Verify Email
        </Text>
        <Divider my='lg' />
        <Text>
          Please check your inbox for a confirmation email and click the link to
          verify your address. If you don’t see it within a minute, ensure your
          email address is correct. Still no email? Reach out to our customer
          support for help.
        </Text>
      </Paper>
    </div>
  )
}
