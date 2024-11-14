import RecipeDetails from '@/components/recipe-details/recipe-details';
import ScrapeBox from '@/components/scrape-box/scrape-box';
import { ColorSchemeToggle } from '../components/color-scheme-toggle/ColorSchemeToggle';

export default function HomePage() {
  return (
    <>
      <ColorSchemeToggle />
      <ScrapeBox></ScrapeBox>
      <RecipeDetails></RecipeDetails>
    </>
  );
}
