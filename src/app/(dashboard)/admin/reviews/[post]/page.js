"use client";

import React from "react";
import { usePathname } from "next/navigation";
import ReviewNew from "@/components/admin-components/custom-components/review-components/ReviewNew";
import withAuthorization from "@/hoc/withAuthorization";

const AdminReviewUpdatePage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  if (!id) {
    return <div>Review ID not found. Hello</div>;
  }

  return <ReviewNew reviewId={id} />;
};

export default withAuthorization(AdminReviewUpdatePage);
