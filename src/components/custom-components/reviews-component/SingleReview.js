import Link from "next/link";
import Image from "next/image";
import classes from "./SingleReview.module.css";
import { shortenText } from "@/utils/text-shortener";
import { capitalize } from "@/utils/number-commas";

const SingleReviewComponent = (props) => {
  const shortenVerdict = shortenText(props.verdict, 20);

  return (
    <div className="row gx-3">
      <div className="col-12 col-md-4 d-flex justify-content-center align-items-center py-2">
        <Image
          className={classes.img}
          src={props.image}
          alt={props.title}
          priority
          layout="responsive"
          width={400}
          height={300}
        />
      </div>
      <div className="col-12 col-md-8 py-2">
        <Link href={`/reviews/${props.id}`}>
          <h1 className={classes.heading1}>{shortenText(props.title, 7)}</h1>
        </Link>
        <p className={classes.description}>{shortenVerdict}</p>
        <div className={classes.subHeading}>
          by <strong>{capitalize(props.author)}</strong> &middot;{" "}
          {props.timestamp.toDate().toLocaleString()}
        </div>
        <div className={classes.details}>
          <div className={classes.subHeading}>
            <strong>Genre:</strong> {props.genre}
          </div>
          <div className={classes.subHeading}>
            <strong>Industry:</strong> {props.industry}
          </div>
          <div className={classes.subHeading}>
            <strong>Streaming Platform:</strong> {props.streamingPlatform}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleReviewComponent;
