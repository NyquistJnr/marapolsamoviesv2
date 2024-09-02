"use client";

import React from "react";
import NewsNewAdminComponent from "@/components/admin-components/custom-components/news-components/NewsNew";
import withAuthorization from "@/hoc/withAuthorization";

const NewsAdminNewPost = () => {
  return <NewsNewAdminComponent />;
};

export default withAuthorization(NewsAdminNewPost);
