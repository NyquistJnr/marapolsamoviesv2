"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AwardsNewAdmin from "@/components/admin-components/custom-components/awards-components/AwardsNew";
import withAuthorization from "@/hoc/withAuthorization";

const AdminAwardsDetailsPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  return <AwardsNewAdmin id={id} />;
};

export default withAuthorization(AdminAwardsDetailsPage);
