'use client'

import RecipeCard from '@/components/recipe-card/recipe-card'
import { Grid } from '@mantine/core'
import { useEffect, useState } from 'react'

export default function HomePage () {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get-recipes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error('Error:', errorData.error)
          return
        }

        const data = await response.json()
        setData(data[0].recipes || [])
        console.log('Success:', data.message)
      } catch (error) {
        console.error('Request failed:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Grid m={'5px'}>
        {data.map((item, index) => (
          <Grid.Col
            key={index}
            span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2, xxl: 1.5 }}
          >
            <RecipeCard recipe={item} index={index} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  )
}
