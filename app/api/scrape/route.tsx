import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import * as path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Recipe } from '@/app/types';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const recipeUrl = searchParams.get('url');
  const supabase = await createClient();

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
    $('.js-piano-recipe-method .method-steps__list-item').each((_, element) => {
      const step = $(element).find('.editor-content p').text().trim();
      if (step) {
        method.push(step);
      }
    });

    // Fetch and save image
    const imageUrl =
      $('.post-header__image-container img.image__img').attr('src') || '';

    let webpImageName = '';
    let userId = '';

    if (imageUrl) {
      // Sanitize the image filename to remove query params and add .webp extension
      const sanitizedUrl = imageUrl.split('?')[0]; // Get the base URL without query parameters
      const baseName = path.basename(sanitizedUrl, path.extname(sanitizedUrl)); // Get the base name without extension
      webpImageName = `${baseName}.webp`;
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
      userId = user.id;
      try {
        // Download the image as a buffer
        const response = await axios({
          url: sanitizedUrl,
          method: 'GET',
          responseType: 'arraybuffer',
        });
        // Convert the image buffer to WebP and save it
        const webpBuffer = await sharp(response.data).webp().toBuffer();

        await supabase.storage
          .from('temporary-recipe-images')
          .upload(`${userId}/${webpImageName}`, webpBuffer, {
            contentType: 'image/webp',
          });
      } catch (error) {
        console.error('Error downloading or converting image:', error);
      }
    }

    const prepTime = $('.recipe__cook-and-prep .list-item')
      .find('time')
      .text()
      .split(' mins')
      .filter(Boolean)[0];

    const cookTime = $('.recipe__cook-and-prep .list-item')
      .find('time')
      .text()
      .split(' mins')
      .filter(Boolean)[1];

    const servings = $('.recipe__cook-and-prep .list-item')
      .find('.icon-with-text__children')
      .text()
      .split('Serves')[1];

    const description =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium adipisci dolore quod nostrum sequi? Cupiditate id soluta obcaecati eos error rem consequuntur, asperiores itaque aut explicabo exercitationem quis perferendis suscipit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium adipisci dolore quod nostrum sequi? Cupiditate id soluta obcaecati eos error rem consequuntur, asperiores itaque aut explicabo exercitationem quis perferendis suscipit?';

    const recipe: Recipe = {
      title,
      ingredients,
      method,
      description,
      image: `/temporary-recipe-images/${userId}/${webpImageName}`, // Local path to the saved image
      prepTime,
      cookTime,
      servings,
    };

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
