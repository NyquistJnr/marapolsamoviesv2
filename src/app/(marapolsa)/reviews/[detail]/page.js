"use client";

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import SearchedReviewComponent from "@/components/custom-components/reviews-component/review-search/SearchedReview";

const ReviewDetailPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  return (
    <Suspense fallback={<div>Abeg...</div>}>
      <SearchedReviewComponent reviewId={id} />
    </Suspense>
  );
};

export default ReviewDetailPage;
