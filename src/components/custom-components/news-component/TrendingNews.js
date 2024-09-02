"use client";

import Image from "next/image";
import Link from "next/link";

import useTrendingPost from "@/hooks/useTrendingPost";
import classes from "./TrendingNews.module.css";
import TrendingSkeleton from "./TrendingSkeleton";
import { shortenText, truncateText } from "@/utils/text-shortener";

const TrendingNews = (props) => {
  const {
    sortedReviews: trendingNewsData,
    isLoading,
    error,
  } = useTrendingPost("news");

  // Adjust the length as needed

  return (
    <>
      <h3 className={classes.title}>
        {!!props.title ? props.title : "Trending News"}
      </h3>
      {isLoading ? (
        <TrendingSkeleton />
      ) : (
        <div className={classes.container}>
          <hr className={classes.separator} />
          <div className="row">
            {trendingNewsData.map((trendingNews) => {
              const truncatedDescription = truncateText(
                trendingNews.description,
                100
              );
              return (
                <div
                  className="col-12 col-sm-12 col-md-6 col-lg-4 py-3"
                  key={trendingNews.id}
                >
                  <Link href={`/news/${trendingNews.id}`}>
                    <div className={classes.imgWrapper}>
                      <Image
                        src={trendingNews.image}
                        alt={trendingNews.title}
                        layout="responsive"
                        width={400}
                        height={225}
                        className={classes.imgStyle}
                      />
                    </div>
                    <div className={classes.heading1}>
                      {shortenText(trendingNews.title, 10)}
                    </div>
                  </Link>
                  <div className={classes.authorSection}>
                    By <b>{trendingNews.author}</b>
                  </div>
                  <div className={classes.description}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: truncatedDescription,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default TrendingNews;
