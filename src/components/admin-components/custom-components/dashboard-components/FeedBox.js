import React from "react";
import { Badge } from "react-bootstrap";
import classes from "./FeedBox.module.css";

import { formatNumberWithCommas } from "@/utils/number-commas";

const FeedBox = (props) => {
  if (props.error) {
    return (
      <div className="py-5 text-center">
        An Error Occured, {props.error.message}
      </div>
    );
  }
  return (
    <div
      style={{ background: "#fff", padding: "10px 15px", borderRadius: "10px" }}
    >
      <div style={{ color: "#898784", fontSize: 13 }}>{props.title}</div>
      <div style={{ margin: "10px 0", fontWeight: "bold", fontSize: 13 }}>
        {props.loading ? "Loading..." : formatNumberWithCommas(props.counts)}
      </div>
      <div style={{ color: "#575655", fontSize: 10 }}>
        <Badge pill bg="warning">
          {props.attend} {/* This week */}
        </Badge>
      </div>
    </div>
  );
};

export default FeedBox;
