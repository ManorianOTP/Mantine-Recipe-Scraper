import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { Recipe } from '@/app/types'

type RecipeRequestBody = {
  recipes: Recipe[]
  index?: number  // Optional index field to support overwriting at a specific index
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      )
    }

    const { recipes, index } = (await request.json()) as RecipeRequestBody

    const { data, error } = await supabase.rpc('upsert_user_recipe', {
      p_user_id: user.id,
      p_recipe: recipes[0],  // Assuming you want to use the first recipe
      p_index: index  // Pass the index if provided, otherwise it will be NULL
    })

    if (error) {
      console.error('Error upserting recipe:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('Recipe upserted successfully')

    return NextResponse.json(
      { message: 'Data inserted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Internal server error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export const config = {
  runtime: 'experimental-edge'
}
