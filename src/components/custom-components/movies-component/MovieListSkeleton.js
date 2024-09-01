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
          <div
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
            </section>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default MovieListSkeleton;
