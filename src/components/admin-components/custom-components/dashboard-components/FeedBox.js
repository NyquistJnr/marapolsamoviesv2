import classes from "./FeedBox.module.css";

import React from "react";

const FeedBox = (props) => {
  return (
    <div
      style={{ background: "#fff", padding: "10px 15px", borderRadius: "10px" }}
    >
      <div style={{ color: "#898784", fontSize: 13 }}>{props.title}</div>
      <div style={{ margin: "10px 0", fontWeight: "bold" }}>{props.counts}</div>
      <div style={{ color: "#575655", fontSize: 10 }}>
        {props.attend} This week
      </div>
    </div>
  );
};

export default FeedBox;
