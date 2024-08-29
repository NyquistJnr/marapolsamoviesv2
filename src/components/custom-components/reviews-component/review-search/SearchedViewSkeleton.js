import { Skeleton } from "@chakra-ui/react";
import React from "react";
import { Container } from "react-bootstrap";

import classes from "./SearchedReview.module.css";

const SearchedViewSkeleton = () => {
  return (
    <main style={{ marginBottom: 50 }}>
      <Container>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-5 col-lg-3 py-2">
            <Skeleton style={{ width: 200, height: 300, borderRadius: 10 }} />
          </div>
          <div className="col-12 col-sm-12 col-md-7 col-lg-9 py-2">
            <div style={{ fontWeight: "bold" }}>
              <Skeleton>Hello</Skeleton>
            </div>
            <div>
              <div className={classes.text}>
                <Skeleton>Hello</Skeleton>
              </div>
              <div className={classes.text}>
                <Skeleton>Hello</Skeleton>
              </div>
              <div className={classes.text}>
                <Skeleton>Hello</Skeleton>
              </div>
              <div className={classes.text}>
                <Skeleton>Hello</Skeleton>
              </div>
              <div className={classes.text}>
                <Skeleton>Hello</Skeleton>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <div>
            <Skeleton>Hello</Skeleton>
          </div>
          <div style={{ marginTop: 10 }}>
            <Skeleton>Hello</Skeleton>
          </div>
        </div>
        <div>
          <div>
            <Skeleton>Hello</Skeleton>
          </div>
          <div>
            <Skeleton>Hello</Skeleton>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default SearchedViewSkeleton;
