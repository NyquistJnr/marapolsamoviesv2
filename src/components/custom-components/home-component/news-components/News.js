import Image from "next/image";
import classes from "./News.module.css";
import { shortenText } from "@/utils/text-shortener";

const News = (props) => {
  return (
    <>
      <section>
        <div>
          <div className={classes.imgWrapper}>
            <Image
              src={props.image}
              alt={props.title}
              style={{
                width: "100%",
                height: 200,
                borderRadius: 10,
                objectFit: "cover",
              }}
              layout="responsive"
              priority
              width={100}
              height={100}
              className={classes.imgStyle}
            />
          </div>
          <h3
            className={classes.h1}
            style={{ fontWeight: "bold", marginTop: 20 }}
          >
            {shortenText(props.title, 5)}
          </h3>
        </div>
        <div style={{ marginTop: 20 }}>
          <p className={classes.p}>
            <b>By {props.author}</b>
          </p>
          <p className={classes.h2}>{shortenText(props.description, 15)}</p>
        </div>
      </section>
      <hr style={{ marginBottom: 50 }} />
    </>
  );
};

export default News;
