"use client";

import React from "react";
import ReviewComponent from "@/components/admin-components/custom-components/review-components/Review";
import withAuthorization from "@/hoc/withAuthorization";

const AdminReviewPage = () => {
  return <ReviewComponent />;
};

export default withAuthorization(AdminReviewPage);
