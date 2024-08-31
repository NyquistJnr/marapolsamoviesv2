import Image from "next/image";
import classes from "./News.module.css";

const News = (props) => {
  return (
    <>
      <section>
        <div>
          <Image
            src={props.image}
            alt={props.title}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 10,
              objectFit: "cover",
            }}
            priority
            width={100}
            height={100}
          />
          <h3
            className={classes.h1}
            style={{ fontWeight: "bold", marginTop: 20 }}
          >
            {props.title}
          </h3>
        </div>
        <div style={{ marginTop: 20 }}>
          <p className={classes.p}>
            <b>By {props.author}</b>
          </p>
          <p className={classes.h2}>{props.description}</p>
        </div>
      </section>
      <hr style={{ marginBottom: 50 }} />
    </>
  );
};

export default News;
