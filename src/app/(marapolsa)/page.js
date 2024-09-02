"use client";

import useFetchRecentReviews from "@/hooks/useFetchRecentReviews";
import { Container } from "react-bootstrap";
import LastestList from "@/components/custom-components/home-component/LastestList";
import PopularList from "@/components/custom-components/home-component/PopularList";

import { useAuth } from "@/context/AuthContext";
import useTrendingPost from "@/hooks/useTrendingPost";

import NewsList from "@/components/custom-components/home-component/news-components/NewsList";
import MovieTvShowList from "@/components/custom-components/home-component/movie-tvshows-components/MovieTvShowList";
import JoinConversation from "@/components/custom-components/join-conversation/JoinConversation";
import Unwrapped from "@/components/custom-components/unwrapped-component/Unwrapped";
import HorRecommendation from "@/components/general-components/HorRecommendation";
import useReviewYouMightLike from "@/hooks/useReviewYouMightLike";
import useRecentNews from "@/hooks/useRecentNews";
import MovieListSkeleton from "@/components/custom-components/movies-component/MovieListSkeleton";
import TrendingSkeleton from "@/components/custom-components/news-component/TrendingSkeleton";
import useTopDocuments from "@/hooks/useMostPopularPosts";
import PopularSkeleton from "@/components/custom-components/home-component/PopularSkeleton";

import styles from "./page.module.css";

// import useAutoLogout from "@/hooks/useAutoLogout";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const {
    topDocuments,
    loading: popularLoading,
    error: popularError,
  } = useTopDocuments();

  console.log("Top Document", topDocuments);
  const {
    recentData,
    isLoading: recentLoading,
    error,
  } = useFetchRecentReviews(null, 3);
  const {
    sortedReviews: trendingPost,
    isLoading,
    error: trendingError,
  } = useTrendingPost();
  // console.log(trendingPost);

  const {
    randomReviews,
    isLoading: youMightLikeLoading,
    youMightLikeError,
  } = useReviewYouMightLike(6);

  const {
    recentNews,
    isLoading: moviesLoading,
    error: movieError,
  } = useRecentNews("movies", 4);

  const {
    recentNews: mainNews,
    isLoading: newsLoading,
    error: newsError,
  } = useRecentNews("news", 4);

  // useAutoLogout();

  return (
    <>
      <Container>
        <HorRecommendation
          title="Trending"
          data={trendingPost}
          isLoading={isLoading}
          seeMore={true}
          error={trendingError}
        />
        <div style={{ marginTop: 50 }}>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-7 col-lg-8 py-3">
              <LastestList
                data={recentData}
                name="Lastest"
                isLoading={recentLoading}
                error={trendingError}
              />
            </div>
            <div className="col-12 col-sm-12 col-md-5 col-lg-4 py-3">
              {popularLoading ? (
                <PopularSkeleton />
              ) : (
                <PopularList data={topDocuments} name="Most Popular" />
              )}
            </div>
          </div>
        </div>
        {/* Start of New Section */}
        {newsLoading ? (
          <div style={{ margin: "50px 0" }}>
            <TrendingSkeleton />
          </div>
        ) : (
          <NewsList data={mainNews} name="News" />
        )}
        {/* Start of New Section */}
        {moviesLoading ? (
          <MovieListSkeleton top={true} />
        ) : (
          <MovieTvShowList data={recentNews} name="Movies & TV Shows" />
        )}
      </Container>
      {/* Start of New Section */}
      {isAuthenticated ? (
        <Container>
          <div style={{ margin: "50px 0" }}>
            <HorRecommendation
              title="Reviews You Might Like"
              data={randomReviews}
              isLoading={youMightLikeLoading}
              error={youMightLikeError}
              seeMore={true}
            />
          </div>
        </Container>
      ) : (
        <div style={{ margin: "50px 0" }}>
          <JoinConversation />
        </div>
      )}
      <Container>
        {/* Start of New Section */}
        <Unwrapped />
      </Container>
    </>
  );
}
