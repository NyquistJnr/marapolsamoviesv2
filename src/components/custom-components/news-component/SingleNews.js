"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button, Container } from "react-bootstrap";

import classes from "./SingleNews.module.css";

import TrendingNews, { trendingNewsData } from "./TrendingNews";
import CommentShare from "@/components/general-components/CommentShare";
import MainSearchFilterBar from "@/components/general-components/MainSearchFilter";
import usePostDetails from "@/hooks/usePostDetail";
import { FaArrowLeftLong } from "react-icons/fa6";
import useSearchTextPost from "@/hooks/useSearchedText";
import NewsItem from "./SingleLastestNews";
import NewsSkeletonList from "./NewsSkeletonList";
import SingleNewsSkeleton from "./SingleNewsSkeleton";

const SingleNews = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [searchedNews, setSearchedNews] = useState("");

  const { data, loading, error, formattedDate } = usePostDetails("news", id);

  const {
    searchResults,
    isLoading,
    error: serachedError,
    searchReviews,
  } = useSearchTextPost();

  if (loading) {
    return (
      <div className="text-center py-5">
        <SingleNewsSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ height: "50vh" }}>
        <div className="py-4">
          <Button
            onClick={() => router.back()}
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
              color: "#000",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaArrowLeftLong style={{ marginRight: 10 }} />
            Back
          </Button>
        </div>
        <div className="text-center py-5">
          An Error Occured, {error.message}
        </div>
      </div>
    );
  }

  const handleSearchedSection = (item) => {
    setSearchedNews(item);
    searchReviews(item, "news");
  };

  return (
    <Container>
      <MainSearchFilterBar searchedSection={handleSearchedSection} />
      {!!searchedNews ? (
        <div style={{ marginBottom: 50 }}>
          {serachedError && (
            <div className="py-4 text-center">
              An Error Occured, {serachedError.message}
            </div>
          )}
          <div className="py-4">
            <Button
              onClick={() => setSearchedNews("")}
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                color: "#000",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaArrowLeftLong style={{ marginRight: 10 }} />
              Back
            </Button>
          </div>
          {isLoading ? (
            <NewsSkeletonList />
          ) : (
            <>
              {searchResults.map((news, index) => (
                <NewsItem
                  key={index}
                  id={news.id}
                  title={news.title}
                  description={news.description}
                  time={news.timestamp.toDate().toLocaleString()}
                  author={news.author}
                  src={news.image}
                />
              ))}
              {searchResults.length < 1 && (
                <div className="py-5 text-center">
                  No News with the searched words
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <>
          <div className="py-4">
            <Button
              onClick={() => router.back()}
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                color: "#000",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaArrowLeftLong style={{ marginRight: 10 }} />
              Back
            </Button>
          </div>
          <h2 style={{ fontWeight: "bold", marginBottom: 20 }}>{data.title}</h2>
          <Image
            src={data.image}
            className={classes.imgStyle}
            alt="Single News Image"
            /* priority */
            width={100}
            height={100}
            style={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: 10,
            }}
          />
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="py-3"
          >
            <div>
              By: <b>{data.author}</b>
            </div>
            <div>Published: {formattedDate} ago</div>
          </div>
          <div>{data.description}</div>
          <CommentShare
            collection="news"
            value={data?.comments}
            id={id}
            optional={data}
          />
          <section style={{ marginTop: 50 }}>
            <TrendingNews title="Recommended News" />
          </section>
        </>
      )}
    </Container>
  );
};

export default SingleNews;
