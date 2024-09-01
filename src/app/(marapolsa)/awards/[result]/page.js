"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AwardsComponents from "@/components/custom-components/award-component/MainAwards";

const AwardsResult = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  return <AwardsComponents awardId={id} />;
};

export default AwardsResult;
