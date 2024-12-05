// src/types/recipe.ts
export interface Recipe {
  title: string;
  ingredients: string[];
  method: string[];
  description: string;
  image: string; // URL of the recipe image
  prepTime: string; // Preparation time as a string
  cookTime: string; // Cooking time as a string
  servings: string; // Number of servings as a string
}
