"use client";

import React from "react";
import TeamNew from "@/components/admin-components/custom-components/teams-components/TeamNew";
import withAuthorization from "@/hoc/withAuthorization";

const TeamNewPage = () => {
  return <TeamNew />;
};

export default withAuthorization(TeamNewPage);
