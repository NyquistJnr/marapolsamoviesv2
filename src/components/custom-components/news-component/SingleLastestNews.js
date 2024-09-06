"use client";

import Image from "next/image";
import Link from "next/link";
import classes from "./SingleLastestNews.module.css";
import { shortenText, truncateText } from "@/utils/text-shortener";
import { capitalize } from "@/utils/number-commas";

const NewsItem = (props) => {
  const truncatedDescription = truncateText(props.description, 100); // Adjust the length as needed

  return (
    <>
      <div className="row">
        <div
          className="col-12 col-sm-12 col-md-8 col-lg-9 py-2 order-2 order-md-1"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <Link href={`/news/${props.id}`}>
              <h1 className={classes.heading1}>
                {shortenText(props.title, 15)}
              </h1>
            </Link>
            <div className={classes.description}>
              <div
                dangerouslySetInnerHTML={{
                  __html: truncatedDescription,
                }}
              />
            </div>
          </div>
          <div className={classes.subHeading}>
            by
            <span style={{ fontWeight: "bold", marginLeft: 4 }}>
              {capitalize(props.author)}
            </span>
            <span style={{ marginLeft: 20 }}>
              {props.time} {/* ago */}
            </span>
          </div>
        </div>
        <div
          className="col-12 col-sm-12 col-md-4 col-lg-3 py-2 order-1 order-md-2"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Image
            className={classes.img}
            src={props.src}
            alt={props.title}
            priority
            layout="responsive"
            width={400}
            height={225}
          />
        </div>
      </div>
      <hr style={{ marginTop: 20, border: "1.4px solid #000" }} />
    </>
  );
};

export default NewsItem;
