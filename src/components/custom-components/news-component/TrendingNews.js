"use client";

import Image from "next/image";
import Link from "next/link";

import useTrendingPost from "@/hooks/useTrendingPost";

import classes from "./TrendingNews.module.css";

// Template Image
import img1 from "../../../../public/images/templates-imgs/popular-img3.png";
import TrendingSkeleton from "./TrendingSkeleton";

export const trendingNewsData = [
  {
    id: 1,
    title: "Different Strokes: Same old story saved by good casting 1",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis. Lorem ipsum ut vel nunc curabitur tempus dui magna morbi. Suspendisse consectetur a proin fermentum tincidunt molestie tortor. Auctor duis lorem ultrices malesuada scelerisque...",
    time: "3 hours",
    author: "Chigox",
    src: img1,
  },
  {
    id: 2,
    title: "Different Strokes: Same old story saved by good casting 2",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis. Lorem ipsum ut vel nunc curabitur tempus dui magna morbi. Suspendisse consectetur a proin fermentum tincidunt molestie tortor. Auctor duis lorem ultrices malesuada scelerisque...",
    time: "3 hours",
    author: "Chigox",
    src: img1,
  },
  {
    id: 3,
    title: "Different Strokes: Same old story saved by good casting 3",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis. Lorem ipsum ut vel nunc curabitur tempus dui magna morbi. Suspendisse consectetur a proin fermentum tincidunt molestie tortor. Auctor duis lorem ultrices malesuada scelerisque...",
    time: "3 hours",
    author: "Chigox",
    src: img1,
  },
  {
    id: 4,
    title: "Different Strokes: Same old story saved by good casting 4",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis. Lorem ipsum ut vel nunc curabitur tempus dui magna morbi. Suspendisse consectetur a proin fermentum tincidunt molestie tortor. Auctor duis lorem ultrices malesuada scelerisque...",
    time: "3 hours",
    author: "Chigox",
    src: img1,
  },
  {
    id: 5,
    title: "Different Strokes: Same old story saved by good casting 5",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis. Lorem ipsum ut vel nunc curabitur tempus dui magna morbi. Suspendisse consectetur a proin fermentum tincidunt molestie tortor. Auctor duis lorem ultrices malesuada scelerisque...",
    time: "3 hours",
    author: "Chigox",
    src: img1,
  },
  {
    id: 6,
    title: "Different Strokes: Same old story saved by good casting 6",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis. Lorem ipsum ut vel nunc curabitur tempus dui magna morbi. Suspendisse consectetur a proin fermentum tincidunt molestie tortor. Auctor duis lorem ultrices malesuada scelerisque...",
    time: "3 hours",
    author: "Chigox",
    src: img1,
  },
  // Repeat for the other news items
];

const TrendingNews = (props) => {
  const {
    sortedReviews: trendingNewsData,
    isLoading,
    error,
  } = useTrendingPost("news");
  return (
    <>
      <h3 style={{ fontWeight: "bold" }}>
        {!!props.title ? props.title : "Trending News"}
      </h3>
      {isLoading ? (
        <TrendingSkeleton />
      ) : (
        <div style={{ marginBottom: 50 }}>
          <hr style={{ marginTop: 4, border: "1px solid #000" }} />
          <div className="row">
            {trendingNewsData.map((trendingNews) => (
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-4 py-3"
                key={Math.random()}
              >
                <Link href={`/news/${trendingNews.id}`}>
                  <Image
                    src={trendingNews.image}
                    className={classes.imgStyle}
                    alt={trendingNews.title}
                    priority
                    width={100}
                    height={100}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: 160,
                      borderRadius: 10,
                      objectPosition: "50% 10%",
                      transform: "translate3d(0, 0, 100px)",
                    }}
                  />
                  <h3 className={classes.heading1}>{trendingNews.title}</h3>
                </Link>
                <div className={classes.authorSection}>
                  By <b>{trendingNews.author}</b>
                </div>
                <div className={classes.description}>
                  {trendingNews.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TrendingNews;
