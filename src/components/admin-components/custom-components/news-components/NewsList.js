"use client";

import { FaArrowLeftLong } from "react-icons/fa6";
import classes from "./NewsList.module.css";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { GrAdd } from "react-icons/gr";
import SingleReview from "../../general-components/SingleReview";
import useRecentNews from "@/hooks/useRecentNews";

const NewsAdminListComponent = () => {
  const router = useRouter();
  const {
    recentNews: recentData,
    isLoading: mainLoading,
    error: mainError,
  } = useRecentNews();

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
          <div>
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                color: "#575655",
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              onClick={() => router.back()}
            >
              <FaArrowLeftLong style={{ marginRight: 10 }} />
              Back
            </Button>
          </div>
        </div>
        <div>
          <Link
            className="btn"
            href="/admin/news/new"
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
      <section>
        <div style={{ fontWeight: "bold", fontSize: 24, marginTop: 20 }}>
          Recent News
        </div>
      </section>
      <section>
        {mainLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {recentData.length > 0 ? (
              <section>
                {recentData.map((data) => (
                  <div key={data.id}>
                    <SingleReview {...data} type="news" />
                  </div>
                ))}
              </section>
            ) : (
              <div className="text-center">No Review yet</div>
            )}
          </>
        )}
        {mainError && (
          <div className="text-center">
            An Error Occured
            <hr />
            Reload your browser.
          </div>
        )}
      </section>
    </div>
  );
};

export default NewsAdminListComponent;
