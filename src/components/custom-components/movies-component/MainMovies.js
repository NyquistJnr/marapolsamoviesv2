"use client";

import { Button, Container } from "react-bootstrap";
import classes from "./MainMovies.module.css";
import CompleteSearchFilterBar from "@/components/general-components/CompleteSearchFilter";

import ImageScroller from "./MovieScroll";
import useMovieCategorySearch from "@/hooks/useMovieCategorySearch";
import ImageScrollSkeleton from "./ImageScrollSkeleton";
import useSearchTextPost from "@/hooks/useSearchedText";
import { useState } from "react";
import MovieTvShow from "../home-component/movie-tvshows-components/MovieTvShow";
import { FaArrowLeftLong } from "react-icons/fa6";
import MovieListSkeleton from "./MovieListSkeleton";

const MainMovies = () => {
  const [searchedMovies, setSearchedMovies] = useState("");
  const {
    loading: loadingTopRated,
    error: errorTopRated,
    filteredMovies: filteredTopRatedMovies,
  } = useMovieCategorySearch("Top Rated Movies", 20);
  const {
    loading: loadingNigeria,
    error: errorNigeria,
    filteredMovies: filteredNigeriaMovies,
  } = useMovieCategorySearch("Most Popular Movies In Nigeria 2024", 20);
  const {
    loading: loadingBest2024,
    error: errorBest2024,
    filteredMovies: filteredBestMovies2024,
  } = useMovieCategorySearch("Best Movies Of 2024");
  const {
    loading: loadingHollywood,
    error: errorHollywood,
    filteredMovies: filteredHollywoodMovies,
  } = useMovieCategorySearch("Most Popular Hollywood Movies 2024", 20);
  const {
    loading: loadingTrueStory,
    error: errorTrueStory,
    filteredMovies: filteredTrueStoryMovies,
  } = useMovieCategorySearch("Movies Based On A True Story", 20);

  const {
    loading: loadingPrime,
    error: errorPrime,
    filteredMovies: filteredPrime,
  } = useMovieCategorySearch("Top Movies On Prime", 20);

  const { searchResults, isLoading, error, searchReviews } =
    useSearchTextPost();

  if (
    errorBest2024 ||
    errorHollywood ||
    errorNigeria ||
    errorTopRated ||
    errorTrueStory ||
    errorPrime
  ) {
    return <div className="text-center py-4">An Error Occured!</div>;
  }

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <MovieListSkeleton />
      </div>
    );
  }

  const handleData = (item) => {
    setSearchedMovies(item);
    searchReviews(item, "movies");
  };

  return (
    <Container>
      <CompleteSearchFilterBar
        placeholder="movies"
        searchedSection={handleData}
      />
      {!!searchedMovies ? (
        <div>
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              color: "#575655",
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
            onClick={() => setSearchedMovies("")}
          >
            <FaArrowLeftLong style={{ marginRight: 10 }} />
            Back
          </Button>
          {searchResults.length > 0 ? (
            <>
              <h3 style={{ fontWeight: "bold", margin: "30px 0" }}>
                Searched Result for "<b>{searchedMovies}</b>"
              </h3>
              <section className="row" style={{ marginBottom: 50 }}>
                {searchResults.map((data) => (
                  <div
                    className="col-12 col-sm-12 col-md-6 col-lg-6 py-2"
                    key={data.id}
                  >
                    <MovieTvShow {...data} />
                  </div>
                ))}
              </section>
            </>
          ) : (
            <div className="text-center py-5">Doesn't Exist</div>
          )}
        </div>
      ) : (
        <section style={{ marginBottom: 50 }}>
          {loadingTopRated ? (
            <ImageScrollSkeleton />
          ) : (
            <ImageScroller
              filteredMovies={filteredTopRatedMovies}
              title="Top Rated Movies"
            />
          )}
          {loadingNigeria ? (
            <ImageScrollSkeleton />
          ) : (
            <ImageScroller
              filteredMovies={filteredNigeriaMovies}
              title="Most Popular Movies in Nigeria 2024"
            />
          )}
          {loadingBest2024 ? (
            <ImageScrollSkeleton />
          ) : (
            <ImageScroller
              filteredMovies={filteredBestMovies2024}
              title="Best Movies of 2024"
            />
          )}
          {loadingHollywood ? (
            <ImageScrollSkeleton />
          ) : (
            <ImageScroller
              filteredMovies={filteredHollywoodMovies}
              title="Most Popular Hollywood Movies 2024"
            />
          )}
          {loadingTrueStory ? (
            <ImageScrollSkeleton />
          ) : (
            <ImageScroller
              filteredMovies={filteredTrueStoryMovies}
              title="Movies Based on a True Story"
            />
          )}
          {loadingPrime ? (
            <ImageScrollSkeleton />
          ) : (
            <ImageScroller
              filteredMovies={filteredPrime}
              title="Top Movies On Prime"
            />
          )}
          {/* <div className="text-center" style={{ marginTop: 40 }}>
            <Button className={classes.seeMoreBtn}>See more</Button>
          </div> */}
        </section>
      )}
    </Container>
  );
};

export default MainMovies;
