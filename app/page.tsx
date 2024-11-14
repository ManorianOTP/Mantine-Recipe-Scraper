import { ColorSchemeToggle } from '../components/color-scheme-toggle/ColorSchemeToggle';
import RecipeDetails from '@/components/recipe-details/recipe-details';
import ScrapeBox from '@/components/scrape-box/scrape-box';
export default function HomePage() {
  return (
    <>
      <ColorSchemeToggle />
      <ScrapeBox></ScrapeBox>
      <RecipeDetails></RecipeDetails>
    </>
  );
}
