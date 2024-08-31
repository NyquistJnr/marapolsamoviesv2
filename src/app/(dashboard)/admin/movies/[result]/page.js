"use client";

import { usePathname } from "next/navigation";
import MoviesNewAdmin from "@/components/admin-components/custom-components/movies-components/MoviesNew";

const AdminResultMoviesPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  return <MoviesNewAdmin movieId={id} />;
};

export default AdminResultMoviesPage;
