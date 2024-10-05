"use client";

import Image from "next/image";
import { Container } from "react-bootstrap";

import MainSearchFilterBar from "@/components/general-components/MainSearchFilter";
import classes from "./MovieResult.module.css";

import { usePathname } from "next/navigation";
import usePostDetails from "@/hooks/usePostDetail";

import ReactPlayer from "react-player/youtube";
import ImageScroller from "./MovieScroll";
import useReviewYouMightLike from "@/hooks/useReviewYouMightLike";
import ImageScrollSkeleton from "./ImageScrollSkeleton";
import SingleMovieSkeleton from "./SingleMovieSkeleton";

const MovieResult = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const {
    randomReviews,
    isLoading,
    error: movieError,
  } = useReviewYouMightLike(8, "movies");

  const { data, loading, error } = usePostDetails("movies", id);
  if (loading) {
    return (
      <div>
        <SingleMovieSkeleton />
      </div>
    );
  }

  if (error) {
    return <div>An Error Occured, {error.message}</div>;
  }

  return (
    <Container>
      <MainSearchFilterBar
        placeholder="movie detail"
        searchedSection={(e) => console.log(e)}
      />
      <section style={{ marginBottom: 50 }}>
        <div className="text-center">
          <ReactPlayer url={data.movieTrailer} width={"100%"} controls />
        </div>
        <div className="d-block d-md-flex" style={{ marginTop: 30 }}>
          <div className={classes.imgWrapper}>
            <Image
              src={data.image}
              alt={data.title}
              className={classes.imgStyle}
              priority
              width={100}
              height={100}
              style={{ borderRadius: 10 }}
              layout="responsive"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ marginTop: 20 }}>
              <h3 style={{ fontWeight: "bold" }}>{data.title}</h3>
              <p style={{ marginTop: 20 }}>{data.movieStory}</p>
            </div>
            <div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div style={{ marginRight: 10 }} className="py-2">
                  <b>Directed by</b> {data.movieDirector}
                </div>
                <div style={{ marginRight: 10 }} className="py-2">
                  <b>Produced by</b> {data.movieProducer}
                </div>
                <div style={{ marginRight: 10 }} className="py-2">
                  <b>Release Date:</b> {data.releaseDate}
                </div>
                <div style={{ marginRight: 10 }} className="py-2">
                  <b>Genres:</b> {data.genre}
                </div>
                <div style={{ marginRight: 10 }} className="py-2">
                  <b>Industry:</b> {data.industry}
                </div>
                <div style={{ marginRight: 10 }} className="py-2">
                  <b>Streaming Platform:</b> {data.streamingPlatform}
                </div>
              </div>
            </div>
          </div>
        </div>
        <main style={{ marginTop: 40 }}>
          <h5>
            <b>Cast</b>
          </h5>
          <hr />
          <ul>
            {data.topCasts.split(",").map((data) => (
              <li key={data}>{data}</li>
            ))}
          </ul>
        </main>
        <div style={{ margin: "70px 0 30px 0" }}>
          {isLoading ? (
            <ImageScrollSkeleton />
          ) : (
            <ImageScroller
              filteredMovies={randomReviews}
              title="People Search For"
              seeMore={true}
            />
          )}
          {movieError && <div>{movieError.message}</div>}
        </div>
      </section>
    </Container>
  );
};

export default MovieResult;
