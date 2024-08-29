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
  const [loading, setLoading] = useState();
  const [err, setErr] = useState();
  const pathname = usePathname();
  const myPath = convertKebabCaseToNormal(pathname.split("/").pop());

  const { recentData, isLoading, error } = useFetchRecentReviews();
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

  console.log(myPath);

  useEffect(() => {
    if (myPath === "Trending Reviews") {
      setMainData((prev) => [...trendingData]);
      setLoading(isLoadingTrending);
      setErr(errorTrending);
      setTitle(myPath);
    } else if (myPath === "Latest Reviews") {
      setMainData((prev) => [...recentData]);
      setLoading(isLoading);
      setErr(error);
      setTitle(myPath);
    } else if (myPath === "Most Liked Reviews") {
      setMainData((prev) => [...mostLikedData]);
      setLoading(mostLikedLoading);
      setErr(mostLikedError);
      setTitle(myPath);
    } else if (myPath === "Movies Reviews") {
      setMainData((prev) => [...moviesData]);
      setLoading(moviesLoading);
      setErr(moviesError);
      setTitle(myPath);
    } else if (myPath === "Tv Shows Reviews") {
      setMainData((prev) => [...tvShowsData]);
      setLoading(tvShowsLoading);
      setErr(tvShowsError);
      setTitle(myPath);
    } else {
      setMainData([]);
      setTitle(`"${myPath}", doesn't exist!`);
    }
  }, [
    isLoading,
    isLoadingTrending,
    tvShowsLoading,
    mostLikedLoading,
    moviesLoading,
  ]);

  console.log("infinite loop", mainData);
  return (
    <SeeMoreComponent
      title={title}
      data={mainData}
      isLoading={loading}
      error={err}
    />
  );
};

export default SeeMoreMain;
