"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
// import SearchedReviewComponent from "@/components/custom-components/reviews-component/review-search/SearchedReview";

import dynamic from "next/dynamic";

const SearchedReviewComponent = dynamic(
  () =>
    import(
      "@/components/custom-components/reviews-component/review-search/SearchedReview"
    ),
  {
    ssr: false,
  }
);

const ReviewDetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return (
    <Suspense fallback={<div>Abeg...</div>}>
      <SearchedReviewComponent reviewId={id} />
    </Suspense>
  );
};

export default ReviewDetailPage;
