import { Skeleton } from "@chakra-ui/react";
import classes from "./SingleReview.module.css";

const SearchAndMoreSkeleton = (props) => {
  return (
    <>
      <div className="row">
        <div
          className="col-12 col-sm-12 col-md-4 col-lg-3 py-2"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Skeleton style={{ height: 250, borderRadius: 10 }}>Hello</Skeleton>
        </div>
        <div
          className="col-12 col-sm-12 col-md-8 col-lg-9 py-2"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <Skeleton style={{ width: "50%" }}>Hello</Skeleton>
          </div>
          <div>
            <Skeleton style={{ width: "70%" }}>Hello</Skeleton>
          </div>
          <div className={classes.subHeading}>
            <div>
              <Skeleton style={{ width: "40%" }}>Hello</Skeleton>
            </div>
          </div>
          <div>
            <div className={classes.subHeading}>
              <Skeleton style={{ width: "40%" }}>Hello</Skeleton>
            </div>
            <div className={classes.subHeading}>
              <Skeleton style={{ width: "40%" }}>Hello</Skeleton>
            </div>
            <div className={classes.subHeading}>
              <Skeleton style={{ width: "40%" }}>Hello</Skeleton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchAndMoreSkeleton;
