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

const SearchedReviewComponent = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "reviews", props.reviewId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.reviewId]);

  if (loading) {
    return <div>Loading oh...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  let formattedDate = "";
  if (data.timestamp) {
    const date = data.timestamp.toDate();
    formattedDate = date.toLocaleString();
  }

  console.log("data");
  return (
    <main style={{ marginBottom: 50 }}>
      <Container>
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
        <CommentShare value={data?.comments} id={props.reviewId} />
        <div style={{ marginTop: 50 }}>
          <ReviewPack title="Similar Reviews" />
        </div>
      </Container>
    </main>
  );
};

export default SearchedReviewComponent;
