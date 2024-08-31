import { Skeleton } from "@chakra-ui/react";
import classes from "./SingleLastestNews.module.css";

const NewsSkeletonList = () => {
  return (
    <>
      <div className="row py-3">
        <div
          className="col-12 col-sm-12 col-md-8 col-lg-9 py-2 order-2 order-md-1"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <Skeleton style={{ width: 200, height: 20 }} />
            <div className="py-2">
              <Skeleton style={{ width: 200, height: 15 }} />
            </div>
          </div>
          <div className={classes.subHeading}>
            <Skeleton style={{ width: 200, height: 15 }} />
          </div>
        </div>
        <div
          className="col-12 col-sm-12 col-md-4 col-lg-3 py-2 order-1 order-md-2"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Skeleton style={{ width: "100%", height: 200, borderRadius: 10 }} />
        </div>
      </div>
    </>
  );
};

export default NewsSkeletonList;
