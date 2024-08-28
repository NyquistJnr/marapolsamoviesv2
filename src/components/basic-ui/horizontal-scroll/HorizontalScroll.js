"use client";

import { usePathname, useRouter } from "next/navigation";
import { Container } from "react-bootstrap";
import classes from "./HorizontalScroll.module.css";

import Image from "next/image";
import Link from "next/link";

const HorizontalScroll = (props) => {
  const router = useRouter();
  const currentPath = usePathname();
  return (
    <Container>
      <main className={classes.bodyContainer}>
        {props.data?.map((item) => (
          <section
            key={item.title}
            className="col-12 col-sm-12 col-md-6 col-lg-3"
          >
            <div className={classes.cardConatiner}>
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={300}
                style={{
                  width: "85%",
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 10,
                  objectPosition: "center center",
                }}
                priority
                className={classes.imgStyle}
              />
              <div
                style={{
                  textAlign: "left",
                  marginTop: 15,
                  width: "85%",
                }}
              >
                <Link href={`/reviews/detail?id=${item.id}`}>
                  <h4
                    style={{
                      fontSize: 18,
                      marginBottom: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </h4>
                </Link>
                <p style={{ fontSize: 12, marginBottom: 0 }}>
                  <span style={{ fontWeight: "bold" }}>Genre: </span>
                  {item.genre}
                </p>
                <p style={{ fontSize: 12 }}>
                  <span style={{ fontWeight: "bold" }}>
                    Streaming Platform:{" "}
                  </span>
                  {item.streamingPlatform}
                </p>
              </div>
            </div>
          </section>
        ))}
      </main>
    </Container>
  );
};

export default HorizontalScroll;
