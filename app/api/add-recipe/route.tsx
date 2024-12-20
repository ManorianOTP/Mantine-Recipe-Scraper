import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { Recipe } from '@/app/types';

type RecipeRequestBody = {
  recipes: Recipe[]; // Adjust based on actual recipe structure
};

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const { recipes } = await request.json() as RecipeRequestBody;

    const { error } = await supabase
      .from('userRecipes')
      .insert([{ recipes, user_id: user.id }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Data inserted successfully' }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const config = {
  runtime: 'experimental-edge',
};