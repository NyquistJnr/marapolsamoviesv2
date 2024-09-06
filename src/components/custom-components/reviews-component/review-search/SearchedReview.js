"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button, Container } from "react-bootstrap";
import classes from "./SearchedReview.module.css";

import CommentShare from "@/components/general-components/CommentShare";
import RatingComponent from "@/components/general-components/RatingComponent";

import { FaArrowLeftLong } from "react-icons/fa6";
import usePostDetails from "@/hooks/usePostDetail";
import SearchedViewSkeleton from "./SearchedViewSkeleton";
import HorRecommendation from "@/components/general-components/HorRecommendation";
import useSimilarPost from "@/hooks/useSimilarPost";
import { capitalize } from "@/utils/number-commas";

const SearchedReviewComponent = (props) => {
  const router = useRouter();
  const { data, loading, error, formattedDate } = usePostDetails(
    "reviews",
    props.reviewId
  );

  const {
    filteredReviews,
    isLoading,
    error: similarError,
  } = useSimilarPost(
    props.reviewId,
    {
      genre: props.genre,
      industry: props.industry,
      streamingPlatform: props.streamingPlatform,
    },
    5
  );

  if (loading) {
    return (
      <div className="text-center py-5">
        <SearchedViewSkeleton />
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

  // console.log(data);
  return (
    <main style={{ marginBottom: 50 }}>
      <Container>
        <div className="py-4">
          <Button
            onClick={() => router.back()}
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "transparent",
              borderColor: "transparent",
              color: "#000",
            }}
          >
            <FaArrowLeftLong style={{ marginRight: 10 }} />
            Back
          </Button>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-5 col-lg-3 py-2">
            <Image
              src={data.image}
              alt="Searched Review"
              width={200}
              height={200}
              layout="responsive"
              style={{
                width: "100%",
                height: 350,
                objectFit: "cover",
                objectPosition: "center center",
                borderRadius: 10,
              }}
              priority
            />
          </div>
          <div className="col-12 col-sm-12 col-md-7 col-lg-9 py-2">
            <h3 style={{ fontWeight: "bold" }}>{data.title}</h3>
            <div>
              <div className={classes.text}>
                <b>Genre:</b> {data.genre}
              </div>
              <div className={classes.text}>
                <b>Industry:</b> {data.industry}
              </div>
              <div className={classes.text}>
                <b>Streaming Platform:</b> {data.streamingPlatform}
              </div>
              <div className={classes.text}>
                <b>Movie Director:</b> {data.movieDirector}
              </div>
              <div className={classes.text}>
                <b>Cast:</b> {data.topCasts}
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <div>
            <b>By:</b> {capitalize(data.author)}
          </div>
          <div style={{ marginTop: 10 }}>
            <b>Published:</b> {formattedDate}
          </div>
        </div>
        {data.plot && (
          <div>
            <h4>Plot</h4>
            <hr />
            <p>{data.plot}</p>
          </div>
        )}
        {data.acting && (
          <div>
            <h4>Acting</h4>
            <hr />
            <p>{data.acting}</p>
          </div>
        )}
        {data.characters && (
          <div>
            <h4>Characters</h4>
            <hr />
            <p>{data.characters}</p>
          </div>
        )}
        {data.storytelling && (
          <div>
            <h4>Storytelling</h4>
            <hr />
            <p>{data.storytelling}</p>
          </div>
        )}
        {data.verdict && (
          <div>
            <h4>The Verdict</h4>
            <hr />
            <p>{data.verdict}</p>
          </div>
        )}
        <RatingComponent value={data.rating} />
        <CommentShare
          value={data?.comments}
          id={props.reviewId}
          optional={data}
        />
        <div style={{ marginTop: 50 }}>
          <HorRecommendation
            title="Similar Reviews"
            data={filteredReviews}
            isLoading={isLoading}
            error={similarError}
            seeMore={true}
          />
        </div>
      </Container>
    </main>
  );
};

export default SearchedReviewComponent;
