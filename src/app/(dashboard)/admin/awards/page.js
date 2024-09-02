"use client";

import React from "react";
import AwardsAdminComponent from "@/components/admin-components/custom-components/awards-components/Awards";
import withAuthorization from "@/hoc/withAuthorization";

const AdminAwardsPage = () => {
  return <AwardsAdminComponent />;
};

export default withAuthorization(AdminAwardsPage);
