"use client";

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import SearchedReview from "./SearchedReview";
import HorRecommendation from "@/components/general-components/HorRecommendation";

import classes from "./MainComponent.module.css";
import CompleteSearchFilterBar from "@/components/general-components/CompleteSearchFilter";

import useFetchRecentReviews from "@/hooks/useFetchRecentReviews";
import useTrendingPost from "@/hooks/useTrendingPost";
import useMostLikedPost from "@/hooks/useMostLikedPost";
import useFetchCategoryData from "@/hooks/useGetShowAdmin";
import useSearchTextPost from "@/hooks/useSearchedText";

const ReviewComponent = () => {
  const [sumbitSearch, setSumbitSearch] = useState("");

  const { recentData, isLoading, error } = useFetchRecentReviews(1, 6);
  const {
    sortedReviews: trendingData,
    isLoading: isLoadingTrending,
    error: errorTrending,
  } = useTrendingPost();

  const {
    sortedReviews: mostLikedData,
    isLoading: mostLikedLoading,
    error: mostLikedError,
  } = useMostLikedPost();

  const {
    data: moviesData,
    isLoading: moviesLoading,
    moviesError,
  } = useFetchCategoryData("Movies");
  const {
    data: tvShowsData,
    isLoading: tvShowsLoading,
    tvShowsError,
  } = useFetchCategoryData("TV Shows");

  const {
    searchResults,
    isLoading: searchedLoading,
    error: searchedError,
    searchReviews,
  } = useSearchTextPost();

  const handleSearchFilter = (e) => {
    // console.log(e);
    setSumbitSearch(e);
    searchReviews(e);
  };

  // console.log("searchResults", searchResults);

  return (
    <>
      <CompleteSearchFilterBar searchedSection={(e) => handleSearchFilter(e)} />
      {!!!sumbitSearch ? (
        <>
          <div style={{ marginBottom: 50 }}>
            <HorRecommendation
              title="Trending Reviews"
              data={trendingData}
              isLoading={isLoadingTrending}
              error={errorTrending}
            />
          </div>
          <div style={{ marginBottom: 50 }}>
            <HorRecommendation
              title="Latest Reviews"
              data={recentData}
              isLoading={isLoading}
              error={error}
            />
          </div>
          <div style={{ marginBottom: 50 }}>
            <HorRecommendation
              title="Most Liked Reviews"
              data={mostLikedData}
              isLoading={mostLikedLoading}
              error={mostLikedError}
            />
          </div>
          <div style={{ marginBottom: 50 }}>
            <HorRecommendation
              title="Movies Reviews"
              data={moviesData}
              isLoading={moviesLoading}
              error={moviesError}
            />
          </div>
          <div style={{ marginBottom: 50 }}>
            <HorRecommendation
              title="TV Shows Reviews"
              data={tvShowsData}
              isLoading={tvShowsLoading}
              error={tvShowsError}
            />
          </div>
          {/*  <div className="text-center" style={{ marginBottom: 40 }}>
            <Button className={classes.seeMoreBtn}>See more</Button>
          </div> */}
        </>
      ) : (
        <>
          <SearchedReview
            title={sumbitSearch}
            handleGoBack={(e) => handleSearchFilter(e)}
            data={searchResults}
            isLoading={searchedLoading}
            error={searchedError}
          />
        </>
      )}
    </>
  );
};

export default ReviewComponent;
