"use client";

import Link from "next/link";
import classes from "./Review.module.css";
import AnalyticsBox from "../../general-components/AnalyticsBox";
import { GrAdd } from "react-icons/gr";

import SingleReview from "../../general-components/SingleReview";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/app/firebase/config"; // Adjust the import based on your Firebase setup
import { useEffect, useState } from "react";

const ReviewComponent = () => {
  const [recentData, setRecentData] = useState([]);
  const [totalLike, setTotalLike] = useState();
  const [totalSave, setTotalSave] = useState();
  const [totalComment, setTotalComment] = useState();

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

  const getCollectionStats = async () => {
    let commentsTotal = 0;
    let likesTotal = 0;
    let savesTotal = 0;

    const collectionRef = collection(db, "reviews");
    const querySnapshot = await getDocs(collectionRef);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const commentsLength = data.comments || [];
      commentsTotal += commentsLength.length;
      const likesLength = data.likes || [];
      likesTotal += likesLength.length;
      const savesLength = data.saves || [];
      savesTotal += savesLength.length;
    });

    setTotalComment(commentsTotal);
    setTotalLike(likesTotal);
    setTotalSave(savesTotal);
  };

  const dataList = [
    {
      title: "Likes",
      value: totalLike,
      percentage: "8%",
    },
    {
      title: "Comments",
      value: totalComment,
      percentage: "8%",
    },
    {
      title: "Saves",
      value: totalSave,
      percentage: "8%",
    },
    {
      title: "Views",
      value: "NaN",
      percentage: "0%",
    },
  ];

  useEffect(() => {
    getCollectionStats();
  }, []);

  // console.log(recentData);
  return (
    <div>
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ fontWeight: "bold", fontSize: 26 }}>Reviews</div>
          <div style={{ color: "#575655", fontSize: 13 }}>
            An overview of all reviews
          </div>
        </div>
        <div>
          <Link
            className="btn"
            href="/admin/reviews/new"
            style={{
              background: "#E86C44",
              color: "#fff",
              display: "flex",
              alignItems: "center",
            }}
          >
            <GrAdd style={{ marginRight: 10 }} /> Add New
          </Link>
        </div>
      </section>
      {/* New Section Here */}
      <section>
        <div className="row">
          {dataList.map((data) => (
            <div className="col-12 col-md-6 col-lg-6 py-2" key={data.title}>
              <AnalyticsBox
                title={data.title}
                value={data.value}
                percentage={data.percentage}
              />
            </div>
          ))}
        </div>
      </section>
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        <div style={{ fontWeight: "bold" }}>Recent Reviews</div>
        <div>
          <Link href="/admin/reviews/list">See all</Link>
        </div>
      </section>
      {recentData.length > 0 ? (
        <section
          style={{
            border: "1px solid #B8B7B5",
            borderBottom: "none",
            padding: "20px 40px",
            borderRadius: 10,
            marginTop: 20,
            marginBottom: 50,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          {recentData.map((data) => (
            <div className="py-1" key={data.title}>
              <SingleReview {...data} />
              <hr />
            </div>
          ))}
        </section>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
};

export default ReviewComponent;
