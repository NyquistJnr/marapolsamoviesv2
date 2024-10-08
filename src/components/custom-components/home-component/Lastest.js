import Image from "next/image";
import classes from "./Lastest.module.css";
import { shortenText } from "@/utils/text-shortener";
import Link from "next/link";
import { capitalize } from "@/utils/number-commas";

const Lastest = (props) => {
  const shortenedText = shortenText(props.plot, 20);
  return (
    <>
      <section style={{ display: "flex" }}>
        <div
          style={{
            marginRight: 10,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className={classes.imgWrapper}>
            <Image
              src={props.image}
              alt={props.title}
              className={classes.imgStyle}
              width={100}
              height={100}
              priority
              layout="responsive"
            />
          </div>
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: 10,
          }}
        >
          <div>
            <Link href={`/reviews/${props.id}`}>
              <h4 style={{ fontWeight: "bold" }} className={classes.h1}>
                {shortenText(props.title, 7)}
              </h4>
            </Link>
            <p className={classes.h2}>{shortenedText}</p>
          </div>
          <div>
            <p className={classes.p}>
              <span style={{ marginRight: 20 }}>
                <b>by {capitalize(props.author)}</b>
              </span>
              <span>
                <b>{props.timestamp.toDate().toLocaleString()}</b>
              </span>
            </p>
            <p className={classes.p} style={{ marginTop: -6 }}>
              <b>Genre: </b>
              {props.genre}
            </p>
            <p className={classes.p} style={{ marginTop: -15 }}>
              <b>Streaming Platform: </b>
              {props.streamingPlatform}
            </p>
          </div>
        </div>
      </section>
      <hr
        className={classes.length}
        style={{ opacity: 0.1, border: "1.4px solid" }}
      />
    </>
  );
};

export default Lastest;
