import Link from "next/link";
import classes from "./Popular.module.css";
import Image from "next/image";

const Popular = (props) => {
  return (
    <>
      <section>
        <div style={{ marginTop: 30 }}>
          <Image
            src={props.image}
            alt={props.title}
            style={{
              width: "100%",
              height: 130,
              borderRadius: 10,
              objectFit: "cover",
            }}
            priority
            width={100}
            height={100}
          />
        </div>
        <div style={{ marginTop: 20, width: "90%" }}>
          <h3 className={classes.h1} style={{ fontWeight: "bold" }}>
            <Link href={`/${props.collectionName}/${props.id}`}>
              {props.title}
            </Link>
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className={classes.p}>
              {props.timestamp.toDate().toLocaleString()}
            </p>
            <button
              className="btn"
              style={{ color: "#E86C44", border: "1px solid #E86C44" }}
            >
              {props.collectionName}
            </button>
          </div>
        </div>
      </section>
      <hr style={{ marginBottom: 30 }} />
    </>
  );
};

export default Popular;
