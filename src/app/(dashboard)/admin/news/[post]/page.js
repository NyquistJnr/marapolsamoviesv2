"use client";

import { usePathname } from "next/navigation";
import NewsNewAdminComponent from "@/components/admin-components/custom-components/news-components/NewsNew";
import withAuthorization from "@/hoc/withAuthorization";

const NewsAdminUpdatePost = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  return <NewsNewAdminComponent docId={id} />;
};

export default withAuthorization(NewsAdminUpdatePost);
