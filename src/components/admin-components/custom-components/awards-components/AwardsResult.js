"use client";

import { FaArrowLeftLong } from "react-icons/fa6";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { GrAdd } from "react-icons/gr";
import useRecentNews from "@/hooks/useRecentNews";
import SingleAward from "./SingleAward";

const AwardsResultAdmin = () => {
  const router = useRouter();
  const {
    recentNews: recentData,
    isLoading: mainLoading,
    error: mainError,
  } = useRecentNews("awards", 10);

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
            href="/admin/awards/new"
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
          Recent Awards
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
                    <SingleAward {...data} type="awards" />
                  </div>
                ))}
              </section>
            ) : (
              <div className="text-center">No Movies yet</div>
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

export default AwardsResultAdmin;
