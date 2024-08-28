"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LoaderLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="loaderContainer">
          <Image
            src="/iha-logo.svg"
            alt="Loading"
            className="loadingImage"
            width={250}
            height={100}
            priority
          />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoaderLayout;
