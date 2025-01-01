import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { Recipe } from '@/app/types'

type RecipeRequestBody = {
  recipes: Recipe[]
  index?: number // Optional index field to support overwriting at a specific index
}

export async function POST (request: NextRequest) {
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

    let { recipes, index } = (await request.json()) as RecipeRequestBody

    if (!index) {
      let src = recipes[0].image.slice(1) // Assuming 'src' is the path like 'bucket-name/path/to/file.jpg'
      const [bucketName, ...filePathParts] = src.split('/')
      const filePath = filePathParts.join('/')

      ; await (async () => {
        // Create a signed URL for the image
        const { data: signedUrlData, error: signedUrlError } =
          await supabase.storage.from(bucketName).createSignedUrl(filePath, 60)

        if (signedUrlError) {
          console.error('Error creating signed URL:', signedUrlError)
          return
        }

        // Define the destination bucket
        const destinationBucketName = 'recipe-images'

        try {
          // Download the file as a Blob
          const { data: fileData, error: downloadError } =
            await supabase.storage.from(bucketName).download(filePath)

          if (downloadError || !fileData) {
            console.error('Error downloading file:', downloadError)
            return
          }

          // Upload the Blob to the new bucket
          const { error: uploadError } = await supabase.storage
            .from(destinationBucketName)
            .upload(filePath, fileData) // Directly passing Blob as the data

          if (uploadError) {
            console.error('Error uploading file:', uploadError)
            return
          }

          // Delete the file from the original bucket
          const { error: deleteError } = await supabase.storage
            .from(bucketName)
            .remove([filePath])

          if (deleteError) {
            console.error('Error deleting file:', deleteError)
          } else {
            recipes[0].image = '/' + destinationBucketName + '/' + filePath
            console.log(recipes[0].image + 'H1')
            console.log('File moved successfully')
          }
        } catch (error) {
          console.error('Unexpected error:', error)
        }
      })()
    }
    console.log(recipes[0].image + 'H2')
    const { data, error } = await supabase.rpc('upsert_user_recipe', {
      p_user_id: user.id,
      p_recipe: recipes[0], // Assuming you want to use the first recipe
      p_index: index // Pass the index if provided, otherwise it will be NULL
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
