"use client";

import React from "react";
import NewsAdmin from "@/components/admin-components/custom-components/news-components/News";
import withAuthorization from "@/hoc/withAuthorization";

const AdminNewsPage = () => {
  return <NewsAdmin />;
};

export default withAuthorization(AdminNewsPage);
