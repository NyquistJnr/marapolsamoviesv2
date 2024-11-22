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
                  className={classes.imgStyle}
                  priority
                />
                <div className={classes.textContent}>
                  <Link href={`/reviews/${item.id}`}>
                    <h4>{shortenText(item.title, 7)}</h4>
                  </Link>
                  <p>
                    <strong>Genre: </strong>
                    {item.genre?.trim() || "Other"}
                  </p>
                  <p>
                    <strong>Streaming Platform: </strong>
                    {item.streamingPlatform?.trim() || "Other"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={classes.noData}>No data available</div>
        )}
      </div>
    </Container>
  );
};

export default HorizontalScroll;
