"use client";

import React from "react";
import ReviewNew from "@/components/admin-components/custom-components/review-components/ReviewNew";
import withAuthorization from "@/hoc/withAuthorization";

const AdminReviewNewPage = () => {
  return <ReviewNew />;
};

export default withAuthorization(AdminReviewNewPage);
