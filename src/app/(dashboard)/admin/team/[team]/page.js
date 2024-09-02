"use client";

import React from "react";
import TeamResult from "@/components/admin-components/custom-components/teams-components/TeamResult";
import withAuthorization from "@/hoc/withAuthorization";

const TeamDetailPage = () => {
  return <TeamResult />;
};

export default withAuthorization(TeamDetailPage);
