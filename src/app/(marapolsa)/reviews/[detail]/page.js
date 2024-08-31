"use client";

import React from "react";
import { usePathname } from "next/navigation";
import SearchedReviewComponent from "@/components/custom-components/reviews-component/review-search/SearchedReview";

const ReviewDetailPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  return <SearchedReviewComponent reviewId={id} />;
};

export default ReviewDetailPage;
