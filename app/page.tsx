import HeaderBar from '@/components/header-bar/header-bar';
import RecipeDetails from '@/components/recipe-details/recipe-details';
import ScrapeBox from '@/components/scrape-box/scrape-box';

export default function HomePage() {
  return (
    <>
      <HeaderBar></HeaderBar>
      <RecipeDetails></RecipeDetails>
    </>
  );
}
