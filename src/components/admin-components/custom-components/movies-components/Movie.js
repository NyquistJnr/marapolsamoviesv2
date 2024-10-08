"use client";

import Link from "next/link";
import { GrAdd } from "react-icons/gr";
import AnalyticsBox from "../../general-components/AnalyticsBox";
import SingleReview from "../../general-components/SingleReview";
import useRecentNews from "@/hooks/useRecentNews";
import useCollectionStats from "@/hooks/useCollectionStat";

const NewsAdmin = () => {
  const {
    recentNews: recentData,
    isLoading: mainLoading,
    error,
  } = useRecentNews("movies", 4);
  /* 
  const {
    totalLike,
    totalSave,
    totalComment,
    isLoading,
    error: errorTotalCollection,
  } = useCollectionStats("movies"); */

  const dataList = [
    {
      title: "Likes",
      value: "Not Supported",
      percentage: "8%",
    },
    {
      title: "Comments",
      value: "Not Supported",
      percentage: "8%",
    },
    {
      title: "Saves",
      value: "Not Supported",
      percentage: "8%",
    },
    {
      title: "Views",
      value: "Not Supported",
      percentage: "0%",
    },
  ];

  if (error) {
    return (
      <div className="text-center py-5">An Error Ocurred, {error.message}</div>
    );
  }

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
          <div style={{ fontWeight: "bold", fontSize: 26 }}>Movies</div>
          <div style={{ color: "#575655", fontSize: 13 }}>
            An overview of all movies
          </div>
        </div>
        <div>
          <Link
            className="btn"
            href="/admin/movies/new"
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
                /* isLoading={isLoading}
                error={errorTotalCollection} */
              />
            </div>
          ))}
        </div>
      </section>
      {/* Third Section Here */}
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        <div style={{ fontWeight: "bold" }}>Recent Movies</div>
        <div>
          <Link href="/admin/movies/list">See all</Link>
        </div>
      </section>
      {mainLoading ? (
        <div className="text-center py-5">Loading...</div>
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
                <div className="py-1" key={data.id}>
                  <SingleReview {...data} type="movies" />
                  <hr />
                </div>
              ))}
            </section>
          ) : (
            <div className="text-center py-5">No Movies yet!</div>
          )}
        </>
      )}
    </div>
  );
};

export default NewsAdmin;
