import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Recipe } from '@/app/types';

export async function GET(req: { url: string | URL }) {
  const { searchParams } = new URL(req.url);
  const recipeUrl = searchParams.get('url');

  try {
    if (recipeUrl === null) {
      throw new Error('Recipe URL is null');
    }
    const { data } = await axios.get(recipeUrl);
    const $ = cheerio.load(data);

    const title = $('h1').text().trim();

    const ingredients: string[] = [];
    $('#ingredients-list .list-item').each((index, element) => {
      ingredients.push($(element).text().trim());
    });

    const method: string[] = [];
    $('.js-piano-recipe-method .method-steps__list-item').each((index, element) => {
      const step = $(element).find('.editor-content p').text().trim();
      if (step) {
        method.push(step);
      }
    });

    const recipe: Recipe = {
      title,
      ingredients,
      method,
    };
    // Return the scraped data as a JSON response
    return NextResponse.json(recipe);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching recipe' }, { status: 500 });
  }
}
