"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Container } from "react-bootstrap";
import classes from "./SearchedReview.module.css";

import ReviewPack from "../ReviewPack";

import CommentShare from "@/components/general-components/CommentShare";
import RatingComponent from "@/components/general-components/RatingComponent";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import usePostDetails from "@/hooks/usePostDetail";

const SearchedReviewComponent = (props) => {
  const { data, loading, error, formattedDate } = usePostDetails(
    "reviews",
    props.reviewId
  );

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-5">
        Error fetching data: {error.message}
      </div>
    );
  }

  // console.log(data);
  return (
    <main style={{ marginBottom: 50 }}>
      <Container>
        <div className="py-4">
          <Link
            href="/reviews"
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaArrowLeftLong style={{ marginRight: 10 }} />
            Back
          </Link>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-5 col-lg-3 py-2">
            <Image
              src={data.image}
              alt="Searched Review"
              width={200}
              height={200}
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
            <b>By:</b> {data.author}
          </div>
          <div>
            <b>Published:</b> {formattedDate}
          </div>
        </div>
        <div>
          <h4>Plot</h4>
          <hr />
          <p>{data.plot}</p>
        </div>
        <div>
          <h4>Acting</h4>
          <hr />
          <p>{data.acting}</p>
        </div>
        <div>
          <h4>Characters</h4>
          <hr />
          <p>{data.characters}</p>
        </div>
        <div>
          <h4>Storytelling</h4>
          <hr />
          <p>{data.storytelling}</p>
        </div>
        <div>
          <h4>The Verdict</h4>
          <hr />
          <p>{data.verdict}</p>
        </div>
        <RatingComponent value={data.rating} />
        <CommentShare
          value={data?.comments}
          id={props.reviewId}
          optional={data}
        />
        <div style={{ marginTop: 50 }}>
          <ReviewPack title="Similar Reviews" />
        </div>
      </Container>
    </main>
  );
};

export default SearchedReviewComponent;
