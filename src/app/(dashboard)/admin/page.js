"use client";

import React from "react";
import DashboardComponent from "@/components/admin-components/custom-components/dashboard-components/Dashboard";
import withAuthorization from "@/hoc/withAuthorization";

const AdminPage = () => {
  return <DashboardComponent />;
};

export default withAuthorization(AdminPage);
