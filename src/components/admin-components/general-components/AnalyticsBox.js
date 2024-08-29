import React from "react";
import classes from "./AnalyticsBox.module.css";

const AnalyticsBox = (props) => {
  return (
    <div style={{ background: "#fff", borderRadius: 10, padding: "20px 25px" }}>
      <div style={{ color: "#898784", marginBottom: 5 }}>
        Total {props.title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontWeight: "bold" }}>
          {props.isLoading ? (
            <div>Loading...</div>
          ) : (
            <>{props.value ? props.value : "0"}</>
          )}
        </div>
        <div>
          {props.percentage}
          <span>. This week</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsBox;
