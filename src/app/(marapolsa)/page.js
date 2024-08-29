"use client";

import useFetchRecentReviews from "@/hooks/useFetchRecentReviews";
import styles from "./page.module.css";
import { Container } from "react-bootstrap";
import HorizontalScroll from "@/components/basic-ui/horizontal-scroll/HorizontalScroll";
import LastestList from "@/components/custom-components/home-component/LastestList";
import PopularList from "@/components/custom-components/home-component/PopularList";

import { useAuth } from "@/context/AuthContext";
import useTrendingPost from "@/hooks/useTrendingPost";

// Images Needed
import img from "../../../public/images/templates-imgs/treandingimage1.png";

import popularImg1 from "../../../public/images/templates-imgs/popular-img1.png";
import popularImg2 from "../../../public/images/templates-imgs/popular-img2.png";
import popularImg3 from "../../../public/images/templates-imgs/popular-img3.png";
import movieTvShowImg from "../../../public/images/templates-imgs/tvshow.png";
import movieTvShowImg1 from "../../../public/images/templates-imgs/lastest-img.png";
import movieTvShowImg2 from "../../../public/images/templates-imgs/lastest-img3.png";
import NewsList from "@/components/custom-components/home-component/news-components/NewsList";
import MovieTvShowList from "@/components/custom-components/home-component/movie-tvshows-components/MovieTvShowList";
import JoinConversation from "@/components/custom-components/join-conversation/JoinConversation";
import Unwrapped from "@/components/custom-components/unwrapped-component/Unwrapped";
import HorRecommendation from "@/components/general-components/HorRecommendation";
import useReviewYouMightLike from "@/hooks/useReviewYouMightLike";

const data2 = [
  {
    src: popularImg1,
    title: "Flawsome Series: A series that will make you want for more.",
    time: "May 11, 2024",
    identity: "Review",
  },
  {
    src: popularImg2,
    title: "Breathe of Life: A masterpiece that will leave you in awe.",
    time: "May 11, 2024",
    identity: "News",
  },
  {
    title: "Different Strokes",
    time: "May 11, 2024",
    src: popularImg3,
    identity: "Movies",
  },
];

const data3 = [
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    author: "Chigoxx",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis. Lorem ipsum ut...",
    src: popularImg3,
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    author: "Chigoxx",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis. Lorem ipsum ut...",
    src: popularImg3,
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    author: "Chigoxx",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis. Lorem ipsum ut...",
    src: popularImg3,
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    author: "Chigoxx",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis. Lorem ipsum ut...",
    src: popularImg3,
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    author: "Chigoxx",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis. Lorem ipsum ut...",
    src: popularImg3,
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    author: "Chigoxx",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis. Lorem ipsum ut...",
    src: popularImg3,
  },
];

export const data4 = [
  {
    src: movieTvShowImg1,
    title: "Beast of Two Worlds",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis...",
    author: "Chigoxx",
    time: "12 April, 2024",
    genre: "Action, Sci-fi | Hollywood",
    platform: "Netflix",
  },
  {
    src: movieTvShowImg2,
    title: "Beast of Two Worlds",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis...",
    author: "Chigoxx",
    time: "12 April, 2024",
    genre: "Action, Sci-fi | Hollywood",
    platform: "Netflix",
  },
  {
    src: img,
    title: "Beast of Two Worlds",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis...",
    author: "Chigoxx",
    time: "12 April, 2024",
    genre: "Action, Sci-fi | Hollywood",
    platform: "Netflix",
  },
  {
    src: movieTvShowImg,
    title: "Beast of Two Worlds",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis...",
    author: "Chigoxx",
    time: "12 April, 2024",
    genre: "Action, Sci-fi | Hollywood",
    platform: "Netflix",
  },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
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
              <PopularList data={data2} name="Most Popular" />
            </div>
          </div>
        </div>
        {/* Start of New Section */}
        <NewsList data={data3} name="News" />
        {/* Start of New Section */}
        <MovieTvShowList data={data4} name="Movies & TV Shows" />
      </Container>
      {/* Start of New Section */}
      {isAuthenticated ? (
        <Container>
          <HorRecommendation
            title="Reviews You Might Like"
            data={randomReviews}
            isLoading={youMightLikeLoading}
            error={youMightLikeError}
          />
        </Container>
      ) : (
        <JoinConversation />
      )}
      <Container>
        {/* Start of New Section */}
        <Unwrapped />
      </Container>
    </>
  );
}
