import { Skeleton } from "@chakra-ui/react";
import classes from "./TrendingNews.module.css";

const dataList = ["1", "2", "3"];

const TrendingSkeleton = () => {
  return (
    <div className="row">
      {dataList.map((data) => (
        <div className="col-12 col-sm-12 col-md-6 col-lg-4 py-3" key={data}>
          <Skeleton style={{ width: "100%", height: 150, borderRadius: 10 }} />
          <Skeleton style={{ width: 150, height: 15, marginTop: 10 }} />

          <div className={classes.authorSection}>
            <Skeleton style={{ width: 150, height: 15, marginTop: 10 }} />
          </div>
          <div className={classes.description}>
            <Skeleton style={{ width: 150, height: 15, marginTop: 10 }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingSkeleton;
