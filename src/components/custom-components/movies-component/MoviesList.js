"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button, Container } from "react-bootstrap";
import MovieTvShow from "../home-component/movie-tvshows-components/MovieTvShow";
import useMovieCategorySearch from "@/hooks/useMovieCategorySearch";

import { convertKebabCaseToNormal } from "@/utils/url-encoding";
import CompleteSearchFilterBar from "@/components/general-components/CompleteSearchFilter";
import classes from "./MoviesList.module.css";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import MovieListSkeleton from "./MovieListSkeleton";

const MoviesList = (props) => {
  const router = useRouter();
  const [searchedMovies, setSearcedMovies] = useState("");
  const [searchedFilter, setSearchedFilter] = useState([]);
  const pathname = usePathname();
  const category = convertKebabCaseToNormal(pathname.split("/").pop());

  const { loading, error, filteredMovies, hasMore, loadMoreMovies } =
    useMovieCategorySearch(category);

  if (loading)
    return (
      <div className="text-center py-5">
        <MovieListSkeleton />
      </div>
    );

  if (error)
    return (
      <div className="text-center py-5">An Error Occured, {error.message}</div>
    );

  const handleData = (item) => {
    setSearcedMovies(item);
    console.log("Movies List", item);
    const a = filteredMovies.filter(
      (data) =>
        data.title.toLowerCase().includes(item.toLowerCase()) ||
        item.toLowerCase().includes(data.title.toLowerCase())
    );
    setSearchedFilter(a);
  };

  const handleLoadMore = () => {
    if (hasMore) {
      loadMoreMovies();
    }
  };

  return (
    <Container>
      <CompleteSearchFilterBar
        placeholder="movies by title"
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
            onClick={() => setSearcedMovies("")}
          >
            <FaArrowLeftLong style={{ marginRight: 10 }} />
            Back
          </Button>
          {searchedFilter.length > 0 ? (
            <>
              <h3 style={{ fontWeight: "bold", margin: "30px 0" }}>
                Searched Result for "<b>{searchedMovies}</b>"
              </h3>
              <section className="row" style={{ marginBottom: 50 }}>
                {searchedFilter.map((data) => (
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
        <div>
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              color: "#575655",
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
            onClick={() => router.back()}
          >
            <FaArrowLeftLong style={{ marginRight: 10 }} />
            Back
          </Button>
          <h3 style={{ fontWeight: "bold", margin: "30px 0" }}>{category}</h3>
          <section className="row" style={{ marginBottom: 50 }}>
            {filteredMovies.map((data) => (
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-6 py-2"
                key={data.id}
              >
                <MovieTvShow {...data} />
              </div>
            ))}
            <div className="text-center" style={{ marginTop: 40 }}>
              {hasMore && !loading && (
                <Button className={classes.seeMoreBtn} onClick={handleLoadMore}>
                  See more
                </Button>
              )}
              {!hasMore && <div>No more movies to load.</div>}
            </div>
          </section>
        </div>
      )}
    </Container>
  );
};

export default MoviesList;
