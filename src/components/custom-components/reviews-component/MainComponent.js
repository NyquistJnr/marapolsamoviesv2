"use client";

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import SearchedReview from "./SearchedReview";
import HorRecommendation from "@/components/general-components/HorRecommendation";

import classes from "./MainComponent.module.css";
import CompleteSearchFilterBar from "@/components/general-components/CompleteSearchFilter";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const ReviewComponent = () => {
  const [sumbitSearch, setSumbitSearch] = useState("");

  const [recentData, setRecentData] = useState([]);

  const handleSearchFilter = (e) => {
    // console.log(e);
    setSumbitSearch(e);
  };
  /* Fetch Reviews Function */
  const fetchReviews = async () => {
    try {
      const q = query(collection(db, "reviews"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const reviews = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecentData(reviews);
    } catch (error) {
      console.error("Error fetching reviews: ", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // console.log(recentData);
  return (
    <>
      <CompleteSearchFilterBar searchedSection={(e) => handleSearchFilter(e)} />
      {!!!sumbitSearch ? (
        <>
          <div style={{ marginBottom: 50 }}>
            <HorRecommendation title="Trending Reviews" data={recentData} />
          </div>
          <div style={{ marginBottom: 50 }}>
            <HorRecommendation title="Latest Reviews" data={recentData} />
          </div>
          <div style={{ marginBottom: 50 }}>
            <HorRecommendation title="Most Liked Reviews" data={recentData} />
          </div>
          <div style={{ marginBottom: 50 }}>
            <HorRecommendation title="Movies Reviews" data={recentData} />
          </div>
          <div style={{ marginBottom: 50 }}>
            <HorRecommendation title="TV Shows Reviews" data={recentData} />
          </div>
          <div className="text-center" style={{ marginBottom: 40 }}>
            <Button className={classes.seeMoreBtn}>See more</Button>
          </div>
        </>
      ) : (
        <>
          <SearchedReview
            title={sumbitSearch}
            handleGoBack={(e) => handleSearchFilter(e)}
          />
        </>
      )}
    </>
  );
};

export default ReviewComponent;
