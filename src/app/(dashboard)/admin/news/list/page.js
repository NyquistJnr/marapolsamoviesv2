"use client";

import React from "react";
import NewsAdminListComponent from "@/components/admin-components/custom-components/news-components/NewsList";
import withAuthorization from "@/hoc/withAuthorization";

const NewsAdminList = () => {
  return <NewsAdminListComponent />;
};

export default withAuthorization(NewsAdminList);
