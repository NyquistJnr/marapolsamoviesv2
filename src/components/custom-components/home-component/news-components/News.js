import Image from "next/image";
import classes from "./News.module.css";
import { shortenText, truncateText } from "@/utils/text-shortener";
import Link from "next/link";
import { capitalize } from "@/utils/number-commas";

const News = (props) => {
  const truncatedDescription = truncateText(props.description, 100);
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
          <Link href={`/news/${props.id}`}>
            <h3
              className={classes.h1}
              style={{ fontWeight: "bold", marginTop: 20 }}
            >
              {shortenText(props.title, 5)}
            </h3>
          </Link>
        </div>
        <div style={{ marginTop: 20 }}>
          <p className={classes.p}>
            <b>By {capitalize(props.author)}</b>
          </p>
          <div className={classes.h2}>
            <div
              dangerouslySetInnerHTML={{
                __html: truncatedDescription,
              }}
            />
          </div>
        </div>
      </section>
      <hr style={{ marginBottom: 50 }} />
    </>
  );
};

export default News;
