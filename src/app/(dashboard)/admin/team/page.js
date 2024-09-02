"use client";

import Teams from "@/components/admin-components/custom-components/teams-components/Teams";
import withAuthorization from "@/hoc/withAuthorization";
import React from "react";

const TeamsPage = () => {
  return <Teams />;
};

export default withAuthorization(TeamsPage);
