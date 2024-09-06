"use client";

import Link from "next/link";
import classes from "./Review.module.css";
import AnalyticsBox from "../../general-components/AnalyticsBox";
import { GrAdd } from "react-icons/gr";

import SingleReview from "../../general-components/SingleReview";

import useFetchRecentReviews from "@/hooks/useFetchRecentReviews";
import useCollectionStats from "@/hooks/useCollectionStat";

const ReviewComponent = () => {
  const { recentData, isLoading: mainLoading } = useFetchRecentReviews(1, 4);
  const { totalLike, totalSave, totalComment, isLoading, error } =
    useCollectionStats();

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
  ];

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
            <div className="col-12 col-md-4 col-lg-4 py-2" key={data.title}>
              <AnalyticsBox
                title={data.title}
                value={data.value}
                percentage={data.percentage}
                isLoading={isLoading}
                error={error}
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
      {mainLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
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
            <div className="text-center">No Reviews yet!</div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewComponent;
