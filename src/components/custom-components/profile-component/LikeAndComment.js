import Image from "next/image";

import classes from "./LikeAndComment.module.css";
import Link from "next/link";

const LikeAndComment = (props) => {
  return (
    <section
      style={{
        height: 260,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <div className={classes.imgWrapper}>
        <Image
          src={props.image}
          alt={props.title}
          className={classes.imgStyle}
          width={400}
          height={225}
          layout="responsive"
          style={{
            width: "100%",
            height: 150,
            objectFit: "cover",
            objectPosition: "50% 30%",
            borderRadius: 10,
          }}
        />
      </div>
      <h3 style={{ marginTop: 10, fontSize: 16, fontWeight: "bold" }}>
        <Link href={`/${props.postType.toLowerCase()}/${props.postID}`}>
          {props.title}
        </Link>
      </h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{props.timestamp?.toDate()?.toLocaleString()}</div>
        <div
          style={{
            background: "transparent",
            border: "1px solid #E86C44",
            color: "#E86C44",
            borderRadius: 10,
            padding: "0 2%",
          }}
        >
          {props.postType}
        </div>
      </div>
    </section>
  );
};

export default LikeAndComment;
