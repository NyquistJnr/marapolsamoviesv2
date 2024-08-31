import React from "react";
import styles from "./MovieScroll.module.css";
import { Skeleton } from "@chakra-ui/react";

const dataList = ["1", "2", "3", "4", "5", "6", "7", "8"];

const ImageScrollSkeleton = () => {
  return (
    <div className={styles.scrollerContainer}>
      <Skeleton style={{ width: 180, height: 15, marginBottom: 20 }} />
      <div className={styles.scroller}>
        {dataList.map((data) => (
          <div key={data} className={styles.imageContainer}>
            <Skeleton style={{ width: 180, height: 250, borderRadius: 10 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageScrollSkeleton;
