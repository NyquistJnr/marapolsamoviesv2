"use client";

import React from "react";
import MoviesNewAdmin from "@/components/admin-components/custom-components/movies-components/MoviesNew";
import withAuthorization from "@/hoc/withAuthorization";

const AdminMoviesNewMovie = () => {
  return <MoviesNewAdmin />;
};

export default withAuthorization(AdminMoviesNewMovie);
