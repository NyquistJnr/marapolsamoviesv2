import React from "react";
import classes from "./AnalyticsBox.module.css";
import { Badge } from "react-bootstrap";

const AnalyticsBox = (props) => {
  if (props.error) {
    return (
      <div className="text-center py-5">
        An Error Occured, {props.error.message}
      </div>
    );
  }
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
      </div>
    </div>
  );
};

export default AnalyticsBox;
