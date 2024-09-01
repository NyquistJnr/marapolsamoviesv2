"use client";

import React from "react";
import useRecentNews from "@/hooks/useRecentNews";
import { Container } from "react-bootstrap";
import TrendingSkeleton from "../news-component/TrendingSkeleton";
import CompleteSearchFilterBar from "@/components/general-components/CompleteSearchFilter";
import { shortenText } from "@/utils/text-shortener";
import Image from "next/image";
import Link from "next/link";

const AwardList = () => {
  const { recentNews, isLoading, error } = useRecentNews("awards");

  return (
    <Container>
      <CompleteSearchFilterBar
        placeholder="awards"
        searchedSection={(e) => console.log(e)}
      />
      {isLoading ? (
        <div style={{ marginBottom: 120 }}>
          <TrendingSkeleton />
        </div>
      ) : (
        <>
          <section className="row" style={{ marginBottom: 120 }}>
            {recentNews.map((data) => (
              <div className="col-12 col-md-6 col-lg-4 py-2" key={data.id}>
                <div style={{ margin: "10px 0" }}>
                  <Image
                    alt="awards"
                    src="/awards.png"
                    width={100}
                    height={100}
                    layout="responsive"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    priority
                  />
                  <div
                    style={{
                      fontSize: 25,
                      fontWeight: "bold",
                      margin: "10px 0",
                    }}
                  >
                    <Link href={`/awards/${data.id}`}>
                      {shortenText(data.title, 10)}
                    </Link>
                  </div>
                  <div style={{ marginBottom: 5 }}>
                    <i>{data.author}</i>
                  </div>
                  <div style={{ fontSize: 12 }}>
                    {data.timestamp.toDate().toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </Container>
  );
};

export default AwardList;
