import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { Recipe } from '@/app/types';

export async function GET(req: { url: string | URL }) {
  const { searchParams } = new URL(req.url);
  const recipeUrl = searchParams.get('url');

  try {
    if (!recipeUrl) {
      throw new Error('Recipe URL is null');
    }
    
    const { data } = await axios.get(recipeUrl);
    const $ = cheerio.load(data);

    const title = $('h1').text().trim();

    const ingredients: string[] = [];
    $('#ingredients-list .list-item').each((_, element) => {
      ingredients.push($(element).text().trim());
    });

    const method: string[] = [];
    $('.js-piano-recipe-method .method-steps__list-item').each(
      (_, element) => {
        const step = $(element).find('.editor-content p').text().trim();
        if (step) {
          method.push(step);
        }
      }
    );

    // Fetch and save image
    let imageUrl = $('.post-header__image-container img.image__img').attr('src') || '';
    
    if (imageUrl) {
      // Sanitize the image filename to remove query params
      imageUrl = imageUrl.split('?')[0]; // Get the base URL without query parameters
      const imageName = path.basename(imageUrl);
      const imagePath = path.join(process.cwd(), 'public', imageName);

      // Download the image
      const response = await axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'stream',
      });

      const writer = fs.createWriteStream(imagePath);

      await new Promise<void>((resolve, reject) => {
        response.data.pipe(writer);
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    }

    const prepTime = $('.recipe__cook-and-prep .list-item').find('time').text().split(' mins').filter(Boolean)[0];

    const cookTime = $('.recipe__cook-and-prep .list-item').find('time').text().split(' mins').filter(Boolean)[1];

    const servings = $('.recipe__cook-and-prep .list-item')
      .find('.icon-with-text__children')
      .text()
      .split('Serves')[1];

    const recipe: Recipe = {
      title,
      ingredients,
      method,
      image: `/${path.basename(imageUrl)}`, // Local path to the saved image
      prepTime,
      cookTime,
      servings,
    };
    console.log(servings);
    // Return the scraped data as a JSON response
    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error fetching or saving recipe:', error);
    return NextResponse.json(
      { message: 'Error fetching recipe' },
      { status: 500 }
    );
  }
}