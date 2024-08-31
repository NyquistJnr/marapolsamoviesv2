"use client";

import { Button, Container } from "react-bootstrap";

import TrendingNews from "./TrendingNews";
import NewsItem from "./SingleLastestNews";
import MainSearchFilterBar from "@/components/general-components/MainSearchFilter";
import styles from "./NewsComponent.module.css";

import useRecentNews from "@/hooks/useRecentNews";
import { useState } from "react";
import useSearchTextPost from "@/hooks/useSearchedText";
import NewsSkeletonList from "./NewsSkeletonList";
import { FaArrowLeftLong } from "react-icons/fa6";

const NewsComponent = () => {
  const { recentNews, isLoading, error } = useRecentNews();

  const [searchedNews, setSearchedNews] = useState("");

  const {
    searchResults,
    isLoading: loading,
    error: serachedError,
    searchReviews,
  } = useSearchTextPost();

  const handleSearchFilter = (item) => {
    setSearchedNews(item);
    searchReviews(item, "news");
    // console.log(e);
  };

  return (
    <>
      <MainSearchFilterBar searchedSection={handleSearchFilter} />
      <Container>
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
            {loading ? (
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
            <TrendingNews />
            <h1 style={{ marginTop: 50 }} className={styles.heading1}>
              Latest News
            </h1>
            <hr style={{ marginTop: 20, border: "0.5px solid #000" }} />
            {isLoading ? (
              <NewsSkeletonList />
            ) : (
              <>
                {recentNews.map((news, index) => (
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
                <div className="text-center" style={{ marginBottom: 40 }}>
                  <Button className={styles.seeMoreBtn}>See more</Button>
                </div>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default NewsComponent;
