import React from "react";
import { Skeleton } from "@chakra-ui/react";

const SingleMovieSkeleton = () => {
  return (
    <section style={{ marginBottom: 50 }}>
      <div className="text-center">
        <Skeleton style={{ width: "100%", height: 250, borderRadius: 5 }} />
      </div>
      <div className="d-block d-md-flex" style={{ marginTop: 30 }}>
        <Skeleton style={{ width: 200, height: 280, borderRadius: 10 }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginTop: 20, marginLeft: 20 }}>
            <Skeleton style={{ width: 200, height: 18, marginBottom: 10 }} />
            <Skeleton style={{ width: 170, height: 15 }} />
          </div>
          <div style={{ marginLeft: 20 }}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ marginRight: 10 }} className="py-2">
                <Skeleton style={{ width: 170, height: 15 }} />
              </div>
              <div style={{ marginRight: 10 }} className="py-2">
                <Skeleton style={{ width: 170, height: 15 }} />
              </div>
              <div style={{ marginRight: 10 }} className="py-2">
                <Skeleton style={{ width: 170, height: 15 }} />
              </div>
              <div style={{ marginRight: 10 }} className="py-2">
                <Skeleton style={{ width: 170, height: 15 }} />
              </div>
              <div style={{ marginRight: 10 }} className="py-2">
                <Skeleton style={{ width: 170, height: 15 }} />
              </div>
              <div style={{ marginRight: 10 }} className="py-2">
                <Skeleton style={{ width: 170, height: 15 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <main style={{ marginTop: 40 }}>
        <Skeleton style={{ width: 200, height: 18, marginBottom: 10 }} />
        <Skeleton style={{ width: 200, height: 18, marginBottom: 10 }} />
        <Skeleton style={{ width: 200, height: 18, marginBottom: 10 }} />
        <Skeleton style={{ width: 200, height: 18, marginBottom: 10 }} />
        <Skeleton style={{ width: 200, height: 18, marginBottom: 10 }} />
      </main>
    </section>
  );
};

export default SingleMovieSkeleton;
