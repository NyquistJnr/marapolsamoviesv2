"use client";

import React from "react";
import ReviewListAdmin from "@/components/admin-components/custom-components/review-components/ReviewList";
import withAuthorization from "@/hoc/withAuthorization";

const AdminReviewList = () => {
  return <ReviewListAdmin />;
};

export default withAuthorization(AdminReviewList);
