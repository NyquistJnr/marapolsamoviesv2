"use client";

import React from "react";
import AwardsResultAdmin from "@/components/admin-components/custom-components/awards-components/AwardsResult";
import withAuthorization from "@/hoc/withAuthorization";

const AdminAwardsListPage = () => {
  return <AwardsResultAdmin />;
};

export default withAuthorization(AdminAwardsListPage);
