"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button, Container } from "react-bootstrap";
import classes from "./SingleNews.module.css";
import TrendingNews from "./TrendingNews";
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
          An Error Occurred: {error.message}
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
              An Error Occurred: {serachedError.message}
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
          <div className={classes.imageContainer}>
            <Image
              src={data.image}
              alt="Single News Image"
              layout="responsive"
              width={1200}
              height={675}
              className={classes.imgStyle}
            />
          </div>
          <div
            style={{ display: "flex", justifyContent: "space-between", flexWrap:"wrap" }}
            className="py-3"
          >
            <div className="py-2">
              By: <b>{data.author}</b>
            </div>
            <div className="py-2">Published: {formattedDate} ago</div>
          </div>
          <div>
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          </div>
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
