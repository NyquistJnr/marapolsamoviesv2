"use client";

import React from "react";
import AwardsNewAdmin from "@/components/admin-components/custom-components/awards-components/AwardsNew";
import withAuthorization from "@/hoc/withAuthorization";

const AdminAwardsNewPage = () => {
  return <AwardsNewAdmin />;
};

export default withAuthorization(AdminAwardsNewPage);
