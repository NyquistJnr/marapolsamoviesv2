"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import the ReviewNew component
const ReviewNew = dynamic(
  () =>
    import(
      "@/components/admin-components/custom-components/review-components/ReviewNew"
    ),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);

const AdminReviewUpdatePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the "id" query parameter

  if (!id) {
    return <div>Review ID not found. Hello</div>;
  }

  return <ReviewNew reviewId={id} />;
};

export default AdminReviewUpdatePage;
