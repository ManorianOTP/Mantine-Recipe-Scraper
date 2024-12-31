'use client'

import { useState } from 'react'
import { IconSearch } from '@tabler/icons-react'
import { ActionIcon, Alert, Loader, TextInput } from '@mantine/core'
import { useMediaQuery, useMounted } from '@mantine/hooks'
import { useHtmlData } from '@/app/contexts/HtmlDataContext'
import { useRouter } from 'next/navigation'
import classes from './scrape-box.module.css'
import { notifications } from '@mantine/notifications'
import { X } from 'lucide-react'

export default function ScrapeBox () {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const { setRecipeData, setIndex } = useHtmlData()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setRecipeData(null)
    setIsLoading(true)

    try {
      const response = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`)
      if (!response.ok) throw new Error('Failed to fetch recipe')

      const data = await response.json()
      setRecipeData(data)
      setIndex(null)
      router.push('/recipe')
    } catch (errorMsg) {
      // used to be error
      setError('Error fetching recipe. Please check the URL and try again.')
      notifications.show({
        icon: <X/>,
        color: "red",
        title: 'Error Retrieving Recipe',
        message:
          'Please ensure that the url is correct and is on our supported list of sites!'
      })
    } finally {
      setIsLoading(false)
    }
  }
  const isLargeScreen = useMediaQuery('(min-width: 1440px)')

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextInput
          color='icon'
          type='url'
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder='Add a new recipe'
          rightSection={
            <>
              <ActionIcon
                color='icon'
                type='submit'
                variant='subtle'
                radius='xl'
                darkHidden
              >
                {isLoading ? (
                  <Loader size='xs' />
                ) : (
                  <IconSearch size={16} strokeWidth={1.5} />
                )}
              </ActionIcon>
              <ActionIcon
                color='icon'
                type='submit'
                variant='subtle'
                radius='xl'
                lightHidden
              >
                {isLoading ? (
                  <Loader size='xs' />
                ) : (
                  <IconSearch size={16} strokeWidth={1.5} />
                )}
              </ActionIcon>
            </>
          }
        />
      </form>
    </>
  )
}
