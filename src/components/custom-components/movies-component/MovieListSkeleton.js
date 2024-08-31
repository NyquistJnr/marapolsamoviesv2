import React from "react";
import { Skeleton } from "@chakra-ui/react";
import { Container } from "react-bootstrap";

const dataList = ["1", "2"];

const MovieListSkeleton = (props) => {
  return (
    <Container>
      {!props.top && (
        <div style={{ marginBottom: 40 }}>
          <Skeleton style={{ width: "100%", height: 70, borderRadius: 10 }} />
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {dataList.map((data) => (
          <main
            style={{
              padding: "10px 5px",
              borderRadius: 10,
            }}
            key={data}
          >
            <section
              style={{ display: "flex" /* justifyContent: "space-evenly" */ }}
            >
              <div style={{ marginRight: 20 }}>
                <Skeleton
                  style={{ width: 250, height: 350, borderRadius: 10 }}
                />
              </div>
              <div
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  marginTop: 5,
                }}
              >
                <div>
                  <div className="py-2">
                    <Skeleton style={{ width: 150, height: 18 }} />
                  </div>
                  <div>
                    <Skeleton style={{ width: 150, height: 100 }} />
                  </div>
                </div>
                <div>
                  <div className="py-2">
                    <Skeleton style={{ width: 150, height: 18 }} />
                  </div>

                  <div className="py-2">
                    <Skeleton style={{ width: 150, height: 18 }} />
                  </div>

                  <div className="py-2">
                    <Skeleton style={{ width: 150, height: 18 }} />
                  </div>
                </div>
              </div>
            </section>
          </main>
        ))}
      </div>
    </Container>
  );
};

export default MovieListSkeleton;
