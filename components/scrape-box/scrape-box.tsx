'use client';

import { useState } from 'react';
import { Alert, Button, Container, Stack, Text, TextInput, Title } from '@mantine/core';
import { useHtmlData } from '@/app/contexts/HtmlDataContext';

export default function ScrapeBox() {
  const [url, setUrl] = useState('');
  const { setRecipeData } = useHtmlData();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setRecipeData(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error('Failed to fetch recipe');

      const data = await response.json();
      setRecipeData(data);
    } catch (error) {
      setError('Error fetching recipe. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="sm" className="min-h-[50vh] flex items-center justify-center px-4">
      <Stack>
        <div className="text-center">
          <Title order={1}>Recipe Scraper</Title>
          <Text color="dimmed">Enter a recipe URL to extract ingredients and instructions</Text>
        </div>

        <form onSubmit={handleSubmit}>
          <TextInput
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/recipe"
            radius="md"
            size="md"
            // icon={<Search size={20} />}
            styles={{
              input: { height: '3rem', fontSize: '1rem' },
            }}
          />

          <Button
            type="submit"
            color="blue"
            size="md"
            radius="md"
            fullWidth
            loading={isLoading}
            style={{ height: '3rem', fontWeight: 'bold', marginTop: '1rem' }}
          >
            {isLoading ? 'Fetching Recipe...' : 'Extract Recipe'}
          </Button>
        </form>

        {error && (
          <Alert color="red" title="Error" withCloseButton onClose={() => setError('')} mt="md">
            {error}
          </Alert>
        )}
      </Stack>
    </Container>
  );
}
