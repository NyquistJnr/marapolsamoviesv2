"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "react-bootstrap";
import classes from "./HorizontalScroll.module.css";
import { shortenText } from "@/utils/text-shortener";

const HorizontalScroll = (props) => {
  return (
    <Container fluid>
      <div className={classes.bodyContainer}>
        {props.data?.length > 0 ? (
          props.data.map((item) => (
            <div key={item.id} className={classes.cardContainer}>
              <div className={classes.cardContent}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={180}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                  priority
                  className={classes.imgStyle}
                />
                <div className={classes.textContent}>
                  <Link href={`/reviews/${item.id}`}>
                    <h4>{shortenText(item.title, 7)}</h4>
                  </Link>
                  <p>
                    <strong>Genre: </strong>
                    {item.genre == " " || item.genre == ""
                      ? "Other"
                      : item.genre}
                  </p>
                  <p>
                    <strong>Streaming Platform: </strong>
                    {item.streamingPlatform == " " ||
                    item.streamingPlatform == ""
                      ? "Other"
                      : item.streamingPlatform}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No data</div>
        )}
      </div>
    </Container>
  );
};

export default HorizontalScroll;
