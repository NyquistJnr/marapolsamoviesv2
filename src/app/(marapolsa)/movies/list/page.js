import MainMovies from "@/components/custom-components/movies-component/MainMovies";

export const metadata = {
  title: "Movies List",
  description: `Explore honest and informative reviews of the latest movies at Marapolsa. Discover films across all genres, budgets, and production values, and make informed decisions on what to watch. Join us in supporting filmmakers and sharing their stories with the world.`,
};

const MovieListPage = () => {
  return <MainMovies />;
};

export default MovieListPage;
