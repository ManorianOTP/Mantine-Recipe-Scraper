import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const src = searchParams.get('src');

    if (!src) {
      return NextResponse.json(
        { error: 'Invalid src parameter' },
        { status: 400 }
      );
    }

    const [bucketName, ...filePathParts] = src.split('/');
    const filePath = filePathParts.join('/');

    // Create a signed URL for the image
    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(filePath, 60);

    if (error) {
      console.error('Error creating signed URL:', error);
      return NextResponse.json(
        { error: 'Could not generate signed URL' },
        { status: 500 }
      );
    }

    // Return the signed URL
    return NextResponse.json(
      { signedUrl: data.signedUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export const config = {
  runtime: 'experimental-edge',
};
