import { Skeleton } from "@chakra-ui/react";
import React from "react";

const SingleNewsSkeleton = () => {
  return (
    <div className="container fluid">
      <div className="py-4">
        <Skeleton style={{ width: 200, height: 18 }} />
      </div>
      <Skeleton style={{ width: "100%", height: 200, borderRadius: 10 }} />
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="py-4"
      >
        <Skeleton style={{ width: 200, height: 18 }} />
        <Skeleton style={{ width: 200, height: 18 }} />
      </div>
      <div className="py-2">
        <Skeleton style={{ width: 200, height: 13 }} />
      </div>
    </div>
  );
};

export default SingleNewsSkeleton;
