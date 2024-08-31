import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const RatingComponent = (props) => {
  const [rating, setRating] = useState(0);
  const Star = (
    <path d="M62 25.154H39.082L32 3l-7.082 22.154H2l18.541 13.693L13.459 61L32 47.309L50.541 61l-7.082-22.152L62 25.154z" />
  );
  const customStyles = {
    itemShapes: Star,
    boxBorderWidth: 2,

    activeFillColor: ["#FEE2E2", "#FFEDD5", "#FEF9C3", "#ECFCCB", "#D1FAE5"],
    activeBoxColor: ["#da1600", "#db711a", "#dcb000", "#61bb00", "#009664"],
    activeBoxBorderColor: [
      "#c41400",
      "#d05e00",
      "#cca300",
      "#498d00",
      "#00724c",
    ],

    inactiveFillColor: "white",
    inactiveBoxColor: "#dddddd",
    inactiveBoxBorderColor: "#a8a8a8",
  };

  return (
    <div
      style={{
        fontSize: 20,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <b>{props.title ? props.title : "Top"} Rating:</b>
      <span>{props.value * 2}/10 </span>
      <Rating
        style={{ maxWidth: 190, marginLeft: 10 }}
        value={props.title ? rating : props.value}
        onChange={(a) => {
          setRating(a);
          props.ratingValue(a);
        }}
        itemStyles={customStyles}
        radius="large"
        spaceBetween="small"
        spaceInside="large"
        readOnly={props.title ? false : true}
      />
    </div>
  );
};

export default RatingComponent;
