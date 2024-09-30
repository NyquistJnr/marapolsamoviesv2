"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { convertKebabCaseToNormal } from "@/utils/url-encoding";
import SeeMoreComponent from "./SeeMoreComponent";
import useFetchRecentReviews from "@/hooks/useFetchRecentReviews";
import useTrendingPost from "@/hooks/useTrendingPost";
import useMostLikedPost from "@/hooks/useMostLikedPost";
import useFetchCategoryData from "@/hooks/useGetShowAdmin";

const SeeMoreMain = () => {
  const [title, setTitle] = useState("");
  const [mainData, setMainData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const pathname = usePathname();
  const myPath = convertKebabCaseToNormal(pathname.split("/").pop());
  const [hasMoreMain, setHasMoreMain] = useState(null);
  const [fetchMoreMain, setFetchMoreMain] = useState(null); // Now accepting a function as intended

  const {
    recentData,
    isLoading,
    error,
    fetchMore: fetchLastestMore,
    hasMore: hasMoreLastest,
  } = useFetchRecentReviews(1, 3);
  const {
    sortedReviews: trendingData,
    isLoading: isLoadingTrending,
    error: errorTrending,
  } = useTrendingPost("reviews", 15);

  const {
    sortedReviews: mostLikedData,
    isLoading: mostLikedLoading,
    error: mostLikedError,
    fetchMore,
    hasMore,
  } = useMostLikedPost(3);

  const {
    data: moviesData,
    isLoading: moviesLoading,
    moviesError,
    fetchMore: movieFetchMore,
    hasMore: movieHasMore,
  } = useFetchCategoryData("Movies", 3);

  const {
    data: tvShowsData,
    isLoading: tvShowsLoading,
    tvShowsError,
    fetchMore: tvShowsFetchMore,
    hasMore: tvShowsHasMore,
  } = useFetchCategoryData("TV Shows", 3);

  useEffect(() => {
    if (myPath === "Trending Reviews") {
      setMainData(trendingData);
      setLoading(isLoadingTrending);
      setErr(errorTrending);
      setTitle(myPath);
      setFetchMoreMain(null); // No fetchMore for trending reviews
      setHasMoreMain(false); // Adjust based on your logic
    } else if (myPath === "Latest Reviews") {
      setMainData(recentData);
      setLoading(isLoading);
      setErr(error);
      setTitle(myPath);
      setFetchMoreMain(() => fetchLastestMore);
      setHasMoreMain(hasMoreLastest); // Adjust based on your logic
    } else if (myPath === "Most Liked Reviews") {
      setMainData(mostLikedData);
      setLoading(mostLikedLoading);
      setErr(mostLikedError);
      setHasMoreMain(hasMore);
      setFetchMoreMain(() => fetchMore); // Passing fetchMore function
      setTitle(myPath);
    } else if (myPath === "Movies Reviews") {
      setMainData(moviesData);
      setLoading(moviesLoading);
      setErr(moviesError);
      setTitle(myPath);
      setFetchMoreMain(() => movieFetchMore); // Passing movieFetchMore function
      setHasMoreMain(movieHasMore);
    } else if (myPath === "Tv Shows Reviews") {
      setMainData(tvShowsData);
      setLoading(tvShowsLoading);
      setErr(tvShowsError);
      setTitle(myPath);
      setFetchMoreMain(() => tvShowsFetchMore); // Passing tvShowsFetchMore function
      setHasMoreMain(tvShowsHasMore);
    } else {
      setMainData([]);
      setTitle(`"${myPath}", doesn't exist!`);
    }
  }, [
    myPath,
    isLoading,
    isLoadingTrending,
    tvShowsLoading,
    mostLikedLoading,
    moviesLoading,
    trendingData,
    recentData,
    mostLikedData,
    moviesData,
    tvShowsData,
    errorTrending,
    error,
    mostLikedError,
    moviesError,
    tvShowsError,
    hasMore,
    movieHasMore,
    tvShowsHasMore,
    hasMoreLastest,
  ]);

  return (
    <SeeMoreComponent
      title={title}
      data={mainData}
      isLoading={loading}
      error={err}
      fetchMore={fetchMoreMain} // Passing fetchMoreMain as props
      hasMore={hasMoreMain} // Passing hasMoreMain as props
    />
  );
};

export default SeeMoreMain;
