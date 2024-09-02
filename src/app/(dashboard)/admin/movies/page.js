"use client";

import React from "react";
import AdminMoviesComponent from "@/components/admin-components/custom-components/movies-components/Movie";
import withAuthorization from "@/hoc/withAuthorization";

const AmdinMoviesPage = () => {
  return <AdminMoviesComponent />;
};

export default withAuthorization(AmdinMoviesPage);
