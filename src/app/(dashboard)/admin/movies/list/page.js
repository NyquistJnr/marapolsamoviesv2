"use client";

import React from "react";
import MoviesResultAdmin from "@/components/admin-components/custom-components/movies-components/MoviesResult";
import withAuthorization from "@/hoc/withAuthorization";

const MovieAdminList = () => {
  return <MoviesResultAdmin />;
};

export default withAuthorization(MovieAdminList);
